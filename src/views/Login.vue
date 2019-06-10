<template>
  <div class="page-login">
    <div class="page-login-body">
      <div class="login-form">
        <div class="login-form-pic">
          <i class="icon-logo"></i>
          <div class="form-pic-welcome">welcome</div>
          <div class="form-pic-font">电动车智慧管理平台</div>
        </div>
        <div class="login-form-body">
          <h3 class="form-title">用户登录</h3>
          <div class="form-username"></div>
          <div class="form-password"></div>
          <div class="form-verifycode"></div>
          <div class="form-remain-password"></div>
          <div class="form-btn-login">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
.page-login {
  width: 100%;
  height: 100vh;
  .page-login-body {
    box-sizing: border-box;
    width: 1920px;
    height: 1080px;
    padding-top: 266px;
    background: url("../assets/login/bg.png");
    background-size: 100% 100%;
  }
  .login-form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 1150px;
    height: 600px;
    margin: 0 auto;
    .login-form-pic {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 443px;
      height: 600px;
      padding-top: 154px;
      background: rgba(246, 103, 20, 1);
      border-radius: 8px 0px 0px 8px;
      .icon-logo {
        width: 117px;
        height: 129px;
        background: url("../assets/login/bg.png");
        background-size: 100% 100%;
      }
      .form-pic-welcome {
        font-size: 43px;
        color: #ffffff;
        margin-top: 34px;
      }
      .form-pic-font {
        font-size: 43px;
        color: #ffffff;
        margin-top: 15px;
      }
    }
    .login-form-body {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 707px;
      height: 600px;
      padding-top: 73px;
      padding-left: 103px;
      background: #ffffff;
      .form-title {
        font-size: 43px;
        font-family: Helvetica-Bold;
        font-weight: bold;
        padding: 0;
        margin: 0;
        color: rgba(0, 0, 0, 1);
        line-height: 52px;
      }
      .form-username {
        margin-top: 38px;
        width: 500px;
        height: 50px;
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
      }
      .form-password {
        margin-top: 35px;
        width: 500px;
        height: 50px;
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
      }
      .form-verifycode {
        margin-top: 35px;
        width: 500px;
        height: 50px;
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
      }
      .form-remain-password {
        margin-top: 35px;
        width: 217px;
        height: 28px;
        background: rgba(247, 247, 247, 1);
        border: 1px solid rgba(203, 203, 203, 1);
      }
      .form-btn-login {
        width: 500px;
        height: 60px;
        font-size: 22px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 60px;
        background: rgba(255, 117, 37, 1);
        margin-top: 20px;
      }
    }
  }
}
</style>
