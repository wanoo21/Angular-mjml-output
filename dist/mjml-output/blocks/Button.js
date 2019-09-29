"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Button {
    constructor(innerText, options) {
        this.innerText = innerText;
        this.options = options;
    }
    render() {
        const { backgroundColor, border, color, font, align, lineHeight, link, innerPadding, padding, fullWidth } = this.options;
        return `
      <mj-button css-class="ip-button-block"
        ${fullWidth ? 'width="100%"' : ''}
        background-color="${backgroundColor}"
        border="${utils_1.createBorder(border)}"
        border-radius="${border.radius}px"
        color="${color}"
        align="${align}"
        vertical-align="middle"
        line-height="${utils_1.createLineHeight(lineHeight)}"
        href="${link.href}"
        target="${link.target}"
        padding="${utils_1.createPadding(padding)}"
        inner-padding="${utils_1.createPadding(innerPadding)}"
        font-family="${font.family}, ${font.fallback}"
        font-size="${font.size}px"
        font-style="${font.style}"
        font-weight="${font.weight}">
          ${utils_1.ignoreHTMLMinParse(this.innerText)}
      </mj-button>
    `;
    }
}
exports.Button = Button;
