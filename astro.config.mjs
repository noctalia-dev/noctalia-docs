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
    /** Shell docs live under configuration/, but are linked as the short /v5/shell/ */
    "/v5/shell/": "/v5/configuration/shell/",
    /** wpa_supplicant troubleshooting moved into the v5 FAQ */
    "/v5/system/network/wpa_supplicant/": "/v5/getting-started/faq/#wpa-supplicant",
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
            src: "/logo-link.js",
            defer: true,
          },
        },
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
          label: "Noctalia v4",
          items: [
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "v4/getting-started/installation/" },
                { label: "NixOS", link: "v4/getting-started/nixos/" },
                { label: "Running the Shell", link: "v4/getting-started/running-the-shell/" },
                { label: "Compositor Settings", items: [{ autogenerate: { directory: "v4/getting-started/compositor-settings" } }] },
                { label: "Keybinds", items: [{ autogenerate: { directory: "v4/getting-started/keybinds" } }] },
                { label: "FAQ", link: "v4/getting-started/faq/" },
                { label: "Uninstall", link: "v4/getting-started/uninstall/" },
              ],
            },
            {
              label: "Configuration",
              items: [{ autogenerate: { directory: "v4/configuration" } }],
            },
            {
              label: "Theming",
              items: [
                { label: "Basic App Theming", link: "v4/theming/basic-app-theming/" },
                { label: "Program Specific", items: [{ autogenerate: { directory: "v4/theming/program-specific" } }] },
                { label: "User Templates", link: "v4/theming/user-templates/" },
                { label: "User Color Schemes", link: "v4/theming/color-schemes/" },
              ],
            },
            {
              label: "Development",
              items: [
                { label: "Guidelines", link: "v4/development/guidelines/" },
                { label: "IPC", link: "v4/development/ipc/" },
                { label: "Widgets", link: "v4/development/widgets/" },
                { label: "Templates", link: "v4/development/templates/" },
                { label: "Plugins", items: [{ autogenerate: { directory: "v4/development/plugins" } }] },
              ],
            },
            {
              label: "Deprecated",
              items: [{ autogenerate: { directory: "v4/deprecated" } }],
            },
          ],
        },
        {
          label: "Noctalia v5",
          items: [
            { label: "Overview", link: "v5/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "v5/getting-started/installation/" },
                { label: "NixOS", link: "v5/getting-started/nixos/" },
                { label: "Running Noctalia", link: "v5/getting-started/running-the-shell/" },
                { label: "FAQ", link: "v5/getting-started/faq/" },
                { label: "Uninstall", link: "v5/getting-started/uninstall/" },
                { label: "Compositor Settings", items: [{ autogenerate: { directory: "v5/compositor-settings" } }] },
                { label: "Keybinds & IPC", items: [{ autogenerate: { directory: "v5/ipc" } }] },
              ],
            },
            {
              label: "Configuration",
              items: [
                { label: "How configuration works", link: "v5/configuration/" },
                { label: "Shell", link: "v5/configuration/shell/" },
                { label: "Date format tokens", link: "v5/configuration/date-format-tokens/" },
              ],
            },
            {
              label: "Bar",
              items: [{ autogenerate: { directory: "v5/bar" } }],
            },
            {
              label: "Dock",
              items: [{ autogenerate: { directory: "v5/dock" } }],
            },
            {
              label: "Launcher",
              items: [{ autogenerate: { directory: "v5/launcher" } }],
            },
            {
              label: "Control Center",
              items: [{ autogenerate: { directory: "v5/control-center" } }],
            },
            {
              label: "Desktop",
              items: [{ autogenerate: { directory: "v5/desktop" } }],
            },
            {
              label: "Theming",
              items: [{ autogenerate: { directory: "v5/theming" } }],
            },
            {
              label: "Services",
              items: [{ autogenerate: { directory: "v5/services" } }],
            },
            {
              label: "Automation",
              items: [{ autogenerate: { directory: "v5/automation" } }],
            },
            {
              label: "Plugins",
              items: [
                { label: "Using Plugins", link: "v5/plugins/" },
                { label: "Official Plugins", link: "v5/plugins/official-plugins/" },
                { label: "Plugin Development", items: [{ autogenerate: { directory: "v5/plugins/development" } }] },
              ],
            },
            {
              label: "Greeter",
              items: [{ autogenerate: { directory: "v5/greeter" } }],
            },
            {
              label: "Templates",
              items: [
                { label: "Official Templates", items: [{ autogenerate: { directory: "v5/templates/official" } }] },
                { label: "Community Templates", items: [{ autogenerate: { directory: "v5/templates/community" } }] },
              ],
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
