import {
  RenderingClass,
  ButtonBlock,
  IButtonBlockOptions
} from '../interfaces';
import {
  createBorder,
  createLineHeight,
  createPadding,
  ignoreHTMLMinParse
} from '../utils';

export class Button implements ButtonBlock, RenderingClass {
  constructor(public innerText: string, public options: IButtonBlockOptions) {}

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
      fullWidth
    } = this.options;

    return `
      <mj-button css-class="ip-button-block"
        ${fullWidth ? 'width="100%"' : ''}
        background-color="${backgroundColor}"
        border="${createBorder(border)}"
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
