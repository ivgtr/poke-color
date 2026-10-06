# PokéColor

Color cards inspired by the original 151 Pokémon. Hover to preview a color and
click to copy its hex code.

## Development

Use Node.js 24.11 or newer in the Node 24 LTS line (`nvm use`).

- `npm ci` installs the locked dependencies
- `npm run dev` serves the app on port 24340
- `npm test` checks the 151 Pokémon records
- `npm run build` runs ESLint and TypeScript checks, then generates `dist/`
- `npm start` previews the build on port 24340

Open http://localhost:24340. Local development uses the checked-in color data;
no credentials or environment variables are required.

## License

[MIT](LICENSE) © [ivgtr](https://github.com/ivgtr)

Pokémon and Pokémon character names are trademarks of Nintendo.
