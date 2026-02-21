import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        watch: false,
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
        },
    },
});
