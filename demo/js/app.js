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
    const dist = document.getElementById('dist');
    const src = document.getElementById('src');
    const light = document.getElementById('light');
    const dark = document.getElementById('dark');
    const rte = document.getElementById('rte');
    const clear = document.getElementById('clear');
    const save = document.getElementById('save');
    let editor;
    const init = () => {
        editor?.destroy();
        const Editor = src.checked ? SrcEditor : DistEditor;
        editor = Editor.create(rte, config);
        console.log(editor);
    };
    dark.checked && root.setAttribute('data-dark', '');
    dist.addEventListener('click', init);
    src.addEventListener('click', init);
    light.addEventListener('click', () => root.removeAttribute('data-dark'));
    dark.addEventListener('click', () => root.setAttribute('data-dark', ''));
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
            dist.disabled = true;
            src.disabled = true;
            clear.disabled = true;
        } else {
            editor.load();
            save.textContent = 'Save';
            dist.disabled = false;
            src.disabled = false;
            clear.disabled = false;
        }
    });
    init();
});
