import {
  RenderingClass,
  DividerBlock,
  IDividerBlockOptions
} from '../interfaces';
import { createPadding } from '../utils';

export class Divider implements DividerBlock, RenderingClass {
  constructor(public options: IDividerBlockOptions) {}

  render() {
    const { padding, border } = this.options;
    return `
      <mj-divider
        css-class="ip-divider-block"
        border-color="${border.color}"
        border-style="${border.style}"
        border-width="${border.width}px"
        padding="${createPadding(padding)}">
      </mj-divider>
    `;
  }
}
