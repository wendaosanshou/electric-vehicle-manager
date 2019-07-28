<template>
  <div class="role-add">
    <el-button
      class="button-fix btn-add-more"
      icon="el-icon-folder-add"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >批量添加</el-button>
    <el-dialog class="dialog-fix" title="批量添加设备" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-content">
        <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
          <el-form-item label="IMEI">
            <el-input
              class="ipt-fix"
              size="mini"
              v-model="form.imei"
              placeholder="设备文件"
            ></el-input>
            <el-upload :show-file-list="false" class="page-upload" action="" :before-upload="onBeforeUpload">
                <el-button class="button-fix btn-select" size="mini" type="primary">导入文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleAddDevice">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import XLSX from "xlsx";

export default {
  data() {
    return {
      dialogVisible: false,
      authorList: [],
      form: {
        imei: "",
        id: "",
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
      default: 'is-edit'
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["importProducts"]),
    onBeforeUpload(file) {
    console.log(file)
        //   const { name } = file
    //   let wb = XLSX.read(file)
    //   console.log(wb)
      return Promise.reject()
    },
    onImageUploadSuccess(res) {
      const { code, data} = res
      if (code === '10000') {
        this.$message({
          type: "success",
          message: "上传成功!"
        })
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        })
      }
      console.log('onImageUploadSuccess', res)
    },
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
      this.resetDeviceParams()
    },
    resetDeviceParams() {
      this.form = {
        imei: "",
        id: "",
        note: ""
      }
    },
    async handleAddDevice() {
      if (!this.form.imei || this.form.imei.length !== 15) {
        this.$message({
          type: 'error',
          message: 'IMEI号格式不正确'
        })
      } else {
        this.onDialogHide()
      }
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

.btn-add-more {
  margin-left: 10px;
}

.page-upload {
    margin-left: 10px;
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
  overflow: scroll;
}
</style>
