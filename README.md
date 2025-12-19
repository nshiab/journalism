# The Journalism Library

A collection of TypeScript functions for journalistic projects.

The library is available on [JSR](https://jsr.io/@nshiab/journalism) with its
[documentation](https://jsr.io/@nshiab/journalism/doc).

The documentation is also available as the markdown file
[llm.md](https://github.com/nshiab/journalism/blob/main/llm.md), which can be
passed as context to improve the use of the library by AI coding assistants or
agents.

The library is a collection of the following modules. Note that the functions
are tested at the module level.

- [journalism-ai](https://github.com/nshiab/journalism-ai)
- [journalism-climate](https://github.com/nshiab/journalism-climate)
- [journalism-dataviz](https://github.com/nshiab/journalism-dataviz)
- [journalism-finance](https://github.com/nshiab/journalism-finance)
- [journalism-format](https://github.com/nshiab/journalism-format)
- [journalism-geo](https://github.com/nshiab/journalism-geo)
- [journalism-google](https://github.com/nshiab/journalism-google)
- [journalism-statistics](https://github.com/nshiab/journalism-statistics)
- [journalism-web](https://github.com/nshiab/journalism-web)
- [journalism-web-scraping](https://github.com/nshiab/journalism-web-scraping)
- [journalism-extras](https://github.com/nshiab/journalism-extras)

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use this library and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript. You
> might also find the
> [simple-data-analysis library](https://github.com/nshiab/simple-data-analysis)
> interesting.

To install the library, you can use the following commands:

```bash
# DENO
deno install jsr:@nshiab/journalism

# NODE.JS
npx jsr add @nshiab/journalism

# BUN
bunx jsr add @nshiab/journalism
```

If you run your code in a browser, use the `web` entry point:

```js
import { formatNumber } from "@nshiab/journalism/web";
```

If you wish to contribute, please check the
[guidelines](https://github.com/nshiab/journalism/blob/main/CONTRIBUTING.md).
