import type {
  SidebarEntry,
  SidebarGroup,
  SidebarLink,
} from '@astrojs/starlight/utils/routing/types';

export interface Project {
  id: string;
  label: string;
  description: string;
  href: string;
  /** Route prefix used to match pages belonging to this project; defaults to `href`. */
  pathPrefix?: string;
  sidebarLabel: string;
  /** Canonical name used in SEO titles; falls back to `label`. */
  displayName?: string;
  /** Header FAQ link; only set for projects with an FAQ page. */
  faqHref?: string;
  /** Archived project; renders the legacy banner in the header. */
  legacy?: boolean;
}

export interface VersionEntry {
  version: string;
  tag: string;
  label: string;
  path: string;
  releaseDate?: string;
  commit?: string;
  status: string;
  isLatest: boolean;
  isDefault?: boolean;
}

const versionsModules = import.meta.glob<{ default: VersionEntry[] }>('../data/versions.json', {
  eager: true,
});
export const NOCTALIA_VERSIONS: readonly VersionEntry[] =
  versionsModules['../data/versions.json']?.default ?? [];

export const LATEST_NOCTALIA_VERSION: VersionEntry | undefined = NOCTALIA_VERSIONS.find(
  (versionEntry) => versionEntry.isLatest
);

const defaultNoctaliaHref = LATEST_NOCTALIA_VERSION?.path ?? '/noctalia/';

export const PROJECTS: readonly Project[] = [
  {
    id: 'noctalia',
    label: 'Noctalia',
    description: 'Current release · v5+',
    href: defaultNoctaliaHref,
    pathPrefix: '/noctalia/',
    sidebarLabel: 'Noctalia',
    displayName: 'Noctalia v5+',
    faqHref: `${defaultNoctaliaHref}getting-started/faq/`,
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
    href: '/noctalia-shell-legacy/',
    sidebarLabel: 'Noctalia Shell',
    displayName: 'Noctalia Shell Legacy v4',
    faqHref: '/noctalia-shell-legacy/getting-started/faq/',
    legacy: true,
  },
];

export type ProjectId = Project['id'];

const noctaliaDocFiles = import.meta.glob('../content/docs/noctalia/**/*.mdx');
export const AVAILABLE_NOCTALIA_ROUTES: ReadonlySet<string> = new Set(
  Object.keys(noctaliaDocFiles).map((filePath) => {
    const relativeRoute = filePath
      .replace(/^\.\.\/content\/docs/, '')
      .replace(/\.mdx$/, '')
      .replace(/\/index$/, '');
    return `${relativeRoute}/`;
  })
);

export function resolveNoctaliaVersionHref(
  currentPathname: string,
  targetVersionPath: string
): string {
  const subRoute = currentPathname
    .replace(/^\/noctalia\/v[^/]+\/?/, '')
    .replace(/^\/noctalia\/?/, '');
  if (!subRoute) return targetVersionPath;

  const candidateHref = `${targetVersionPath}${subRoute}`.replace(/\/+$/, '') + '/';
  if (AVAILABLE_NOCTALIA_ROUTES.has(candidateHref)) {
    return candidateHref;
  }
  return targetVersionPath;
}

export function projectFromPath(pathname: string): Project | undefined {
  return PROJECTS.find(({ href, pathPrefix }) => {
    const matchHref = pathPrefix ?? href;
    const prefix = matchHref.slice(0, -1);
    return pathname === prefix || pathname.startsWith(matchHref);
  });
}

export function noctaliaVersionFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/noctalia\/(v[^/]+)(?:\/|$)/);
  return match?.[1];
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

export function remapNoctaliaSidebarEntries(
  entries: SidebarEntry[],
  pathname: string,
  activeVersionPrefix: string
): SidebarEntry[] {
  if (!activeVersionPrefix) return entries;
  return entries.flatMap((entry): SidebarEntry[] => {
    if (entry.type === 'link') {
      if (!entry.href.startsWith('/noctalia/')) {
        return [entry];
      }
      const rewrittenHref = entry.href.replace(/^\/noctalia\//, activeVersionPrefix);
      const normalizedHref = rewrittenHref.endsWith('/') ? rewrittenHref : `${rewrittenHref}/`;
      if (!AVAILABLE_NOCTALIA_ROUTES.has(normalizedHref)) {
        return [];
      }
      return [
        {
          ...entry,
          href: rewrittenHref,
          isCurrent: pathname === rewrittenHref || pathname === rewrittenHref.replace(/\/$/, ''),
        },
      ];
    }
    if (entry.type === 'group') {
      const remappedEntries = remapNoctaliaSidebarEntries(
        entry.entries,
        pathname,
        activeVersionPrefix
      );
      if (remappedEntries.length === 0) {
        return [];
      }
      return [
        {
          ...entry,
          entries: remappedEntries,
        },
      ];
    }
    return [entry];
  });
}

export function paginationFromNoctaliaSidebar(
  sidebar: SidebarEntry[],
  pathname: string
): { prev?: SidebarLink; next?: SidebarLink } {
  const versionTag = noctaliaVersionFromPath(pathname);
  if (!versionTag) return {};

  const remapped = remapNoctaliaSidebarEntries(
    pickProjectSidebarEntries(sidebar, pathname),
    pathname,
    `/noctalia/${versionTag}/`
  );
  const links: SidebarLink[] = [];
  const collectLinks = (entries: SidebarEntry[]) => {
    for (const entry of entries) {
      if (entry.type === 'link') {
        if (entry.href.startsWith('/noctalia/')) {
          links.push(entry);
        }
      } else if (entry.type === 'group') {
        collectLinks(entry.entries);
      }
    }
  };
  collectLinks(remapped);

  const currentIndex = links.findIndex((link) => link.isCurrent);
  if (currentIndex === -1) return {};
  return {
    prev: currentIndex > 0 ? links[currentIndex - 1] : undefined,
    next: currentIndex + 1 < links.length ? links[currentIndex + 1] : undefined,
  };
}

/**
 * Sidebar path to a page, e.g. `Configuration › Bar`, used as the search
 * result breadcrumb. Empty for pages absent from the sidebar.
 */
export function breadcrumbFromSidebar(sidebar: SidebarEntry[], pathname: string): string {
  const trail: string[] = [];
  const canonicalPath = pathname.replace(/^\/noctalia\/v[^/]+(\/|$)/, '/noctalia$1');
  const trimmedCanonicalPath = canonicalPath.replace(/\/$/, '');

  const walk = (entries: SidebarEntry[], ancestors: string[]): boolean => {
    for (const entry of entries) {
      if (entry.type === 'group') {
        if (walk(entry.entries, [...ancestors, entry.label])) return true;
      } else if (
        entry.isCurrent ||
        entry.href === canonicalPath ||
        entry.href.replace(/\/$/, '') === trimmedCanonicalPath
      ) {
        trail.push(...ancestors);
        return true;
      }
    }
    return false;
  };

  walk(pickProjectSidebarEntries(sidebar, pathname), []);
  return trail.join(' › ');
}
