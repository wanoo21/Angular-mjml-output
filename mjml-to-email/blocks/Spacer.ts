import { ISpacerBlockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

export class MjmlSpacer extends MjmlToObject<ISpacerBlockOptions> {
    toObject(): ISpacerBlockOptions {
        throw new Error("Method not implemented.");
    }
}