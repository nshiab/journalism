# Development workflow

- Use descriptive branch names and PR titles without AI agent names. Work on a
  feature branch and reuse the task's existing branch when available.
- Never credit AI agents as authors or co-authors in commits or PRs.
- Prefer existing tools and defaults. Add dependencies, configuration or scripts
  only when the requested work needs them.

## Implementation

Read `package.json` for the runtime requirement, scripts, dependencies and package
exports. Install locked dependencies with `npm ci`.

This package re-exports the journalism libraries. Preserve the main/browser split
in `src/index.ts` and `src/web.ts`. Change individual function implementations in
the owning library; keep implementation helpers and type aliases out of the
public entry points. Define public object types inline when adding an API here.

Use concrete types for known values and validate unknown input. Type assertions
and lint suppressions are prohibited; resolve issues through accurate types,
narrowing or runtime validation.

Test integration across the umbrella's entry points in `test/`. Keep tests
offline; individual libraries own their live service tests.

## Validation and documentation

Run relevant tests while developing, `npm run fix` for automatic fixes, and
`npm run all-tests` before handing off the change. Report checks that cannot run.

Update documentation through source comments, `README.md`, or the documentation
configuration and generator. `scripts/reference.ts` combines both entry points
for TypeDoc, which reads the published dependencies’ declaration comments. Run `npm run docs`; commit generated `docs/`,
`llm.md` and `llms.txt`, and keep `site/` ignored. Do not edit generated files
by hand.

## Releases

Keep the version unchanged during ordinary development. Run `npm run patch`,
`npm run minor` or `npm run major` only for a requested release. Those commands
validate, bump the version, regenerate documentation, commit, tag and push.
The tag triggers npm publication and documentation deployment. Derive documentation
versions and release links automatically from `package.json`.
