# design-sync notes — film-analogger/frontend

## Repo shape

- No component-library build (`package.json` has no `main`/`module`/`exports`/`types`; `yarn build` runs `react-router build`, a full app build, not a library one). Runs in `shape: package`, no dist/.d.ts — every prop type comes from `dtsPropsFor` (hand-written from the real source), never auto-extracted.
- **Every synced component is a default export** (`export default X`) except the 5 Widgets (`AppLogo`, `FilmCard`, `FilmName`, `IsoChip`, `ProcessChip`), which use named `export const X`. A synth-entry blanket `export * from <every src file>` silently drops every default export (ES modules never re-export `default` through `export *`) — that's why `cfg.entry` points at a hand-written `.design-sync/fixtures/entry.ts` instead, with explicit `export { default as X } from '...'` re-exports for each. **Any component added to `componentSrcMap` that is a default export MUST also get a re-export line in `entry.ts`, or it silently never reaches `window.FilmAnalogger` (build succeeds, preview fails "Element type is invalid").**
- `cfg.entry` (not `cfg.componentSrcMap` alone) is what makes `PKG_DIR` resolvable too — this repo isn't installed under `node_modules/@film-analogger/frontend` (nothing self-installs a workspace package), so without `--entry`/`cfg.entry` the build crashes on `ENOENT .../node_modules/@film-analogger/frontend/package.json` before it even gets to component discovery.

## Providers

- `cfg.provider`: `AppTheme` (the repo's own `src/Theme/Theme.tsx`, wraps `ThemeProvider` + `CssBaseline` + `GlobalStyles`) nested with `MemoryRouter` (from `react-router`, added via `cfg.extraEntries` — bare npm package, not a repo path) for the `Link`-based components (`SideMenu`, `LinkBehavior`, `Footer`... actually Footer's own `Link` is MUI's, not router's, but the provider is harmless to include everywhere).
- **i18next side-effect import**: normally happens once in the app's `root.tsx` (`import 'src/i18n/i18n'`). Without it, every `useTranslation()` call returns raw keys (`"components.footer.copyright"` instead of real text). Fixed by importing `~/i18n/i18n` at the top of `entry.ts`. **If this import is ever removed, every preview silently regresses to raw i18n keys — nothing else will catch it.**
- Nothing in the synced 11 needs Keycloak context — `AppBar`/`UserMenu` (excluded from scope) are the only components coupled to real auth/API data, which is why the user chose to drop them from this sync rather than build a Keycloak fixture.

## Known limitations (accepted, not chasing further)

- **`AppLogo` renders blank in every preview and will also render blank inside claude.ai/design itself** — the real component references `/logodark.svg`, `/logolight.svg`, etc. by absolute URL (served from the app's own `public/` folder at runtime), not as bundled module imports. Nothing outside the running app serves those paths. Graded `needs-work` in `AppLogo.grade.json` and left that way — the user explicitly chose "continue as-is, document the limitation" over changing `AppLogo.tsx` to import the SVGs as modules (which WOULD fix it, `.svg` is already `dataurl`-loaded by esbuild) or fixing it mid-sync. If `AppLogo.tsx` is ever changed to import its assets as modules, re-author `.design-sync/previews/AppLogo.tsx` and re-grade — it should go fully "good" at that point.
- **Known render warn**: `Footer`'s `Default` cell has its first line (copyright) slightly clipped by the `cardMode: column` capture frame height. Cosmetic only, real component unaffected — don't chase on re-sync.
- `SideMenu` uses `MuiDrawer variant="permanent"`, which is `position: fixed` — it escapes a normal card's bounding box entirely (screenshot came back solid-blank, not just small). Fixed by wrapping the preview root in `sx={{ contain: 'layout' }}` (establishes a new containing block for fixed descendants) plus the `cardMode: 'single', viewport: '960x700'` override in config (the Drawer is also `display: none` below MUI's `md` breakpoint = 900px). **Any other component that renders a MUI `Drawer`/anything `position: fixed` will need the same `contain: layout` wrapper.**
- `ProcessChip`'s `C-41` variant has genuinely low text contrast (white "C-41" label over a 7-color rainbow gradient background) — this is the real component's actual design (`ProcessChip.tsx`), not a preview defect.

## Scope

Synced (11): `AppLogo`, `FilmCard`, `FilmName`, `IsoChip`, `ProcessChip` (Widgets); `Footer`, `OpenSource`, `SideMenu` (Layout/Parts); `Error` (tools); `IconComponent`, `LinkBehavior` (Theme/Components).

Deliberately excluded: `AppBar`, `UserMenu` (Layout/Parts) — both pull in live Keycloak auth context and a real (uncached) API fetch (`useCurrentAppUser`). `UserMenu` degrades gracefully without a backend (falls back to the Keycloak token's fields, the fetch's rejection is already caught), so it's not unrenderable — just judged less valuable as a synced "pure" design-system piece than the rest. Revisit if the user wants the full AppBar composed.

## Re-sync risks

- The `entry.ts` re-export list and `componentSrcMap` must be kept in sync by hand — nothing enforces that a new default-exported component added to one is added to the other (see "Repo shape" above).
- `AppLogo`'s blank preview is a standing, accepted gap — a re-sync will keep flagging it `needs-work` unless the underlying component changes (see "Known limitations").
- Real translated text captured during grading was in **French** (the headless browser's `i18next-browser-languagedetector` picked up the environment locale) — if the grading environment's locale ever changes, cell screenshots will show English text instead. Not a problem, just don't be surprised by a language mismatch against these notes.
- No `docsDir` is configured — all 11 `.prompt.md` files are synthesized from `.d.ts` + previews (no real per-component doc source in this repo). Fine as-is.
