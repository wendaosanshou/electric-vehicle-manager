<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      icon="el-icon-delete"
      type="danger"
      size="mini"
      @click="onDialogShow"
    >删除</el-button>
    <el-dialog class="dialog-fix" title="删除设备" :visible.sync="dialogVisible" @close="onDialogHide">
      <page-title class="dialog-title">选择要删除的设备信息</page-title>
      <div class="dialog-content">
        <el-table
          class="role-manage-table table-fix table-disable-hover"
          :data="tableData"
          size="mini"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column prop="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="imei" align="center" label="IMEI"></el-table-column>
          <el-table-column prop="operation" align="center" label="创建人"></el-table-column>
          <el-table-column prop="import_time" align="center" label="入库时间"></el-table-column>
          <el-table-column prop="note" align="center" label="备注信息"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleDelete">删 除</el-button>
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
      tableData: []
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(["deleteProduct"]),
    onDialogShow() {
      this.tableData = [this.data];
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async handleDelete() {
      const [device] = this.tableData;
      const { imei } = device
      console.log(device);
      await this.deleteProduct({
        imei
      })
      this.$emit('onRefresh')
      this.onDialogHide();
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
</style>
