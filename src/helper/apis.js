import $ajax from "./ajax";

const BASE_API_URI = 'http://47.92.237.140:8090'
function requestUrl(path) {
  return `${BASE_API_URI}/api/${path}`;
}

export default {
  login(data) {
    return $ajax.get(requestUrl(`user/login/${data}`));
  },
  getVerifyCode(data) {
    console.log('getVerifyCode', data)
    return $ajax.get(requestUrl(`user/code/${data}`));
  }
};
