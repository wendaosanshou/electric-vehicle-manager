import axios from "axios";
import $q from "q";
import { $util } from "@/helper";
import Vue from "vue";
const vm = new Vue();

axios.defaults.timeout = 60000

function getErrorTips(code) {
  const errorMap = {
    "10000": "无错误",
    "10001": "处理异常",
    "10002": "登录失败",
    "10003": "账户不存在",
    "10004": "参数错误",
    '10005': "Token无效",
    '10006': "帐号已启用",
    '10007': "该账号已存在",
    '10008': "手机已预约",
    '10009': "预约不存在",
    '10010': "预约无法删除",
    '10011': "图片上传失败",
    '10012': "图片生成失败",
    '10013': "预约状态异常",
    '10014': "文件类型错误",
    '10015': "发送验证码失败",
    '10016': "账户或者密码错误",
    '10017': "资讯记录不存在",
    '10018': "设备入库失败",
    '10019': "设备不在线",
    '10020': "设备不存在",
    '10021': "业务点已经绑定",
    '10022': "指定账户不存在",
    '10023': "角色不能删除",
    '10024': "名称重复",
    '10025': "设备已经签约",
    '10026': "渠道属性名称重复",
    '10027': "业务点名称重复"
  };
  return errorMap[code] || '服务器开小差了'
}

function requestHandle(params) {
  let defer = $q.defer();
  axios(params)
    .then(res => {
      // console.log("axios", res);
      if (res.data) {
        if (res.data.code && res.data.code === "10000") {
          defer.resolve(res.data);
        } else {
          defer.reject(res.data);
          const { data, msg } = res.data
          let message = msg || getErrorTips(res.data.code)
          if (res.data.code === '10018' && data && data.length > 0) {
            vm.$message.error(`${message},重复IMEI号：${data.join(',')}`);
          } else {
            vm.$message.error(`${message}！`);
          }
        }
      } else {
        defer.reject();
      }
    })
    .catch(err => {
      defer.reject(err);
    });

  return defer.promise;
}


axios.interceptors.response.use(function (response) {
  // console.log('interceptors-response', response)
  // Do something with response data
  return response;
}, function (error) {
  const errorInfo = error.toString()
  console.log('interceptors-error', error.toString())
  if (errorInfo.indexOf('timeout') > -1) {
    vm.$message({
      type: "error",
      message: `服务器请求超时了~ 错误类型：${error}`
    })
  } else {
    vm.$message({
      type: "error",
      message: `服务器开小差了~ 错误类型：${error}`
    })
  }
  return Promise.reject(error);
});

export default {
  post: function(url, params, op) {
    return requestHandle({
      method: "post",
      url: url,
      data: params
    });
  },
  get: function(url, params, op) {
    // console.log("method: get, params: ", params);
    return requestHandle({
      method: "get",
      url: $util.queryString(url, params)
    });
  }
};
