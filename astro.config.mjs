// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";
import { pagefindCodeWeight } from "./src/lib/pagefind-code-weight";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.noctalia.dev",
  vite: {
    logLevel: "error",
  },
  integrations: [
    pagefindCodeWeight(),
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
      pagefind: {
        ranking: {
          // "logs" should not rank "logout"/"logo"/"logging" pages as highly as
          // pages containing the term itself.
          termSimilarity: 3.0,
          // A page repeating a term dozens of times (reference tables, IPC
          // command lists) saturates quickly instead of dominating the results.
          termSaturation: 0.8,
          // Long reference pages stay competitive with short widget stubs.
          pageLength: 0.6,
          metaWeights: {
            // A title match is the strongest signal we have about intent.
            title: 8.0,
            // Breadcrumb and project name are display-only; they must not drag
            // every page of a section or project into its own name's results.
            breadcrumb: 0.0,
            project: 0.0,
          },
        },
      },
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
                { label: "Secret Service & keyrings", link: "noctalia/configuration/secret-service/" },
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
                { label: "Community Templates", link: "https://github.com/noctalia-dev/community-templates" },
              ],
            },
          ],
        },
        {
          label: "Noctalia Greeter",
          items: [
            { label: "Overview", link: "greeter/" },
            { label: "Installation", link: "greeter/installation/" },
            { label: "Building from source", link: "greeter/building-from-source/" },
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
            { label: "Installation", link: "umbriel/installation/" },
            { label: "Configuration", link: "umbriel/configuration/" },
            { label: "Outputs", link: "umbriel/outputs/" },
            { label: "Game streaming", link: "umbriel/streaming/" },
            { label: "Keybinds", link: "umbriel/keybinds/" },
            { label: "Actions", link: "umbriel/actions/" },
            { label: "IPC", link: "umbriel/ipc/" },
            { label: "Input", link: "umbriel/input/" },
            { label: "Appearance", link: "umbriel/appearance/" },
            { label: "Animation", link: "umbriel/animation/" },
            { label: "Effects", link: "umbriel/effects/" },
            { label: "Layout", link: "umbriel/layout/" },
            { label: "Workspaces", link: "umbriel/workspaces/" },
            { label: "Workspaces Overview", link: "umbriel/workspaces-overview/" },
            { label: "Window Rules", link: "umbriel/window-rules/" },
            { label: "Layer Rules", link: "umbriel/layer-rules/" },          
            { label: "Scratchpads", link: "umbriel/scratchpads/" },
            { label: "Security", link: "umbriel/security/" },
          ],
        },
        {
          label: "Luciole",
          items: [
            { label: "Luciole", link: "luciole/" },
            { label: "Installation", link: "luciole/installation/" },
            { label: "Browsing", link: "luciole/browsing/" },
            { label: "Configuration", link: "luciole/configuration/" },
            { label: "File operations", link: "luciole/file-operations/" },
            { label: "Custom scripts", link: "luciole/scripts/" },
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
