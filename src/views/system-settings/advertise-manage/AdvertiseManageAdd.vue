<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      :icon="dialogTips.icon"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >{{dialogTips.btn}}</el-button>
    <el-dialog
      class="dialog-fix"
      :title="dialogTips.title"
      :visible.sync="dialogVisible"
      @close="onDialogHide">
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form">
          <el-form-item label="序号" v-if="isEdit">
            <el-input class="ipt-fix" size="mini" v-model="form.id" placeholder="请输入序号" disabled></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <div class="form-btn-wrap">
              <el-input
                class="ipt-fix ipt-half-width"
                size="mini"
                v-model="form.img_url"
                placeholder="请选择您要上传的图片"
                disabled
              ></el-input>
              <el-upload
                :show-file-list="false"
                class="page-upload"
                accept="image/*"
                :action="imageUploadUrl"
                :on-success="onImageUploadSuccess">
                <el-button class="button-fix btn-select" size="mini" type="primary">本地文件选择</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="跳转url">
            <el-input class="ipt-fix" size="mini" v-model="form.page_url" placeholder="请输入跳转url"></el-input>
          </el-form-item>
          <el-form-item label="生效时间">
            <el-date-picker
              class="ipt-fix ipt-timer-selector"
              v-model="form.start_time"
              type="datetime"
              size="mini"
              placeholder="请选择生效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              class="ipt-fix ipt-timer-selector"
              v-model="form.end_time"
              type="datetime"
              size="mini"
              placeholder="请选择截止时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            maxlength="200"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="form.note" placeholder="请输入版本说明（200字内）"></el-input>
          </el-form-item>
          
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleConfirmAdvertise">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from 'dayjs'
import PageTitle from "@/components/PageTitle.vue";

export default {
  data() {
    return {
      pickerTime: [],
      loading: '',
      dialogVisible: false,
      form: {
        name: "",
        img_url: "",
        page_url: "",
        start_time: "",
        end_time: "",
        note: ""
      }
    };
  },
  props: {
    advertiseData: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "is-add"
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isEdit() {
      return this.type && this.type === 'is-edit'
    },
    isAdd() {
      return this.type && this.type === 'is-add'
    },
    dialogTips() {
      if (this.isEdit) {
        return {
          btn: '编辑',
          title: '编辑广告',
          icon: 'el-icon-edit'
        }
      } else {
        return {
          btn: '添加广告',
          title: '添加广告',
          icon: 'el-icon-document-add'
        }
      }
    }
  },
  methods: {
    ...mapActions(["addGuide", "addApkFile"]),
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
    onImageUploadSuccess(res) {
      const { code, data } = res;
      if (code === "10000") {
        this.$message({
          type: "success",
          message: "上传成功!"
        });
        console.log(data)
        this.form.img_url = data
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        });
      }
      console.log("onImageUploadSuccess", res);
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
        name: "",
        img_url: "",
        page_url: "",
        start_time: "",
        end_time: "",
        note: ""
      }
    },
    async handleAddAdvertise() {
      await this.addGuide({
        name: this.form.name,
        img_url: this.form.img_url,
        page_url: this.form.page_url,
        start_time: dayjs(this.form.start_time).format("YYYY-MM-DD HH:mm:ss"),
        end_time: dayjs(this.form.end_time).format("YYYY-MM-DD HH:mm:ss"),
        note: this.form.note
      });
    },
    async handleEditAdvertise() {
      // await this.addGuide({
      //   name: this.form.name,
      //   img_url: this.form.img_url,
      //   page_url: this.form.page_url,
      //   start_time: dayjs(this.form.start_time).format("YYYY-MM-DD HH:mm:ss"),
      //   end_time: dayjs(this.form.end_time).format("YYYY-MM-DD HH:mm:ss"),
      //   note: this.form.note
      // });
    },
    async handleConfirmAdvertise() {
      const isAllowConfirm = this.form.img_url && this.form.page_url && this.form.start_time && this.form.end_time && this.form.note
      if (isAllowConfirm) {
        if (this.isAdd) {
          await this.handleAddAdvertise()
        } else {
          await this.handleEditAdvertise()
        }
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
      if (this.isEdit) {
        this.form = this.advertiseData;
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

.ipt-timer-selector {
  width: 100% !important;
}
</style>
