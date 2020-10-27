import router from '@/router';
import store from '@/store';
import { format, utcToZonedTime } from 'date-fns-tz';
import { required } from 'vuelidate/lib/validators';
import isMobilePhone from 'validator/lib/isMobilePhone';

export function randomId(len = 16) {
  return (
    1 +
    Math.random()
      .toString()
      .substr(2, len - 1)
  );
}

export function timeFormat(time, format = '12h') {
  if (format === '12h') {
    const { hour, min, postfix } = extractTimeFrom24H(time);
    return `${hour}:${min} ${postfix}`;
  } else if (format === '24h') {
    const { hour, min, sec } = extractTimeFrom12H(time);
    return `${hour}:${min}:${sec}`;
  }
}

export function extractTimeFrom24H(time) {
  let [hour, min, sec] = time.split(':');
  hour = Number(hour);
  const postfix = hour >= 12 ? 'PM' : 'AM';
  if (hour === 0) {
    hour = '12';
  }
  hour = hour > 12 ? hour - 12 : hour;
  hour = hour < 10 ? `0${hour}` : hour;
  return { hour, min, sec, postfix };
}

export function extractTimeFrom12H(time) {
  const [formattedTime, postfix] = time.split(' ');
  let [hour, min] = formattedTime.split(':');
  if (postfix === 'PM') {
    if (Number(hour) < 12) {
      hour = Number(hour) + 12;
    }
  } else if (postfix === 'AM') {
    if (Number(hour) === 12) {
      hour = '00';
    }
  }
  return { hour, min, sec: '00' };
}

export async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function getAPIURL(path) {
  return process.env.VUE_APP_API_URL + path;
}

export function isPhoneNumberValid(phone) {
  return isMobilePhone(phone);
}

export const validationPassword = {
  required,
  // minLength: minLength(8)  // I assume you'd want something like this too
  containsUppercase: function(value) {
    return !/[A-Z]/.test(value);
  },
  containsLowercase: function(value) {
    return !/[a-z]/.test(value);
  },
  containsNumber: function(value) {
    return !/[0-9]/.test(value);
  },
  containsSpecial: function(value) {
    return !/[#?!@$%^&*-]/.test(value);
  }
};

export async function showOverlayAndRedirect({
  title = '',
  message = '',
  route,
  timeout = 1500
}) {
  store.commit('overlay/updateModel', {
    title,
    message
  });

  await sleep(timeout);

  if (route) {
    await router.push(route);
  }

  store.commit('overlay/updateModel', {
    title: '',
    message: ''
  });
}

// @inputs: string, string
export function transformCloudinaryUrl(resourceUrl, transformations) {
  if (
    !resourceUrl ||
    !transformations ||
    resourceUrl.indexOf('cloudinary') < 0
  ) {
    return resourceUrl;
  }
  const urlParts = resourceUrl.split('/');

  const indexOfUpload = urlParts.indexOf('upload');
  urlParts.splice(indexOfUpload + 1, 0, transformations);
  return urlParts.join('/');
}

export function changeCloudinaryExtension(url, newformat = 'jpg') {
  const urlSegments = url.split('.');
  const extension = urlSegments[urlSegments.length - 1];
  const thumbnail = url.replace(new RegExp(extension + '$'), newformat);
  return thumbnail;
}

export function getCloudinaryVideoThumbnail(url, newformat = 'jpg') {
  return transformCloudinaryUrl(
    changeCloudinaryExtension(url, newformat),
    'so_auto'
  );
}

// @input jsonfile: {url}
export function urlToFile(jsonfile) {
  const urlParts = jsonfile.url.split('/');
  const filename = urlParts[urlParts.length - 1];
  return new Promise(resolve => {
    window.fetch(jsonfile.url).then(res => {
      res
        .blob()
        .then(blob => {
          const file = new File([blob], filename, { type: blob.type });
          resolve(file);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
}

// https://stackoverflow.com/a/38935990
function dataUrltoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  console.log(arr);
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

// NOTE: this will return false on non-https addresses
export const isShareApiSupported = !!window.navigator.share;
export const isFileShareApiSupported = !!window.navigator.canShare;

// no old share
export function shareDataUrl({ data, filename }) {
  const file = dataUrltoFile(data, filename);
  window.navigator.share({
    files: [file]
  });
}

// @input jsonfile: {url}
export function share(jsonfile) {
  if (!isFileShareApiSupported) {
    _shareOld(jsonfile);
    return;
  }

  urlToFile(jsonfile).then(file => {
    // https://web.dev/web-share/#sharing-files
    window.navigator
      .share({
        // url: jsonfile.url
        files: [file]
      })
      .catch(err => {
        console.log('fallback to share api level 1', err);
        _shareOld(jsonfile);
      });
  });
}

function _shareOld(jsonfile) {
  window.navigator
    .share({
      url: jsonfile.url
    })
    .catch(err => {
      console.log(err);
    });
}

export function cloudinaryFileToMeredithFileAdapter(cloudinaryFileInfo) {
  const resourceType =
    cloudinaryFileInfo.format === 'pdf'
      ? 'pdf'
      : cloudinaryFileInfo.resource_type;

  if (resourceType === 'pdf') {
    const { secure_url, public_id, pages } = cloudinaryFileInfo;
    return {
      resourceType,
      publicId: public_id,
      url: secure_url,
      pages
    };
  }

  // image type
  if (resourceType === 'image') {
    const { secure_url, height, width, public_id, bytes } = cloudinaryFileInfo;
    return {
      resourceType,
      height,
      width,
      publicId: public_id,
      url: secure_url,
      fileSize: bytes
    };
  }

  // video type
  if (resourceType === 'video') {
    const {
      secure_url,
      height,
      width,
      public_id,
      thumbnail_url,
      format,
      duration,
      bytes
    } = cloudinaryFileInfo;
    return {
      resourceType: 'video',
      height,
      width,
      publicId: public_id,
      url: secure_url,
      thumbnailUrl: thumbnail_url,
      format,
      duration,
      fileSize: bytes
    };
  }
}

export function disableBodyClass(className) {
  document.body.classList.remove(className);
}
export function enableBodyClass(className) {
  document.body.classList.add(className);
}

const _formatDateTimeDefaultOptions = {
  dateFormat: 'MMM dd, yyyy - h:mm a',
  timeZone: _getUserTimeZone()
};

export function formatDateTime(
  dateString,
  {
    dateFormat = 'MMM dd, yyyy - h:mm a',
    timeZone = _getUserTimeZone()
  } = _formatDateTimeDefaultOptions
) {
  if (!dateString) {
    return '';
  }

  // Fix DotNet backward compatibility of not including 'Z' at the end of UTC date
  let _dateString = fixApiDateString(dateString);

  const dateObject = new Date(_dateString);
  const dateObjectZoned = utcToZonedTime(dateObject, timeZone);
  return format(dateObjectZoned, dateFormat);
}

// Fix not having Z at the end of dateStrings in API
export function fixApiDateString(dateString) {
  if (dateString.charAt(dateString.length - 1) !== 'Z') {
    return `${dateString}Z`;
  }
}

function _getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function formTemplateAdd() {
  const newForm = await store.dispatch('formTemplate/currentTemplateReset');
  router.push({
    name: 'FormTemplateItemEdit',
    params: { formId: newForm.id }
  });
}

export function isEmail(value) {
  const regex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

  return regex.test(value);
}
