export interface RenderingClass {
  render(): string;
}

export abstract class NavigationBlock {
  readonly type?: 'navigation';
  protected constructor(public options: INavigationBlockOptions) {
  }
}

export abstract class HtmlBlock {
  readonly type?: 'html';
  protected constructor(public innerHtml: string) {
  }
}

export abstract class TextBlock {
  readonly type?: 'text';
  protected constructor(public innerText: string, public options: ITextBlockOptions) { }
}

export abstract class ImageBlock {
  readonly type?: 'image';
  protected constructor(public src: string, public options: IImageBLockOptions) { }
}

export abstract class ButtonBlock {
  readonly type?: 'button';
  protected constructor(public innerText: string, public options: IButtonBlockOptions) { }
}

export abstract class DividerBlock {
  readonly type?: 'divider';
  protected constructor(public options: IDividerBlockOptions) { }
}

export abstract class SpacerBlock {
  readonly type?: 'spacer';
  protected constructor(public options: ISpacerBlockOptions) { }
}

export abstract class SocialBlock {
  readonly type?= 'social';

  protected constructor(
    public networks: ISocialNetwork[],
    public options: ISocialBlockOptions
  ) { }
}

export type IpBlocks =
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | DividerBlock
  | SpacerBlock
  | NavigationBlock
  | SocialBlock;

export interface IForRootConf {
  ApiToken: string;
  OwnerEmail: string;
}

export interface ISize {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export type TStructureTypes =
  | 'cols_1'
  | 'cols_2'
  | 'cols_3'
  | 'cols_4'
  | 'cols_12'
  | 'cols_21';
export type TDirection = 'ltr' | 'rtl' | 'inherit';
export type TUnits = '%' | 'px' | 'cover' | 'contain';
export type TAlign = 'left' | 'center' | 'right';
export type TVerticalAlign = 'top' | 'middle' | 'bottom';
export type TLineHeight = '%' | 'px' | 'none';
export type TLinkTarget = '_blank' | '_self' | '_parent' | '_top';
export type TFontStyle = 'italic' | 'normal' | 'oblique';
export type TFontWeight =
  | number
  | 'bold'
  | 'bolder'
  | 'inherit'
  | 'initial'
  | 'light'
  | 'normal';
export type TBackgroundRepeat =
  | 'no-repeat'
  | 'repeat'
  | 'repeat-x'
  | 'repeat-y'
  | 'round'
  | 'space';

export interface IBorder {
  color: string;
  style: string;
  size: ISize;
  width: number;
  radius?: number;
}

export interface IPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface IMargin {
  top: number;
  bottom: number;
}

export interface IWidthHeight {
  value: number;
  unit: TUnits;
  auto?: boolean;
  units?: TUnits[];
}

export interface IBackground {
  color: string;
  url?: string;
  repeat?: TBackgroundRepeat;
  size?: IWidthHeight;
}

export interface IFont {
  family: string;
  fallback: string;
  size: number;
  style?: TFontStyle;
  weight?: TFontWeight;
}

export type IFontFamily = Map<string, string>;

export interface ILineHeight {
  value: number;
  unit: TLineHeight;
}

export interface ILink {
  href: string;
  target: TLinkTarget;
}

export interface IStructureColumnOptions {
  background: IBackground;
  border: Omit<IBorder, 'size'>;
  verticalAlign: TVerticalAlign;
}

export interface IStructureOptions {
  border: Omit<IBorder, 'size'>;
  background: IBackground;
  padding: IPadding;
  margin: IMargin;
  disableResponsive: boolean;
  fullWidth?: boolean;
  gaps: [number, number];
  columnsWidth: number[];
  columns: IStructureColumnOptions[];
}

export interface IStructure {
  readonly type: TStructureTypes;
  readonly id: number;
  options: IStructureOptions;
  elements: IpBlocks[][];
  readonly columns: number;
}

export interface IBlockState {
  disabled: boolean;
  message: string;
}

export interface ITextBlockOptions {
  color: string;
  font: IFont;
  lineHeight: ILineHeight;
  padding: IPadding;
}


export interface IImageBLockOptions {
  border: IBorder;
  width: IWidthHeight;
  height: IWidthHeight;
  link: ILink;
  align: TAlign;
  title: string;
  padding: IPadding;
}

export interface IButtonBlockOptions {
  backgroundColor: string;
  border: IBorder;
  color: string;
  font: IFont;
  align: TAlign;
  fullWidth?: boolean;
  lineHeight: ILineHeight;
  link: ILink;
  innerPadding: IPadding;
  padding: IPadding;
}

export interface INavigationBlockOptions {
  align: TAlign;
  hamburger: boolean;
  color: string;
  font: IFont;
  lineHeight: ILineHeight;
  letterSpacing: number;
  padding: IPadding;
  target: string;
  textDecoration: "underline" | "overline" | "none";
  elements: { label: string, href: string }[];
}

export interface IHtmlBlockOptions {

}

export interface IDividerBlockOptions {
  border: Omit<IBorder, 'size'>;
  padding: IPadding;
}

export interface ISpacerBlockOptions {
  height: IWidthHeight;
}

export interface ISocialBlockOptions {
  align: TAlign;
  mode: 'vertical' | 'horizontal';
  font: IFont;
  iconSize: ILineHeight;
  lineHeight: ILineHeight;
  color: string;
  innerPadding: IPadding;
  padding: IPadding;
}

export interface ISocialNetwork {
  href: string;
  target: string;
  label: string;
  name:
  | 'github'
  | 'instagram'
  | 'web'
  | 'snapchat'
  | 'youtube'
  | 'vimeo'
  | 'medium'
  | 'soundcloud'
  | 'dribbble'
  | 'facebook'
  | 'twitter'
  | 'pinterest'
  | 'linkedin'
  | 'tumblr'
  | 'xing';
  padding: IPadding;
}

export interface IGeneralOptions {
  width: IWidthHeight;
  background: IBackground;
  padding: IPadding;
  direction: TDirection;
  previewText: string;
  name?: string;
  global: {
    fonts: string[];
    padding: IPadding;
  };
}

export interface IIPDefaultEmail {
  general: IGeneralOptions;
  structures: IStructure[];
}

export class IPEmail {
  constructor(public general: Partial<IGeneralOptions>, public structures: IStructure[]) { }
}
