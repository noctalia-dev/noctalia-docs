// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        Header: './src/components/Header.astro',
        TableOfContents: './src/components/TableOfContents.astro',
      },
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
          items: [
            { label: "Installation", link: "getting-started/installation/" },
            { label: "NixOS", link: "getting-started/nixos/" },
            { label: "Running the Shell", link: "getting-started/running-the-shell/" },
            {
              label: "Compositor Settings",
              items: [
                { label: "Niri", link: "getting-started/compositor-settings/niri/" },
                { label: "Hyprland", link: "getting-started/compositor-settings/hyprland/" },
              ],
            },
            {
              label: "Keybinds",
              items: [
                { label: "Overview", link: "getting-started/keybinds/" },
                { label: "Core & Navigation", link: "getting-started/keybinds/core-and-navigation/" },
                { label: "System Controls", link: "getting-started/keybinds/system-controls/" },
                { label: "Interface & Plugins", link: "getting-started/keybinds/interface-and-plugins/" },
              ],
            },
            { label: "FAQ", link: "getting-started/faq/" },
            { label: "Uninstall", link: "getting-started/uninstall/" },
          ],
        },
        {
          label: "Configuration",
          autogenerate: { directory: "configuration" },
        },
        {
          label: "Theming",
          items: [
            { label: "Basic App Theming", link: "theming/basic-app-theming/" },
            {
              label: "Program Specific",
              autogenerate: { directory: "theming/program-specific" },
            },
            { label: "User Templates", link: "theming/user-templates/" },
            { label: "User Color Schemes", link: "theming/color-schemes/" },
          ],
        },
        {
          label: "Development",
          items: [
            { label: "Guidelines", link: "development/guideline/" },
            { label: "IPC", link: "development/ipc/" },
            { label: "Widgets", link: "development/widget/" },
            { label: "Templates", link: "development/templates/" },
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

