import {
  IStructure,
  RenderingClass,
  IpBlocks,
  IStructureColumnOptions
} from './interfaces';
import { Text, Image, Button, Divider, Spacer, Social } from './blocks';
import {
  createWidthHeight,
  createPadding,
  createBorder,
  defaultStructureColumnsWidth
} from './utils';

const defaultColumnsOptions: IStructureColumnOptions = {
  background: {
    color: '#cccccc'
  },
  border: {
    width: 0,
    color: '#cccccc',
    radius: 0,
    style: 'solid'
  },
  verticalAlign: 'top'
};

export class Section implements RenderingClass {
  constructor(private structure: IStructure) {}

  private static getBlock(block: IpBlocks) {
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
      case 'social':
        return new Social(block.networks, block.options).render();
    }
  }

  private getColumnWidth(index: number) {
    const {
      columnsWidth = defaultStructureColumnsWidth(this.structure.type)
    } = this.structure.options;
    const fullWidth = columnsWidth.reduce((n, fr) => n + fr, 0);
    const colFr = columnsWidth[index];
    return Math.round((100 * colFr) / fullWidth);
  }

  private createColumns() {
    const {
      elements,
      options: { disableResponsive = false, gaps = [4, 4], columns = [] }
    } = this.structure;

    const columnsElements = elements
      .map((el, index) => {
        const column = (columns && columns[index]) || defaultColumnsOptions;
        return `
          <mj-column
            width="${this.getColumnWidth(index)}%"
            background-color="${column.background.color}"
            padding="${gaps[0]}px ${gaps[1]}px"
            border="${createBorder(column.border)}"
            border-radius="${column.border.radius || 0}px"
            vertical-align="${column.verticalAlign}"
            css-class="ip-column ${
              (column.border.radius || 0) > 0 ? 'ip-border-radius' : ''
            }">
            ${el.map(block => Section.getBlock(block)).join('')}
          </mj-column>
        `;
      })
      .join('');

    if (disableResponsive) {
      return `<mj-group>${columnsElements}</mj-group>`;
    }

    return columnsElements;
  }

  /**
   * @version 4
   * Add support for full-width
   */
  render() {
    const { type, id, options } = this.structure;
    let cssClass = `${type} ${id} ip-section`;
    if (options.disableResponsive) {
      cssClass = `${cssClass} disable-responsive`;
    }
    return `
      <mj-section
        css-class="${cssClass}"
        full-width="none"
        border-radius="${options.border.radius}px"
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
