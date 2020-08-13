import { ISocialNetwork, ISocialBlockOptions } from "@mjml-output/interfaces";
import { MjmlToObject } from "@mjml-to-email/interfaces";

interface IFullSocialOptions {
    networks: ISocialNetwork[],
    options: ISocialBlockOptions
}

export class MjmlSocial extends MjmlToObject<IFullSocialOptions> {
    toObject(): IFullSocialOptions {
        throw new Error("Method not implemented.");
    }
}