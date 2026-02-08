import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            '@stylistic': stylistic,
        },
    },
    {
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/curly-newline': ['error'],
            '@stylistic/eol-last': ['error', 'always'],
            'array-callback-return': ['error', { checkForEach: true }],
            'no-await-in-loop': 'error',
            'no-duplicate-imports': 'error',
            'no-inner-declarations': 'error',
            'no-promise-executor-return': 'error',
            'no-use-before-define': 'error',
            'no-useless-assignment': 'error',
            'require-atomic-updates': 'error',
            'arrow-body-style': [
                'error',
                'as-needed',
                { requireReturnForObjectLiteral: true },
            ],
            'block-scoped-var': 'error',
            complexity: ['off', 4],
            'default-param-last': ['error'],
            eqeqeq: ['error', 'always'],
            'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
            'max-depth': ['error', 3],
            'max-nested-callbacks': ['error', 3],
            'no-else-return': 'error',
            'no-eval': 'error',
            'no-invalid-this': 'error',
            'no-nested-ternary': 'error',
            'no-shadow': ['error', { hoist: 'all' }],
            'no-unneeded-ternary': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: [
                        'const',
                        'let',
                        'var',
                        'cjs-export',
                        'directive',
                        'continue',
                        'for',
                        'if',
                        'return',
                        'switch',
                        'while',
                        'with',
                        'try',
                        'function',
                    ],
                    next: '*',
                },
                { blankLine: 'always', prev: '*', next: 'return' },
                {
                    blankLine: 'any',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
                { blankLine: 'any', prev: ['directive'], next: ['directive'] },
            ],
        },
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
]);

export default eslintConfig;
