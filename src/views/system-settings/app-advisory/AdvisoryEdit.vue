<template>
  <div class="advisory-edit">
    <el-button class="button-fix" icon="el-icon-edit" size="mini" type="primary" @click="onDialogShow">修改</el-button>
      <el-dialog
        class="dialog-fix dialog-container"
        title="修改APP资讯"
        width="630px"
        :visible.sync="dialogVisible"
        @close="onDialogHide"
      >
        <div class="dialog-content">
          <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
          <el-form-item label="创建人">
            <el-input
              class="ipt-fix"
              size="mini"
              v-model="userInfo.account"
              placeholder="登录账号（手机号）"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input class="ipt-fix" size="mini" v-model="form.title" placeholder="输入标题"></el-input>
          </el-form-item>
          <el-form-item label="缩略图">
            <div class="form-btn-wrap">
              <el-input
                class="ipt-fix ipt-half-width"
                size="mini"
                v-model="form.img_url"
                placeholder="选择页面缩略图上传"
                disabled
              ></el-input>
              <el-upload :show-file-list="false" class="page-upload" :action="imageUploadUrl">
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="上传页面">
            <div class="form-btn-wrap">
              <el-input
                class="ipt-fix ipt-half-width"
                size="mini"
                v-model="form.html_url"
                placeholder="选择页面上传或手动输入链接"
              ></el-input>
              <el-upload :show-file-list="false" class="page-upload" :action="htmlUploadUrl">
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker class="ipt-fix" v-model="form.active_time" size="mini" type="date" placeholder="生效时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
            <div class="form-btn-wrap">
              <el-date-picker class="ipt-fix" v-model="form.expire_time" size="mini" type="date" placeholder="截止时间"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              class="ipt-fix"
              size="mini"
              resize="none"
              maxlength="50"
              :autosize="{ minRows: 10, maxRows: 10}"
              v-model="form.content"
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        title: "",
        content: "",
        img_url: "",
        html_url: "",
        active_time: "",
        expire_time: ""
      }
    };
  },
  props: {
    defaultData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onDialogShow() {
      this.form = JSON.parse(JSON.stringify(this.defaultData))
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
