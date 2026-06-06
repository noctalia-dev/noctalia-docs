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
              autogenerate: { directory: "v4/getting-started" },
            },
            {
              label: "Configuration",
              autogenerate: { directory: "v4/configuration" },
            },
            {
              label: "Theming",
              autogenerate: { directory: "v4/theming" },
            },
            {
              label: "Development",
              autogenerate: { directory: "v4/development" },
            },
            {
              label: "Deprecated",
              autogenerate: { directory: "v4/deprecated" },
            },
          ],
        },
        {
          label: "Noctalia v5",
          items: [
            {
              label: "Getting started",
              items: [
                { label: "Overview", autogenerate: { directory: "v5/getting-started" } },
                { label: "Keybinds & IPC", autogenerate: { directory: "v5/ipc" },                },
              ],
            },
            {
              label: "Configuration",
              items: [
                {
                  label: "Basics",
                  autogenerate: { directory: "v5/basics" },
                },
                {
                  label: "Bar",
                  autogenerate: { directory: "v5/bar" },
                },
                {
                  label: "Dock",
                  autogenerate: { directory: "v5/dock" },
                },
                {
                  label: "Launcher",
                  autogenerate: { directory: "v5/launcher" },
                },
                {
                  label: "Control Center",
                  autogenerate: { directory: "v5/control-center" },
                },
                {
                  label: "Desktop",
                  autogenerate: { directory: "v5/desktop" },
                },
                {
                  label: "Theming",
                  autogenerate: { directory: "v5/theming" },
                },
                {
                  label: "Services",
                  autogenerate: { directory: "v5/services" },
                },
              ],
            },
            {
              label: "System",
              autogenerate: { directory: "v5/system" },
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
