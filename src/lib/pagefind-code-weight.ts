import type { AstroIntegration } from 'astro';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/**
 * Weight applied to fenced code blocks. Keeps snippets findable (searching a
 * literal command still works) without letting incidental tokens inside
 * samples (`noctalia.log(msg)`, `logout`, shell flags) outrank prose that is
 * actually about the topic.
 */
const CODE_BLOCK_WEIGHT = 0.2;

/** Matches `<pre>` and `<pre …>` but never `<pre-…>`; code blocks only, inline `<code>` keeps full weight. */
const PRE_TAG = /<pre(?=[\s>])(?![^>]*data-pagefind-weight)/g;

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

/**
 * Lowers the Pagefind ranking weight of fenced code blocks in the build output.
 * Runs on `astro:build:generated`, before Starlight indexes `dist/` with
 * Pagefind in `astro:build:done`.
 */
export function pagefindCodeWeight(): AstroIntegration {
  return {
    name: 'noctalia:pagefind-code-weight',
    hooks: {
      'astro:build:generated': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let files = 0;
        let blocks = 0;
        for await (const file of htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          let hits = 0;
          const next = html.replace(PRE_TAG, () => {
            hits++;
            return `<pre data-pagefind-weight="${CODE_BLOCK_WEIGHT}"`;
          });
          if (!hits) continue;
          await writeFile(file, next);
          files++;
          blocks += hits;
        }
        logger.info(`Down-weighted ${blocks} code blocks across ${files} pages for search.`);
      },
    },
  };
}
