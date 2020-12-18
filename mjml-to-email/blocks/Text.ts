import {ITextBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

interface IFullTextOptions extends ITextBlockOptions {
    innerText: string
}

export class MjmlText extends MjmlToObject<IFullTextOptions> {
    toObject(): IFullTextOptions {
        return {} as IFullTextOptions
    }
}
