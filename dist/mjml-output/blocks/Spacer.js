"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Spacer {
    constructor(options) {
        this.options = options;
    }
    render() {
        return `
      <mj-spacer
        css-class="ip-spacer-block"
        padding="0"
        height="${utils_1.createWidthHeight(this.options.height)}"></mj-spacer>
    `;
    }
}
exports.Spacer = Spacer;
