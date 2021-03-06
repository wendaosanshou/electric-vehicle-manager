<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      icon="el-icon-refresh"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >上传版本</el-button>
    <el-dialog
      class="dialog-fix"
      title="单个设备升级"
      :visible.sync="dialogVisible"
      @close="onDialogHide">
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form">
          <el-form-item label="选择需要上传的设备升级版本文件">
            <div class="form-btn-wrap">
              <el-input
                class="ipt-fix ipt-half-width"
                size="mini"
                v-model="form.version_url"
                placeholder="(*.bin)"
                disabled
              ></el-input>
              <el-upload
                :show-file-list="false"
                class="page-upload"
                :action="firmwareUploadUrl"
                :before-upload="onBeforeUpload"
                :on-success="onImageUploadSuccess"
              >
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="md5">
            <el-input class="ipt-fix" size="mini" v-model="form.md5" placeholder="请输入md5" disabled></el-input>
          </el-form-item>
           <el-form-item label="版本名称">
            <el-input class="ipt-fix" size="mini" v-model="form.version" placeholder="请输入版本名称"></el-input>
          </el-form-item>
          <el-form-item label="版本说明">
            <el-input type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            maxlength="50"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="form.note" placeholder="请输入版本说明（50字内）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" class="btn-confirm" :class="{'active': allowUpload}" @click="handleAddFirmware">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      firmwareUploadUrl: "http://api.renownchn.com/api/v1/file/firmware",
      form: {
        version: "",
        version_url: "",
        operation: "",
        md5: "",
        note: ""
      }
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "is-edit"
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    allowUpload() {
      return Object.keys(this.form).every(key => {
        if (['version', 'version_url', 'md5', 'note'].indexOf(key) > -1) {
          return this.form[key]
        } else {
          return true
        }
      })
    }
  },
  methods: {
    ...mapActions(["importProducts", "addFirmware"]),
    clearForm() {
      this.form = {
        version: "",
        version_url: "",
        operation: "",
        md5: "",
        note: ""
      }
    },
    onBeforeUpload(file) {
      const { name } = file
      // 格式需要类似：app.bin
      if (/^([\s\S]+)(.bin)$/.test(name)) {
        return Promise.resolve()
      } else {
        this.$message({
          type: "error",
          message: "文件格式有误!"
        });
        return Promise.reject()
      }
    },
    onImageUploadSuccess(res, file) {
      const { code, data } = res;
      const { name } = file
      if (code === "10000") {
        this.$message({
          type: "success",
          message: "上传成功!"
        });
        this.form.version_url = data;
        this.form.md5 = md5(name)
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        });
      }
      console.log("onImageUploadSuccess", res);
    },
    async handleAddFirmware() {
      if (!this.allowUpload) {
        return false
      }
      await this.addFirmware({
        version: this.form.version,
        version_url: this.form.version_url,
        md5: this.form.md5,
        operation: this.userInfo.account,
        note: this.form.note
      });
      this.$emit('onRefresh')
      this.clearForm()
      this.onDialogHide()
    },
    onDialogShow() {
      if (this.isEditDialog) {
        this.form = this.data;
      }
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.clearForm()
      this.dialogVisible = false;
    },
    handleUpdateDevice() {
      console.log(this.form);
    }
  },
  components: {
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-title {
  box-sizing: border-box;
  width: 100%;
  height: d2r(51px);
  line-height: d2r(51px);
  font-size: d2r(16px);
  padding-left: d2r(22px);
  text-align: left;
  border-bottom: 1px solid #dddddd;
}

.dialog-content {
  padding: d2r(24px) d2r(25px) d2r(34px) d2r(22px);
}

.table-col-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: d2r(13px);
  color: #3b4859;
  min-height: d2r(443px);
}

.role-manage-table tr td:nth-child(3) .cell {
  padding: 0;
}

.role-manage-tree-wrap {
  width: 100%;
  height: d2r(500px);
  overflow: auto;
}

.el-form-item {
  .el-form-item__label {
    width: d2r(220px) !important;
  }
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

.ipt-half-width {
  width: d2r(330px) !important;
}

.btn-confirm {
  opacity: 0.6;
  &.active {
    opacity: 1;
  }
}
</style>
