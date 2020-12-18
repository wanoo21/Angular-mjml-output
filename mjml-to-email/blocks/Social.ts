import {ISocialBlockOptions, ISocialNetwork} from "../../mjml-output/interfaces";
import {MjmlToObject} from "../interfaces";

interface IFullSocialOptions {
    networks: ISocialNetwork[],
    options: ISocialBlockOptions
}

export class MjmlSocial extends MjmlToObject<IFullSocialOptions> {
    toObject(): IFullSocialOptions {
        return {} as IFullSocialOptions
    }
}
