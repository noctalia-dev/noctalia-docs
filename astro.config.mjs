// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.noctalia.dev",
  vite: {
    logLevel: "error",
  },
  redirects: {
    "/v5/greeter/": "/greeter/",
    "/v5/shell/": "/noctalia/configuration/shell/",
    "/v5/system/network/wpa_supplicant/": "/noctalia/getting-started/faq/#wpa-supplicant",
    "/v5/": "/noctalia/",
    "/v4/": "/noctalia-shell/",
    "/noctalia/shell/": "/noctalia/configuration/shell/",
    "/noctalia/system/network/wpa_supplicant/": "/noctalia/getting-started/faq/#wpa-supplicant",
  },
  integrations: [
    starlight({
      components: {
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        Banner: "./src/components/Banner.astro",
        Search: "./src/components/Search.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        Sidebar: "./src/components/Sidebar.astro",
        Pagination: "./src/components/Pagination.astro",
      },
      head: [
        {
          tag: "script",
          attrs: {
            src: "/search-breadcrumb.js",
            defer: true,
          },
        },
        {
          tag: "script",
          attrs: {
            src: "/section-deeplink.js",
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
          label: "Noctalia",
          items: [
            { label: "Overview", link: "noctalia/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "noctalia/getting-started/installation/" },
                { label: "NixOS", link: "noctalia/getting-started/nixos/" },
                { label: "Running Noctalia", link: "noctalia/getting-started/running-the-shell/" },
                { label: "FAQ", link: "noctalia/getting-started/faq/" },
                { label: "Uninstall", link: "noctalia/getting-started/uninstall/" },
                { label: "Compositor Settings", items: [{ autogenerate: { directory: "noctalia/compositor-settings" } }] },
                { label: "Keybinds & IPC", items: [{ autogenerate: { directory: "noctalia/ipc" } }] },
              ],
            },
            {
              label: "Configuration",
              items: [
                { label: "How configuration works", link: "noctalia/configuration/" },
                { label: "Shell", link: "noctalia/configuration/shell/" },
                { label: "Date format tokens", link: "noctalia/configuration/date-format-tokens/" },
              ],
            },
            {
              label: "Bar",
              items: [
                { label: "Overview", link: "noctalia/bar/" },
                { label: "Widget Actions", link: "noctalia/bar/actions/" },
                {
                  label: "Widgets",
                  collapsed: true,
                  items: [{ autogenerate: { directory: "noctalia/bar/widgets" } }],
                },
              ],
            },
            {
              label: "Dock",
              items: [{ autogenerate: { directory: "noctalia/dock" } }],
            },
            {
              label: "Launcher",
              items: [{ autogenerate: { directory: "noctalia/launcher" } }],
            },
            {
              label: "Control Center",
              items: [{ autogenerate: { directory: "noctalia/control-center" } }],
            },
            {
              label: "Desktop",
              items: [{ autogenerate: { directory: "noctalia/desktop" } }],
            },
            {
              label: "Theming",
              items: [{ autogenerate: { directory: "noctalia/theming" } }],
            },
            {
              label: "Services",
              items: [{ autogenerate: { directory: "noctalia/services" } }],
            },
            {
              label: "Automation",
              items: [{ autogenerate: { directory: "noctalia/automation" } }],
            },
            {
              label: "Plugins",
              items: [
                { label: "Using Plugins", link: "noctalia/plugins/" },
                { label: "Official Plugins", link: "noctalia/plugins/official-plugins/" },
                { label: "Plugin Development", items: [{ autogenerate: { directory: "noctalia/plugins/development" } }] },
              ],
            },
            {
              label: "Templates",
              items: [
                { label: "Official Templates", items: [{ autogenerate: { directory: "noctalia/templates/official" } }] },
                { label: "Community Templates", items: [{ autogenerate: { directory: "noctalia/templates/community" } }] },
              ],
            },
          ],
        },
        {
          label: "Noctalia Greeter",
          items: [{ autogenerate: { directory: "greeter" } }],
        },
        {
          label: "Umbriel",
          items: [{ autogenerate: { directory: "umbriel" } }],
        },
        {
          label: "Noctalia Shell",
          items: [
            { label: "Overview", link: "noctalia-shell/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "noctalia-shell/getting-started/installation/" },
                { label: "NixOS", link: "noctalia-shell/getting-started/nixos/" },
                { label: "Running the Shell", link: "noctalia-shell/getting-started/running-the-shell/" },
                { label: "Compositor Settings", items: [{ autogenerate: { directory: "noctalia-shell/getting-started/compositor-settings" } }] },
                { label: "Keybinds", items: [{ autogenerate: { directory: "noctalia-shell/getting-started/keybinds" } }] },
                { label: "FAQ", link: "noctalia-shell/getting-started/faq/" },
                { label: "Uninstall", link: "noctalia-shell/getting-started/uninstall/" },
              ],
            },
            {
              label: "Configuration",
              items: [{ autogenerate: { directory: "noctalia-shell/configuration" } }],
            },
            {
              label: "Theming",
              items: [
                { label: "Basic App Theming", link: "noctalia-shell/theming/basic-app-theming/" },
                { label: "Program Specific", items: [{ autogenerate: { directory: "noctalia-shell/theming/program-specific" } }] },
                { label: "User Templates", link: "noctalia-shell/theming/user-templates/" },
                { label: "User Color Schemes", link: "noctalia-shell/theming/color-schemes/" },
              ],
            },
            {
              label: "Development",
              items: [
                { label: "Guidelines", link: "noctalia-shell/development/guidelines/" },
                { label: "IPC", link: "noctalia-shell/development/ipc/" },
                { label: "Widgets", link: "noctalia-shell/development/widgets/" },
                { label: "Templates", link: "noctalia-shell/development/templates/" },
                { label: "Plugins", items: [{ autogenerate: { directory: "noctalia-shell/development/plugins" } }] },
              ],
            },
            {
              label: "Deprecated",
              items: [{ autogenerate: { directory: "noctalia-shell/deprecated" } }],
            },
          ],
        },
      ],
    }),
  ],
  markdown: {
    processor: unified({
      gfm: true,
      remarkPlugins: [remarkHeadingId],
    }),
  },
});
