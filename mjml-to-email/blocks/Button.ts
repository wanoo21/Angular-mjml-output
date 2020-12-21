import {IButtonBlockOptions} from "../../mjml-output/interfaces";

import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlButton extends MjmlToObject<IButtonBlockOptions> {
    type: TSupportedBlocks = 'button'
    innerText = this.block.text().trim()

    createOptions(): IButtonBlockOptions {
        return {
            align: this.extractAlign(),
            backgroundColor: this.block.attr('background-color') || '#fff',
            border: this.extractBorder(),
            color: this.extractColor(),
            font: this.extractFont(),
            fullWidth: !Boolean(this.block.attr('width')),
            innerPadding: this.extractPadding('inner-padding'),
            lineHeight: this.extractLineHeight(),
            link: this.extractLink(),
            padding: this.extractPadding()
        }
    }
}
