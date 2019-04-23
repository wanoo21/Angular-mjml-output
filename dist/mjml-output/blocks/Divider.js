"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Divider {
    constructor(options) {
        this.options = options;
    }
    render() {
        const { padding, border } = this.options;
        return `
      <mj-divider
        css-class="ip-divider-block"
        border-color="${border.color}"
        border-style="${border.style}"
        border-width="${border.width}px"
        padding="${utils_1.createPadding(padding)}">
      </mj-divider>
    `;
    }
}
exports.Divider = Divider;
