## Wrapping and setup

Every component needs the app's `AppTheme` wrapper (from this bundle) or it renders with MUI's default (unbranded) theme:

```tsx
<AppTheme>
  <FilmCard film={film} />
</AppTheme>
```

`AppTheme` applies `ThemeProvider` with the app's custom palette/typography, plus `CssBaseline`. Components that render a link (`SideMenu`, `LinkBehavior`, and anything using `component={LinkBehavior}`) also need a router context — wrap with `MemoryRouter` (from `react-router`) inside `AppTheme`. Without it, `Link`/`useHref` throw.

All user-facing text goes through i18next (`useTranslation()` + `t('key')`) — every component assumes i18next is already initialized app-wide (it is, in the real app). No extra setup needed when composing inside this repo; only relevant if reusing a component in total isolation.

## Styling idiom

No utility-class system and no static token stylesheet — this is MUI v7 + Emotion (CSS-in-JS). Style via:
- MUI's `sx` prop with theme-aware values (`sx={{ color: 'text.secondary', bgcolor: 'background.paper' }}`) — reach for theme slots (`text.primary`, `text.secondary`, `background.paper`, `divider`) over raw colors so components stay theme- and dark-mode-aware.
- MUI component props for variants (`variant="outlined"`, `color="secondary"`, `size="small"`), not custom classes.
- One deliberate exception: **brand/entity colors are per-instance data, not theme tokens.** `Film`, `Manufacturer`, and `Chemistry` records carry their own `primaryColor`/`secondaryColor`/`tertiaryColor` hex strings from the API, applied directly via `sx` (see `FilmName`, `FilmCard`). Don't theme these — pass them through as plain hex props.
- Chips that encode a domain value (film process, ISO speed) pick their own background color from a fixed lookup keyed on that value (see `ProcessChip`/`IsoChip`) — reuse that pattern (a `switch`/threshold table returning `sx`) for any new domain-coded badge, rather than inventing a new color scale.

## Where the truth lives

`styles.css` in this bundle is a self-styling stub (CSS-in-JS ships no static sheet) — there are no tokens/classes to grep there; the actual palette/typography source (`Theme/themePrimitives.ts`, `Theme/Customizations/*`) isn't part of this sync, only `AppTheme` itself (the compiled provider) is. For a given component's own prop shape and realistic usage, read its `<Name>.prompt.md` and `<Name>.d.ts` — those ARE shipped and are the authoritative per-component reference here.

## Build snippet

```tsx
<AppTheme>
  <MemoryRouter>
    <Stack direction="row" spacing={1}>
      <FilmCard film={film} />
      <FilmCard film={otherFilm} />
    </Stack>
  </MemoryRouter>
</AppTheme>
```

`Stack`/`Grid` for layout glue (as the app itself does — see `FilmCard`'s composition of `FilmName` + `ProcessChip` + `IsoChip` inside a `Stack`), not custom flex CSS.
