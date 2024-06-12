# The Journalism Library

A collection of helper functions written in TypeScrit for journalistic projects.

The library is available on [npm](https://www.npmjs.com/package/journalism). To install, run `npm i journalism` in your terminal.

The documentation can be found [here](https://nshiab.github.io/journalism/).

If you wish to contribute, create an issue explaining what you would like to add, create a branch from the issue, make sure to add tests, import your function in index.ts and then create a pull request. To run a specific test, you can use a command like this one `npx mocha --require ts-node/register ./test/finance/adjustToInflation.test.ts --timeout 10000 -r dotenv/config`. To run all tests, including building the library and generating the docs (in ./test-docs), run `npm run all-tests`.

This repository is maintained by [Nael Shiab](http://naelshiab.com/), senior data producer at [CBC/Radio-Canada](https://cbc.radio-canada.ca/).

You might also find [simple-data-analysis](https://github.com/nshiab/simple-data-analysis) and [Code Like a Journalist](https://github.com/nshiab/code-like-a-journalist) interesting.
