import Editor from '../src/editor/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = Editor.create(document.getElementById('rte'), {
            media: {
                audio: 'https://akilli.github.io/demo-browser/media.html#audio',
                iframe: 'https://akilli.github.io/demo-browser/media.html#iframe',
                image: 'https://akilli.github.io/demo-browser/media.html#image',
                video: 'https://akilli.github.io/demo-browser/media.html#video',
            },
        });
        console.log(editor);
        document.getElementById('save').addEventListener('click', () => console.log(editor.getData()));
    });
})(document, Editor);
