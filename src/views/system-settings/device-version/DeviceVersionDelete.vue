<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      icon="el-icon-refresh"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >删除版本</el-button>
    <el-dialog class="dialog-fix" title="删除版本" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-content">
        <el-form class="user-add-form device-form-fix" label-position="right" label-width="180px" :model="form">
          <el-form-item label="选择需要删除的版本文件">
            <el-input
              class="ipt-fix"
              size="mini"
              v-model="form.imei"
              placeholder="设备号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleUpdateDevice">确 定</el-button>
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
      dialogVisible: false,
      imageUploadUrl: "http://47.92.237.140/api/v1/img/web",
      form: {
        imei: "",
        id: "",
        note: "",
        img_url: ""
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
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["importProducts"]),
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
    onDialogShow() {
      if (this.isEditDialog) {
        this.form = this.data;
      }
      this.dialogVisible = true;
    },
    onDialogHide() {
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
  overflow: scroll;
}

.el-form-item {
  .el-form-item__label {
    width: d2r(220px)!important;
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
