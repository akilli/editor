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

        const button = document.getElementById('button');
        button.textContent = rte.hidden ? 'Save' : 'Edit';
        button.addEventListener('click', () => {
            if (rte.hidden) {
                editor.save();
                editor.destroy();
                button.textContent = 'Edit';
            } else {
                editor.load();
                button.textContent = 'Save';
            }
        });
    });
})(document, window, console);
