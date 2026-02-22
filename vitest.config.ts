import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./setup-tests.ts'],
        watch: false,
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            reporter: ['text', 'json', 'json-summary'],
        },
        reporters: ['default', 'junit'],
        outputFile: {
            junit: 'test-results/junit.xml',
        },
    },
    resolve: {
        alias: {
            '~/': new URL('./src/', import.meta.url).pathname,
        },
    },
});
