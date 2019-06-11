<template>
  <div class="page-login">
    <div class="page-login-body">
      <div class="login-form">
        <div class="login-form-pic"></div>
        <div class="login-form-body">
          <h3 class="form-title">用户登录</h3>
          <div class="form-username form-ipt-wraper">
            <i class="icon-username form-icon"></i>
            <input class="form-username-ipt form-ipt" type="text" placeholder="用户名">
          </div>
          <div class="form-password form-ipt-wraper">
            <i class="icon-password form-icon"></i>
            <input class="form-password-ipt form-ipt" type="text" placeholder="请输入密码">
          </div>
          <div class="form-verifycode form-ipt-wraper">
            <div class="form-verifycode-ipt-wraper">
              <i class="icon-verifycode form-icon"></i>
              <input class="form-verifycode-ipt form-ipt" type="text" placeholder="验证码">
            </div>
            <div class="form-verifycode-number">XDJT</div>
          </div>
          <div class="form-remain-password">
            <i
              class="remain-password-checkbox"
              :class="{active: selectRemainPassword}"
              @click="onSelectRemainPassword"
            ></i>
            <span class="remain-password-label">记住密码</span>
          </div>
          <div class="form-btn-login" @click="onLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      selectRemainPassword: true
    };
  },
  methods: {
    onSelectRemainPassword() {
      this.selectRemainPassword = !this.selectRemainPassword;
    },
    onLogin() {
      this.$router.push({
        path: "/home"
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
.page-login {
  width: 100%;
  height: 100vh;
  .page-login-body {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    padding-top: 15%;
    background: url("../assets/login/login-bg.png");
    background-size: 100% 100%;
  }
  .login-form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 767px;
    height: 400px;
    margin: 0 auto;
    .login-form-pic {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 295px;
      height: 400px;
      border-radius: 5px 0px 0px 5px;
      background: url("../assets/login/login-form-image.png");
      background-size: 100% 100%;
    }
    .login-form-body {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 471px;
      height: 400px;
      padding-top: 49px;
      padding-left: 69px;
      background: #ffffff;
      .form-title {
        font-size: 29px;
        font-family: Helvetica-Bold;
        font-weight: bold;
        padding: 0;
        margin: 0;
        color: rgba(0, 0, 0, 1);
      }
      .form-ipt-wraper {
        box-sizing: border-box;
        position: relative;
        margin-top: 24px;
        width: 333px;
        height: 33px;
        padding-left: 37px;
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
        .form-icon {
          position: absolute;
          display: block;
          left: 13px;
          top: 50%;
          width: 14px;
          height: 14px;
          transform: translateY(-50%);
        }
        .form-ipt {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: 11px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          border: 0;
          background: transparent;
        }
      }
      .form-username {
        .icon-username {
          background: url("../assets/login/icon-user.png");
          background-size: 100% 100%;
        }
      }
      .form-password {
        .icon-password {
          background: url("../assets/login/icon-lock.png");
          background-size: 100% 100%;
        }
      }
      .form-verifycode {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0;
        background: #ffffff;
        border: 0;
        .form-verifycode-ipt-wraper {
          position: relative;
          width: 220px;
          height: 33px;
          padding-left: 37px;
          background: rgba(247, 247, 247, 1);
          border: 1px solid rgba(203, 203, 203, 1);
          .icon-verifycode {
            background: url("../assets/login/icon-security.png");
            background-size: 100% 100%;
          }
        }
        .form-verifycode-number {
          width: 107px;
          height: 33px;
          line-height: 33px;
          margin-left: 7px;
          font-size: 14px;
          color: #ffffff;
          background: rgba(255, 117, 37, 1);
        }
      }
      .form-remain-password {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        margin-top: 13px;
        width: 145px;
        height: 19px;
        .remain-password-checkbox {
          display: block;
          width: 13px;
          height: 13px;
          cursor: pointer;
          background: url("../assets/login/icon-checkbox-gray.png");
          background-size: 100% 100%;
          &.active {
            background: url("../assets/login/icon-checkbox-yellow.png");
            background-size: 100% 100%;
          }
        }
        .remain-password-label {
          margin-left: 4px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
        }
      }
      .form-btn-login {
        width: 333px;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        background: rgba(255, 117, 37, 1);
        margin-top: 14px;
      }
    }
  }
}
</style>
