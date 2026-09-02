/**
 * Plugin API metadata is owned by the Noctalia shell repository and copied here by its docs sync.
 * Keep this file limited to the rendering and validation behavior; do not add feature entries here.
 */
import pluginApiMetadata from './plugin-api.json';

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

export const PLUGIN_API_LEVELS: PluginApiLevel[] = pluginApiMetadata;
export const OLDEST_SUPPORTED_PLUGIN_API = Math.min(...PLUGIN_API_LEVELS.map((entry) => entry.level));
export const CURRENT_PLUGIN_API = Math.max(...PLUGIN_API_LEVELS.map((entry) => entry.level));

/**
 * Resolves a feature key to its level. Throws on an unknown key so a typo fails the build instead
 * of rendering a silently wrong or empty version marker.
 */
export function pluginApiLevelFor(feature: string): PluginApiLevel {
  const match = PLUGIN_API_LEVELS.find((entry) => entry.feature === feature);
  if (match === undefined) {
    const known = PLUGIN_API_LEVELS.map((entry) => entry.feature).join(', ');
    throw new Error(`Unknown plugin API feature key "${feature}". Known keys: ${known}.`);
  }
  return match;
}
