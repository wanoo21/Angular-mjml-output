import {ISpacerBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

export class MjmlSpacer extends MjmlToObject<ISpacerBlockOptions> {
    toObject(): ISpacerBlockOptions {
        return {} as ISpacerBlockOptions
    }
}
