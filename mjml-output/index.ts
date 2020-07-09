import mjml2html from 'mjml';
import { EmailTemplate } from './EmailTemplate';
import { IIPDefaultEmail } from './interfaces';

export function onlyMJML(data: IIPDefaultEmail & { googleFonts: string[] }) {
  return new EmailTemplate(data).render();
}

export default (data: IIPDefaultEmail & { googleFonts: string[] }, isProduction: boolean) => {
  try {
    const mjml = onlyMJML(data);
    return {
      ...mjml2html(mjml, {
        fonts: {},
        keepComments: !isProduction,
        minify: isProduction,
        beautify: !isProduction,
        validationLevel: isProduction ? 'soft' : 'strict'
      }),
      mjml
    };
  } catch (error) {
    return {
      html: '',
      mjml: '',
      errors: [{
        tagName: 'general',
        message: error.message
      }]
    };
  }
};
