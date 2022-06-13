import {IpBlocks, IStructure, IStructureColumnOptions, RenderingClass} from './interfaces';
import {Button, Divider, Image, Social, Spacer, Text} from './blocks';
import {createBorder, createPadding, createWidthHeight, defaultStructureColumnsWidth} from './utils';

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
    constructor(private structure: IStructure) {
    }

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

    /**
     * Limitations of background-images size and position on Outlook desktop:
     * - If background-size is not specified, no-repeat will be ignored on Outlook.
     * - If the specified size is a single attribute in percent, the height will be auto as in standard css.
     * On outlook, the image will never overflow the element, and it will be shrinked instead of being cropped like on other clients.
     *
     * @version 4
     * Add support for attributes:
     * full-width
     */
    render() {
        const {type, options} = this.structure;
        let cssClass = `${type} ip-section`;
        let topMarginSection = '', bottomMarginSection = '';
        if (options.disableResponsive) {
            cssClass = `${cssClass} disable-responsive`;
        }

        // Workaround of top margin
        if (options.margin.top > 0) {
            topMarginSection = `<mj-section full-width="false" padding="0">
                                    <mj-column>
                                        <mj-spacer padding="0" height="${options.margin.top}px"></mj-spacer>
                                    </mj-column>
                                </mj-section>`
        }

        // Workaround of bottom margin
        if (options.margin.bottom > 0) {
            bottomMarginSection = `<mj-section full-width="false" padding="0">
                                        <mj-column>
                                            <mj-spacer padding="0" height="${options.margin.bottom}px"></mj-spacer>
                                        </mj-column>
                                    </mj-section>`
        }

        return `
          ${topMarginSection}
          <mj-section
            full-width="${options.fullWidth ? 'full-width' : 'false'}"
            css-class="${cssClass}"
            border="${createBorder(options.border)}"
            border-radius="${options.border.radius}px"
            text-align="center"
            padding="${createPadding(options.padding)}"
            background-color="${options.background.color}"
            ${options.background.url ? `background-url="${options.background.url}"` : ''}
            background-repeat="${options.background.repeat}"
            background-size="${options.background.size ? createWidthHeight(options.background.size) : 'auto'}">
            ${this.createColumns()}
          </mj-section>
          ${bottomMarginSection}
      `;
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
            options: {disableResponsive = false, gaps = [4, 4], columns = []}
        } = this.structure;

        const columnsElements = elements.map((el, index) => {
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
        }).join('');

        if (disableResponsive) {
            return `<mj-group>${columnsElements}</mj-group>`;
        }

        return columnsElements;
    }
}
