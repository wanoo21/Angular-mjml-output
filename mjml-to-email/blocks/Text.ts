import {ITextBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlText extends MjmlToObject<ITextBlockOptions> {
    type: TSupportedBlocks = 'text';
    innerText = this.block.html()?.trim().replace(/<!-- htmlmin:ignore -->/g, '');

    createOptions(): ITextBlockOptions {
        return {
            color: this.extractColor(),
            font: this.extractFont(),
            lineHeight: this.extractLineHeight(),
            padding: this.extractPadding(),
        }
    }
}
