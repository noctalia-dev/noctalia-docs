
## Documentation source

All documentation in this repository is synchronized from the relevant external Noctalia repositories. This repository is used as the published documentation mirror, so pull requests and issues are disabled here. To propose a documentation change, update the corresponding source repository instead.

## Dependency maintenance

Use Node.js 22.23.4 or newer (required by Astro 7.4.4) and `npm ci` to install the dependency versions recorded in `package-lock.json`. To maintain current dependencies, check `npm outdated`, update direct dependencies to their latest stable releases, and refresh compatible transitive dependencies with `npm update`. Verify upgrades with `npm audit`, `npm run build`, and browser checks of navigation and search.

Satori 0.63.2 still pins vulnerable `fflate` 0.7.3. The scoped `fflate` override in `package.json` selects version 0.8.3 or newer to fix [malformed ZIP64 archive handling](https://github.com/advisories/GHSA-px8p-9vwx-vf98); remove it once Satori no longer pins a vulnerable release. The former `postcss-selector-parser` override is no longer needed: the lockfile resolves patched version 7.1.7 through the upstream dependency range.

Commit and push dependency updates to this repository's `main` branch before deployment. The deployment and content-sync scripts reset the checkout to `origin/main`, discarding uncommitted changes.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

