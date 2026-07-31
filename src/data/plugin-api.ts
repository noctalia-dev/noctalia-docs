/**
 * Single source of truth for plugin API levels.
 *
 * Adding a level means adding one entry here. The ledger table, the supported-range prose, and
 * every inline "requires plugin_api = N" marker all derive from this array, so they cannot drift
 * apart. Render them with <PluginApiTable />, <PluginApiRange /> and <PluginApiBadge />.
 *
 * `kOldestSupportedPluginApiVersion` and `kCurrentPluginApiVersion` in the shell's
 * src/scripting/plugin_api.h are the runtime authority; keep OLDEST_SUPPORTED_PLUGIN_API and the
 * highest level here in step with them.
 */

export interface PluginApiLevel {
  /** The `plugin_api` value a manifest declares. */
  level: number;
  /** Noctalia release that first shipped this level, or null while it is unreleased. */
  noctaliaVersion: string | null;
  /**
   * Stable key a page passes to <PluginApiBadge feature="..." />. Mirrors the matching
   * k<Feature>PluginApiVersion constant in plugin_api.h where one exists.
   */
  feature: string;
  /** What the level introduced, for the ledger table. Backticks render as inline code. */
  introduced: string;
}

export const OLDEST_SUPPORTED_PLUGIN_API = 3;

export const PLUGIN_API_LEVELS: PluginApiLevel[] = [
  {
    level: 3,
    noctaliaVersion: 'v5.0.0-beta.3',
    feature: 'api-declaration',
    introduced: 'Mandatory `plugin_api` compatibility declaration, replacing `min_noctalia`.',
  },
  {
    level: 4,
    noctaliaVersion: 'v5.0.0-beta.4',
    feature: 'http-stream',
    introduced: '`noctalia.httpStream()` for streaming HTTP responses.',
  },
  {
    level: 5,
    noctaliaVersion: 'v5.0.0-beta.4',
    feature: 'drag-and-drop',
    introduced: '`ui.dragSource()` and `ui.dropZone()` for declarative panel drag and drop.',
  },
  {
    level: 6,
    noctaliaVersion: 'v5.0.0-beta.4',
    feature: 'string-map-setting',
    introduced: 'The `string_map` plugin setting type.',
  },
  {
    level: 7,
    noctaliaVersion: 'v5.0.0-beta.4',
    feature: 'allow-insecure-tls',
    introduced: 'The `allow_insecure_tls` HTTP request option.',
  },
  {
    level: 8,
    noctaliaVersion: 'v5.0.0-beta.4',
    feature: 'dismiss-on-outside-click',
    introduced: 'The `dismiss_on_outside_click` panel entry option.',
  },
  {
    level: 9,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'ui-callback-closures',
    introduced: 'Luau closures directly in UI tree callback props.',
  },
  {
    level: 10,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'keyboard-focus',
    introduced: 'The `keyboard_focus` panel entry option.',
  },
  {
    level: 11,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'persistent-panel',
    introduced: 'The `persistent` panel entry option.',
  },
  {
    level: 12,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'system-stats',
    introduced: '`noctalia.systemStats()`, `noctalia.cpuCores()`, and `noctalia.nowMs()`.',
  },
  {
    level: 13,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'panel-capture-keys',
    introduced: 'The `capture_keys` panel entry option and the `onKey` callback.',
  },
  {
    level: 14,
    noctaliaVersion: 'v5.0.0-beta.5',
    feature: 'widget-gesture-actions',
    introduced: 'The `[widget.actions]` entry table, declaring bar gesture defaults.',
  },
  {
    level: 15,
    noctaliaVersion: 'v5.0.0-beta.6',
    feature: 'open-settings',
    introduced: '`noctalia.openSettings()`, opening the settings window at the plugin\'s own settings.',
  },
  {
    level: 16,
    noctaliaVersion: 'v5.0.0-beta.6',
    feature: 'extended-system-stats',
    introduced: 'Per-interface network rates, sample timestamps, and disk mount/stat APIs.',
  },
  {
    level: 17,
    noctaliaVersion: 'v5.0.0-beta.7',
    feature: 'service-lifecycle',
    introduced:
      'Service entries start when the plugin is enabled instead of only at launch, and `onExit(signal, reason)` reports `reload`, `disable`, `uninstall`, or `shutdown`.',
  },
  {
    level: 18,
    noctaliaVersion: 'v5.0.0-beta.7',
    feature: 'panel-frame-tick',
    introduced: '`panel.setNeedsFrameTick(bool)`, delivering `onFrameTick(deltaMs)` to an open panel.',
  },
  {
    level: 19,
    noctaliaVersion: 'v5.0.0-beta.7',
    feature: 'format-time-timezone',
    introduced:
      'Timezone support on `noctalia.formatTime`, `noctalia.isValidTimezone(name)`, and `noctalia.timeFormat()` / `noctalia.dateFormat()` mirroring `[shell].time_format` / `date_format`.',
  },
  {
    level: 20,
    noctaliaVersion: 'v5.0.0-beta.7',
    feature: 'sound',
    introduced: '`noctalia.sound.load()` and `noctalia.sound.play()` for plugin audio.',
  },
  {
    level: 21,
    noctaliaVersion: null,
    feature: 'plugin-ui-props',
    introduced:
      'The `ui.markdown` node, `submitOnEnter` on `ui.input`, and `stickToBottom` / `onScroll` / `scrollToBottomRev` on `ui.scroll`.',
  },
];

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
