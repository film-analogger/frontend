declare module 'vite-plugin-eslint' {
    import type { PluginOption } from 'vite';
    export interface ESLintPluginOptions {
        cache?: boolean;
        fix?: boolean;
        include?: string | string[];
        exclude?: string | string[];
        eslintPath?: string;
        formatter?: string;
        emitWarning?: boolean;
        emitError?: boolean;
        failOnWarning?: boolean;
        failOnError?: boolean;
    }
    export default function eslintPlugin(options?: ESLintPluginOptions): PluginOption;
}
