import mjml2html from 'mjml';
import {minify} from 'html-minifier';

import {EmailTemplate} from './EmailTemplate';
import {IIPDefaultEmail} from './interfaces';

/**
 * Generate MJML from a JSON object with the email data
 * @param data Email data
 */
export function onlyMJML(data: IIPDefaultEmail & { googleFonts: string[] }) {
  return new EmailTemplate(data).render();
}

/**
 * Convert MJML to HTML with mjml2html
 * @param mjml MJML string
 * @param isProduction If the HTML should be minified, and the validation level should be soft
 */
export function convertMjmlToHtml(mjml: string, isProduction: boolean): { html: string, errors: any[] } {
  const {html, errors} = mjml2html(mjml, {
    fonts: {},
    keepComments: !isProduction,
    validationLevel: isProduction ? 'soft' : 'strict'
  })
  if (errors.length) {
    return {html: '', errors}
  }
  if (isProduction) {
    return {
      html: minify(html, {
        minifyCSS: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
      }), errors: [] // errors must be sent always
    };
  }
  return {html, errors: []};
}

/**
 * Convert an IIPDefaultEmail object to HTML and MJML
 * @param data IIPDefaultEmail object
 * @param isProduction If the HTML should be minified, and the validation level should be soft
 */
export function convertIPEmail(data: IIPDefaultEmail & { googleFonts: string[] }, isProduction: boolean): {
  html: string,
  mjml: string,
  errors: any[]
} {
  try {
    const mjml = onlyMJML(data);
    const {html, errors} = convertMjmlToHtml(mjml, isProduction);
    return {html, mjml, errors};
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

