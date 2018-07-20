'use strict';

(function (document, RTE) {
    document.addEventListener('DOMContentLoaded', () => {
        const editor = new RTE(document.getElementById('editor'));
        const save = document.getElementById('save');

        save.addEventListener('click', () => console.log(editor.innerHTML));
    });
})(document, RTE);
