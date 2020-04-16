import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = Editor.create(document.getElementById('rte'), {
            audio: {
                browser: 'https://akilli.github.io/demo-browser/media.html#audio',
            },
            editor: {
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
        document.getElementById('save').addEventListener('click', () => console.log(editor.getData()));
    });
})(document, Editor);
