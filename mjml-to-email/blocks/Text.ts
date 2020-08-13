import { ITextBlockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

interface IFullTextOptions extends ITextBlockOptions {
    innerText: string
}

export class MjmlText extends MjmlToObject<IFullTextOptions> {
    toObject(): IFullTextOptions {
        throw new Error("Method not implemented.");
    }
}