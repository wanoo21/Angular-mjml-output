import mjml2html from 'mjml';
import { EmailTemplate } from './EmailTemplate';
import { IIPDefaultEmail } from './interfaces';

export function onlyMJML(templateOptions: IIPDefaultEmail) {
  return new EmailTemplate(templateOptions).render();
}

export default (templateOptions: IIPDefaultEmail, isProduction: boolean) => {
  try {
    return mjml2html(new EmailTemplate(templateOptions).render(), {
      fonts: {},
      keepComments: !isProduction,
      minify: isProduction,
      beautify: !isProduction,
      validationLevel: isProduction ? 'soft' : 'strict'
    });
  } catch (error) {
    return {
      html: '',
      errors: [error.message]
    };
  }
};
