import {IButtonBlockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

interface IFullButtonOptions extends IButtonBlockOptions {
    innerText: string
}

export class MjmlButton extends MjmlToObject<IFullButtonOptions> {
    toObject(): IFullButtonOptions {
        return {} as IFullButtonOptions
    }
}
