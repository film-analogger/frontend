import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        reactRouter(),
        tsconfigPaths(),
        // eslint-disable-next-line no-undef
        ...(!process.env.CI
            ? [
                  eslint({
                      cache: true,
                      fix: true,
                  }),
              ]
            : []),
    ],
    server: {
        port: 3000,
        // eslint-disable-next-line no-undef
        ...(process.env.VITE_E2E_AUTH === 'true'
            ? // Playwright passes --port/--strictPort explicitly: fail loudly
              // rather than silently moving to another port, and keep the run headless.
              { strictPort: true, open: false }
            : { open: true }),
    },
});
