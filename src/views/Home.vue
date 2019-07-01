<template>
  <div class="home">
    <div class="home-sidebar" :class="{'is-collapse': isCollapse}">
      <div class="home-sidebar-title">
        <i class="home-sidebar-logo"></i>
        <span class="home-sidebar-text">电动车智慧管理平台</span>
      </div>
      <div class="home-sidebar-menu">
        <el-menu
          :default-active="defaultActiveMenu"
          class="sidebar-meun-content menu-fix"
          @select="handleSelect"
          background-color="#303030"
          text-color="#CBCBCB"
          active-text-color="#FF5E00"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in filterSidebarMenus">
            <el-menu-item :key="index" :index="item.index" v-if="!item.children">
              <i :class="item.logo"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu
              :index="item.index"
              v-else-if="item.children && item.children.length > 0"
              :key="index"
            >
              <template slot="title">
                <i :class="item.logo"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                :index="childrenItem.index"
                v-for="(childrenItem, childrenIndex) in item.children"
                :key="childrenIndex"
              >
                <!-- <i :class="childrenItem.logo"></i> -->
                <span>{{childrenItem.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>

        <div class="sidebar-collapse">
          <i class="collapse-icon" :class="collapseIconClass" @click="onCollapse"></i>
        </div>
      </div>
    </div>
    <div class="home-content">
      <div class="home-content-title">
        <div class="home-title-label">欢迎您，登录电动车智慧管理平台！</div>
        <div class="home-title-menu">
          <i class="home-title-logo"></i>
          <span class="home-title-desc">用户名：{{userInfo.name}}</span>
          <div class="home-title-login-out" @click="onLoginOut"></div>
        </div>
      </div>
      <div class="home-title-crumbs">所在位置：{{activePageName}}</div>
      <div class="home-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { setTimeout, setImmediate } from "timers";

export default {
  name: "home",
  data() {
    return {
      isCollapse: false,
      pathName: "",
      filterSidebarMenus: [],
      sidebarMenus: [
        {
          name: "定位监控",
          logo: "el-icon-location-outline",
          path: "location-monitor",
          index: "1",
          role: "1"
        },
        {
          name: "历史轨迹",
          logo: "el-icon-location-information",
          path: "history-track",
          index: "2",
          role: "2"
        },
        {
          name: "告警监控",
          logo: "el-icon-truck",
          path: "alarm-monitor",
          index: "3",
          role: "3"
        },
        {
          name: "告警分析",
          logo: "el-icon-ship",
          path: "alarm-analysis",
          index: "4",
          role: "4"
        },
        {
          name: "电子围栏",
          logo: "el-icon-postcard",
          path: "electric-fence",
          index: "5",
          role: "5"
        },
        {
          name: "办理状态查询",
          logo: "el-icon-search",
          path: "process-search",
          index: "6",
          role: "6"
        },
        {
          name: "办理状态管理",
          logo: "el-icon-set-up",
          path: "process-manage",
          index: "7",
          role: "7"
        },
        {
          name: "备案信息管理",
          logo: "el-icon-copy-document",
          path: "record-manage",
          index: "8",
          role: "8"
        },
        {
          name: "系统设置",
          logo: "el-icon-setting",
          path: "user-manage",
          index: "9",
          role: "9",
          children: [
            {
              name: "用户管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: "9-1",
              role: "10"
            },
            {
              name: "角色权限管理",
              logo: "el-icon-location",
              path: "role-manage",
              index: "9-2",
              role: "11"
            },
            {
              name: "业务办理点管理",
              logo: "el-icon-location",
              path: "business-manage",
              index: "9-3",
              role: "12"
            },
            {
              name: "设备安装点管理",
              logo: "el-icon-location",
              path: "equipment-manage",
              index: "9-4",
              role: "13",
            },
            {
              name: "APP资讯管理",
              logo: "el-icon-location",
              path: "app-advisory",
              index: "9-5",
              role: "14"
            },
            {
              name: "设备管理",
              logo: "el-icon-location",
              path: "device-manage",
              index: "9-6",
              role: "15"
            },
            {
              name: "设备在线升级",
              logo: "el-icon-location",
              path: "device-update",
              index: "9-7",
              role: "16"
            },
            {
              name: "设备版本管理",
              logo: "el-icon-location",
              path: "device-version",
              index: "9-8",
              role: "17"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["activePageName", "userInfo", "role", "defaultActiveMenu"]),
    collapseIconClass() {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  watch: {
    $route() {
      this.initActiveMenu();
    }
  },
  methods: {
    ...mapActions([
      "getAllOrg",
      "getAllBusinessPoint",
      "getBusinessHandle",
      "getBusinessInstall"
    ]),
    ...mapMutations(["updateActivePageName", "updateDefaultActiveMenu"]),
    getSidebarMenu(sidebarMenus) {
      const { author } = this.role
      let authorList = []
      if (author && author.split(',').length > 0) {
        authorList = author.split(',')
      }
      sidebarMenus.forEach(item => {
        const { role } = item
        // 如果有子节点，先遍历一遍子节点
        if (role === '9' && item.children && item.length > 0) {
          const { children } = item
          let parentItem = {
            ...item,
            children: []
          }
          for (let index = 0; index < children.length; index++) {
            const childrenItem = children[index]
            if (authorList.indexOf(childrenItem.role) > -1) {
              parentItem.children.push(childrenItem)
            }
          }
          this.filterSidebarMenus.push(parentItem)
        } else if (authorList.indexOf(item.role) > -1) {
          console.log(item.role)
          this.filterSidebarMenus.push(item)
        }
      })
    },
    onCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getItemLogo(logo) {
      return require(`@/assets/icons/${logo}`);
    },
    onMenuItemClick(item, index) {
      // 高亮选中item
      this.sidbarMenus.forEach((menuItem, menuIndex) => {
        if (menuIndex === index) {
          menuItem.isActive = true;
        } else {
          menuItem.isActive = false;
        }
      });
      // 跳转页面
      this.$router.push({
        path: item.path
      });
    },
    onLoginOut() {
      this.$router.push({
        path: "/login"
      });
    },
    onMenuLoop(menu, menuIndex) {
      for (let index = 0; index < menu.length; index++) {
        const menuItem = menu[index];
        if (menuItem.index === menuIndex) {
          this.updateDefaultActiveMenu(menuItem.index)
          this.$router.push({
            path: menuItem.path
          });
          break;
        }
        if (menuItem.children && menuItem.children.length > 0) {
          this.onMenuLoop(menuItem.children, menuIndex);
        }
      }
    },
    handleSelect(menuIndex, indexPath) {
      this.onMenuLoop(this.filterSidebarMenus, menuIndex);
    },
    checkIsLogin() {
      console.log(this.userInfo);
      if (!this.userInfo || !this.userInfo.name || !this.userInfo.token) {
        this.$message({
          type: "error",
          message: "请先登陆后再进行操作!"
        });
        setTimeout(() => {
          this.$router.replace("/login");
        }, 500);
      }
    },
    initActiveMenu() {
      const { path } = this.$route;
      let activeMenu = "";
      switch (path) {
        case "/location-monitor":
          activeMenu = "定位监控";
          break;
        case "/history-track":
          activeMenu = "历史轨迹";
          break;
        case "/alarm-monitor":
          activeMenu = "告警监控";
          break;
        case "/alarm-analysis":
          activeMenu = "告警分析";
          break;
        case "/electric-fence":
          activeMenu = "电子围栏";
          break;
        case "/process-search":
          activeMenu = "办理状态查询";
          break;
        case "/process-manage":
          activeMenu = "办理状态管理";
          break;
        case "/record-manage":
          activeMenu = "备案信息管理";
          break;
        case "/user-manage":
          activeMenu = "系统设置 > 用户管理";
          break;
        case "/role-manage":
          activeMenu = "系统设置 > 角色权限管理";
          break;
        case "/business-manage":
          activeMenu = "系统设置 > 业务办理点管理";
          break;
        case "/equipment-manage":
          activeMenu = "系统设置 > 设备安装点管理";
          break;
        case "/equipment-manage":
          activeMenu = "系统设置 > 设备安装点管理";
          break;
        case "/app-advisory":
          activeMenu = "系统设置 > APP资讯管理";
          break;
        case "/device-manage":
          activeMenu = "系统设置 > 设备管理";
          break;
        case "/device-update":
          activeMenu = "系统设置 > 设备在线升级";
          break;
        case "/device-version":
          activeMenu = "系统设置 > 设备版本管理";
          break;
        default:
          activeMenu = "";
          break;
      }
      console.log(path, activeMenu);
      if (activeMenu) {
        this.updateActivePageName(activeMenu);
      }
    },
    async initAllBusinessPoint() {
      //  进页面初始化角色权限数据
      await this.getAllBusinessPoint();
      await this.getBusinessHandle();
      await this.getBusinessInstall();
    }
  },
  mounted() {
    this.checkIsLogin();
    this.initAllBusinessPoint();
    this.getSidebarMenu(this.sidebarMenus)
  }
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/style/function.scss";

$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

// 兼容文案显示效果
.el-menu-item span {
  transition: all 0.3s;
  opacity: 1;
}

.is-collapse {
  .el-menu-item span {
    opacity: 0;
  }
}

.home {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .home-sidebar {
    width: d2r(340px);
    min-width: d2r(340px);
    height: 100vh;
    background: rgba(48, 48, 48, 1);
    transition: all 0.1s;
    &.is-collapse {
      width: 64px;
      min-width: 64px;
      .home-sidebar-title {
        width: 100%;
        height: 64px;
        .home-sidebar-text {
          display: none;
        }
        .home-sidebar-logo {
          width: 24px;
          height: 24px;
        }
      }
    }
    .home-sidebar-title {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      padding-top: d2r(29px);
      background: rgba(246, 103, 19, 1);
      .home-sidebar-logo {
        width: d2r(102px);
        height: d2r(102px);
        cursor: pointer;
        background: url("../assets/home/logo_img@2x.png");
        background-size: 100% 100%;
      }
      .home-sidebar-text {
        font-size: d2r(24px);
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: d2r(27px);
        margin-top: 5px;
      }
    }
    .home-sidebar-menu {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      height: calc(100% - 160px);
      overflow: scroll;
      .sidebar-meun-content {
        border-right: 0 !important;
        transition: width 0.3s;
        padding-bottom: d2r(60px);
      }
      .sidebar-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: d2r(50px);
        padding-left: d2r(68px);
        cursor: pointer;
        &.is-active {
          background: rgba(246, 103, 19, 1);
        }
        .icon-item {
          display: block;
          width: d2r(20px);
          height: d2r(20px);
        }
        .item-name {
          margin-left: d2r(34px);
          font-size: d2r(17px);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .home-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    min-width: d2r(1580px);
    height: 100vh;
    overflow: scroll;
    .home-content-title {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: d2r(63px);
      min-height: d2r(63px);
      padding: 0 d2r(44px);
      .home-title-label {
        font-size: d2r(18px);
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(59, 72, 89, 1);
      }
      .home-title-menu {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .home-title-logo {
          display: block;
          width: d2r(33px);
          height: d2r(33px);
          background: url("../assets/home/icon-characters@2x.png");
          background-size: 100% 100%;
        }
        .home-title-desc {
          margin-left: d2r(9px);
          font-size: d2r(12px);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(59, 72, 89, 1);
        }
        .home-title-login-out {
          display: block;
          width: d2r(41px);
          height: d2r(41px);
          background: url("../assets/home/icons_quit@2x.png");
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
    .home-title-crumbs {
      box-sizing: border-box;
      width: 100%;
      height: d2r(48px);
      line-height: d2r(48px);
      font-size: d2r(14px);
      padding-left: d2r(42px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      background: rgba(245, 245, 246, 1);
    }
    .home-body {
      width: 100%;
      flex-grow: 1;
    }
  }
}

.sidebar-collapse {
  position: fixed;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: d2r(340px);
  height: d2r(50px);
  background: #303030;
  border-top: 1px solid #202020;
  cursor: pointer;
  transition: all 0.1s;
  .collapse-icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: d2r(20px);
    color: #ffffff;
    width: 64px;
    height: d2r(50px);
    &:hover {
      color: rgba(246, 103, 19, 1);
    }
  }
}

.is-collapse {
  .sidebar-collapse {
    width: 64px;
    .collapse-icon {
      font-size: d2r(20px);
      color: #ffffff;
      &:hover {
        color: rgba(246, 103, 19, 1);
      }
    }
  }
}
</style>