# Film Analogger Frontend

## Tech Stack

- **Framework**: React 19 + React Router 7 (SPA mode, SSR disabled)
- **Language**: TypeScript (strict mode)
- **UI Library**: MUI (Material UI) v7 with Emotion for styling
- **Build Tool**: Vite 7
- **Package Manager**: Yarn 4 (Berry)
- **i18n**: i18next + react-i18next (locales: `en`, `fr`)
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Linting**: ESLint 10 + Prettier + Husky + lint-staged + commitlint (conventional commits)

## Commands

All commands run from the `frontend/` directory.

```bash
yarn dev              # Start dev server (port 3000)
yarn build            # Production build
yarn start            # Serve production build
yarn test             # Run unit tests (vitest)
yarn test:coverage    # Run unit tests with coverage
yarn typecheck        # Type check (generates react-router types first)
yarn lint             # Lint and fix (with cache)
yarn pw               # Run Playwright e2e tests
yarn pw:ui            # Run Playwright in UI mode
yarn i18n:check       # Check i18n key completeness
```

## Project Structure

```
src/
  root.tsx                  # App root (entry point)
  routes.ts                 # Route definitions (React Router)
  routes/
    dashboard/              # Main app pages (Home, Settings, Dashboard layout)
    errors/                 # Error pages (403, 404, 500, BaseError layout, CatchAllRedirect404)
    legal/                  # Legal pages (contact, privacy, terms, cookies, legals)
  components/
    Layout/Parts/           # Layout components (AppBar, Footer, SideMenu, OpenSource)
    Widgets/                # Reusable widgets (AppLogo)
    tools/                  # Utility components (Error)
  Theme/                    # MUI theme config, customizations, constants
  i18n/
    locales/en/             # English translations
    locales/fr/             # French translations
    i18n.ts                 # i18n setup
e2e-tests/                  # Playwright e2e tests (*.spec.ts)
```

## Conventions

### Code Style

- **Components**: Arrow functions only (`const Foo: React.FunctionComponent = () => ...`)
- **No `FC`/`FunctionComponent` shorthand**: Always use `React.FunctionComponent`
- **JSX fragments**: Use `<React.Fragment>` (not `<>`)
- **Props**: Always destructure in function signature
- **JSX props**: Sort alphabetically (`react/jsx-sort-props`)
- **No literal strings in JSX**: All user-facing text must use i18next (`t('key')`)
- **Max JSX depth**: 5 levels

### File Naming

- `.tsx` files (components): **PascalCase** (e.g., `AppBar.tsx`)
- `.ts` files (utilities): **camelCase** (e.g., `createCache.ts`)
- Test files: Same name with `.test.tsx` / `.test.ts` suffix

### Naming

- Variables/functions: `camelCase` or `PascalCase` (for components)
- Parameters: `camelCase`
- Types/interfaces: `PascalCase`

### Testing

- Unit tests: Co-located with source files (`Component.test.tsx`)
- E2e tests: In `e2e-tests/` directory (`.spec.ts`)
- Use `@testing-library/react` for unit tests
- Vitest globals are enabled (no need to import `describe`, `it`, `expect`)

### Path Aliases

- `~/` maps to `src/` (e.g., `import { foo } from '~/Theme/Constants/layout'`)

### i18n

- Source locale: `en`
- Translation files: `src/i18n/locales/{lang}/`
- Format: i18next
- All user-facing strings must be translated (enforced by `eslint-plugin-i18next`)
