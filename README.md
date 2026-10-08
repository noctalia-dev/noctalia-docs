
## Documentation source

All documentation in this repository is synchronized from the relevant external Noctalia repositories. This repository is used as the published documentation mirror, so pull requests and issues are disabled here. To propose a documentation change, update the corresponding source repository instead.

## Dependency maintenance

Use Node.js 22.12.0 or newer and `npm ci` to install the dependency versions recorded in `package-lock.json`. Run `npm audit` after dependency updates and `npm run build` to verify the documentation build.

The scoped `postcss-selector-parser` override in `package.json` keeps Expressive Code's `postcss-nested` dependency on a version patched for [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf). Remove the override once the upstream dependency resolves to version 7.1.6 or newer without it. Avoid `npm audit fix --force`: its proposed Starlight downgrade is not a compatible security upgrade.

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

