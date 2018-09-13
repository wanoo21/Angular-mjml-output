import { IStructure, RenderingClass, IpBlocks } from './interfaces';
import { Text, Image, Button, Divider, Spacer } from './blocks';
import { createBorder, createWidthHeight, createPadding } from './utils';

export class Section implements RenderingClass {
  constructor(private structure: IStructure) {}

  private getBlock(block: IpBlocks) {
    switch (block.type) {
      case 'text':
        return new Text(block.innerText, block.options).render();
      case 'image':
        return new Image(block.src, block.options).render();
      case 'button':
        return new Button(block.innerText, block.options).render();
      case 'divider':
        return new Divider(block.options).render();
      case 'spacer':
        return new Spacer(block.options).render();
    }
  }

  render() {
    const { type, options, elements } = this.structure;
    return `
      <mj-section
        css-class="${type}"
        border="${createBorder(options.border)}"
        vertical-align="top"
        text-align="center"
        padding="${createPadding(options.padding)}"
        background-color="${options.background.color}"
        background-url="${options.background.url}"
        background-repeat="${options.background.repeat}"
        background-size="${
          options.background.size
            ? createWidthHeight(options.background.size)
            : 'auto'
        }">
        ${elements.map(el => {
          return `
            <mj-column padding="0" vertical-align="top" css-class="ip-column">
              ${el.map(block => <string>this.getBlock(block))}
            </mj-column>
            `;
        })}
      </mj-section>
      `;
  }
}
