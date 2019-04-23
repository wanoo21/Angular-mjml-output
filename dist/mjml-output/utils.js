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
