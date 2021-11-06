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
    const rte = document.getElementById('rte');
    const Editor = window.location.pathname.endsWith('src.html') ? SrcEditor : DistEditor;
    const editor = Editor.create(rte, config);
    console.log(editor);

    document.getElementById('clear').addEventListener('click', () => {
        editor.setHtml('');
        window.scrollTo(0, 0);
    });

    const save = document.getElementById('save');
    save.textContent = rte.hidden ? 'Save' : 'Edit';
    save.addEventListener('click', () => {
        if (rte.hidden) {
            editor.save();
            editor.destroy();
            save.textContent = 'Edit';
        } else {
            editor.load();
            save.textContent = 'Save';
        }

        window.scrollTo(0, 0);
    });
});
