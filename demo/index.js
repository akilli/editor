import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const textarea = document.getElementById('rte');
        const editor = Editor.create(textarea, {
            audio: {
                browser: '/demo/media.html#audio',
            },
            base: {
                lang: 'de',
            },
            iframe: {
                browser: '/demo/media.html#iframe',
            },
            image: {
                browser: '/demo/media.html#image',
            },
            video: {
                browser: '/demo/media.html#video',
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
