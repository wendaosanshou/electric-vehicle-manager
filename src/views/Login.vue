<template>
  <div class="page-login">
    <div class="page-login-body">
      <div class="login-form">
        <div class="login-form-pic"></div>
        <div class="login-form-body">
          <h3 class="form-title">用户登录</h3>
          <div class="form-username form-ipt-wraper">
            <i class="icon-username form-icon"></i>
            <input
              class="form-username-ipt form-ipt"
              type="text"
              placeholder="用户名"
              v-model="account"
            >
          </div>
          <div class="form-password form-ipt-wraper">
            <i class="icon-password form-icon"></i>
            <input
              class="form-password-ipt form-ipt"
              type="password"
              placeholder="请输入密码"
              v-model="password"
            >
          </div>
          <div class="form-verifycode form-ipt-wraper">
            <div class="form-verifycode-ipt-wraper">
              <i class="icon-verifycode form-icon"></i>
              <input
                class="form-verifycode-ipt form-ipt"
                type="text"
                placeholder="验证码"
                v-model="verifyCode"
                @keyup.enter="onLogin">
            </div>
            <div class="form-verifycode-number" @click="refreshCode">
              <verify-code class="verifycode-label" :identifyCode="identifyCode"></verify-code>
            </div>
          </div>
          <div class="form-remain-password">
            <i
              class="remain-password-checkbox"
              :class="{active: selectRemainPassword}"
              @click="onSelectRemainPassword"
            ></i>
            <span class="remain-password-label">记住密码</span>
          </div>
          <div class="form-btn-login" :class="{active: allowLogin}" @click="onLogin">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions, mapMutations } from "vuex";
import VerifyCode from "@/components/VerifyCode.vue";

export default {
  name: "home",
  data() {
    return {
      selectRemainPassword: true,
      account: "",
      password: "",
      verifyCode: "",
      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  computed: {
    allowToogleVerifyCode() {
      return this.account && this.account.length > 0;
    },
    allowLogin() {
      return this.account && this.password;
    }
  },
  methods: {
    ...mapActions(["userLogin"]),
    ...mapMutations(['updateLoginForm']),
    onSelectRemainPassword() {
      this.selectRemainPassword = !this.selectRemainPassword;
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    initVerifyCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    clearUserLoginForm() {
      this.$util.removeStorage('user_login')
    },
    saveUserLoginForm() {
      this.$util.setStorage('user_login', {
        account: this.account,
        password: this.password
      })
      // 存储账号密码，用于修改密码时校验
      this.updateLoginForm({
        account: this.account,
        password: this.password
      })
    },
    initUserStorageForm() {
      let { account, password} = this.$util.getStorage('user_login') || {}
      if (account && password) {
        this.account = account
        this.password = password
      }
    },
    async onLogin() {
      try {
        if (this.allowLogin) {
          if (this.verifyCode !== this.identifyCode) {
            this.$message({
              type: "error",
              message: "验证码输入错误!"
            });
            return this.initVerifyCode();
          }
          await this.userLogin({
            account: this.account,
            password: this.password
          });
          if (this.selectRemainPassword) {
            this.saveUserLoginForm()
          } else {
            this.clearUserLoginForm()
          }
          this.$router.push({
            path: "/"
          });
        }
      } catch (error) {
        this.initVerifyCode();
      }
    }
  },
  components: {
    VerifyCode
  },
  mounted() {
    this.initUserStorageForm()
    this.initVerifyCode();
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/function.scss";

.page-login {
  width: 100%;
  min-height: 100vh;
  .page-login-body {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-top: d2r(266px);
    background: url("~@/assets/login/login-bg.png");
    background-size: 100% 100%;
  }
  .login-form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: d2r(1150px);
    height: d2r(600px);
    margin: 0 auto;
    .login-form-pic {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: d2r(443px);
      height: d2r(600px);
      border-radius: 5px 0px 0px 5px;
      background: url("~@/assets/login/login-form-image.png");
      background-size: 100% 100%;
    }
    .login-form-body {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: d2r(707px);
      height: d2r(600px);
      padding-top: d2r(73px);
      padding-left: d2r(103px);
      background: #ffffff;
      .form-title {
        font-size: d2r(43px);
        font-family: Helvetica-Bold;
        font-weight: bold;
        padding: 0;
        margin: 0;
        color: rgba(0, 0, 0, 1);
      }
      .form-ipt-wraper {
        box-sizing: border-box;
        position: relative;
        margin-top: d2r(38px);
        width: d2r(500px);
        height: d2r(50px);
        padding-left: d2r(55px);
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
        .form-icon {
          position: absolute;
          display: block;
          left: d2r(13px);
          top: 50%;
          width: d2r(21px);
          height: d2r(21px);
          transform: translateY(-50%);
        }
        .form-ipt {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: d2r(17px);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          border: 0;
          background: transparent;
        }
      }
      .form-username {
        .icon-username {
          background: url("~@/assets/login/icon-user.png");
          background-size: 100% 100%;
        }
      }
      .form-password {
        .icon-password {
          background: url("~@/assets/login/icon-lock.png");
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
          width: d2r(330px);
          height: d2r(50px);
          padding-left: d2r(55px);
          background: rgba(247, 247, 247, 1);
          border: 1px solid rgba(203, 203, 203, 1);
          .icon-verifycode {
            background: url("~@/assets/login/icon-security.png");
            background-size: 100% 100%;
          }
        }
        .get-verify-code {
          width: d2r(160px);
          height: d2r(50px);
          line-height: d2r(50px);
          margin-left: d2r(10px);
          font-size: d2r(17px);
          color: #ffffff;
          background: rgba(255, 117, 37, 1);
        }
        .form-verifycode-number {
          width: d2r(160px);
          height: d2r(50px);
          line-height: d2r(50px);
          margin-left: d2r(10px);
          font-size: d2r(30px);
          color: #ffffff;
          cursor: pointer;
          .verifycode-label {
            width: d2r(160px);
            height: d2r(50px);
          }
        }
      }
      .form-remain-password {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        margin-top: d2r(27px);
        .remain-password-checkbox {
          display: block;
          width: d2r(20px);
          height: d2r(20px);
          cursor: pointer;
          background: url("~@/assets/login/icon-checkbox-gray.png");
          background-size: 100% 100%;
          &.active {
            background: url("~@/assets/login/icon-checkbox-yellow.png");
            background-size: 100% 100%;
          }
        }
        .remain-password-label {
          margin-left: d2r(4px);
          font-size: d2r(20px);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
        }
      }
      .form-btn-login {
        width: d2r(500px);
        height: d2r(60px);
        line-height: d2r(60px);
        font-size: d2r(22px);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        background: rgba(255, 117, 37, 1);
        margin-top: d2r(23px);
        opacity: 0.4;
        cursor: pointer;
        &.active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
