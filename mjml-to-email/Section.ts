import { MjmlToObject } from "@mjml-to-email/interfaces";
import { IStructure } from "@mjml-output/interfaces";

export class MjmlSection extends MjmlToObject<IStructure> {
    toObject(): IStructure {
        throw new Error("Method not implemented.");
    }
}