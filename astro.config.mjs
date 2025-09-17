// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Noctalia Docs',
			logo: { src: './src/assets/noctalia-logo.png', alt: 'Noctalia' },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/noctalia-dev' }],
			customCss: ['./src/styles/theme.css'],
			tableOfContents: false,
			sidebar: [
				{
					label: 'Getting started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Development',
					autogenerate: { directory: 'development' },
				},
			],
		}),
	],
});
