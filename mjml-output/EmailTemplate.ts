import {Section} from './Section';
import {IIPDefaultEmail} from './interfaces';
import {createBackground, createBorder, createPadding, createWidthHeight} from './utils';

export class EmailTemplate {
    // fontsMap = new Map();
    constructor(private template: IIPDefaultEmail & { googleFonts: string[] }) {
    }

    render(): string {
        const {structures, general} = this.template;

        return `
      <mjml>
        <mj-head>
        <mj-title>${general.name}</mj-title>
        <mj-preview>${general.previewText}</mj-preview>
        ${this.getUsedFonts()}
        <mj-attributes>
          <mj-all
            padding="${createPadding(general.global.padding)}"
            direction="${general.direction}"
            font-family="Arial, Helvetica, sans-serif"
          ></mj-all>
          </mj-attributes>
          <mj-style>
            <!--[if mso | IE]>
              .ip-section {border: 0!important, border-radius: 0!important}
            <![endif]-->
          </mj-style>
          <mj-style inline="inline">
            <!--TODO extract all structures styles-->
            ${this.getStructuresStyles()}
            .ip-text-block p, h1, h2, h3, h4, h5, h6 {
              margin: 0;
            }
            .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
              font-weight: inherit;
              line-height: inherit;
            }
            .ip-text-block h1 {
              font-size: 2em;
            }
            .ip-text-block h2,
            .ql-size-large {
              font-size: 1.5em;
            }
            .ip-text-block h3 {
              font-size: 1.17em;
            }
            .ip-text-block h4 {
              font-size: 1em;
            }
            .ip-text-block h5 {
              font-size: 0.83em;
            }
            .ip-text-block h6 {
              font-size: 0.67em;
            }
            .ip-text-block .ql-size-small {
              font-size: 0.75em;
            }
            .ip-text-block .ql-size-huge {
              font-size: 2.5em;
            }
            .ip-text-block .ql-align-left {
              text-align: left;
            }
            .ip-text-block .ql-align-center {
              text-align: center;
            }
            .ip-text-block .ql-align-right {
              text-align: right;
            }
            .ip-text-block .ql-align-justify {
              text-align: justify;
            }
            .ip-text-block .ql-direction-rtl {
              direction: rtl;
            }
            .ip-text-block .ql-direction-ltr {
              direction: ltr;
            }
            .ip-column.ip-border-radius table {
              border-collapse: separate !important;
            }
            .body {
              padding: ${createPadding(general.padding)};
              background: ${createBackground(general.background)};
              ${general.background.size ? `background-size: ${createWidthHeight(general.background.size)}` : ''};
            }
          </mj-style>
        </mj-head>
        <mj-body
          css-class="body"
          width="${createWidthHeight(general.width)}"
          background-color="${general.background.color}">
            ${structures.map(structure => new Section(structure).render()).join('')}
        </mj-body>
      </mjml>
    `;
    }

    private getUsedFonts() {
        const {
            general: {
                // Keep support for old templates
                global: {fonts}
            },
            structures
        } = this.template;
        const usedFonts = new Set();
        const parsedFonts = new Map();

        (this.template.googleFonts || fonts || []).filter(Boolean).forEach(font => {
            const match = font.match(/[^\d:,]{2,}/g);
            if (match) {
                const [family] = match;
                parsedFonts.set(family.replace('+', ' '), font);
            }
        });

        structures.forEach(({elements}) => {
            elements.forEach(column => {
                column.forEach(({options}) => {
                    // @ts-ignore
                    if (options.font) {
                        // @ts-ignore
                        usedFonts.add(options.font.family);
                    }
                });
            });
        });

        return [...usedFonts].filter(Boolean).map(family => {
            const font = parsedFonts.get(family);
            return `<mj-font name="${family}" href="https://fonts.googleapis.com/css?family=${font}" />`;
        });
    }

    private getStructuresStyles() {
        return this.template.structures
            .map(({id, options: {margin, border}}) => {
                return `.${id} {
          margin-top: ${margin.top}px !important;
          margin-bottom: ${margin.bottom}px !important;
          border: ${createBorder(border)};
        }`;
            })
            .join('');
    }
}
