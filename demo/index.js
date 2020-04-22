import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const textarea = document.getElementById('rte');
        const editor = Editor.create(textarea, {
            audio: {
                browser: 'media.html#audio',
            },
            base: {
                lang: 'de',
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

        const button = document.getElementById('save');
        button.textContent = textarea.hidden ? 'Save' : 'Edit';
        button.addEventListener('click', () => {
            if (textarea.hidden) {
                editor.save();
                editor.destroy();
                button.textContent = 'Edit';
            } else {
                editor.init();
                button.textContent = 'Save';
            }
        });
    });
})(document, Editor);
