import Command from './Command.js';

/**
 * Image Command
 */
export default class MediaCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        let url;

        if (!!this.editor.config.mediabrowser) {
            const feat = 'alwaysRaised=yes,dependent=yes,height=' + this.editor.window.screen.height +
                ',location=no,menubar=no,minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' +
                this.editor.window.screen.width;
            const win = this.editor.window.open(this.editor.config.mediabrowser, 'mediabrowser', feat);
            let origin;

            try {
                origin = win.origin;
            } catch (e) {
                this.editor.window.console.log(e);
                const a = this.editor.document.createElement('a');
                a.href = this.editor.config.mediabrowser;
                origin = a.origin;
            }

            this.editor.window.addEventListener('message', (ev) => {
                if (ev.origin === origin && ev.source === win && !!ev.data.src) {
                    this.editor.execute('insertHTML', '<img src="' + ev.data.src + '" alt="" />');
                    win.close();
                }
            }, false);
        } else if (url = this.editor.window.prompt('URL')) {
            this.editor.execute('insertHTML', '<img src="' + url + '" alt="" />');
        }
    }
}
