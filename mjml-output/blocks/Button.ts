import {ButtonBlock, IButtonBlockOptions, RenderingClass} from '../interfaces';
import {createBorder, createLineHeight, createPadding, ignoreHTMLMinParse} from '../utils';

/**
 * The `mj-button` won't be fully clickable because of client support
 */
export class Button implements ButtonBlock, RenderingClass {
    constructor(public innerText: string, public options: IButtonBlockOptions) {
    }

    /**
     * @version 4
     * Add support for attributes:
     * container-background-color
     * height
     * letter-spacing
     * rel
     * text-align
     * title
     */
    render() {
        const {
            backgroundColor,
            border,
            color,
            font,
            align,
            lineHeight,
            link,
            innerPadding,
            padding,
            fullWidth,
        } = this.options;

        // const {top = 0, right = 0, left = 0, bottom = 0} = border?.size


        return `
      <mj-button css-class="ip-button-block"
        ${fullWidth ? 'width="100%"' : ''}
        background-color="${backgroundColor}"
        border="${createBorder(border)}"
        border-top="${border.size?.top}px ${ border.color } ${border.style}"
        border-right="${border.size?.right}px ${ border.color } ${border.style}"
        border-left="${border.size?.left}px ${ border.color } ${border.style}"
        border-bottom="${border.size?.bottom}px ${ border.color } ${border.style}"
        border-radius="${border.radius}px"
        color="${color}"
        align="${align}"
        vertical-align="middle"
        line-height="${createLineHeight(lineHeight)}"
        href="${link.href}"
        target="${link.target}"
        padding="${createPadding(padding)}"
        inner-padding="${createPadding(innerPadding)}"
        font-family="${font.family}, ${font.fallback}"
        font-size="${font.size}px"
        font-style="${font.style}"
        font-weight="${font.weight}">
          ${ignoreHTMLMinParse(this.innerText)}
      </mj-button>
    `;
    }
}
