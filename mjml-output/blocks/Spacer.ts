import {ISpacerBlockOptions, RenderingClass, SpacerBlock} from '../interfaces';
import {createWidthHeight} from '../utils';

export class Spacer implements SpacerBlock, RenderingClass {
    constructor(public options: ISpacerBlockOptions) {
    }

    /**
     * @version 4
     * Add support for attributes:
     * container-background-color
     * padding
     */
    render() {
        return `<mj-spacer css-class="ip-spacer-block" padding="0" height="${createWidthHeight(this.options.height)}"></mj-spacer>`;
    }
}
