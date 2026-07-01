/**
 * Writes WebP files into public/og/docs/** for Open Graph previews.
 * Satori + Resvg render SVG to PNG, then sharp encodes WebP.
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { createElement as h } from 'react';
import sharp from 'sharp';
import satori from 'satori';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const contentDir = join(root, 'src/content/docs');
const publicDir = join(root, 'public');
const cacheFile = join(publicDir, 'og/.og-input-hashes.json');

const WEBP_OPTIONS = { quality: 95, effort: 6 };
const LAYOUT_VERSION = 10;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const NOISE_OPACITY = 0.01;

const fontPath = (weight) =>
	join(root, 'node_modules/@fontsource/inter/files', `inter-latin-${weight}-normal.woff`);

function clip(value, max = 240) {
	const text = String(value || '').replace(/\s+/g, ' ').trim();
	if (text.length <= max) return text;
	return `${text.slice(0, max - 3).trim()}...`;
}

function stripYamlString(value) {
	return value
		.trim()
		.replace(/^["']|["']$/g, '')
		.trim();
}

function parseFrontmatter(raw) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	const data = {};
	if (!match) return data;

	for (const line of match[1].split(/\r?\n/)) {
		const field = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
		if (!field) continue;
		if (field[1] === 'title' || field[1] === 'description') {
			data[field[1]] = stripYamlString(field[2]);
		}
	}

	return data;
}

function routeFromContentPath(file) {
	const rel = relative(contentDir, file).split(sep).join('/');
	const withoutExt = rel.replace(/\.mdx$/, '');
	const slug = withoutExt.endsWith('/index') ? withoutExt.slice(0, -'/index'.length) : withoutExt;
	return `/${slug}/`;
}

function ogImagePathForRoute(pathname) {
	const clean = pathname.split(/[?#]/, 1)[0] || '/';
	const withoutTrailingSlash = clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
	if (withoutTrailingSlash === '/') return '/og/docs.webp';
	return `/og/docs/${withoutTrailingSlash.replace(/^\/+/, '')}.webp`;
}

function versionFromRoute(route) {
	if (route === '/') return 'v5';
	const match = route.match(/^\/(v[0-9]+)(?:\/|$)/);
	return match ? match[1] : 'docs';
}

function sectionFromRoute(route) {
	const parts = route.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
	if (parts.length <= 2) return '';
	return parts
		.slice(1, -1)
		.map((part) =>
			part
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
		)
		.join(' / ');
}

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walk(path)));
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			files.push(path);
		}
	}
	return files;
}

async function loadInputCache() {
	try {
		return JSON.parse(await readFile(cacheFile, 'utf8'));
	} catch {
		return {};
	}
}

async function saveInputCache(cache) {
	await mkdir(dirname(cacheFile), { recursive: true });
	await writeFile(cacheFile, JSON.stringify(cache, null, '\t') + '\n', 'utf8');
}

async function loadLogoDataUrl() {
	const svg = await readFile(join(root, 'src/assets/noctalia-logo.svg'));
	const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: 256 } }).render().asPng();
	return `data:image/png;base64,${rendered.toString('base64')}`;
}

function buildGlobalDigest(fontW400, fontW600, logoDataUrl) {
	return createHash('sha256')
		.update(String(LAYOUT_VERSION), 'utf8')
		.update(JSON.stringify(WEBP_OPTIONS), 'utf8')
		.update(fontW400)
		.update(fontW600)
		.update(logoDataUrl, 'utf8')
		.digest('hex');
}

function imageDigest(globalDigest, page) {
	return createHash('sha256')
		.update(globalDigest, 'utf8')
		.update(JSON.stringify(page), 'utf8')
		.digest('hex');
}

function buildNoiseOverlay() {
	const data = Buffer.alloc(OG_WIDTH * OG_HEIGHT * 4);
	let seed = 0x5f3759df;
	for (let i = 0; i < data.length; i += 4) {
		seed ^= seed << 13;
		seed ^= seed >>> 17;
		seed ^= seed << 5;
		const value = seed & 0xff;
		data[i] = value;
		data[i + 1] = value;
		data[i + 2] = value;
		data[i + 3] = Math.round(255 * NOISE_OPACITY);
	}
	return data;
}

function buildTree(page, logoDataUrl) {
	const version = page.version.toLowerCase();
	const section = page.section ? ` / ${page.section}` : '';
	const eyebrow = `${version}${section}`;
	const description = clip(page.description || 'Noctalia documentation and guides.', 260);

	return h(
		'div',
		{
			style: {
				width: OG_WIDTH,
				height: OG_HEIGHT,
				display: 'flex',
				position: 'relative',
				backgroundColor: '#070722',
				fontFamily: 'Inter',
				overflow: 'hidden',
			},
		},
		h('div', {
			style: {
				position: 'absolute',
				inset: 0,
				background: [
					'linear-gradient(165deg, #070722 0%, #0a0a2a 46%, #11112d 100%)',
				].join(', '),
			},
		}),
		h(
			'svg',
			{
				width: OG_WIDTH,
				height: OG_HEIGHT,
				viewBox: `0 0 ${OG_WIDTH} ${OG_HEIGHT}`,
				style: {
					position: 'absolute',
					inset: 0,
				},
			},
			h(
				'defs',
				null,
				h(
					'radialGradient',
					{ id: 'halo-left', cx: '50%', cy: '50%', r: '50%' },
					h('stop', { offset: '0%', 'stop-color': '#607eae', 'stop-opacity': '0.22' }),
					h('stop', { offset: '100%', 'stop-color': '#607eae', 'stop-opacity': '0' })
				),
				h(
					'radialGradient',
					{ id: 'halo-right', cx: '50%', cy: '50%', r: '50%' },
					h('stop', { offset: '0%', 'stop-color': '#fff59b', 'stop-opacity': '0.11' }),
					h('stop', { offset: '100%', 'stop-color': '#fff59b', 'stop-opacity': '0' })
				),
				h(
					'radialGradient',
					{ id: 'halo-bottom', cx: '50%', cy: '50%', r: '50%' },
					h('stop', { offset: '0%', 'stop-color': '#a9aefe', 'stop-opacity': '0.08' }),
					h('stop', { offset: '100%', 'stop-color': '#a9aefe', 'stop-opacity': '0' })
				)
			),
			h('ellipse', { cx: 230, cy: 185, rx: 390, ry: 230, fill: 'url(#halo-left)' }),
			h('ellipse', { cx: 1020, cy: 450, rx: 300, ry: 170, fill: 'url(#halo-right)' }),
			h('ellipse', { cx: 640, cy: 650, rx: 460, ry: 205, fill: 'url(#halo-bottom)' })
		),
		h(
			'div',
			{
				style: {
					position: 'relative',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					padding: '56px 72px',
					boxSizing: 'border-box',
				},
			},
			h(
				'div',
				{
					style: {
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 42,
						width: '100%',
					},
				},
				h('img', {
					src: logoDataUrl,
					width: 132,
					height: 132,
					style: { flexShrink: 0, objectFit: 'contain' },
				}),
				h(
					'div',
					{
						style: {
							display: 'flex',
							flexDirection: 'column',
							minWidth: 0,
							maxWidth: 860,
						},
					},
					h(
						'div',
						{
							style: {
								fontSize: 15,
								fontWeight: 600,
								letterSpacing: '0.2em',
								textTransform: 'uppercase',
								color: '#7c80b4',
								marginBottom: 20,
							},
						},
						'Noctalia Docs'
					),
					h(
						'div',
						{
							style: {
								fontSize: 92,
								fontWeight: 600,
								color: '#f3edf7',
								lineHeight: 1.02,
							},
						},
						'Noctalia'
					),
					h(
						'div',
						{
							style: {
								fontSize: 38,
								fontWeight: 600,
								color: '#9bfece',
								lineHeight: 1.18,
								marginTop: 14,
								maxWidth: 850,
							},
						},
						clip(`${eyebrow} / ${page.title}`, 86)
					),
					h(
						'div',
						{
							style: {
								fontSize: 26,
								fontWeight: 400,
								color: '#a9aed8',
								lineHeight: 1.45,
								marginTop: 28,
								maxWidth: 830,
							},
						},
						description
					)
				)
			)
		)
	);
}

async function writeOg(page, logoDataUrl, fonts, globalDigest, previousCache, nextCache) {
	const outPathRel = ogImagePathForRoute(page.route).replace(/^\//, '');
	const outPathAbs = join(publicDir, outPathRel);
	const digest = imageDigest(globalDigest, { ...page, outPathRel });

	if (previousCache[outPathRel] === digest && existsSync(outPathAbs)) {
		nextCache[outPathRel] = digest;
		console.log(`Up-to-date public/${outPathRel}`);
		return;
	}

	const svg = await satori(buildTree(page, logoDataUrl), { width: OG_WIDTH, height: OG_HEIGHT, fonts });
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
	const webp = await sharp(png)
		.composite([{ input: buildNoiseOverlay(), raw: { width: OG_WIDTH, height: OG_HEIGHT, channels: 4 } }])
		.webp(WEBP_OPTIONS)
		.toBuffer();
	await mkdir(dirname(outPathAbs), { recursive: true });
	await writeFile(outPathAbs, webp);
	nextCache[outPathRel] = digest;
	console.log(`Wrote public/${outPathRel}`);
}

async function main() {
	if (process.env.SKIP_OG === '1' || process.env.SKIP_OG === 'true') {
		console.log('SKIP_OG set; skipping build-og.mjs');
		return;
	}

	const logo = await loadLogoDataUrl();
	const fontW400 = await readFile(fontPath(400));
	const fontW600 = await readFile(fontPath(600));
	const fonts = [
		{ name: 'Inter', data: fontW400, weight: 400, style: 'normal' },
		{ name: 'Inter', data: fontW600, weight: 600, style: 'normal' },
	];
	const globalDigest = buildGlobalDigest(fontW400, fontW600, logo);
	const previousCache = await loadInputCache();
	const nextCache = {};

	await writeOg(
		{
			route: '/',
			version: 'docs',
			section: '',
			title: 'Documentation',
			description: 'Noctalia documentation and guides.',
		},
		logo,
		fonts,
		globalDigest,
		previousCache,
		nextCache
	);

	const files = (await walk(contentDir)).sort();
	for (const file of files) {
		const raw = await readFile(file, 'utf8');
		const frontmatter = parseFrontmatter(raw);
		const route = routeFromContentPath(file);
		await writeOg(
			{
				route,
				version: versionFromRoute(route),
				section: sectionFromRoute(route),
				title: frontmatter.title || 'Documentation',
				description: frontmatter.description || 'Noctalia documentation and guides.',
			},
			logo,
			fonts,
			globalDigest,
			previousCache,
			nextCache
		);
	}

	await saveInputCache(nextCache);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
