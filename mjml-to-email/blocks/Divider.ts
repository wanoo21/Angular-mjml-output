import {IDividerBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlDivider extends MjmlToObject<IDividerBlockOptions> {
    type: TSupportedBlocks = 'divider'

    createOptions(): IDividerBlockOptions {
        return {border: this.extractBorder(), padding: this.extractPadding()};
    }
}
