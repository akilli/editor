import Editor from '../src/editor.js';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = Editor.create(document.getElementById('editor'));
        const save = document.getElementById('save');

        save.addEventListener('click', (ev) => {
            ev.preventDefault();
            console.log(editor.getData());
        });
    });
})(document, Editor);
