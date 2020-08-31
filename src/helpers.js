import router from '@/router';
import store from '@/store';

export function randomId() {
  return Math.random()
    .toString()
    .substr(2);
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
  return /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/.test(
    phone
  );
}

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

export function getCloudinaryVideoThumbnail(file) {
  const urlSegments = file.url.split('.');
  const extension = urlSegments[urlSegments.length - 1];
  const thumbnail = file.url.replace(new RegExp(extension + '$'), 'jpg');
  return thumbnail;
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

export function isShareApiSupported() {
  return !!window.navigator.share;
}

// @input jsonfile: {url}
export function share(jsonfile) {
  const isFileSharingSupported = !!navigator.canShare;
  if (!isFileSharingSupported) {
    _shareOld(jsonfile);
    return;
  }

  this.urlToFile(jsonfile).then(file => {
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
  const resourceType = cloudinaryFileInfo.resource_type;

  // image type
  if (resourceType === 'image') {
    const { secure_url, height, width, public_id } = cloudinaryFileInfo;
    return {
      resourceType: 'image',
      height,
      width,
      publicId: public_id,
      url: secure_url
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
      duration
    } = cloudinaryFileInfo;
    return {
      resourceType: 'video',
      height,
      width,
      publicId: public_id,
      url: secure_url,
      thumbnailUrl: thumbnail_url,
      format,
      duration
    };
  }
}

export function disableScrollbar() {
  document.body.classList.add('overflow-hidden');
}
export function enableScrollbar() {
  document.body.classList.remove('overflow-hidden');
}
