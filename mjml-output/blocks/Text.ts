import { ITextBlockOptions, TextBlock, RenderingClass } from '../interfaces';
import { createPadding, createLineHeight } from '../utils';

export class Text implements TextBlock, RenderingClass {
  constructor(public innerText: string, public options: ITextBlockOptions) {}

  render() {
    const { color, font, lineHeight, padding } = this.options;
    return `
      <mj-text
        css-class="ip-text-block"
        color="${color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-style="${font.style}"
        font-weight="${font.weight}"
        text-decoration="none"
        align="left"
        line-height="${createLineHeight(lineHeight)}"
        padding="${createPadding(padding)}">
          ${this.innerText || ''}
      </mj-text>
    `;
  }
}
