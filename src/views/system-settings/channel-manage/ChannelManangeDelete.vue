<template>
  <div class="advisory-delete">
    <el-button
      class="button-fix"
      icon="el-icon-delete"
      size="mini"
      type="danger"
      @click="onDialogShow"
    >删除</el-button>
    <el-dialog class="dialog-fix" title="删除渠道属性" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="app-advisory-title">
        <page-title>选择你要删除的渠道属性</page-title>
      </div>
      <div class="dialog-content">
         <el-table class="table-analysis table-fix" size="mini" :data="tableData" border style="width: 100%">
            <el-table-column prop="index" align="center" label="类型编号">
              <template slot-scope="scope">
                {{getAttributeId(scope.row.index)}}
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="类型名称"></el-table-column>
            <el-table-column prop="type" align="center" label="所属渠道">
              <template slot-scope="scope">
                {{getAttributeLable(scope.row.type)}}
              </template>
            </el-table-column>
            <el-table-column prop="note" align="center" label="渠道类型说明"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleDeleteAttribute">确 定</el-button>
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
    defaultData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['deleteAttribute']),
    getAttributeId(id) {
      return `000${id}`.substr(-3)
    },
    getAttributeLable(type) {
      console.log(type)
      let label = '业务办理点'
      switch (type) {
        case 1:
          label = '业务办理点'
          break;
        case 2:
          label = '设备安装点'
          break;
        default:
          break;
      }
      return label
    },
    onDialogShow() {
      this.tableData = [this.defaultData];
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.dialogVisible = false;
    },
    async handleDeleteAttribute() {
      await this.deleteAttribute({
        id: this.defaultData.id
      })
      this.$emit('onRefresh')
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

.advisory-delete {
  margin-left: d2r(10px);
}

.app-advisory-title {
  padding-right: d2r(38px);
  padding-left: d2r(42px);
  padding-top: d2r(29px);
}

.dialog-content {
  padding: d2r(31px) d2r(35px) 0 d2r(30px);
}
</style>
