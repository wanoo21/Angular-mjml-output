"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextBlock {
    constructor(innerText, options) {
        this.innerText = innerText;
        this.options = options;
    }
}
exports.TextBlock = TextBlock;
class ImageBlock {
    constructor(src, options) {
        this.src = src;
        this.options = options;
    }
}
exports.ImageBlock = ImageBlock;
class ButtonBlock {
    constructor(innerText, options) {
        this.innerText = innerText;
        this.options = options;
    }
}
exports.ButtonBlock = ButtonBlock;
class DividerBlock {
    constructor(options) {
        this.options = options;
    }
}
exports.DividerBlock = DividerBlock;
class SpacerBlock {
    constructor(options) {
        this.options = options;
    }
}
exports.SpacerBlock = SpacerBlock;
class SocialBlock {
    constructor(networks, options) {
        this.networks = networks;
        this.options = options;
        this.type = 'social';
    }
}
exports.SocialBlock = SocialBlock;
