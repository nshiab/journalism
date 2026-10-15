# The Journalism Library

A collection of TypeScript functions for journalistic projects.

The library is maintained by [Nael Shiab](https://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use this library and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript. You
> might also find
> [simple-data-analysis](https://github.com/nshiab/simple-data-analysis) useful.

## Installation

Requires **Node.js 24.21.0 or later** and ES modules.

```sh
npm install @nshiab/journalism
```

```ts
import { createDirectory } from "@nshiab/journalism";

createDirectory("data");
```

For browser-compatible functions, import from `@nshiab/journalism/web`.

To start a data project with folders, configuration and documentation for AI
agents, run:

```sh
npx @nshiab/setup-data-project
```

## Libraries

The umbrella combines these libraries, which can also be installed individually.

- [journalism-ai](https://github.com/nshiab/journalism-ai) — [Documentation](https://nshiab.github.io/journalism-ai/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-ai)
- [journalism-climate](https://github.com/nshiab/journalism-climate) — [Documentation](https://nshiab.github.io/journalism-climate/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-climate)
- [journalism-dataviz](https://github.com/nshiab/journalism-dataviz) — [Documentation](https://nshiab.github.io/journalism-dataviz/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-dataviz)
- [journalism-extras](https://github.com/nshiab/journalism-extras) — [Documentation](https://nshiab.github.io/journalism-extras/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-extras)
- [journalism-finance](https://github.com/nshiab/journalism-finance) — [Documentation](https://nshiab.github.io/journalism-finance/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-finance)
- [journalism-format](https://github.com/nshiab/journalism-format) — [Documentation](https://nshiab.github.io/journalism-format/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-format)
- [journalism-geo](https://github.com/nshiab/journalism-geo) — [Documentation](https://nshiab.github.io/journalism-geo/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-geo)
- [journalism-google](https://github.com/nshiab/journalism-google) — [Documentation](https://nshiab.github.io/journalism-google/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-google)
- [journalism-statistics](https://github.com/nshiab/journalism-statistics) — [Documentation](https://nshiab.github.io/journalism-statistics/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-statistics)
- [journalism-web](https://github.com/nshiab/journalism-web) — [Documentation](https://nshiab.github.io/journalism-web/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-web)
- [journalism-web-scraping](https://github.com/nshiab/journalism-web-scraping) — [Documentation](https://nshiab.github.io/journalism-web-scraping/) · [npm](https://www.npmjs.com/package/@nshiab/journalism-web-scraping)

## Documentation

- [Documentation](https://nshiab.github.io/journalism/)
- [llms.txt — Documentation index for AI agents](https://nshiab.github.io/journalism/llms.txt)
- [llm.md — Complete Markdown reference](https://nshiab.github.io/journalism/llm.md),
  for AI assistants or offline reading
- [npm package](https://www.npmjs.com/package/@nshiab/journalism)

See [CONTRIBUTING.md](https://github.com/nshiab/journalism/blob/main/CONTRIBUTING.md)
for development commands.
