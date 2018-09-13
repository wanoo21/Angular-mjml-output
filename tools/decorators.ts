import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Constructor } from 'tools/interfaces';
import { template } from 'lodash';

export function Injectable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}

/**
 * @description Resolve template property for current class
 * @param templateName Template name to inject in current property
 * @param relativePath @default Absolute path for find the template, use __dirname and resolve(), default is templates folder from mjml-output directory.
 */
export function Template(
  templateName: string,
  relativePath: string = resolve(__dirname, 'templates')
) {
  return function(target: any, propertyKey: string | symbol): void {
    try {
      const templateFile = readFileSync(
        resolve(relativePath, `${templateName}.mjml`),
        'utf-8'
      );

      target[propertyKey] = template(templateFile);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function MethodDecorator() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor.configurable);
    console.log(propertyKey);
    console.log(target);
  };
}
