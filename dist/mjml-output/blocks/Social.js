"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Social {
    constructor(networks, options) {
        this.networks = networks;
        this.options = options;
    }
    getSocialNetworkName(name) {
        const noShareNames = [
            'facebook',
            'twitter',
            'pinterest',
            'linkedin',
            'tumblr',
            'xing'
        ];
        if (noShareNames.includes(name)) {
            return `${name}-noshare`;
        }
        return name;
    }
    render() {
        const { color, font, lineHeight, padding, innerPadding, iconSize, mode, align } = this.options;
        return `
      <mj-social
        color="${color}"
        align="${align}"
        font-family="${font.family}, ${font.fallback}"
        font-size="${font.size}px"
        font-style="${font.style}"
        font-weight="${font.weight}"
        icon-size="${iconSize.value}px"
        line-height="${utils_1.createLineHeight(lineHeight)}"
        inner-padding="${utils_1.createPadding(innerPadding)}"
        padding="${utils_1.createPadding(padding)}"
        mode="${mode}">
          ${this.networks
            .map(({ name, href, label }) => `<mj-social-element
                        name="${this.getSocialNetworkName(name)}"
                        href="${href}" >
                      ${label ? utils_1.ignoreHTMLMinParse(label) : ''}
                    </mj-social-element>`)
            .join('')}
      </mj-social>
    `;
    }
}
exports.Social = Social;
