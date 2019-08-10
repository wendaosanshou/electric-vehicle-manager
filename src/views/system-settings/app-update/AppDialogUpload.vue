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
      title="上传版本"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form"
        >
          <el-form-item label="选择需要上传的设备升级版本文件">
            <div class="form-btn-wrap">
              <el-input
                class="ipt-fix ipt-half-width"
                size="mini"
                v-model="form.download"
                placeholder="(*.apk)"
                disabled
              ></el-input>
              <el-upload
                :show-file-list="false"
                class="page-upload"
                :action="imageUploadUrl"
                :before-upload="onBeforeUpload"
                :on-success="onImageUploadSuccess"
              >
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="app名称">
            <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="请输入app名称" disabled></el-input>
          </el-form-item>
           <el-form-item label="版本名称">
            <el-input class="ipt-fix" size="mini" v-model="form.version" placeholder="请输入版本名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="版本说明">
            <el-input type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            maxlength="200"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="form.note" placeholder="请输入版本说明（200字内）"></el-input>
          </el-form-item>
          <el-form-item label="是否强制升级">
            <el-select
              class="ipt-fix"
              size="mini"
              width="120"
              v-model="form.upgrade" placeholder="请选择">
              <el-option
                v-for="item in upgradeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleAddFirmware">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      loading: '',
      dialogVisible: false,
      form: {
        version: "",
        download: "",
        operation: "",
        name: "",
        note: "",
        upgrade: 1
      },
      upgradeList: [
        {
          label: '强制升级',
          value: 1
        },
        {
          label: '非强制升级',
          value: 0
        }
      ]
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
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["importProducts", "addApkFile"]),
    onBeforeUpload(file) {
      const { name } = file
      console.log(name)
      // 格式需要类似：app-merchant-0706.apk
      if (/^([^\d]+)(\d+_*\d*)(.apk)$/.test(name)) {
        this.renderLoading()
        return Promise.resolve()
      } else {
        this.$message({
          type: "error",
          message: "文件格式名称有误!"
        });
        return Promise.reject()
      }
    },
    getApkName(name) {
      let apkName = ''
      if (name.indexOf('merchant') > -1) {
        apkName = '易骑商家'
      } else if (name.indexOf('eriding') > -1) {
        apkName = '易骑无忧'
      }
      return apkName
    },
    onImageUploadSuccess(res, file) {
      const { code, data } = res;
      const { name } = file
      if (code === "10000") {
        this.form.version = name.replace(/([^\d]+)(\d+)(_*)(\d*)(.apk)/gi, '$2')
        this.form.name = this.getApkName(name)
        this.$message({
          type: "success",
          message: "上传成功!"
        });
        this.form.download = data;
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        });
      }
      this.loading.close()
    },
    renderLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    clearForm() {
      this.form = {
        version: "",
        download: "",
        operation: "",
        name: "",
        note: "",
        upgrade: 1
      }
    },
    async handleAddFirmware() {
      if (this.form.name && this.form.download && this.form.version && this.form.note) {
        await this.addApkFile({
          name: this.form.name,
          operation: this.userInfo.account,
          version: this.form.version,
          download: this.form.download,
          note: this.form.note,
          upgrade: this.form.upgrade
        });
        this.clearForm()
        this.$emit('onRefresh')
        this.onDialogHide()
      } else {
        this.$message({
          type: "error",
          message: "信息输入不完整~"
        })
      }
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
</style>
