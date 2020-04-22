import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const textarea = document.getElementById('rte');
        const editor = Editor.create(textarea, {
            audio: {
                browser: 'https://akilli.github.io/demo-browser/media.html#audio',
            },
            base: {
                lang: 'de',
            },
            iframe: {
                browser: 'https://akilli.github.io/demo-browser/media.html#iframe',
            },
            image: {
                browser: 'https://akilli.github.io/demo-browser/media.html#image',
            },
            video: {
                browser: 'https://akilli.github.io/demo-browser/media.html#video',
            },
        });
        console.log(editor);

        const button = document.getElementById('save');
        button.textContent = textarea.hidden ? 'Save' : 'Edit';
        button.addEventListener('click', () => {
            console.log(textarea.hidden);
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
