import {terser} from 'rollup-plugin-terser';

export default {
    input: 'src/Editor.js',
    output: {
        file: 'dist/editor.js',
        format: 'esm',
        preferConst: true,
        plugins: [terser()],
    }
};
