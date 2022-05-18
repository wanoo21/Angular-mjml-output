import {ISocialBlockOptions, ISocialNetwork, RenderingClass, SocialBlock} from '../interfaces';
import {createLineHeight, createPadding, ignoreHTMLMinParse} from '../utils';

export class Social implements SocialBlock, RenderingClass {
    constructor(public networks: ISocialNetwork[], public options: ISocialBlockOptions) {
    }

    static getSocialNetworkName(name: string) {
        const noShareNames = [
            'facebook',
            'twitter',
            'pinterest',
            'linkedin',
            'tumblr',
            'xing'
        ];
        if (noShareNames.includes(name)) {
            return `${name}-noshare`;
        }
        return name;
    }


    /**
     * @version 4
     * Add support for attributes:
     * container-background-color
     */
    render() {
        const {
            color,
            font,
            lineHeight,
            padding,
            innerPadding,
            iconSize,
            mode,
            align
        } = this.options;
        return `
          <mj-social
            color="${color}"
            align="${align}"
            font-family="${font.family}, ${font.fallback}"
            font-size="${font.size}px"
            font-style="${font.style}"
            font-weight="${font.weight}"
            icon-size="${iconSize.value}px"
            line-height="${createLineHeight(lineHeight)}"
            inner-padding="${createPadding(innerPadding)}"
            padding="${createPadding(padding)}"
            mode="${mode}">
              ${this.networks.map(({name, href, label}) =>
                `<mj-social-element name="${Social.getSocialNetworkName(name)}" href="${href}" >
                  ${label ? ignoreHTMLMinParse(label) : ''}
                </mj-social-element>`
        ).join('')}
          </mj-social>
        `;
    }
}
