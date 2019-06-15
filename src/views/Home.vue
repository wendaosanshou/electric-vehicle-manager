<template>
  <div class="home">
    <div class="home-sidebar">
      <div class="home-sidebar-title">
        <i class="home-sidebar-logo"></i>
        <span class="home-sidebar-text">电动车智慧管理平台</span>
      </div>
      <div class="home-sidebar-menu">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo menu-fix"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          background-color="#303030"
          text-color="#CBCBCB"
          active-text-color="#FF5E00"
        >
          <template v-for="(item, index) in sidbarMenus">
            <el-menu-item :key="index" :index="item.index" v-if="!item.children">
              <i class="el-icon-menu"></i>
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
                <i :class="childrenItem.logo"></i>
                <span>{{childrenItem.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>

        <!-- <div
          class="sidebar-item"
          :class="{'is-active': item.isActive}"
          v-for="(item, index) in sidbarMenus"
          :key="index"
          @click="onMenuItemClick(item, index)"
        >
          <img :src="getItemLogo(item.logo)" class="icon-item">
          <span class="item-name">{{item.name}}</span>
        </div> -->
      </div>
    </div>
    <div class="home-content">
      <div class="home-content-title">
        <div class="home-title-label">欢迎您，登录电动车智慧管理平台！</div>
        <div class="home-title-menu">
          <i class="home-title-logo"></i>
          <span class="home-title-desc">用户名00000</span>
          <div class="home-title-login-out" @click="onLoginOut"></div>
        </div>
      </div>
      <div class="home-title-crumbs">所在位置：xxx</div>
      <div class="home-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      sidbarMenus: [
        {
          name: "定位监控",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '1'
        },
        {
          name: "历史轨迹",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '2'
        },
        {
          name: "告警监控",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '3'
        },
        {
          name: "告警分析",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '4'
        },
        {
          name: "电子围栏",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '5'
        },
        {
          name: "办理状态查询",
          logo: "jiankog_icon_normal@2x.png",
          path: "process-search",
          index: '6'
        },
        {
          name: "办理状态管理",
          logo: "jiankog_icon_normal@2x.png",
          path: "process-manage",
          index: '7'
        },
        {
          name: "备案信息管理",
          logo: "jiankog_icon_normal@2x.png",
          path: "record-manage",
          index: '8'
        },
        {
          name: "系统设置",
          logo: "el-icon-location",
          path: "user-manage",
          index: '9',
          children: [
            {
              name: "用户管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: '9-1',
            },
            {
              name: "角色权限管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: '9-2',
            },
            {
              name: "业务办理点管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: '9-3',
            },
            {
              name: "设备安装点管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: '9-4',
            },
            {
              name: "APP资讯管理",
              logo: "el-icon-location",
              path: "user-manage",
              index: '9-5',
            }
          ]
        }
      ]
    };
  },
  methods: {
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
          this.$router.push({
            path: menuItem.path
          });
          break;
        }
        if (menuItem.children && menuItem.children.length > 0) {
          this.onMenuLoop(menuItem.children, menuIndex)
        }
      }
    },
    handleSelect(menuIndex, indexPath) {
      this.onMenuLoop(this.sidbarMenus, menuIndex)
    }
  },
  components: {}
};
</script>

<style lang="scss">
// @import "~@/assets/style/function.scss";

$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.home {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  min-height: 100vh;
  .home-sidebar {
    width: d2r(340px);
    min-height: 100vh;
    background: rgba(48, 48, 48, 1);
    .home-sidebar-title {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: d2r(200px);
      padding-top: d2r(29px);
      background: rgba(246, 103, 19, 1);
      .home-sidebar-logo {
        width: d2r(102px);
        height: d2r(102px);
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
      width: 100%;
      height: auto;
      padding-bottom: d2r(40px);
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
</style>