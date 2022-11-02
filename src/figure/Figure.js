import Base from '../base/Base.js';
import FigureFilter from './FigureFilter.js';
import FigureListener from './FigureListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Figure extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'figure';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.FIGURE,
            group: TagGroup.FIGURE,
            children: [
                TagGroup.AUDIO,
                TagGroup.CAPTION,
                TagGroup.IFRAME,
                TagGroup.IMAGE,
                TagGroup.PREFORMAT,
                TagGroup.QUOTE,
                TagGroup.TABLE,
                TagGroup.VIDEO,
            ],
            attributes: ['class'],
            alignable: true,
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._tag({
            name: TagName.FIGCAPTION,
            group: TagGroup.CAPTION,
            children: [TagGroup.FORMAT],
            editable: true,
            navigable: true,
            enter: TagName.P,
        });
        new FigureListener(this.editor);
        this.editor.filters.add(new FigureFilter(this.editor));
    }
}
