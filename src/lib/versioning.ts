import type { SidebarEntry, SidebarGroup } from '@astrojs/starlight/utils/routing/types';

/** Sidebar group labels in astro.config - keep in sync with filter logic (ASCII `-` only) */
export const SIDEBAR_GROUP_V4 = 'Noctalia v4';
export const SIDEBAR_GROUP_V5 = 'Noctalia v5';

export function isV5Path(pathname: string): boolean {
  return pathname === '/v5' || pathname.startsWith('/v5/');
}

/**
 * Starlight's sidebar is two top-level groups (v4 docs, v5 docs). When label strings drift
 * from constants, a strict match would fall back to the raw sidebar and show BOTH groups.
 * We always return exactly one group's entries.
 */
export function pickVersionSidebarEntries(
  sidebar: SidebarEntry[],
  pathname: string
): SidebarEntry[] {
  const wantV5 = isV5Path(pathname);
  const groups = sidebar.filter((e): e is SidebarGroup => e.type === 'group');

  const byExact = groups.find((g) =>
    wantV5 ? g.label === SIDEBAR_GROUP_V5 : g.label === SIDEBAR_GROUP_V4
  );
  if (byExact) return byExact.entries;

  const byPrefix = groups.find((g) =>
    wantV5 ? g.label.startsWith('Noctalia v5') : g.label.startsWith('Noctalia v4')
  );
  if (byPrefix) return byPrefix.entries;

  // Order in astro.config: [0] = v4 line, [1] = v5 line
  if (groups.length >= 2) {
    return wantV5 ? groups[1].entries : groups[0].entries;
  }
  if (groups.length === 1) {
    return groups[0].entries;
  }
  return sidebar;
}
