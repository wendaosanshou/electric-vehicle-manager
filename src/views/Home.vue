<template>
  <div class="home">
    <div class="home-sidebar">
      <div class="home-sidebar-title">
        <i class="home-sidebar-logo"></i>
        <span class="home-sidebar-text">电动车智慧管理平台</span>
      </div>
      <div class="home-sidebar-menu">
        <div
          class="sidebar-item"
          :class="{'is-active': item.isActive}"
          v-for="(item, index) in sidbarMenus"
          :key="index"
          @click="onMenuItemClick(item, index)"
        >
          <img :src="getItemLogo(item.logo)" class="icon-item">
          <span class="item-name">{{item.name}}</span>
        </div>
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
          isActive: false
        },
        {
          name: "定位监控",
          logo: "jiankog_icon_normal@2x.png",
          isActive: false
        },
        {
          name: "系统设置",
          logo: "jiankog_icon_normal@2x.png",
          isActive: false
        }
      ]
    };
  },
  methods: {
    getItemLogo(logo) {
      return require(`@/assets/icons/${logo}`);
    },
    onMenuItemClick(item, index) {
      this.sidbarMenus.forEach((menuItem, menuIndex) => {
        if (menuIndex === index) {
          menuItem.isActive = true;
        } else {
          menuItem.isActive = false;
        }
      });
    },
    onLoginOut() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100vw;
  min-height: 100vh;
  .home-sidebar {
    width: 227px;
    height: 100vh;
    background: rgba(48, 48, 48, 1);
    .home-sidebar-title {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 227px;
      height: 133px;
      padding-top: 19px;
      background: rgba(246, 103, 19, 1);
      .home-sidebar-logo {
        width: 68px;
        height: 68px;
        background: url("../assets/home/logo_img@2x.png");
        background-size: 100% 100%;
      }
      .home-sidebar-text {
        font-size: 16px;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
        margin-top: 5px;
      }
    }
    .home-sidebar-menu {
      width: 227px;
      height: auto;
      .sidebar-item {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 227px;
        height: 33px;
        padding-left: 45px;
        cursor: pointer;
        &.is-active {
          background: rgba(246, 103, 19, 1);
        }
        .icon-item {
          display: block;
          width: 12px;
          height: 14px;
        }
        .item-name {
          margin-left: 21px;
          font-size: 11px;
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
    min-width: 1053px;
    min-height: 100vh;
    .home-content-title {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 47px;
      padding: 0 27px;
      .home-title-label {
        font-size: 12px;
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
          width: 22px;
          height: 22px;
          background: url("../assets/home/icon-characters@2x.png");
          background-size: 100% 100%;
        }
        .home-title-desc {
          margin-left: 6px;
          font-size: 8px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(59, 72, 89, 1);
        }
        .home-title-login-out {
          display: block;
          width: 27px;
          height: 27px;
          background: url("../assets/home/icons_quit@2x.png");
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
    .home-title-crumbs {
      box-sizing: border-box;
      width: 100%;
      height: 32px;
      line-height: 32px;
      font-size: 9px;
      padding-left: 28px;
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