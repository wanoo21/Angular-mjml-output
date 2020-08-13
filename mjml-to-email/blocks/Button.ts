import { IButtonBlockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

interface IFullButtonOptions extends IButtonBlockOptions {
    innerText: string
}

export class MjmlButton extends MjmlToObject<IFullButtonOptions> {
    toObject(): IFullButtonOptions {
        throw new Error("Method not implemented.");
    }
}