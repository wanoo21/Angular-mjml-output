export interface RenderingClass {
  render(): string;
}

export abstract class TextBlock {
  readonly type?: 'text';
  readonly icon?: string;
  constructor(public innerText: string, public options: ITextBlockOptions) {}
}

export abstract class ImageBlock {
  readonly type?: 'image';
  readonly icon?: string;
  constructor(public src: string, public options: IImageBLockOptions) {}
}

export abstract class ButtonBlock {
  readonly type?: 'button';
  readonly icon?: string;
  constructor(public innerText: string, public options: IButtonBlockOptions) {}
}

export abstract class DividerBlock {
  readonly type?: 'divider';
  readonly icon?: string;
  constructor(public options: IDividerBlockOptions) {}
}

export abstract class SpacerBlock {
  readonly type?: 'spacer';
  readonly icon?: string;
  constructor(public options: ISpacerBlockOptions) {}
}

export type IpBlocks =
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | DividerBlock
  | SpacerBlock;

export interface IForRootConf {
  ApiToken: string;
  OwnerEmail: string;
}

export type TStructreTypes =
  | 'cols_1'
  | 'cols_2'
  | 'cols_3'
  | 'cols_4'
  | 'cols_12'
  | 'cols_21';
export type TDirection = 'ltr' | 'rtl' | 'inherit';
export type TUnits = '%' | 'px' | 'cover' | 'contain';
export type TAlign = 'left' | 'center' | 'right';
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

export interface IStructureOptions {
  border: IBorder;
  background: IBackground;
  padding: IPadding;
  margin: IMargin;
  disableResponsive?: boolean;
  // direction: TDirection;
}

export interface IStructure {
  readonly type: TStructreTypes;
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

export interface IDividerBlockOptions {
  border: IBorder;
  padding: IPadding;
}

export interface ISpacerBlockOptions {
  height: IWidthHeight;
}

export interface IGeneralOptions {
  width: IWidthHeight;
  background: IBackground;
  padding: IPadding;
  direction: TDirection;
  previewText: string;
  global: {
    fonts: string[];
    padding: IPadding;
  };
}

export interface IIPDefaultEmail {
  general: IGeneralOptions;
  structures: IStructure[];
}
