import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        reactRouter(),
        tsconfigPaths(),
        eslint({
            cache: true,
            fix: true,
        }),
    ],
});
