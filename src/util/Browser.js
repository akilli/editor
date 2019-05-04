/**
 * Browser
 */
export default class Browser {
    /**
     * Opens a media browser window and registers a listener for communication between editor and browser windows
     *
     * @param {Window} window
     * @param {String} url
     * @param {Function} call
     * @param {String} name
     * @param {String} opts
     */
    static open(window, url, call, name = 'browser', opts = null) {
        if (!url || typeof call !== 'function') {
            return;
        }

        name = name || 'browser';
        opts = opts || 'alwaysRaised=yes,dependent=yes,height=' + window.screen.height + ',location=no,menubar=no,minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' + window.screen.width;

        const document = window.document;
        const win = window.open(url, name, opts);
        let origin;

        try {
            origin = win.origin || win.location.origin;
        } catch (e) {
            const a = document.createElement('a');
            a.href = url;
            origin = a.origin;
        }

        window.addEventListener('message', (ev) => {
            if (ev.origin === origin && ev.source === win) {
                call(ev.data);
                win.close();
            }
        }, false);
    }
}
