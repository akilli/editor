import DistEditor from '../../dist/editor.js';
import SrcEditor from '../../src/editor/Editor.js';

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
    const base = document.getElementById('base');
    const light = document.getElementById('light');
    const dark = document.getElementById('dark');
    const dist = document.getElementById('dist');
    const src = document.getElementById('src');
    const en = document.getElementById('en');
    const de = document.getElementById('de');
    const rte = document.getElementById('rte');
    const clear = document.getElementById('clear');
    const save = document.getElementById('save');
    let editor;
    const toggle = (flag) => {
        Array.from(header.getElementsByTagName('input')).forEach(item => (item.disabled = flag));
        clear.disabled = flag;
    };
    const mode = () => {
        if (light.checked) {
            root.setAttribute('class', 'light');
        } else if (dark.checked) {
            root.setAttribute('class', 'dark');
        } else {
            root.removeAttribute('class');
        }
    };
    const init = () => {
        editor?.destroy();
        const Editor = src.checked ? SrcEditor : DistEditor;
        editor = Editor.create(rte, {
            ...config,
            base: {
                lang: de.checked ? 'de' : 'en',
            },
        });
        console.log(editor);
    };
    base.addEventListener('click', mode);
    light.addEventListener('click', mode);
    dark.addEventListener('click', mode);
    dist.addEventListener('click', init);
    src.addEventListener('click', init);
    en.addEventListener('click', init);
    de.addEventListener('click', init);
    clear.addEventListener('click', () => {
        editor.setHtml('');
        window.scrollTo(0, 0);
    });
    save.textContent = rte.hidden ? 'Save' : 'Edit';
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
    mode();
    init();
});
