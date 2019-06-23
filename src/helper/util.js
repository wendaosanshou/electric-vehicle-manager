if (typeof String.prototype.startsWith !== "function") {
  Window.String.prototype.startsWith = function(prefix) {
    return this.slice(0, prefix.length) === prefix;
  };
}

/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
window.Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};

export default {
  getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    } else {
      return null;
    }
  },

  query(search) {
    let str = search || window.location.search;
    let objURL = {};

    str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), ($0, $1, $2, $3) => {
      objURL[$1] = $3;
    });
    return objURL;
  },

  queryString(url, query) {
    let str = [];
    for (let key in query) {
      str.push(key + "=" + query[key]);
    }
    return str && str.length > 0 ? url + "?" + str.join("&") : url;
  },

  isLegalUrl(str) {
    let pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    return pattern.test(str);
  },

  isLegalUsername(str) {
    let pattern = /^[a-zA-Z0-9]{3,16}$/;
    return pattern.test(str);
  },

  isLegalEmail(str) {
    let pattern = new RegExp("^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$", "g");
    return pattern.test(str);
  },

  isLegalPassword(str) {
    let pattern = new RegExp("^(?=.*[0-9])(?=.*[A-Za-z])[a-zA-Z0-9!@#$%^&*]{6,18}$", "g");
    return pattern.test(str);
  },

  getRoleName(roleType) {
    let roleName = "";
    switch (roleType) {
      case 1:
        roleName = "定位监控";
        break;
      case 2:
        roleName = "历史轨迹";
        break;
      case 3:
        roleName = "告警监控";
        break;
      case 4:
        roleName = "告警分析";
        break;
      case 5:
        roleName = "电子围栏";
        break;
      case 6:
        roleName = "办理状态管理";
        break;
      case 7:
        roleName = "办理状态查询";
        break;
      case 8:
        roleName = "备案信息管理";
        break;
      case 9:
        roleName = "系统设置";
        break;
      case 10:
        roleName = "用户管理";
        break;
      case 11:
        roleName = "角色权限管理";
        break;
      case 12:
        roleName = "业务办理点管理";
        break;
      case 13:
        roleName = "设备安装点管理";
        break;
      case 14:
        roleName = "App资讯管理";
        break;
      case 15:
        roleName = "设备管理";
        break;
      case 16:
        roleName = "设备在线升级";
        break;
      case 17:
        roleName = "设备版本管理";
        break;
      case 18:
        roleName = "商户APP代客预约";
        break;
      case 19:
        roleName = "商户APP预约审核";
        break;
      case 20:
        roleName = "商户APP现场安装";
        break;
    }
    return roleName;
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage(name, content) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  /**
   * get localStorage
   */
  getStorage(name) {
    if (!name) return;
    let value = window.localStorage.getItem(name)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  /**
   * delete localStorage
   */
  removeStorage(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  }
};
