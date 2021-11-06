'use strict';

(function (document, window, console) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        Array.from(document.getElementsByTagName('section')).forEach(item => item.addEventListener('click', () => {
            const id = item.id;
            item.removeAttribute('id');
            window.opener.postMessage({ id: id, content: item.outerHTML }, window.opener.origin);
        }));
    });
})(document, window, console);
