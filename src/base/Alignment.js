export default class Alignment {
    /**
     * @return {string}
     */
    static get NONE() {
        return 'none';
    }

    /**
     * @return {string}
     */
    static get LEFT() {
        return 'left';
    }

    /**
     * @return {string}
     */
    static get CENTER() {
        return 'center';
    }

    /**
     * @return {string}
     */
    static get RIGHT() {
        return 'right';
    }

    /**
     * @return {string[]}
     */
    static values() {
        return [this.NONE, this.LEFT, this.CENTER, this.RIGHT];
    }
}
