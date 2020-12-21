import {ISpacerBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlSpacer extends MjmlToObject<ISpacerBlockOptions> {
    type: TSupportedBlocks = 'spacer'

    createOptions(): ISpacerBlockOptions {
        return {height: this.extractWidthHeight('height')};
    }
}
