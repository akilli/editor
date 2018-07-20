'use strict';

(function (document, window) {
    if (!window.opener) {
        return;
    }

    function getUrl(url) {
        var a = document.createElement('a');

        a.href = url;

        return a.origin === window.opener.origin ? a.pathname : a.href;
    }

    document.addEventListener('DOMContentLoaded', function () {
        Array.prototype.forEach.call(document.querySelectorAll('figure > audio, figure > iframe, figure > img, figure > video'), function (media) {
            var figure = media.parentElement;

            figure.addEventListener('click', function () {
                var el = media.tagName.toLowerCase();
                var caption = this.querySelector('figcaption');
                var message = {
                    alt: media.getAttribute('alt'),
                    caption: !!caption ? caption.innerHTML : null,
                    src: getUrl(media.src),
                    type: el === 'img' ? 'image' : el
                };

                window.opener.postMessage(message, window.opener.origin);
            });
        });
    });
})(document, window);
