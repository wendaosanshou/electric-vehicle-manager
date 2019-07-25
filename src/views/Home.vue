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
          :collapse="isCollapse">
          <template v-for="(item, index) in filterSidebarMenus">
            <el-menu-item :key="index" :index="item.index" v-if="!item.children">
              <i :class="item.logo"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu
              :index="item.index"
              v-else-if="item.children && item.children.length > 0"
              :key="index">
              <template slot="title">
                <i :class="item.logo"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                :index="childrenItem.index"
                v-for="(childrenItem, childrenIndex) in item.children"
                :key="childrenIndex">
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
    <div class="home-content-container">
      <div class="home-content">
        <div class="home-content-title">
          <div class="home-title-label">欢迎您，登录电动车智慧管理平台！</div>
          <div class="home-title-menu">
            <i class="home-title-logo"></i>
            <el-dropdown size="small" @command="onDropdownClick">
              <span class="home-title-desc">用户名：{{userInfo.name}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" command="password">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="home-title-login-out" @click="onLoginOut"></div>
          </div>
        </div>
        <div class="home-title-crumbs">所在位置：{{activePageName}}</div>
        <div class="home-body">
          <router-view/>
        </div>
      </div>
    </div>

    <el-dialog
      class="dialog-fix dialog-container"
      title="修改密码"
      width="700px"
      :visible.sync="passwordDialogVisible"
      @close="onPasswordDialogHide">
      <div class="filing-dialog-content">
       <el-steps :active="passwordStep" finish-status="success" simple>
        <el-step title="1.修改原密码" ></el-step>
        <el-step title="2.设置新密码"></el-step>
        <el-step title="3.修改完成"></el-step>
      </el-steps>
      <div class="step-1 step-content" v-if="passwordStep === 1">
        <el-form class="password-form" label-position="right" label-width="80px" :model="passwordForm">
          <el-form-item label="原密码">
            <el-input
              class="ipt-fix ipt-passowrd"
              size="mini"
              type="password"
              v-model="passwordForm.oldPassword"
              placeholder="请输入原密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-2 step-content" v-else-if="passwordStep === 2">
        <el-form class="password-form" label-position="right" label-width="80px" :model="passwordForm">
          <el-form-item label="新密码">
            <el-input
              class="ipt-fix ipt-passowrd"
              size="mini"
              type="password"
              v-model="passwordForm.newPassword"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              class="ipt-fix ipt-passowrd"
              size="mini"
              type="password"
              v-model="passwordForm.newPasswordConfirm"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="step-3 step-content" v-else-if="passwordStep === 3">
        <i class="modify-success-logo"></i>
        <div class="modify-success-tips">恭喜您：修改密码成功，请使用新的登录密码进行登录!</div>
      </div>
      </div>
      <div slot="footer" class="dialog-footer dialog-passoword-footer" v-if="passwordStep !== 3">
        <el-button class="btn-passowrd" size="mini" type="primary" @click="onPasswrodDialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { setTimeout, setImmediate } from "timers";

export default {
  name: "home",
  data() {
    return {
      passwordStep: 1,
      passwordDialogVisible: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
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
          name: "办理状态管理",
          logo: "el-icon-set-up",
          path: "process-manage",
          index: "6",
          role: "6"
        },
        {
          name: "办理状态查询",
          logo: "el-icon-search",
          path: "process-search",
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
              name: "工作人员管理",
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
            },
            {
              name: "APP升级管理",
              logo: "el-icon-location",
              path: "app-update",
              index: "9-9",
              role: "21"
            },
            {
              name: "客户留言管理",
              logo: "el-icon-location",
              path: "user-feedback",
              index: "9-10",
              role: "22"
            },
            {
              name: "渠道属性管理",
              logo: "el-icon-location",
              path: "channel-manage",
              index: "9-11",
              role: "23"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["activePageName", "userInfo", "role", "defaultActiveMenu", "loginForm"]),
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
      "getBusinessInstall",
      "resetPassword"
    ]),
    ...mapMutations(["updateActivePageName", "updateDefaultActiveMenu", "loginout"]),
    onDropdownClick(command) {
      if (command === 'password') {
        this.resetPasswordParams()
        this.passwordStep = 1
        this.passwordDialogVisible = true
      }
    },
    resetPasswordParams() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
    },
    handleOldPassword() {
      if (this.passwordForm.oldPassword === this.loginForm.password) {
        this.passwordStep = 2
      } else {
        this.$message({
          type: "error",
          message: `原密码输入有误！`
        })
      }
    },
    async handleConfirmModifyPassword() {
      const { newPassword, newPasswordConfirm } = this.passwordForm
      if (newPassword !== newPasswordConfirm) {
        this.$message({
          type: "error",
          message: `两次密码输入不一致输入有误！`
        })
      } else if (!newPassword || newPassword && newPassword.length < 6 || newPassword && newPassword.length > 20) {
        this.$message({
          type: "error",
          message: `密码长度需要在6~20位以内！`
        })
      } else {
        await this.resetPassword(
          {
            account: this.loginForm.account,
            password: this.passwordForm.newPassword
          }
        )
        this.passwordStep = 3
        setTimeout(() => {
          this.onLoginOut()
        }, 3000)
      }
    },
    onPasswrodDialogConfirm() {
      if (this.passwordStep < 3) {
        if (this.passwordStep === 1) {
          this.handleOldPassword()
        } else if (this.passwordStep === 2) {
          this.handleConfirmModifyPassword()
        }
      } else {
        this.passwordDialogVisible = false
      }
    },
    onPasswordDialogHide() {
      this.passwordDialogVisible = false
    },
    getSidebarMenu(sidebarMenus) {
      const { author } = this.role
      let authorList = []
      if (author && author.split(',').length > 0) {
        authorList = author.split(',')
      }
      sidebarMenus.forEach(item => {
        const { role } = item
        // 如果有子节点，先遍历一遍子节点
        if (role === '9' && item.children && item.children.length > 0) {
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
    onLoginOut() {
      this.loginout()
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
        this.$router.replace("/login");
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
        case "/record-setting":
          activeMenu = "备案信息管理 > 修改信息";
          break;
        case "/user-manage":
          activeMenu = "系统设置 > 工作人员管理";
          break;
        case "/user-add":
          activeMenu = "系统设置 > 工作人员管理 > 添加用户";
          break;
        case "/user-edit":
          activeMenu = "系统设置 > 工作人员管理 > 编辑用户";
          break;
        case "/channel-manage":
          activeMenu = "系统设置 > 渠道属性管理";
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
        case "/app-update":
          activeMenu = "系统设置 > APP升级管理";
          break;
        case "/user-feedback":
          activeMenu = "系统设置 > 客户留言管理";
          break;
        case "/channel-manage":
          activeMenu = "系统设置 > 渠道属性管理";
          break;
        default:
          activeMenu = "";
          break;
      }
      console.log('initActiveMenu', path, activeMenu);
      this.updateActivePageName(activeMenu);
    },
    async initAllBusinessPoint() {
      //  进页面初始化角色权限数据
      await this.getAllBusinessPoint();
      await this.getBusinessHandle();
      await this.getBusinessInstall();
    },
    initCurrentPage() {
      const { path } = this.$route
      console.log(path)
      if (this.filterSidebarMenus && this.filterSidebarMenus.length > 0 && path === '/') {
        let [firstItem] = this.filterSidebarMenus
        if (firstItem && firstItem.children && firstItem.children.length > 0) {
          let currentItem = firstItem.children[0]
          this.$router.push(currentItem.path)
          this.updateDefaultActiveMenu(currentItem.index)
        } else {
          let currentItem = this.filterSidebarMenus[0]
          this.$router.push(currentItem.path)
          this.updateDefaultActiveMenu(currentItem.index)
        }
      } else {
        // 如果没有更新权限，更新面包屑文案
        this.initActiveMenu();
      }
    }
  },
  created() {
    this.checkIsLogin();
  },
  mounted() {
    this.initAllBusinessPoint();
    this.getSidebarMenu(this.sidebarMenus)
    this.initCurrentPage()
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

.home-content-container {
  flex: 1;
  width: auto;
  overflow: scroll;
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
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .home-title-dropdown {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
        }
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
          cursor: pointer;
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
      box-sizing: border-box;
      width: 100%;
      flex-grow: 1;
      padding-right: d2r(6px);
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

.step-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: d2r(58px);
  &.step-3 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: d2r(60px);
    .modify-success-logo {
      width: d2r(144px);
      height: d2r(100px);
      background: url('~@/assets/icons/password-success.png');
      background-size: 100% 100%;
    }
    .modify-success-tips {
      font-size:d2r(20px);
      margin-top: d2r(30px);
      text-align: center;
    }
  }
  .password-form {
    width: d2r(600px);
  }
}


.btn-passowrd {
  width: d2r(320px)!important;
}
</style>