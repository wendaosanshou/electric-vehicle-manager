<template>
  <div class="advisory-edit">
    <el-button class="button-fix" icon="el-icon-edit" size="mini" type="primary" @click="onDialogShow">修改</el-button>
      <el-dialog
        class="dialog-fix dialog-container"
        title="修改APP咨询"
        width="630px"
        :visible.sync="dialogVisible"
        @close="onDialogHide"
      >
        <div class="dialog-content">
          <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
            <el-form-item label="序号">
              <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="登录账号（手机号）"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input class="ipt-fix" size="mini" v-model="form.region" placeholder="自动填充"></el-input>
            </el-form-item>
            <el-form-item label="缩略图">
              <div class="form-btn-wrap">
                <el-input
                  class="ipt-fix ipt-half-width"
                  size="mini"
                  v-model="form.type"
                  placeholder="输入密码"
                ></el-input>
                <el-button class="button-fix btn-select" size="mini" type="primary">提交</el-button>
              </div>
            </el-form-item>
            <el-form-item label="上传页面">
              <div class="form-btn-wrap">
                <el-input
                  class="ipt-fix ipt-half-width"
                  size="mini"
                  v-model="form.type"
                  placeholder="输入姓名"
                ></el-input>
                <el-button class="button-fix btn-select" size="mini" type="primary">提交</el-button>
              </div>
            </el-form-item>
            <el-form-item label="生效时间">
              <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="截止时间">
              <div class="form-btn-wrap">
                <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input
                type="textarea"
                class="ipt-fix"
                size="mini"
                resize="none"
                :autosize="{ minRows: 10, maxRows: 10}"
                v-model="form.type"
                placeholder="请输入备注信息（50字内）"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
          <el-button size="mini" @click="onDialogHide">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        data1: "",
        data2: "",
        data3: ""
      }
    };
  },
  methods: {
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-container {
  .dialog-content {
    padding: d2r(39px) d2r(96px) 0 d2r(73px);
    .el-input,
    .el-textarea {
      width: d2r(500px);
    }
    .ipt-half-width {
      width: d2r(330px) !important;
    }
    .form-btn-wrap {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .btn-select {
        margin-left: d2r(10px);
      }
    }
  }
}
</style>
