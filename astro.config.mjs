// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: "https://noctalia.dev",
  vite: {
    logLevel: "error",
  },
  redirects: {
    /** Default landing (v4 = current production shell docs) */
    "/": "/v4/",
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
                {
                  label: "Installation",
                  link: "v4/getting-started/installation/",
                },
                { label: "NixOS", link: "v4/getting-started/nixos/" },
                {
                  label: "Running the Shell",
                  link: "v4/getting-started/running-the-shell/",
                },
                {
                  label: "Compositor Settings",
                  items: [
                    {
                      label: "Niri",
                      link: "v4/getting-started/compositor-settings/niri/",
                    },
                    {
                      label: "Hyprland",
                      link: "v4/getting-started/compositor-settings/hyprland/",
                    },
                  ],
                },
                {
                  label: "Keybinds",
                  items: [
                    { label: "Overview", link: "v4/getting-started/keybinds/" },
                    {
                      label: "Core & Navigation",
                      link: "v4/getting-started/keybinds/core-and-navigation/",
                    },
                    {
                      label: "System Controls",
                      link: "v4/getting-started/keybinds/system-controls/",
                    },
                    {
                      label: "Interface & Plugins",
                      link: "v4/getting-started/keybinds/interface-and-plugins/",
                    },
                  ],
                },
                { label: "FAQ", link: "v4/getting-started/faq/" },
                { label: "Uninstall", link: "v4/getting-started/uninstall/" },
              ],
            },
            {
              label: "Configuration",
              autogenerate: { directory: "v4/configuration" },
            },
            {
              label: "Theming",
              items: [
                {
                  label: "Basic App Theming",
                  link: "v4/theming/basic-app-theming/",
                },
                {
                  label: "Program Specific",
                  autogenerate: { directory: "v4/theming/program-specific" },
                },
                { label: "User Templates", link: "v4/theming/user-templates/" },
                { label: "User Color Schemes", link: "v4/theming/color-schemes/" },
              ],
            },
            {
              label: "Development",
              items: [
                { label: "Guidelines", link: "v4/development/guideline/" },
                { label: "IPC", link: "v4/development/ipc/" },
                { label: "Widgets", link: "v4/development/widget/" },
                { label: "Templates", link: "v4/development/templates/" },
                {
                  label: "Plugins",
                  autogenerate: { directory: "v4/development/plugins" },
                },
              ],
            },
            {
              label: "Deprecated",
              items: [
                {
                  label: "Systemd Startup",
                  link: "v4/deprecated/systemd-startup/",
                },
              ],
            },
          ],
        },
        {
          label: "Noctalia v5",
          items: [
            {
              label: "Getting started",
              items: [
                { label: "Installation", link: "v5/getting-started/installation/"},
                { label: "NixOS", link: "v5/getting-started/nixos/"},
                { label: "Running Noctalia", link: "v5/getting-started/running-the-shell/"},
                {
                  label: "Compositor Settings",
                  items: [
                    {
                      label: "Niri",
                      link: "v5/getting-started/compositor-settings/niri/",
                    },
                    {
                      label: "Hyprland",
                      link: "v5/getting-started/compositor-settings/hyprland/",
                    },
                    {
                      label: "Sway / Scroll",
                      link: "v5/getting-started/compositor-settings/sway-scroll/",
                    },
                    {
                      label: "Mango",
                      link: "v5/getting-started/compositor-settings/mango/",
                    },
                    {
                      label: "Labwc",
                      link: "v5/getting-started/compositor-settings/labwc/",
                    },
                  ],
                },
                {
                  label: "Keybinds & IPC",
                  items: [
                    { label: "Overview", link: "v5/ipc/" },
                    { label: "Shell & UI", link: "v5/ipc/shell-and-ui/" },
                    { label: "System Controls", link: "v5/ipc/system-controls/" },
                  ],
                },
                { label: "FAQ", link: "v5/getting-started/faq/" },
                { label: "Uninstall", link: "v5/getting-started/uninstall"}
              ],
            },
            { 
              label: "Configuration",
              items: [
                {
                  label: "Basics",
                  items: [
                    { label: "How Configuration Works", link: "v5/configuration/" },
                    { label: "Shell", link: "v5/shell/" },
                    { label: "Date Format Tokens", link: "v5/configuration/date-format-tokens/" },
                  ],
                },
                {
                  label: "Bar",
                  items: [
                    { label: "Bars", link: "v5/bar/" },
                    { label: "Widgets", link: "v5/bar/widgets/" },
                    { label: "Scripted Widgets", link: "v5/bar/scripted-widgets/" },
                  ],
                },
                {
                  label: "Dock",
                  items: [
                    { label: "Dock", link: "v5/dock/" },
                  ],
                },
                {
                  label: "Launcher",
                  items: [
                    { label: "Launcher", link: "v5/launcher/" },
                  ],
                },
                {
                  label: "Control Center",
                  items: [
                    { label: "Control Center", link: "v5/control-center/" },
                  ],
                },
                {
                  label: "Desktop",
                  items: [
                    { label: "Desktop Widgets", link: "v5/desktop/widgets/" },
                    { label: "Wallpaper & Backdrop", link: "v5/desktop/wallpaper/" },
                  ],
                },
                {
                  label: "Theming",
                  items: [
                    { label: "Theme", link: "v5/theming/" },
                    { label: "Palette", link: "v5/theming/palette/" },
                    { label: "App Theming", link: "v5/theming/app-theming/" },
                    { label: "Template Reference", link: "v5/theming/templates/" },
                  ],
                },
                {
                  label: "Services",
                  items: [
                    { label: "Audio", link: "v5/services/audio/" },
                    { label: "Battery", link: "v5/services/battery/" },
                    { label: "Brightness", link: "v5/services/brightness/" },
                    { label: "Calendar", link: "v5/services/calendar/" },
                    { label: "Idle", link: "v5/services/idle/" },
                    { label: "Location", link: "v5/services/location/" },
                    { label: "Night Light", link: "v5/services/night-light/" },
                    { label: "Notifications", link: "v5/services/notifications/" },
                    { label: "System Monitor", link: "v5/services/system-monitor/" },
                    { label: "Weather", link: "v5/services/weather/" },
                  ],
                },
              ],
            },
            {
              label: "System",
              items: [
                {
                  label: "Network",
                  items: [
                    { label: "WpaSupplicant", link: "v5/getting-started/network/wpa_supplicant/" },
                  ],
                },
              ],
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
