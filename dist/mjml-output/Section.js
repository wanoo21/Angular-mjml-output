"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blocks_1 = require("./blocks");
const utils_1 = require("./utils");
class Section {
    constructor(structure) {
        this.structure = structure;
    }
    getBlock(block) {
        switch (block.type) {
            case 'text':
                return new blocks_1.Text(block.innerText, block.options).render();
            case 'image':
                return new blocks_1.Image(block.src, block.options).render();
            case 'button':
                return new blocks_1.Button(block.innerText, block.options).render();
            case 'divider':
                return new blocks_1.Divider(block.options).render();
            case 'spacer':
                return new blocks_1.Spacer(block.options).render();
            case 'social':
                return new blocks_1.Social(block.networks, block.options).render();
        }
    }
    getColumnWidth(index) {
        if (this.structure.type === 'cols_12') {
            return index === 0 ? 60 : 40;
        }
        return index === 0 ? 40 : 60;
    }
    createColumns() {
        const { type, elements, options: { disableResponsive = false, gaps = [4, 4] } } = this.structure;
        const columns = elements
            .map((el, index) => {
            return `
          <mj-column
            ${['cols_12', 'cols_21'].includes(type)
                ? `width="${this.getColumnWidth(index)}%"`
                : ``}
            padding="${gaps[0]}px ${gaps[1]}px"
            vertical-align="top"
            css-class="ip-column">
            ${el.map(block => this.getBlock(block)).join('')}
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
        text-align="center"
        padding="${utils_1.createPadding(options.padding)}"
        background-color="${options.background.color}"
        background-url="${options.background.url}"
        background-repeat="${options.background.repeat}"
        background-size="${options.background.size
            ? utils_1.createWidthHeight(options.background.size)
            : 'auto'}">
        ${this.createColumns()}
      </mj-section>
      `;
    }
}
exports.Section = Section;
