import { RenderingClass, ImageBlock, IImageBLockOptions } from '../interfaces';
import { createPadding, createBorder } from '../utils';

export class Image implements ImageBlock, RenderingClass {
  constructor(public src: string, public options: IImageBLockOptions) {}

  render() {
    const { border, width, height, link, align, title, padding } = this.options;

    return `
      <mj-image
        css-class="ip-image-block"
        padding="${createPadding(padding)}"
        border="${createBorder(border)}"
        border-radius="${border.radius}"
        ${!width.auto ? `width="${width.value}px"` : ''}
        ${!height.auto ? `height="${height.value}px"` : ''}
        href="${link.href}"
        target="${link.target}"
        align="${align}"
        title="${title}"
        alt="${title}"
        src=${this.src}>
      </mj-image>
    `;
  }
}
