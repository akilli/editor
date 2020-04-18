import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = Editor.create(document.getElementById('rte'), {
            audio: {
                browserUrl: 'https://akilli.github.io/demo-browser/media.html#audio',
            },
            base: {
                lang: 'de',
            },
            iframe: {
                browserUrl: 'https://akilli.github.io/demo-browser/media.html#iframe',
            },
            image: {
                browserUrl: 'https://akilli.github.io/demo-browser/media.html#image',
            },
            video: {
                browserUrl: 'https://akilli.github.io/demo-browser/media.html#video',
            },
        });
        console.log(editor);
        document.getElementById('save').addEventListener('click', () => console.log(editor.getData()));
    });
})(document, Editor);
