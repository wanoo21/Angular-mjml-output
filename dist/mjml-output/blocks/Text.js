"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Text {
    constructor(innerText, options) {
        this.innerText = innerText;
        this.options = options;
    }
    render() {
        const { color, font, lineHeight, padding } = this.options;
        return `
      <mj-text
        css-class="ip-text-block"
        color="${color}"
        font-family="${font.family}, ${font.fallback}"
        font-size="${font.size}px"
        font-style="${font.style}"
        font-weight="${font.weight}"
        text-decoration="none"
        align="left"
        line-height="${utils_1.createLineHeight(lineHeight)}"
        padding="${utils_1.createPadding(padding)}">
          ${this.innerText || ''}
      </mj-text>
    `;
    }
}
exports.Text = Text;
