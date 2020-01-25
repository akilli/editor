import Editor from '../src/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        Editor.create(document.getElementById('rte'), {
            media: {
                audio: 'https://akilli.github.io/demo-browser/media.html#audio',
                iframe: 'https://akilli.github.io/demo-browser/media.html#iframe',
                image: 'https://akilli.github.io/demo-browser/media.html#image',
                video: 'https://akilli.github.io/demo-browser/media.html#video',
            },
        })
        .then(editor => document.getElementById('save').addEventListener('click', () => console.log(editor.getData())))
        .catch(error => console.error(error));
    });
})(document, Editor);
