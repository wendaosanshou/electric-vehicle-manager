export const getRoleName = (roleType) => {
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
        roleName = "工作人员管理";
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
  }

  