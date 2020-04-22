'use strict';

(function (document, window) {
    if (!window.opener) {
        console.error('window.opener undefined');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('body > figure > audio, body > figure > iframe, body > figure > img, body > figure > video').forEach(media => {
            const figure = media.closest('figure');
            const caption = figure.querySelector(':scope > figcaption');
            const tag = media.tagName.toLowerCase();
            const type = tag === 'img' ? 'image' : tag;
            figure.addEventListener('click', () => window.opener.postMessage({
                alt: media.getAttribute('alt'),
                caption: caption ? caption.innerHTML : null,
                src: media.src,
                type: type,
            }, window.opener.origin));

            if (window.location.hash && window.location.hash !== `#${type}`) {
                figure.parentElement.removeChild(figure);
            }
        });
    });
})(document, window);
