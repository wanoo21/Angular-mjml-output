import {IDividerBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

export class MjmlDivider extends MjmlToObject<IDividerBlockOptions> {
    toObject(): IDividerBlockOptions {
        return {} as IDividerBlockOptions
    }
}
