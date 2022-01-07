import 'VIEWS/ui-kit/style';

import { template as colorsTemplate } from './colors';
import { template as typesTemplate } from './types';

const template = `
  <div class="ui-kit">
    ${ colorsTemplate }
    ${ typesTemplate }
  </div>
`;

export {
  template,
};
