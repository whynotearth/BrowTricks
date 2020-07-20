// [meredith-axios configs](https://github.com/whynotearth/meredith-axios/blob/master/dist/index.js)
// [meredith-axios npm](https://www.npmjs.com/package/@whynotearth/meredith-axios)

import { ajax } from '@/services/ajax.js';
import { serviceOptions } from '@whynotearth/meredith-axios';
serviceOptions.axios = ajax;
