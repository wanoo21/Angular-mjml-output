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
        }
    }
    getColumnWidth(type, index) {
        if (type === 'cols_12') {
            return index === 0 ? 60 : 40;
        }
        return index === 0 ? 40 : 60;
    }
    render() {
        const { type, id, options, elements } = this.structure;
        return `
      <mj-section
        css-class="${type} ${id}"
        border-radius="${options.border.radius}px"
        vertical-align="top"
        text-align="center"
        padding="${utils_1.createPadding(options.padding)}"
        background-color="${options.background.color}"
        background-url="${options.background.url}"
        background-repeat="${options.background.repeat}"
        background-size="${options.background.size
            ? utils_1.createWidthHeight(options.background.size)
            : 'auto'}">
        ${elements.map((el, index) => {
            return `
            <mj-column
              ${['cols_12', 'cols_21'].includes(type)
                ? `width="${this.getColumnWidth(type, index)}%"`
                : ''}
              padding="0"
              vertical-align="top"
              css-class="ip-column">
              ${el.map(block => this.getBlock(block))}
            </mj-column>
            `;
        })}
      </mj-section>
      `;
    }
}
exports.Section = Section;
