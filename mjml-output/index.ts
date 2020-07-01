import mjml2html from 'mjml';
import { EmailTemplate } from './EmailTemplate';
import { IIPDefaultEmail } from './interfaces';

export function onlyMJML(...args: [IIPDefaultEmail, string[]]) {
  return new EmailTemplate(...args).render();
}

export default (data: [IIPDefaultEmail, string[]], isProduction: boolean) => {
  try {
    const mjml = onlyMJML(...data);
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
      errors: [error.message]
    };
  }
};
