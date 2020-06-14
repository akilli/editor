import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const rte = document.getElementById('rte');
        const editor = Editor.create(rte, {
            audio: {
                browser: 'media.html#audio',
            },
            base: {
                lang: 'en',
            },
            block: {
                api: 'api/{id}.html',
                browser: 'block.html',
                css: 'base.css,index.css',
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
        });
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
})(document, Editor);
