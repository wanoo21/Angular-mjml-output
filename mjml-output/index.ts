import mjml2html from 'mjml';
import {minify} from 'html-minifier';

import {EmailTemplate} from './EmailTemplate';
import {IIPDefaultEmail} from './interfaces';

export function onlyMJML(data: IIPDefaultEmail & { googleFonts: string[] }) {
    return new EmailTemplate(data).render();
}

export function convertIPEmail(data: IIPDefaultEmail & { googleFonts: string[] }, isProduction: boolean) {
    try {
        const mjml = onlyMJML(data);
        const {html, errors} = mjml2html(mjml, {
            fonts: {},
            keepComments: !isProduction,
            beautify: !isProduction,
            validationLevel: isProduction ? 'soft' : 'strict'
        })
        if (errors.length) {
            return {html: '', mjml: '', errors}
        }
        if (isProduction) {
            return {
                mjml, html: minify(html, {
                    minifyCSS: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                })
            };
        }
        return {mjml, html};
    } catch (error: any) {
        return {
            html: '', mjml: '',
            errors: [{
                tagName: 'general',
                message: error.message
            }]
        };
    }
}

