import mjml2html from 'mjml';
import { EmailTemplate } from './EmailTemplate';
import { IIPDefaultEmail } from './interfaces';

export function onlyMJML(templateOptions: IIPDefaultEmail) {
  return new EmailTemplate(templateOptions).render();
}

export default (templateOptions: IIPDefaultEmail, isProduction) => {
  try {
    return mjml2html(new EmailTemplate(templateOptions).render(), {
      // fonts = {
      //   'Open Sans':
      //     'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
      //   'Droid Sans':
      //     'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
      //   Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
      //   Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
      //   Ubuntu: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700',
      // },
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
