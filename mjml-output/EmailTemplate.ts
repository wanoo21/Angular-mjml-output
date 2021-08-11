import {readFileSync} from "fs";
import {join} from "path";

import {Section} from './Section';
import {IIPDefaultEmail} from './interfaces';
import {createBackground, createBorder, createPadding, createWidthHeight} from './utils';

export class EmailTemplate {
    // fontsMap = new Map();
    constructor(
        private template: IIPDefaultEmail & { googleFonts: string[] }
    ) {
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
            ${readFileSync(join(__dirname, 'editor-styles.css'), {encoding: 'utf-8'})}
          </mj-style>
          <mj-style inline="inline">
            <!--TODO extract all structures styles-->
            ${this.getStructuresStyles()}
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
