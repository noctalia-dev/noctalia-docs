// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Noctalia Docs",
      logo: { src: "./src/assets/noctalia-logo.svg", alt: "Noctalia" },
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
            { label: "Basic App Theming", link: "/theming/app-theming/" },
            { label: "Advanced App Theming", link: "/theming/advanced-app-theming/" },
          ],
        },
        {
          label: "Program Specific Theming",
          collapsed: false,
          autogenerate: { directory: "theming/program-specific" },
        },
        {
          label: "Development",
          items: [
            { label: "Guidelines", link: "/development/guideline/" },
            { label: "IPC", link: "/development/ipc/" },
            { label: "Widgets", link: "/development/widget/" },
            { label: "Color Scheme", link: "/development/colorscheme/" },
            { label: "Matugen", link: "/development/matugen/" },
          ],
        },
        {
          label: "Plugins development",
          collapsed: false,
          items: [
            { label: "Overview", link: "/plugins/overview/" },
            { label: "Getting Started", link: "/plugins/getting-started/" },
            { label: "Manifest Reference", link: "/plugins/manifest/" },
            { label: "Bar Widget Development", link: "/plugins/bar-widget/" },
            { label: "Panel Development", link: "/plugins/panel/" },
            { label: "Plugin API", link: "/plugins/api/" },
          ],
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
