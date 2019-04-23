"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Image {
    constructor(src, options) {
        this.src = src;
        this.options = options;
    }
    render() {
        const { border, width, height, link, align, title, padding } = this.options;
        return `
      <mj-image
        css-class="ip-image-block"
        padding="${utils_1.createPadding(padding)}"
        border="${utils_1.createBorder(border)}"
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
exports.Image = Image;
