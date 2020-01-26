import css from 'rollup-plugin-css-porter';
import url from '@rollup/plugin-url';
import {terser} from 'rollup-plugin-terser';

export default {
    input: 'bundle.js',
    output: {
        file: 'dist/editor.js',
        format: 'esm',
        preferConst: true,
        plugins: [terser()],
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
        })
    ]
};
