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
    "/v4/": "/noctalia-shell-legacy/",
    "/noctalia-shell/": "/noctalia-shell-legacy/",
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
          items: [
            { label: "Overview", link: "greeter/" },
            { label: "Installation", link: "greeter/installation/" },
            { label: "Configuration", link: "greeter/configuration/" },
            { label: "Sync with Noctalia", link: "greeter/sync/" },
            { label: "Displays", link: "greeter/displays/" },
            { label: "Keyboard and cursor", link: "greeter/input/" },
            { label: "Troubleshooting", link: "greeter/troubleshooting/" },
          ],
        },
        {
          label: "Umbriel",
          items: [
            { label: "Umbriel", link: "umbriel/" },
            { label: "Configuration", link: "umbriel/configuration/" },
            { label: "Outputs", link: "umbriel/outputs/" },
            { label: "Workspaces", link: "umbriel/workspaces/" },
            { label: "Layout", link: "umbriel/layout/" },
            { label: "Appearance", link: "umbriel/appearance/" },
            { label: "Animation", link: "umbriel/animation/" },
            { label: "Input", link: "umbriel/input/" },
            { label: "Keybinds", link: "umbriel/keybinds/" },
            { label: "Actions", link: "umbriel/actions/" },
            { label: "Window and Layer Rules", link: "umbriel/rules/" },
            { label: "Scratchpads", link: "umbriel/scratchpads/" },
            { label: "Security", link: "umbriel/security/" },
          ],
        },
        {
          label: "Noctalia Shell",
          items: [
            { label: "Overview", link: "noctalia-shell-legacy/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "noctalia-shell-legacy/getting-started/installation/" },
                { label: "NixOS", link: "noctalia-shell-legacy/getting-started/nixos/" },
                { label: "Running the Shell", link: "noctalia-shell-legacy/getting-started/running-the-shell/" },
                { label: "Compositor Settings", items: [{ autogenerate: { directory: "noctalia-shell-legacy/getting-started/compositor-settings" } }] },
                { label: "Keybinds", items: [{ autogenerate: { directory: "noctalia-shell-legacy/getting-started/keybinds" } }] },
                { label: "FAQ", link: "noctalia-shell-legacy/getting-started/faq/" },
                { label: "Uninstall", link: "noctalia-shell-legacy/getting-started/uninstall/" },
              ],
            },
            {
              label: "Configuration",
              items: [{ autogenerate: { directory: "noctalia-shell-legacy/configuration" } }],
            },
            {
              label: "Theming",
              items: [
                { label: "Basic App Theming", link: "noctalia-shell-legacy/theming/basic-app-theming/" },
                { label: "Program Specific", items: [{ autogenerate: { directory: "noctalia-shell-legacy/theming/program-specific" } }] },
                { label: "User Templates", link: "noctalia-shell-legacy/theming/user-templates/" },
                { label: "User Color Schemes", link: "noctalia-shell-legacy/theming/color-schemes/" },
              ],
            },
            {
              label: "Development",
              items: [
                { label: "Guidelines", link: "noctalia-shell-legacy/development/guidelines/" },
                { label: "IPC", link: "noctalia-shell-legacy/development/ipc/" },
                { label: "Widgets", link: "noctalia-shell-legacy/development/widgets/" },
                { label: "Templates", link: "noctalia-shell-legacy/development/templates/" },
                { label: "Plugins", items: [{ autogenerate: { directory: "noctalia-shell-legacy/development/plugins" } }] },
              ],
            },
            {
              label: "Deprecated",
              items: [{ autogenerate: { directory: "noctalia-shell-legacy/deprecated" } }],
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
