import type { SidebarEntry, SidebarGroup } from '@astrojs/starlight/utils/routing/types';

export const PROJECTS = [
  {
    id: 'noctalia',
    label: 'Noctalia',
    description: 'Native shell · v5+',
    href: '/noctalia/',
    sidebarLabel: 'Noctalia',
  },
  {
    id: 'greeter',
    label: 'Noctalia Greeter',
    description: 'greetd greeter',
    href: '/greeter/',
    sidebarLabel: 'Noctalia Greeter',
  },
  {
    id: 'noctalia-shell',
    label: 'Noctalia Shell',
    description: 'Quickshell · v4 legacy',
    href: '/noctalia-shell/',
    sidebarLabel: 'Noctalia Shell',
  },
] as const;

export type ProjectId = (typeof PROJECTS)[number]['id'];
export type Project = (typeof PROJECTS)[number];

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
