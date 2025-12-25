// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/logo-link.js',
            defer: true,
          },
        },
      ],
      title: "Noctalia",
      logo: { 
        src: "./src/assets/noctalia-logo.svg", 
        alt: "Noctalia",
        href: "https://noctalia.dev"
      },
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.noctalia.dev",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/noctalia-dev",
        },
      ],
      customCss: ["./src/styles/theme.css"],
      tableOfContents: true,
      sidebar: [
        {
          label: "Getting started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Configuration",
          autogenerate: { directory: "configuration" },
        },
        {
          label: "Theming",
          items: [
            { label: "Basic App Theming", link: "theming/basic-app-theming" },
            { label: "Advanced App Theming", link: "theming/advanced-app-theming" },
            {
              label: "Program Specific",
              autogenerate: { directory: "theming/program-specific" },
            },
          ],
        },
        {
          label: "Development",
          items: [
            { label: "Guidelines", link: "development/guideline" },
            { label: "IPC", link: "development/ipc" },
            { label: "Widgets", link: "development/widget" },
            { label: "Color Scheme", link: "development/colorscheme" },
            { label: "Matugen", link: "development/matugen" },
            {
              label: "Plugins",
              autogenerate: { directory: "development/plugins" },

            },
          ],
        },
       
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});

