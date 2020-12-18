import {IImageBLockOptions} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

interface IFullImageOptions extends IImageBLockOptions {
    src: string
}

export class MjmlImage extends MjmlToObject<IFullImageOptions> {
    toObject(): IFullImageOptions {
        return {} as IFullImageOptions
    }
}
