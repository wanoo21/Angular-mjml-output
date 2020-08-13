import { IDividerBlockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

export class MjmlDivider extends MjmlToObject<IDividerBlockOptions> {
    toObject(): IDividerBlockOptions {
        throw new Error("Method not implemented.");
    }
}