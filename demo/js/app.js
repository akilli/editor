import BuildEditor from '../../src/build/BuildEditor.js';
import DistEditor from '../../dist/editor.js';
import { cache } from './util.js';

/**
 * @typedef {Object} EditorMap
 * @property {typeof Editor} editor
 * @property {string} css
 *
 * @type {Object<string, EditorMap>}
 */
const map = {
    dist: {
        editor: DistEditor,
        css: '../dist/editor.css',
    },
    src: {
        editor: BuildEditor,
        css: '../src/build/editor.css',
    },
};

/**
 * @type {Object}
 */
const config = {
    audio: {
        browser: 'browser/audio.html',
    },
    block: {
        api: 'api/{id}.html',
        browser: 'browser/block.html',
        css: 'css/base.css,css/app.css',
    },
    iframe: {
        browser: 'browser/iframe.html',
    },
    image: {
        browser: 'browser/image.html',
    },
    video: {
        browser: 'browser/video.html',
    },
};

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.documentElement;
    const header = document.getElementById('header');
    const css = document.getElementById('css');
    const mode = document.getElementById('mode');
    const version = document.getElementById('version');
    const lang = document.getElementById('lang');
    const rte = document.getElementById('rte');
    const clear = document.getElementById('clear');
    const save = document.getElementById('save');
    let editor;
    const toggle = (flag) => {
        Array.from(header.getElementsByTagName('select')).forEach((item) => (item.disabled = flag));
        clear.disabled = flag;
    };
    const setMode = () => (mode.value ? root.setAttribute('class', mode.value) : root.removeAttribute('class'));
    const init = () => {
        editor?.destroy();
        /** @type {EditorMap} */
        const entry = map[version.value];
        css.setAttribute('href', entry.css);

        Array.from(document.getElementsByTagName('link')).forEach((item) => (item.href = cache(item.href)));
        Array.from(document.getElementsByTagName('script')).forEach((item) => (item.src = cache(item.src)));

        const Editor = entry.editor;
        editor = Editor.create(rte, {
            ...config,
            base: {
                lang: lang.value,
            },
        });
        console.log(editor);
    };
    mode.addEventListener('change', setMode);
    version.addEventListener('change', init);
    lang.addEventListener('change', init);
    clear.addEventListener('click', () => {
        editor.setHtml('');
        window.scrollTo(0, 0);
    });
    save.addEventListener('click', () => {
        if (rte.hidden) {
            editor.save();
            editor.destroy();
            save.textContent = 'Edit';
            toggle(true);
        } else {
            editor.load();
            save.textContent = 'Save';
            toggle(false);
        }
    });
    setMode();
    init();
    save.textContent = rte.hidden ? 'Save' : 'Edit';
});
