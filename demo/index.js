import Editor from '../src/Editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        Editor.create(document.getElementById('rte'), {
            media: {
                audio: '/demo-browser/media.html#audio',
                iframe: '/demo-browser/media.html#iframe',
                image: '/demo-browser/media.html#image',
                video: '/demo-browser/media.html#video',
            },
        })
        .then(editor => document.getElementById('save').addEventListener('click', () => console.log(editor.getData())))
        .catch(error => console.error(error));
    });
})(document, Editor);
