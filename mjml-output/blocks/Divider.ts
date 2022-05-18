import {DividerBlock, IDividerBlockOptions, RenderingClass} from '../interfaces';
import {createPadding} from '../utils';

export class Divider implements DividerBlock, RenderingClass {
    constructor(public options: IDividerBlockOptions) {
    }

    /**
     * @version 4
     * Add support for attributes:
     * container-background-color
     * width
     * align
     */
    render() {
        const {padding, border} = this.options;
        return `
          <mj-divider
            css-class="ip-divider-block"
            width="100%"
            align="center"
            border-color="${border.color}"
            border-style="${border.style}"
            border-width="${border.width}px"
            padding="${createPadding(padding)}">
          </mj-divider>
        `;
    }
}
