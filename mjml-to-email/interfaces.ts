import {
  IBorder,
  IFont,
  ILineHeight,
  ILink,
  IPadding,
  ISocialNetwork,
  IWidthHeight,
  TAlign,
  TLinkTarget
} from "../mjml-output/interfaces";
import {extractBorder, extractPadding} from "../mjml-output/utils";

export type TSupportedBlocks = 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'social'

export abstract class MjmlToObject<T> {
  abstract type: TSupportedBlocks;
  innerText?: string;
  src?: string;
  networks?: ISocialNetwork[]

  constructor(public block: cheerio.Cheerio) {
  };

  abstract createOptions(): T;

  toObject(): { type: TSupportedBlocks, options: T, innerText?: string, src?: string } {
    return {
      type: this.type,
      options: this.createOptions(),
      ...(this.innerText && {innerText: this.innerText}),
      ...(this.src && {src: this.src}),
      ...(this.networks && {networks: this.networks})
    }
  }

  extractPadding(unit: 'padding' | 'inner-padding' = 'padding'): IPadding {
    return extractPadding(this.block.attr(unit))
  }

  extractBorder(): IBorder {
    return {
      ...extractBorder(this.block.attr('border')),
      radius: parseInt(this.block.attr('border-radius') || '0px'),
      size: {top: 0, right: 0, bottom: 0, left: 0}
    }
  }

  extractFont(): IFont {
    const [family, ...fallback] = (this.block.attr('font-family') || 'Roboto, Arial, Helvetica, sans-serif').split(', ')
    const fontWeight = this.block.attr('font-weight')
    return {
      size: parseInt(this.block.attr('font-size') || '13px'),
      style: this.block.attr('font-style') as "normal" || 'normal',
      weight: Number(fontWeight) || fontWeight as "normal" || 400,
      family,
      fallback: fallback.join(', ')
    }
  }

  extractLineHeight(unit: 'line-height' | 'icon-size' = 'line-height', defaultSize = '22px'): ILineHeight {
    const [lineHeightUnit] = (this.block.attr(unit) || defaultSize).match(/([^\d+]\w+)/g) || ['px']
    return {
      unit: lineHeightUnit as "px",
      value: parseInt(this.block.attr(unit) || defaultSize)
    }
  }

  extractColor(): string {
    return this.block.attr('color') || '#000'
  }

  extractLink(): ILink {
    return {
      href: this.block.attr('href') || '#',
      target: this.block.attr('target') as TLinkTarget || '_blank',
    }
  }

  extractWidthHeight(unit: 'width' | 'height' = "width"): IWidthHeight {
    return {
      auto: !Boolean(this.block.attr(unit)),
      value: parseInt(this.block.attr(unit) || ""),
      unit: 'px'
    }
  }

  extractAlign(): TAlign {
    return this.block.attr('align') as TAlign || "left"
  }
}
