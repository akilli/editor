'use strict';

(function (document, window) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-id]').forEach(item => item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            item.removeAttribute('data-id');
            window.opener.postMessage({
                id: id,
                content: item.outerHTML,
            }, window.opener.origin);
        }));
    });
})(document, window);
