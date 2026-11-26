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
            { label: "Overview", link: "umbriel/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "umbriel/installation/" },
                { label: "Building from source", link: "umbriel/building/" },
                { label: "Getting started", link: "umbriel/getting-started/" },
              ],
            },
            {
              label: "Layouts",
              items: [
                { label: "Choosing a layout", link: "umbriel/layout/" },
                { label: "Scrolling", link: "umbriel/layout-scrolling/" },
                { label: "Dwindle", link: "umbriel/layout-dwindle/" },
                { label: "Master", link: "umbriel/layout-master/" },
                { label: "Stacking", link: "umbriel/layout-stacking/" },
              ],
            },
            {
              label: "Windows and workspaces",
              items: [
                { label: "Window sizing and states", link: "umbriel/window-states/" },
                { label: "Tab groups", link: "umbriel/tab-groups/" },
                { label: "Workspaces", link: "umbriel/workspaces/" },
                { label: "Workspaces overview", link: "umbriel/workspaces-overview/" },
                { label: "Scratchpads", link: "umbriel/scratchpads/" },
              ],
            },
            {
              label: "Displays and input",
              items: [
                { label: "Outputs", link: "umbriel/outputs/" },
                { label: "HDR, VRR, and tearing", link: "umbriel/display-features/" },
                { label: "Input devices", link: "umbriel/input/" },
                { label: "Pointer and focus", link: "umbriel/pointer-and-focus/" },
                { label: "Keybinds", link: "umbriel/keybinds/" },
                { label: "Game streaming", link: "umbriel/streaming/" },
              ],
            },
            {
              label: "Look and feel",
              items: [
                { label: "Appearance", link: "umbriel/appearance/" },
                { label: "Title bars", link: "umbriel/title-bars/" },
                { label: "Animation", link: "umbriel/animation/" },
                { label: "Effects", link: "umbriel/effects/" },
                { label: "Layer rules", link: "umbriel/layer-rules/" },
              ],
            },
            {
              label: "Window rules",
              items: [
                { label: "Overview", link: "umbriel/window-rules/" },
                { label: "Placement", link: "umbriel/window-rules-placement/" },
                { label: "Appearance", link: "umbriel/window-rules-appearance/" },
                { label: "Behavior", link: "umbriel/window-rules-behavior/" },
              ],
            },
            {
              label: "Reference",
              items: [
                { label: "Configuration", link: "umbriel/configuration/" },
                { label: "Actions", link: "umbriel/actions/" },
                { label: "IPC", link: "umbriel/ipc/" },
                { label: "Security", link: "umbriel/security/" },
              ],
            },
            { label: "Troubleshooting", link: "umbriel/troubleshooting/" },
          ],
        },
        {
          label: "Luciole",
          items: [
            { label: "Overview", link: "luciole/" },
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "luciole/installation/" },
                { label: "Building from source", link: "luciole/building/" },
                { label: "Getting started", link: "luciole/getting-started/" },
                { label: "File picker", link: "luciole/file-picker/" },
              ],
            },
            {
              label: "Basics",
              items: [
                { label: "Navigation", link: "luciole/navigation/" },
                { label: "Views", link: "luciole/views/" },
                { label: "Tabs and split view", link: "luciole/tabs-and-windows/" },
                { label: "Sidebar and drives", link: "luciole/sidebar/" },
                { label: "Preview and Properties", link: "luciole/preview-and-properties/" },
              ],
            },
            {
              label: "Files",
              items: [
                { label: "File operations", link: "luciole/file-operations/" },
                { label: "Undo and redo", link: "luciole/undo-redo/" },
                { label: "Trash", link: "luciole/trash/" },
                { label: "Archives", link: "luciole/archives/" },
                { label: "Opening files", link: "luciole/opening-files/" },
                { label: "Custom scripts", link: "luciole/scripts/" },
              ],
            },
            {
              label: "Network",
              items: [{ label: "Network folders", link: "luciole/network/" }],
            },
            {
              label: "Customize",
              items: [
                { label: "Settings", link: "luciole/settings/" },
                { label: "Configuration reference", link: "luciole/configuration/" },
                { label: "Keyboard shortcuts", link: "luciole/keybinds/" },
              ],
            },
            { label: "Troubleshooting", link: "luciole/troubleshooting/" },
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
