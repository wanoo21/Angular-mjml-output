import {IImageBLockOptions} from "../../mjml-output/interfaces";

import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlImage extends MjmlToObject<IImageBLockOptions> {
    type: TSupportedBlocks = 'image'
    src = this.block.attr('src')

    createOptions(): IImageBLockOptions {
        return {
            align: this.extractAlign(),
            border: this.extractBorder(),
            link: this.extractLink(),
            padding: this.extractPadding(),
            title: this.block.attr('title') || "",
            width: this.extractWidthHeight(),
            height: this.extractWidthHeight('height'),
        }
    }
}
