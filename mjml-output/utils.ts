import {IBackground, IBorder, IFont, ILineHeight, IPadding, IWidthHeight, TStructureTypes} from './interfaces';
import {Declaration, Rule, StyleRules} from "css";

export function createBorder({color = '#000000', style = 'solid', width = 4}: Omit<IBorder, 'size'>): string {
    if (width <= 0) return '0';
    return `${width}px ${style} ${color}`;
}

export function extractBorder(border: string | undefined): Omit<IBorder, "size"> {
    if (!border) return {width: 4, style: 'solid', color: '#000000'}
    const [width, style, color] = border.split(' ');
    return {width: parseInt(width), color, style}
}

export function createPadding({top = 10, right = 25, bottom = 10, left = 25}: IPadding): string {
    return `${top}px ${right}px ${bottom}px ${left}px`;
}

export function extractPadding(padding?: string): IPadding {
    if (!padding) return {top: 10, right: 25, bottom: 10, left: 25};
    const [top = 10, right = 25, bottom = 10, left = 25] = padding.split(' ').map(n => parseInt(n))
    return {top, right, bottom, left}
}

export function createFont({
                               family = 'Roboto',
                               fallback = 'Arial, Helvetica, sans-serif',
                               size = 13,
                               style = 'normal',
                               weight = 400
                           }: IFont) {
    return {
        fontFamily: `${family}, ${fallback}`,
        fontSize: `${size}px`,
        fontStyle: style,
        fontWeight: weight
    };
}

export const createBackground = ({
                                     url = '',
                                     color = 'white',
                                     repeat = 'no-repeat'
                                 }: IBackground): string => {
    return `${color} ${url && `url(${url}) ${repeat} top center`}`;
};

export function createLineHeight({value = 22, unit = 'px'}: ILineHeight): string | number {
    return unit !== 'none' ? `${value}${unit}` : '120%';
}

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

export function defaultStructureColumnsWidth(type: TStructureTypes) {
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
        columnsWidth = [2.5, 2.5, 2.5, 2.5];
    }
    return columnsWidth;
}

export function extractStyles(styleRules: StyleRules | undefined, selector: string): (prop?: string) => string | undefined;
export function extractStyles(styleRules: StyleRules | undefined, selector: string): () => { property: string | undefined; value: string | undefined; }[] | undefined;
export function extractStyles(styleRules: StyleRules | undefined, selector: string) {
    const styles = styleRules?.rules.filter(({type}: Rule) => type === 'rule') as Rule[];
    const properties = styles.find((rule: Rule) => rule.selectors?.includes(selector))
        ?.declarations?.map(({property, value}: Declaration) => ({property, value}))

    return function (prop?: string) {
        if (prop) {
            return properties?.find(({property}) => property === prop)?.value
        } else {
            return properties;
        }
    }
}
