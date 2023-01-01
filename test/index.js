import Editor from '../src/base/Editor.js';
import baretest from 'baretest';
import jsdomGlobal from 'jsdom-global';
import glob from 'glob';

jsdomGlobal();
global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};
const orig = document.createElement('div');

const test = baretest('akilli editor');

for (let file of glob.sync('./test/**/*.test.js')) {
    const relativePath = file.replace('./test/', './');
    const { default: testsuite } = await import(relativePath);

    if (typeof testsuite !== 'function') {
        throw new Error('Invalid test suite' + file);
    }

    const editor = new Editor(orig);
    testsuite(test, editor);
}

await test.run();
