import css from 'rollup-plugin-css-porter';
import esbuild from 'rollup-plugin-esbuild';
import url from '@rollup/plugin-url';

// noinspection JSUnusedGlobalSymbols
export default [
    {
        input: 'src/editor/Editor.js',
        output: {
            file: 'dist/editor.js',
            format: 'esm',
            preferConst: true,
        },
        plugins: [
            esbuild({
                minify: true,
                target: 'es2020',
            }),
        ],
    },
    {
        input: 'src/editor/Editor.js',
        output: {
            file: 'dist/editor.legacy.js',
            format: 'esm',
            preferConst: true,
        },
        plugins: [
            esbuild({
                minify: true,
                target: 'es2017',
            }),
        ],
    },
    {
        input: 'src/editor/editor.css',
        plugins: [
            css({
                minified: 'dist/editor.css',
                raw: false,
            }),
        ],
    },
    {
        input: 'src/editor/editor.woff2',
        plugins: [
            url({
                destDir: 'dist',
                fileName: '[name][extname]',
                include: ['**/*.woff2'],
                limit: 0,
            }),
        ],
    },
];
