import css from 'rollup-plugin-css-porter';
import esbuild from 'rollup-plugin-esbuild';
import url from '@rollup/plugin-url';

export default {
    input: 'bundle.js',
    output: {
        file: 'dist/editor.js',
        format: 'esm',
        preferConst: true,
    },
    plugins: [
        css({
            minified: 'dist/editor.css',
            raw: false,
        }),
        url({
            destDir: 'dist',
            fileName: '[name][extname]',
            include: ['**/*.woff2'],
            limit: 0,
        }),
        esbuild({
            minify: true,
            target: 'es2020',
        }),
    ]
};
