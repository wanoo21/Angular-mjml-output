import { IImageBLockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

interface IFullImageOptions extends IImageBLockOptions {
    src: string
}

export class MjmlImage extends MjmlToObject<IFullImageOptions> {
    toObject(): IFullImageOptions {
        throw new Error("Method not implemented.");
    }
}