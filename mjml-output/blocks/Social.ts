import {
  RenderingClass,
  SocialBlock,
  ISocialNetwork,
  ISocialBlockOptions
} from '../interfaces';
import { createPadding, createLineHeight, ignoreHTMLMinParse } from '../utils';

export class Social implements SocialBlock, RenderingClass {
  constructor(
    public networks: ISocialNetwork[],
    public options: ISocialBlockOptions
  ) {}

  private getSocialNetworkName(name: string) {
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
          ${this.networks
            .map(
              ({ name, href, label }) => `<mj-social-element
                        name="${this.getSocialNetworkName(name)}"
                        href = "${href}" >
                      ${label ? ignoreHTMLMinParse(label) : ''}
                    </mj-social-element>`
            )
            .join('')}
      </mj-social>
    `;
  }
}
