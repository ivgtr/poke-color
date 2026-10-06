# PokéColor
[![Twitter Follow](https://img.shields.io/twitter/follow/mawaru_hana?style=social)](https://twitter.com/mawaru_hana) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![CI](https://github.com/ivgtr/poke-color/workflows/CI/badge.svg)](https://github.com/ivgtr/poke-color)  

Have you ever wanted to use that Pokémon color?  
Browse and copy the color codes of your favorite Pokémon by running the app locally.

## Development

Use Node.js 24.11 or newer in the Node 24 LTS line (`nvm use`).

- `npm ci` installs the locked dependencies
- `npm run dev` serves the app on port 24340
- `npm test` checks the 151 Pokémon records
- `npm run build` runs ESLint and TypeScript checks, then generates `dist/`
- `npm audit` checks the full dependency tree

The hosted site has been retired. CI runs tests, a dependency audit, lint, type
checks, and a static build on pull requests and pushes to `master`.
Automatic deployment is disabled; `dist/` remains available for local preview
with `npm start` after building.

The app now uses Vite, Vue 3, and Tailwind CSS 4. Supported browsers are
Chrome 111+, Safari 16.4+, and Firefox 128+. The pre-rendered color data, hover preview,
copy notifications, and offline PWA are retained.

Optional analytics uses a Google Analytics 4 measurement ID (`GA_KEY=G-...`
in `.env` at build time). Legacy `UA-...` IDs are no longer supported by Google
and are not loaded; replace one with your own GA4 ID if analytics is required.
No analytics is loaded when `GA_KEY` is unset.

`npm run config` refreshes the checked-in colors from the existing Google Sheet.
It requires the existing, git-ignored `sa.env.json` service-account file and uses
read-only Sheets access. Normal development and builds use the checked-in JSON
and do not require credentials.

## License
MIT ©[ivgtr](https://github.com/ivgtr)  
Created by ©[ivgtr](https://github.com/ivgtr), but Pokémon and Pokémon character names are trademarks of Nintendo.