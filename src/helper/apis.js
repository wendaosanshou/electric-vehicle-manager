import $ajax from "./ajax";

const BASE_API_URI = 'http://api.renownchn.com'

function requestUrl(path) {
  return `${BASE_API_URI}/api/v1/${path}`;
}

export default {
  login(data) {
    const { account, password } = data
    return $ajax.get(requestUrl(`sys/login/${account}/${password}`));
  },
  getAlarmAnalyse(data) {
    const { token } = data
    return $ajax.post(requestUrl(`alarm/analyse?token=${token}`), data);
  },
  getAlarmAnalyseEx(data) {
    const { token } = data
    return $ajax.post(requestUrl(`alarm/analyse/ex?token=${token}`), data);
  },
  getAlarmLatest(data) {
    const {
      token, alarmId, deviceId, alarmValue
    } = data
    return $ajax.get(requestUrl(`alarm/latest/${alarmId}/${deviceId}/${alarmValue}?token=${token}`));
  },
  modifyWorkItem(data) {
    const { token } = data
    return $ajax.post(requestUrl(`work/modify?token=${token}`), data);
  },
  getWorkPage(data) {
    const { token } = data
    return $ajax.post(requestUrl(`work/page?token=${token}`), data);
  },
  getVehicleInfo(data) {
    const { token, id } = data
    return $ajax.get(requestUrl(`vehicle/${id}?token=${token}`));
  },
  renewContract(data) {
    const { token } = data
    return $ajax.post(requestUrl(`contract/renew?token=${token}`), data);
  },
  getContractHistory(data) {
    const { token, id } = data
    return $ajax.get(requestUrl(`contract/all/${id}?token=${token}`));
  },
  setWorkDistribute(data) {
    const { token } = data
    return $ajax.post(requestUrl(`work/distribute?token=${token}`), data);
  },
  setDeviceTrace(data) {
    const { token } = data
    return $ajax.post(requestUrl(`dev/trace/${data.id}/${data.second}?token=${token}`));
  },
  getDeviceParams(data) {
    const { token } = data
    return $ajax.get(requestUrl(`param/${data.id}?token=${token}`));
  },
  getWebDevice(data) {
    const { token } = data
    return $ajax.get(requestUrl('dev/info/web'), { token });
  },
  getDeviceInfo(data) {
    const { token } = data
    return $ajax.get(requestUrl(`dev/${data.type}/${data.value}`), { token });
  },
  getHistoryInfo(data) {
    const { token } = data
    return $ajax.post(requestUrl(`history/info?token=${token}`), data);
  },
  getAlarmHistoryInfo(data) {
    const { token } = data
    return $ajax.post(requestUrl(`history/info_alarm?token=${token}`), data);
  },
  getUserInfoGps(data) {
    const { userId, alarmId, token } = data
    return $ajax.get(requestUrl(`dev/gps/user/${userId}/${alarmId}?token=${token}`), data);
  },
  clearHistoryInfo(data) {
    const { token } = data
    return $ajax.post(requestUrl(`history/clear?token=${token}`), data);
  },
  loseDeviceFile(data) {
    const { token } = data
    return $ajax.post(requestUrl(`dev/dis?token=${token}`), data);
  },
  getSomeDeviceInfo(data) {
    return $ajax.post(requestUrl('dev/id'), data);
  },
  getAllDevice(data) {
    const { token } = data
    return $ajax.get(requestUrl(`dev/all?token=${token}`), data);
  },
  getAllUser(data) {
    return $ajax.post(requestUrl('sys/page'), data);
  },
  addSysUser(data) {
    return $ajax.post(requestUrl('sys/add'), data);
  },
  editSysUser(data) {
    return $ajax.post(requestUrl('sys/edit'), data);
  },
  deleteSysUser(data) {
    const { id, token } = data
    return $ajax.get(requestUrl(`sys/delete/${id}`), { token });
  },
  /**
   * 获取所有角色信息
   * @param {{token}} data
   */
  getAllRole(data) {
    return $ajax.get(requestUrl('role/all'), data);
  },
  /**
   * 新增角色
   * @param {*} data
   */
  addRole(data) {
    return $ajax.post(requestUrl('role/add'), data);
  },
  /**
   * 编辑角色
   * @param {*} data
   */
  editRole(data) {
    return $ajax.post(requestUrl('role/edit'), data);
  },
  /**
   * 删除角色
   * @param {角色id} uri
   * @param {角色信息} data
   */
  deleteRole(uri, data) {
    return $ajax.get(requestUrl(`role/delete/${uri}`), data);
  },
  /**
   * 获取所有组织结果
   * @param {查询条件} data
   */
  getAllOrg(data) {
    return $ajax.get(requestUrl('org/all'), data);
  },
  /**
   * 获取所有业务办理点
   * @param {查询条件} data
   */
  getAllBusinessPoint(data) {
    return $ajax.get(requestUrl('business/all'), data);
  },
  addBusinessPoint(data) {
    return $ajax.post(requestUrl('business/add'), data);
  },
  /**
   * 删除当前业务办理点
   * @param {查询条件} data
   */
  deleteBusinessPoint(data) {
    return $ajax.get(requestUrl(`business/delete/${data.id}`), data);
  },
  /**
   * 编辑业务办理点/业务安装点
   * @param {*} data
   */
  editBusinessPoint(data) {
    return $ajax.post(requestUrl('business/edit'), data);
  },
  /**
   * 获取业务办理点
   * @param {*} data
   */
  getBusinessHandle(data) {
    return $ajax.get(requestUrl('business/handle'), data);
  },
  /**
   * 获取业务安装点
   * @param {*} data
   */
  getBusinessInstall(data) {
    return $ajax.get(requestUrl('business/install'), data);
  },
  getInfoWeb(data) {
    const { pageIndex, pageSize } = data
    return $ajax.get(requestUrl(`info/web/${pageIndex}/${pageSize}`), data);
  },
  addInfoWeb(data) {
    return $ajax.post(requestUrl('info/upload'), data);
  },
  updateInfoWeb(data) {
    return $ajax.post(requestUrl('info/update'), data);
  },
  deleteInfoWeb(data) {
    return $ajax.get(requestUrl(`info/delete/${data.id}`), data);
  },
  updateProduce(data) {
    const { token } = data
    return $ajax.post(requestUrl(`produce/update?token=${token}`), data);
  },
  getUpdateLog(data) {
    const { token } = data
    return $ajax.post(requestUrl(`produce/update/log?token=${token}`), data);
  },
  searchProducts(data) {
    return $ajax.post(requestUrl(`produce/query`), data);
  },
  getProductPage(data) {
    const { token } = data
    return $ajax.post(requestUrl(`produce/page?token=${token}`), data);
  },
  importProducts(data) {
    return $ajax.post(requestUrl(`produce/import`), data);
  },
  modifyProducts(data) {
    const { token } = data
    return $ajax.post(requestUrl(`produce/modify?token=${token}`), data);
  },
  batchImportProducts(data) {
    const { token, formData, account } = data
    return $ajax.post(requestUrl(`produce/batch/${account}?token=${token}`), formData, {
      'Content-Type': 'multipart/form-data'
    });
  },
  deleteProduct(data) {
    const { imei, token } = data
    return $ajax.post(requestUrl(`produce/delete/${imei}?token=${token}`), data);
  },
  getFirmwareList(data) {
    return $ajax.post(requestUrl(`firmware/query`), data);
  },
  addFirmware(data) {
    const { token } = data
    return $ajax.post(requestUrl(`firmware/add?token=${token}`), data);
  },
  deleteFirmware(data) {
    const { id, token } = data
    return $ajax.get(requestUrl(`firmware/delete/${id}?token=${token}`));
  },
  getApkList(data) {
    const { token } = data
    return $ajax.post(requestUrl(`apk/page?token=${token}`), data);
  },
  addApkFile(data) {
    const { token } = data
    return $ajax.post(requestUrl(`apk/add?token=${token}`), data);
  },
  deleteApkVersion(data) {
    const { id, token } = data
    return $ajax.post(requestUrl(`apk/delete/${id}?token=${token}`), data);
  },
  getFeedback(data) {
    const { token } = data
    return $ajax.post(requestUrl(`feedback/page?token=${token}`), data);
  },
  getFeedbackDetail(data) {
    const { id, token } = data
    return $ajax.get(requestUrl(`feedback/detail/${id}?token=${token}`));
  },
  processFeedback(data) {
    const { token } = data
    return $ajax.post(requestUrl(`feedback/ret?token=${token}`), data);
  },
  addFence(data) {
    const { token } = data
    return $ajax.post(requestUrl(`fence/add?token=${token}`), data);
  },
  modifyFence(data) {
    const { token } = data
    return $ajax.post(requestUrl(`fence/modify?token=${token}`), data);
  },
  deleteFence(data) {
    const { id, token } = data
    return $ajax.get(requestUrl(`fence/delete/${id}?token=${token}`), data);
  },
  getAllFence(data) {
    const { token } = data
    return $ajax.get(requestUrl(`fence/all?token=${token}`), data);
  },
  getOneFence(data) {
    const { id, token } = data
    return $ajax.post(requestUrl(`fence/get/${id}?token=${token}`), data);
  },
  getFenceAlarm(data) {
    const { token } = data
    return $ajax.post(requestUrl(`fence/alarm?token=${token}`), data);
  },
  addAttribute(data) {
    const { token } = data
    return $ajax.post(requestUrl(`attribute/add?token=${token}`), data);
  },
  deleteAttribute(data) {
    const { id, token } = data
    return $ajax.post(requestUrl(`attribute/delete/${id}?token=${token}`), data);
  },
  getAttribute(data) {
    const {
      type, token, pageSize, pageIndex
    } = data
    return $ajax.post(requestUrl(`attribute/query/${pageSize}/${pageIndex}/${type}?token=${token}`), data);
  },
  resetPassword(data) {
    const { account, password } = data
    return $ajax.get(requestUrl(`sys/reset/${account}/${password}`), data);
  },
  rebotDevice(data) {
    const { imeis, token } = data
    return $ajax.post(requestUrl(`dev/reboot?token=${token}`), imeis);
  },
  addGuide(data) {
    const { token } = data
    return $ajax.post(requestUrl(`guide/add?token=${token}`), data);
  },
  modifyGuide(data) {
    const { token } = data
    return $ajax.post(requestUrl(`guide/modify?token=${token}`), data);
  },
  getAllGuide(data) {
    const { pageIndex, pageSize, token } = data
    return $ajax.get(requestUrl(`/guide/query/${pageSize}/${pageIndex}?token=${token}`), data);
  },
  deleteGuide(data) {
    const { id, token } = data
    return $ajax.get(requestUrl(`guide/delete/${id}?token=${token}`), data);
  },
  editGuide(data) {
    const { token } = data
    return $ajax.post(requestUrl(`guide/add?token=${token}`), data);
  }
};
