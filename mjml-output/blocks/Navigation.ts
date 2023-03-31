import {
    INavigationBlockOptions,
    NavigationBlock,
    RenderingClass,
} from "@mjml-output/interfaces";

export class Navigation implements NavigationBlock, RenderingClass {

    constructor(public innerText: string, public options: INavigationBlockOptions) {
    }

    render(): string {
        const {
            color,
            font,
            align,
            lineHeight,
            elements,
            target,
            padding,
            letterSpacing,
            textDecoration,
            hamburger
        } = this.options

        return `
            <mj-navbar align="${align}" hamburger="${hamburger ? 'hamburger' :  ''}">
               ${elements.map((el) => {
            return `<mj-navbar-link 
                        href="${el.href}"
                        color="${color}"
                        target="${target}"
                        font-family="${font.family}"
                        font-size="${font.size}"
                        font-style="${font.style}"
                        font-weight="${font.weight}"
                        letter-spacing="${letterSpacing}px"
                        text-decoration="${textDecoration}"
                        line-height="${lineHeight}"
                        padding-top="${padding.top}"
                        padding-right="${padding.right}"
                        padding-left="${padding.left}"
                        padding-bottom="${padding.bottom}"></mj-navbar-link>`
        })}
            </mj-navbar>
        `;
    }
}
