import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

import {Section} from './Section';
import {IIPDefaultEmail} from './interfaces';
import {createBackground, createPadding, createWidthHeight} from './utils';

export class EmailTemplate {
  // fontsMap = new Map();
  constructor(private template: IIPDefaultEmail & { googleFonts: string[] }) {
  }

  render(): string {
    const {structures, general} = this.template;

    return `
            <mjml>
                <mj-head>
                    ${general.name ? `<mj-title>${general.name}</mj-title>` : ''}
                    ${general.previewText ? `<mj-preview>${general.previewText}</mj-preview>` : ''}
                    ${this.getUsedFonts()}
                    <mj-attributes>
                        <mj-all padding="${createPadding(general.global.padding)}" direction="${general.direction}" font-family="Arial, Helvetica, sans-serif"></mj-all>
                    </mj-attributes>
                    <mj-style>
                        ${readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'styles.css'), {encoding: 'utf-8'})}
                    </mj-style>
                    <mj-style inline="inline">
                        ${readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'inline-styles.css'), {encoding: 'utf-8'})}
                        .body {
                          padding: ${createPadding(general.padding)};
                          background: ${createBackground(general.background)};
                          ${general.background.size ? `background-size: ${createWidthHeight(general.background.size)}` : ''};
                        }
                    </mj-style>
                </mj-head>
                <mj-body css-class="body" width="${createWidthHeight(general.width)}">
                    ${structures.map(structure => new Section(structure).render()).join('')}
                </mj-body>
            </mjml>
        `;
  }

  private getUsedFonts() {
    const {structures, googleFonts = []} = this.template;
    const usedFonts = new Set();
    const parsedFonts = new Map();

    googleFonts.filter(Boolean).forEach(font => {
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

    return [...usedFonts].map(family => {
      const font = parsedFonts.get(family);
      return !font || `<mj-font name="${family}" href="https://fonts.googleapis.com/css?family=${font}" />`;
    }).filter(Boolean).join('\n');
  }
}
