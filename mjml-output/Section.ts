import {
  IStructure,
  RenderingClass,
  IpBlocks,
  TStructreTypes
} from './interfaces';
import { Text, Image, Button, Divider, Spacer } from './blocks';
import { createWidthHeight, createPadding } from './utils';

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

  private getColumnWidth(type: TStructreTypes, index: number) {
    if (type === 'cols_12') {
      return index === 0 ? 60 : 40;
    }
    return index === 0 ? 40 : 60;
  }

  private columnPadding(index: number) {
    const columnsLength = this.structure.elements.length;
    if (columnsLength === 1) {
      return 0;
    } else if (index === 0) {
      return '0 4px 0 0';
    } else if (index === columnsLength - 1) {
      return '0 0 0 4px';
    }
    return '0 4px';
  }

  private createColumns() {
    const {
      type,
      elements,
      options: { disableResponsive = false }
    } = this.structure;

    const columns = elements
      .map((el, index) => {
        return `
          <mj-column
            ${
              ['cols_12', 'cols_21'].includes(type)
                ? `width="${this.getColumnWidth(type, index)}%"`
                : ''
            }
            padding="${this.columnPadding(index)}"
            vertical-align="top"
            css-class="ip-column">
            ${el.map(block => <string>this.getBlock(block)).join('')}
          </mj-column>
        `;
      })
      .join('');

    if (disableResponsive) {
      return `<mj-group>${columns}</mj-group>`;
    }

    return columns;
  }

  render() {
    const { type, id, options } = this.structure;
    let cssClass = `${type} ${id} ip-section`;
    if (options.disableResponsive) {
      cssClass = `${cssClass} disable-responsive`;
    }
    return `
      <mj-section
        css-class="${cssClass}"
        border-radius="${options.border.radius}px"
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
        ${this.createColumns()}
      </mj-section>
      `;
  }
}
