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

  await router.push(route);

  store.commit('overlay/updateModel', {
    title: '',
    message: ''
  });
}
