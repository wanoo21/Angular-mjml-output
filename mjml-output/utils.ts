import {
  IFont,
  IPadding,
  IBorder,
  ILineHeight,
  IWidthHeight,
  IBackground,
  TStructreTypes
} from './interfaces';

export const createBorder = ({
  color = '#000000',
  style = 'solid',
  width = 4
}: IBorder): string => {
  return `${width}px ${style} ${color}`;
};

export const createPadding = ({
  top = 10,
  right = 25,
  bottom = 10,
  left = 25
}: IPadding): string => {
  return `${top}px ${right}px ${bottom}px ${left}px`;
};

export const createFont = ({
  family = 'Roboto',
  fallback = 'Arial, Helvetica, sans-serif',
  size = 13,
  style = 'normal',
  weight = 400
}: IFont) => {
  return {
    fontFamily: `${family}, ${fallback}`,
    fontSize: `${size}px`,
    fontStyle: style,
    fontWeight: weight
  };
};

export const createBackground = ({
  url = '',
  color = 'white',
  repeat = 'no-repeat'
}: IBackground): string => {
  return `${color} ${url && `url(${url}) ${repeat} top center`}`;
};

export const createLineHeight = ({
  value = 22,
  unit = 'px'
}: ILineHeight): string | number => {
  return unit !== 'none' ? `${value}${unit}` : '120%';
};

export const createWidthHeight = ({
  value = 100,
  unit = '%',
  auto = false
}: IWidthHeight): string => {
  return (
    (auto && 'auto') ||
    (['%', 'px'].includes(unit) && `${value}${unit}`) ||
    unit
  );
};

export function ignoreHTMLMinParse(text: string) {
  return `<!-- htmlmin:ignore -->${text}<!-- htmlmin:ignore -->`;
}

export function validateGap(gaps: number) {
  return !!(gaps % 2) ? gaps + 1 : gaps;
}

export function defaultStructureColumnsWidth(type: TStructreTypes) {
  let columnsWidth = [1];
  if (type === 'cols_21') {
    columnsWidth = [4, 6];
  } else if (type === 'cols_12') {
    columnsWidth = [6, 4];
  } else if (type === 'cols_2') {
    columnsWidth = [5, 5];
  } else if (type === 'cols_3') {
    columnsWidth = [3.33, 3.33, 3.33];
  } else if (type === 'cols_4') {
    columnsWidth = [3, 3, 3, 3];
  }
  return columnsWidth;
}
