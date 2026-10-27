# Film Analogger — Frontend

The frontend for Film Analogger, a React Router 7 single-page application (SSR disabled) built with TypeScript, MUI, and Vite.

## Features

- ⚡️ Vite 7 build with Hot Module Replacement (HMR)
- 🔒 TypeScript in strict mode
- 🎨 MUI v9 + Emotion for styling
- 🌐 i18next-based localization (`en`, `fr`)
- 🔐 Keycloak authentication
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies (Yarn 4 / Berry):

```bash
yarn install
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
yarn build
```

Since server-side rendering is disabled (SPA mode), the build only produces static client assets in `build/client/`.

Serve the production build:

```bash
yarn start
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t film-analogger-frontend .

# Run the container
docker run -p 3000:3000 film-analogger-frontend
```

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `yarn build`:

```
├── package.json
├── yarn.lock
├── .yarnrc.yml
├── .yarn/
├── build/
│   └── client/    # Static assets (SPA mode, no server bundle)
```

## Styling

This project uses [MUI](https://mui.com/) with [Emotion](https://emotion.sh/) for styling. See `CLAUDE.md` for conventions.

## Git Hooks

[Husky](https://typicode.github.io/husky/) hooks are installed automatically via the `prepare` script on `yarn install`. They run:

- **pre-commit**: `lint-staged` — lints staged files
- **commit-msg**: validates the commit message against [Conventional Commits](https://www.conventionalcommits.org/) (`commitlint`)
- **pre-push**: `lint`, `typecheck`, `test`, `pw` (Playwright e2e), and `i18n:check`

Hook scripts live in `.husky/` and must be executable (`chmod +x`) to run — Git silently skips non-executable hook files.
