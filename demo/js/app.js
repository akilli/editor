'use strict';

(function (document, window, console) {
    function editorPath() {
        return window.location.pathname.endsWith('src.html') ? '../../src/editor/Editor.js' : '../../dist/editor.js';
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const config = {
            audio: {
                browser: 'media.html#audio',
            },
            block: {
                api: 'api/{id}.html',
                browser: 'block.html',
                css: 'css/base.css,css/app.css',
            },
            iframe: {
                browser: 'media.html#iframe',
            },
            image: {
                browser: 'media.html#image',
            },
            video: {
                browser: 'media.html#video',
            },
        };
        const rte = document.getElementById('rte');
        const { default: Editor } = await import(editorPath());
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
        });
    });
})(document, window, console);
