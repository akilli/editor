/**
 * Initializes editor
 *
 * @param {Document} document
 * @param {Editor} Editor
 */
export default (document, Editor) => {
    const rte = document.getElementById('rte');
    const editor = Editor.create(rte, {
        audio: {
            browser: 'media.html#audio',
        },
        base: {
            lang: 'en',
        },
        block: {
            api: 'api/{id}.html',
            browser: 'block.html',
            css: 'base.css,page.css',
        },
        iframe: {
            browser: 'media.html#iframe',
        },
        image: {
            browser: 'media.html#image',
        },
        video: {
            browser: 'media.html#video',
        },
    });
    console.log(editor);

    const button = document.getElementById('button');
    button.textContent = rte.hidden ? 'Save' : 'Edit';
    button.addEventListener('click', () => {
        if (rte.hidden) {
            editor.save();
            editor.destroy();
            button.textContent = 'Edit';
        } else {
            editor.load();
            button.textContent = 'Save';
        }
    });
}