# How to contribute

Issues, questions and contributions are welcome in the
[GitHub repository](https://github.com/nshiab/journalism).

Use Node.js 24.21.0 or later. Fork or clone the repository, create a branch,
then install the locked development dependencies:

```sh
npm ci
```

This umbrella package re-exports the journalism libraries through `src/index.ts`
and `src/web.ts`. Implement changes to individual functions in their owning
library, then update the dependency here. Add integration tests in `test/` when
changing the umbrella's exports.

| Command                              | Purpose                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| `vp test`                            | Run all Vitest tests once                                                        |
| `vp test watch test/exports.test.ts` | Watch the umbrella integration tests                                             |
| `npm run fix`                        | Fix formatting and automatically fixable lint issues                             |
| `npm run all-tests`                  | Check formatting, lint and types; run tests; build the package and documentation |

If `vp` is not installed globally, use `npx vp` to run the project's local version.

The website in `site/`, Markdown pages in `docs/`, and root `llm.md` and
`llms.txt` files are generated automatically. Update source documentation or
`README.md`, then run `npm run docs`. Commit `docs/`, `llm.md` and `llms.txt`;
keep `site/` ignored.

Run `npm run all-tests` before opening a pull request. Explain the behavior
changed and any relevant test results in your PR.
