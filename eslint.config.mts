import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import namingConvention from 'eslint-plugin-react-naming-convention';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import checkFile from 'eslint-plugin-check-file';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import vitest from '@vitest/eslint-plugin';
import i18next from 'eslint-plugin-i18next';
import { fixupConfigRules } from '@eslint/compat';

const currentDirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
    {
        ignores: [
            '**/README.md',
            '**/*.mdx',
            '.yarn/**/*',
            '.pnp.cjs',
            '.pnp.loader.mjs',
            '.react-router/**/*',
            '**/node_modules/**/*',
            '**/build/**/*',
            '**/dist/**/*',
        ],
    },
    reactHooks.configs.flat.recommended,
    eslintPluginPrettier,
    jsxA11y.flatConfigs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    fixupConfigRules(i18next.configs['flat/recommended'] as any),
    pluginReact.configs.flat.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        ...pluginReact.configs.flat['jsx-runtime'],
        settings: {
            react: {
                version: '19.2',
                defaultVersion: '19.2',
            },
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx,mts}'],
        extends: [js.configs.recommended, namingConvention.configs.recommended],
        ignores: [
            '**/README.md',
            '**/*.mdx',
            '.yarn/**/*',
            '.pnp.cjs',
            '.pnp.loader.mjs',
            '.react-router/**/*',
            '**/node_modules/**/*',
            '**/build/**/*',
            '**/dist/**/*',
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: { ...globals.browser, ...vitest.environments.env.globals },
            parserOptions: {
                ecmaFeatures: { jsx: true },
                projectService: true,
                tsconfigRootDir: currentDirname,
            },
        },
        plugins: {
            'react-refresh': reactRefresh,
            import: importPlugin,
            'check-file': checkFile,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
            'react/prefer-stateless-function': 'error',
            'react/button-has-type': 'error',
            'react/no-unused-prop-types': 'error',
            'react/jsx-pascal-case': 'error',
            'react/jsx-no-script-url': 'error',
            'react/no-children-prop': 'error',
            'react/no-danger': 'error',
            'react/no-danger-with-children': 'error',
            'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
            'react/jsx-fragments': ['error', 'element'],
            'react/destructuring-assignment': [
                'error',
                'always',
                { destructureInSignature: 'always' },
            ],
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
            'react/jsx-max-depth': ['error', { max: 5 }],
            'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
            'react/jsx-key': [
                'error',
                {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true,
                },
            ],
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-curly-brace-presence': 'error',
            'react/no-typos': 'error',
            'react/display-name': 'error',
            'react/self-closing-comp': 'error',
            'react/jsx-sort-props': 'error',
            'react/prefer-read-only-props': 'error',
            'react/no-array-index-key': 'error',
            'react/jsx-no-bind': 'error',
            'react/jsx-props-no-spreading': 'off',
            'react/no-multi-comp': 'error',
            'react/react-in-jsx-scope': 'error',
            'react/jsx-one-expression-per-line': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': [
                'error',
                {
                    ignoreIfStatements: true,
                    ignoreConditionalTests: true,
                    ignoreMixedLogicalExpressions: true,
                    ignorePrimitives: true,
                },
            ],
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        'React.StatelessComponent': {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        'React.FunctionalComponent': {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        'React.FC': {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        StatelessComponent: {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        FunctionalComponent: {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        FunctionComponent: {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                        FC: {
                            message: 'Please use React.FunctionComponent instead.',
                            fixWith: 'React.FunctionComponent',
                        },
                    },
                },
            ],
            '@typescript-eslint/await-thenable': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['PascalCase', 'camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'variable',
                    // Specify PascalCase for React components
                    format: ['PascalCase', 'camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'property',
                    format: null,
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],
            'react-naming-convention/component-name': 'error',
            'check-file/filename-naming-convention': 'off',
        },
        settings: {
            react: {
                version: '19.2',
                defaultVersion: '19.2',
            },
        },
    },
    {
        files: ['src/**/*.d.ts'],
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            '@typescript-eslint/naming-convention': 'off',
            'check-file/filename-naming-convention': 'off',
        },
    },
    {
        files: ['**/*.{js,jsx}'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    {
        files: ['**/*.{js,ts}'],
        ignores: ['**/*.test.{js,ts}'],
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                {
                    'src/**/*.{js,ts,d.ts}': 'CAMEL_CASE',
                },
            ],
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        ignores: ['**/*.test.{jsx,tsx}', '**/root.tsx'],
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                {
                    'src/**/*.{jsx,tsx}': 'PASCAL_CASE',
                },
            ],
        },
    },
    {
        files: ['**/*.test.{js,ts}'],
        rules: {
            'react/jsx-props-no-spreading': 'off',
            'check-file/filename-naming-convention': [
                'error',
                {
                    'src/**/*.{js,ts,d.ts}': 'CAMEL_CASE',
                },
                { ignoreMiddleExtensions: true },
            ],
        },
    },
    {
        files: ['**/*.test.{jsx,tsx}', '**/__mocks__/**/*.{jsx,tsx}'],
        rules: {
            'react/jsx-props-no-spreading': 'off',
            'react/react-in-jsx-scope': 'off',
            'i18next/no-literal-string': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            'check-file/filename-naming-convention': [
                'error',
                {
                    'src/**/*.{jsx,tsx}': 'PASCAL_CASE',
                },
                { ignoreMiddleExtensions: true },
            ],
        },
    },
    {
        // update this to match your test files
        files: ['**/*.spec.js', '**/*.test.js'],
        plugins: { vitest: vitest },
        languageOptions: {
            globals: vitest.environments.env.globals,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            'vitest/max-nested-describe': ['error', { max: 3 }], // you can also modify rules' behavior using option like this
        },
    },
]);
