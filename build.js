import esbuild from 'esbuild';
import process from 'node:process';

esbuild
    .build({
        bundle: true,
        entryPoints: ['src/build/BuildEditor.js'],
        format: 'esm',
        minify: true,
        outfile: 'dist/editor.js',
        target: 'es2022',
    })
    .catch(() => process.exit(1));
