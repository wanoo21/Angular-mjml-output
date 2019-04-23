import mjml2html from 'mjml';
import { EmailTemplate } from './EmailTemplate';
import { IIPDefaultEmail } from './interfaces';

export function onlyMJML(templateOptions: IIPDefaultEmail) {
  return new EmailTemplate(templateOptions).render();
}

export default (templateOptions: IIPDefaultEmail, isProduction: boolean) => {
  try {
    const mjml = onlyMJML(templateOptions);
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
