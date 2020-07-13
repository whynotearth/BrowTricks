import { ajax } from './ajax.js';
import { serviceOptions } from '@whynotearth/meredith-axios';
serviceOptions.axios = ajax;
