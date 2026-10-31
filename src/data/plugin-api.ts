/**
 * Plugin API metadata is owned by the Noctalia shell repository and copied here by its docs sync:
 * plugin-api.json for the rolling docs, plugin-api/<tag>.json for each archived release.
 * Keep this file limited to the rendering and validation behavior; do not add feature entries here.
 */
import mainMetadata from './plugin-api.json';

export interface PluginApiLevel {
  /** The `plugin_api` value a manifest declares. */
  level: number;
  /** Noctalia release that first shipped this level, or null while it is unreleased. */
  noctaliaVersion: string | null;
  /** Stable key passed to <PluginApiBadge feature="..." />. */
  feature: string;
  /** What the level introduced, for the ledger table. Backticks render as inline code. */
  introduced: string;
}

export interface PluginApiLedger {
  levels: PluginApiLevel[];
  oldestSupported: number;
  current: number;
}

function ledgerFrom(levels: PluginApiLevel[]): PluginApiLedger {
  return {
    levels,
    oldestSupported: Math.min(...levels.map((entry) => entry.level)),
    current: Math.max(...levels.map((entry) => entry.level)),
  };
}

const mainLedger = ledgerFrom(mainMetadata);
const archivedMetadata = import.meta.glob<{ default: PluginApiLevel[] }>('./plugin-api/*.json', {
  eager: true,
});
const archivedPagePattern = /^\/noctalia\/(v[^/]+)\//;

/**
 * Returns the ledger of the release a page belongs to: archived pages under /noctalia/<tag>/ use
 * that release's metadata, every other page uses the rolling one. Throws when an archived release
 * has no metadata so a missing sync fails the build instead of showing another release's levels.
 */
export function pluginApiLedgerFor(pathname: string): PluginApiLedger {
  const tag = archivedPagePattern.exec(pathname)?.[1];
  if (tag === undefined) return mainLedger;
  const metadata = archivedMetadata[`./plugin-api/${tag}.json`];
  if (metadata === undefined) {
    throw new Error(`No plugin API metadata for archived release ${tag}; expected src/data/plugin-api/${tag}.json.`);
  }
  return ledgerFrom(metadata.default);
}

/**
 * Resolves a feature key to its level. Throws on an unknown key so a typo fails the build instead
 * of rendering a silently wrong or empty version marker.
 */
export function pluginApiLevelFor(ledger: PluginApiLedger, feature: string): PluginApiLevel {
  const match = ledger.levels.find((entry) => entry.feature === feature);
  if (match === undefined) {
    const known = ledger.levels.map((entry) => entry.feature).join(', ');
    throw new Error(`Unknown plugin API feature key "${feature}". Known keys: ${known}.`);
  }
  return match;
}
