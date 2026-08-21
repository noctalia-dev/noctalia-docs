import type { SidebarEntry, SidebarGroup } from '@astrojs/starlight/utils/routing/types';

export interface Project {
  id: string;
  label: string;
  description: string;
  href: string;
  sidebarLabel: string;
  /** Canonical name used in SEO titles; falls back to `label`. */
  displayName?: string;
  /** Header FAQ link; only set for projects with an FAQ page. */
  faqHref?: string;
  /** Archived project; renders the legacy banner in the header. */
  legacy?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'noctalia',
    label: 'Noctalia',
    description: 'Current release · v5+',
    href: '/noctalia/',
    sidebarLabel: 'Noctalia',
    displayName: 'Noctalia v5+',
    faqHref: '/noctalia/getting-started/faq/',
  },
  {
    id: 'greeter',
    label: 'Noctalia Greeter',
    description: 'greetd greeter',
    href: '/greeter/',
    sidebarLabel: 'Noctalia Greeter',
  },
  {
    id: 'umbriel',
    label: 'Umbriel',
    description: 'Wayland compositor',
    href: '/umbriel/',
    sidebarLabel: 'Umbriel',
  },
  {
    id: 'noctalia-shell',
    label: 'Noctalia Shell',
    description: 'Quickshell · v4 legacy',
    href: '/noctalia-shell/',
    sidebarLabel: 'Noctalia Shell',
    displayName: 'Noctalia Shell v4',
    faqHref: '/noctalia-shell/getting-started/faq/',
    legacy: true,
  },
];

export type ProjectId = Project['id'];

export function projectFromPath(pathname: string): Project | undefined {
  return PROJECTS.find(({ href }) => {
    const prefix = href.slice(0, -1);
    return pathname === prefix || pathname.startsWith(href);
  });
}

export function pickProjectSidebarEntries(
  sidebar: SidebarEntry[],
  pathname: string
): SidebarEntry[] {
  const project = projectFromPath(pathname);
  if (!project) return [];

  const group = sidebar.find(
    (entry): entry is SidebarGroup =>
      entry.type === 'group' && entry.label === project.sidebarLabel
  );

  return group?.entries ?? [];
}
