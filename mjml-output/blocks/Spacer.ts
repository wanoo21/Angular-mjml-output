import {
  RenderingClass,
  SpacerBlock,
  ISpacerBlockOptions
} from '../interfaces';
import { createWidthHeight } from '../utils';

export class Spacer implements SpacerBlock, RenderingClass {
  constructor(public options: ISpacerBlockOptions) {}

  render() {
    return `
      <mj-spacer
        css-class="ip-spacer-block"
        height="${createWidthHeight(this.options.height)}"></mj-spacer>
    `;
  }
}
