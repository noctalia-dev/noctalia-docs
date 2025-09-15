// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Noctalia',
			logo: { src: './src/assets/noctalia-logo.png', alt: 'Noctalia' },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/noctalia-dev/noctalia-docs' }],
			customCss: ['./src/styles/theme.css'],
			tableOfContents: false,
			sidebar: [
				{
					label: 'Documentation',
					items: [
						{ label: 'Overview', slug: 'docs' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Projects',
					items: [
						{ label: 'Repositories', slug: 'projects' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
