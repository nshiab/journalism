# The Journalism Library

A collection of TypeScript functions for journalistic projects.

The library is available on [NPM](https://www.npmjs.com/package/journalism) and [JSR](https://jsr.io/@nshiab/journalism).

The documentation can be found on [Github](https://nshiab.github.io/journalism/) and [JSR](https://jsr.io/@nshiab/journalism/doc).

To install, run the relevant command in your terminal

```bash
# DENO
deno install jsr:@nshiab/journalism

# NODE.JS
npm i journalism

# BUN
bun add journalism
```

If you wish to contribute, create an issue explaining what you would like to add, create a branch from the issue, make sure to add tests, import your function in index.ts and then create a pull request. To run a specific test, you can use a command like this one `npx mocha --require ts-node/register ./test/finance/adjustToInflation.test.ts --timeout 10000 -r dotenv/config`. To run all tests, including building the library and generating the docs (in ./test-docs), run `npm run all-tests`.

You might also find [simple-data-analysis](https://github.com/nshiab/simple-data-analysis) and [Code Like a Journalist](https://github.com/nshiab/code-like-a-journalist) interesting.

This repository is maintained by [Nael Shiab](http://naelshiab.com/), computational journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
