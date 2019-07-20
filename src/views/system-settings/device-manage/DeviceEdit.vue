<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      :icon="tipsConfig.icon"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >{{tipsConfig.btnText}}</el-button>
    <el-dialog class="dialog-fix" :title="tipsConfig.titleText" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-content">
        <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
          <el-form-item label="IMEI">
            <el-input
              class="ipt-fix"
              size="mini"
              v-model="form.imei"
              placeholder="请输入IMEI"
              :disabled="isEditDialog"
            ></el-input>
          </el-form-item>
          <el-form-item label="序号" v-if="isEditDialog">
            <el-input class="ipt-fix" size="mini" v-model="form.id" placeholder="请输入序号" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              class="ipt-fix"
              size="mini"
              resize="none"
              maxlength="50"
              :autosize="{ minRows: 10, maxRows: 10}"
              v-model="form.note"
              placeholder="请输入备注信息（50字内）"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleEditDevice">确 定</el-button>
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
    ...mapGetters(["userInfo"]),
    isEditDialog() {
      return this.type === 'is-edit'
    },
    isAddDialog() {
      return this.type === 'is-add'
    },
    tipsConfig () {
      if (this.isEditDialog) {
        return {
        btnText: '修改',
        titleText: '修改设备',
        icon: 'el-icon-edit'
      }
      } else if (this.isAddDialog) {
        return {
          btnText: '手动添加',
          titleText: '手动添加设备',
          icon: 'el-icon-folder-add'
        }
      }
    }
  },
  methods: {
    ...mapActions(["importProducts"]),
    onDialogShow() {
      if (this.isEditDialog) {
        this.form = this.data;
      }
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
    async handleEditDevice() {
      console.log(this.form);
      const params = {
        operation: this.userInfo.account,
        note: this.form.note,
        imeis: [this.form.imei]
      };
      console.log(params)
      await this.importProducts(params);
      this.onDialogHide()
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
</style>
