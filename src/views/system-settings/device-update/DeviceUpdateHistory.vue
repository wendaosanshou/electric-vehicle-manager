<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      icon="el-icon-s-order"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >升级日志</el-button>
    <el-dialog
      class="dialog-fix"
      title="查看升级日志"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <page-title class="dialog-title">升级日志</page-title>
      <div class="dialog-content">
        <el-table
          class="role-manage-table table-fix table-disable-hover"
          :data="produceLog"
          size="mini"
          border
          stripe
          max-height="450"
          style="width: 100%"
        >
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="imeis" label="IMEI">
            <template slot-scope="scope">
              {{getImeisString(scope.row.imeis)}}
            </template>
          </el-table-column>
          <el-table-column prop="version" label="升级文件"></el-table-column>
          <el-table-column prop="update_time" label="升级时间"></el-table-column>
          <el-table-column prop="operation" label="操作人"></el-table-column>
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
      default: () => {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(['produceLog'])
  },
  methods: {
    ...mapActions(["deleteProduct", "getUpdateLog"]),
    getImeisString(imeis) {
      return imeis.replace(/[^\d|,]/gi, '')
    },
    onDialogShow() {
      this.initUpdateLog()
      if (this.data && Object.keys(this.data).length > 0) {
        this.tableData = [this.data];
      }
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    initUpdateLog() {
      this.getUpdateLog()
    },
    handleDelete() {
      const [device] = this.tableData;
      const { imei } = device;
      console.log(device);
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
  overflow: scroll;
}
</style>
