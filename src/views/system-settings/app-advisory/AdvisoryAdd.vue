<template>
  <div class="advisory-edit">
    <el-button
      class="button-fix"
      icon="el-icon-edit"
      size="mini"
      type="primary"
      @click="onDialogShow"
      v-if="isEditType"
    >修改</el-button>
    <el-button
      class="button-fix"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="onDialogShow"
      v-else
    >添加资讯</el-button>
    <el-dialog
      class="dialog-fix dialog-container"
      :title="dialogTitle"
      width="630px"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-content">
        <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
          <el-form-item label="序号">
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
              ></el-input>
              <el-upload :show-file-list="false" class="page-upload" :action="imageUploadUrl" :on-success="onImageUploadSuccess">
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
                placeholder="选择页面上传"
              ></el-input>
              <el-upload :show-file-list="false" class="page-upload" :action="htmlUploadUrl" :on-success="onFileUploadSuccess">
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker class="ipt-fix" size="mini" v-model="form.active_time" type="datetime" placeholder="生效时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
            <div class="form-btn-wrap">
              <el-date-picker class="ipt-fix" size="mini" v-model="form.expire_time" type="datetime" placeholder="截止时间"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              class="ipt-fix"
              size="mini"
              resize="none"
              :autosize="{ minRows: 10, maxRows: 10}"
              v-model="form.content"
              placeholder="请输入备注信息（50字内）"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="btn-confirm"
          :class="{'active': isAllowConfirm}"
          size="mini"
          type="primary"
          @click="onDialogConfirm"
        >确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  data() {
    return {
      dialogVisible: false,
      imageUploadUrl: "http://47.92.237.140/api/v1/img/web",
      htmlUploadUrl: "http://47.92.237.140/api/v1/img/guide",
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
    dialogType: {
      type: String,
      default: "add"
    },
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isAllowConfirm() {
      return Object.values(this.form).every(Boolean);
    },
    isEditType() {
      return this.dialogType === "edit";
    },
    dialogTitle() {
      return this.isEditType ? "修改APP咨询" : "添加APP咨询";
    }
  },
  methods: {
    ...mapActions(["addInfoWeb", "updateInfoWeb"]),
    onDialogShow() {
      if (this.isEditType) {
        this.form = JSON.parse(JSON.stringify(this.defaultData));
      }
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    onImageUploadSuccess(res) {
      const { code, data} = res
      if (code === '10000') {
        this.$message({
          type: "success",
          message: "上传成功!"
        })
        this.form.img_url = data
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        })
      }
      console.log('onImageUploadSuccess', res)
    },
    onFileUploadSuccess(res) {
      const { code, data} = res
      if (code === '10000') {
        this.$message({
          type: "success",
          message: "上传成功!"
        })
        this.form.html_url = data
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        })
      }
      console.log('onFileUploadSuccess', res)
    },
    async handleAddInfoWeb() {
      const data = {
        title: this.form.title,
        content: this.form.content,
        img_url: this.form.img_url,
        html_url: this.form.html_url,
        active_time: dayjs(this.form.active_time).format("YYYY-MM-DD HH:mm:ss"),
        expire_time: dayjs(this.form.expire_time).format("YYYY-MM-DD HH:mm:ss")
      };
      await this.addInfoWeb(data);
    },
    async updateAddInfoWeb() {
      const data = {
        id: this.form.id,
        title: this.form.title,
        content: this.form.content,
        img_url: this.form.img_url,
        html_url: this.form.html_url,
        active_time: dayjs(this.form.active_time).format("YYYY-MM-DD HH:mm:ss"),
        expire_time: dayjs(this.form.expire_time).format("YYYY-MM-DD HH:mm:ss")
      };
      await this.updateInfoWeb(data);
    },
    async onDialogConfirm() {
      if (this.isAllowConfirm) {
        if (this.isEditType) {
          await this.updateAddInfoWeb();
        } else {
          await this.handleAddInfoWeb();
        }
        this.onDialogHide();
        this.$emit("onRefresh");
      }
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

.btn-confirm {
  opacity: 0.4;
  &.active {
    opacity: 1;
  }
}
</style>
