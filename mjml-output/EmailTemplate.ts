import { Section } from './Section';
import { IIPDefaultEmail } from './interfaces';
import { createPadding, createWidthHeight, createBackground } from './utils';

export class EmailTemplate {
  constructor(private templateOptions: IIPDefaultEmail) {}

  // https://www.google-analytics.com/collect?v=1%20&tid=UA-90789315-6%20&cid=12345%20&t=event%20&ec=email%20&ea=open%20&el=recipient_id%20&cs=newsletter%20&cm=email%20&cn=Campaign_Name

  render(): string {
    const { structures, general } = this.templateOptions;
    return `
      <mjml>
        <mj-head>
        <mj-attributes>
          <mj-all
            padding="${createPadding(general.global.padding)}"
            direction="${general.direction}"
            font-family="Roboto"
          ></mj-all>
        </mj-attributes>
          <mj-style inline="inline">
            html, body, .body { height: 100%; }
            .body {
              padding: ${createPadding(general.padding)};
              background: ${createBackground(general.background)};
              ${general.background.size &&
                `background-size: ${createWidthHeight(
                  general.background.size
                )}`};
            }
          </mj-style>
        </mj-head>
        <mj-body
          css-class="body"
          width="${createWidthHeight(general.width)}"
          background-color="${general.background.color}">
            ${structures.map(structure => new Section(structure).render())}
        </mj-body>
      </mjml>
    `;
  }
}
