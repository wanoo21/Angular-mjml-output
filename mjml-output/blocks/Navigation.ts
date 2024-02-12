import {
    INavigationBlockOptions,
    NavigationBlock,
    RenderingClass,
  } from "@mjml-output/interfaces";
  
  export class Navigation implements NavigationBlock, RenderingClass {
  
    constructor(public options: INavigationBlockOptions) {
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
                        font-size="${font.size}px"
                        font-style="${font.style}"
                        font-weight="${font.weight}"
                        letter-spacing="${letterSpacing}px"
                        text-decoration="${textDecoration}"
                        text-transform="none"
                        line-height="${lineHeight.value}${lineHeight.unit}"
                        padding-top="${padding.top}px"
                        padding-right="${padding.right}px"
                        padding-left="${padding.left}px"
                        padding-bottom="${padding.bottom}px">${el.label}</mj-navbar-link>`
        })}
            </mj-navbar>
        `;
    }
  }