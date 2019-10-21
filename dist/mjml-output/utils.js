"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorder = ({ color = '#000000', style = 'solid', width = 4 }) => {
    return `${width}px ${style} ${color}`;
};
exports.createPadding = ({ top = 10, right = 25, bottom = 10, left = 25 }) => {
    return `${top}px ${right}px ${bottom}px ${left}px`;
};
exports.createFont = ({ family = 'Roboto', fallback = 'Arial, Helvetica, sans-serif', size = 13, style = 'normal', weight = 400 }) => {
    return {
        fontFamily: `${family}, ${fallback}`,
        fontSize: `${size}px`,
        fontStyle: style,
        fontWeight: weight
    };
};
exports.createBackground = ({ url = '', color = 'white', repeat = 'no-repeat' }) => {
    return `${color} ${url && `url(${url}) ${repeat} top center`}`;
};
exports.createLineHeight = ({ value = 22, unit = 'px' }) => {
    return unit !== 'none' ? `${value}${unit}` : '120%';
};
exports.createWidthHeight = ({ value = 100, unit = '%', auto = false }) => {
    return ((auto && 'auto') ||
        (['%', 'px'].includes(unit) && `${value}${unit}`) ||
        unit);
};
function ignoreHTMLMinParse(text) {
    return `<!-- htmlmin:ignore -->${text}<!-- htmlmin:ignore -->`;
}
exports.ignoreHTMLMinParse = ignoreHTMLMinParse;
function validateGap(gaps) {
    return !!(gaps % 2) ? gaps + 1 : gaps;
}
exports.validateGap = validateGap;
function defaultStructureColumnsWidth(type) {
    let columnsWidth = [1];
    if (type === 'cols_21') {
        columnsWidth = [4, 6];
    }
    else if (type === 'cols_12') {
        columnsWidth = [6, 4];
    }
    else if (type === 'cols_2') {
        columnsWidth = [5, 5];
    }
    else if (type === 'cols_3') {
        columnsWidth = [3.33, 3.33, 3.33];
    }
    else if (type === 'cols_4') {
        columnsWidth = [2.5, 2.5, 2.5, 2.5];
    }
    return columnsWidth;
}
exports.defaultStructureColumnsWidth = defaultStructureColumnsWidth;
