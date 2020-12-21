import {ISocialBlockOptions, ISocialNetwork} from "../../mjml-output/interfaces";
import {MjmlToObject, TSupportedBlocks} from "../interfaces";

export class MjmlSocial extends MjmlToObject<ISocialBlockOptions> {
    type: TSupportedBlocks = "social"
    networks = this.block.find('mj-social-element').toArray().map(network => {
        return {
            name: network.attribs.name.replace('-noshare', ''),
            href: network.attribs.href,
            label: network.firstChild.data?.trim()
        } as ISocialNetwork
    })

    createOptions(): ISocialBlockOptions {
        return {
            align: this.extractAlign(),
            color: this.extractColor(),
            font: this.extractFont(),
            iconSize: this.extractLineHeight('icon-size', '30px'),
            innerPadding: this.extractPadding('inner-padding'),
            lineHeight: this.extractLineHeight(),
            mode: this.block.attr('mode') as 'horizontal' || 'horizontal',
            padding: this.extractPadding()
        }
    }
}
