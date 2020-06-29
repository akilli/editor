'use strict';

(function (document, window, console) {
    document.addEventListener('DOMContentLoaded', async () => {
        const config = {
            audio: {
                browser: 'media.html#audio',
            },
            base: {
                lang: 'en',
            },
            block: {
                api: 'api/{id}.html',
                browser: 'block.html',
                css: 'base.css,page.css',
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
        const isSrc = window.location.pathname.endsWith('src.html');
        const {default: Editor} = await import(isSrc ? '../src/editor/Editor.js' : '../dist/editor.js');
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
