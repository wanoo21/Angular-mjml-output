import {
    HtmlBlock, IHtmlBlockOptions,
    RenderingClass,
} from "@mjml-output/interfaces";

export class Navigation implements HtmlBlock, RenderingClass {

    constructor(public innerHtml: string, public options: IHtmlBlockOptions) {
    }

    render(): string {
        return `
            <mj-raw>${this.innerHtml}</mj-raw>
        `;
    }
}
