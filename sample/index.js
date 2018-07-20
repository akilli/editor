'use strict';

(function (document, Editor) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = Editor.create(document.getElementById('editor'));
        const save = document.getElementById('save');

        save.addEventListener('click', () => console.log(editor.getData()));
    });
})(document, Editor);
