<template>
  <div class="location-dialog">
    <el-dialog
        class="dialog-table-right dialog-fix dialog-allow-click dialog-no-header"
        title="详细信息"
        :visible.sync="dialogVisible"
        @close="onDialogHide"
        :modal="false"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
        <el-table ref="userTable" class="table-fix table-fix-yellow table-disable-select-all" size="mini" :data="allUser" border style="width: 100%">
            <el-table-column prop="id" label="车主姓名"></el-table-column>
            <el-table-column prop="account" label="防盗备案号"></el-table-column>
            <el-table-column prop="name" label="告警时间"></el-table-column>
            <el-table-column prop="site_name" label="告警类型"></el-table-column>
        </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
          <el-button size="mini" @click="onDialogHide">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  computed: {
      ...mapGetters(['allUser'])
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
    }
  },
  methods: {
    onDialogHide() {
      this.$emit('change', false)
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-small-right {
  .dialog-content {
    max-height: d2r(611px);
    background: #ffffff;
    overflow: scroll;
    .form-title {
      box-sizing: border-box;
      width: 100%;
      height: d2r(33px);
      font-size: d2r(13px);
      line-height: d2r(33px);
      color: #4a4a4a;
      text-align: left;
      padding-left: d2r(23px);
      background: #ffffff;
    }
    .form-item-wrap {
      .form-item {
        box-sizing: border-box;
        width: 100%;
        height: d2r(34px);
        line-height: d2r(34px);
        font-size: d2r(13px);
        color: #9b9b9b;
        text-align: left;
        padding-left: d2r(23px);
        margin-top: 2px;
        background:rgba(221,221,221,0.24);
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}

.dialog-content {
  box-sizing: border-box;
}

.dialog-no-header {
  .el-dialog .el-dialog__header {
    display: none !important;
  }
}
</style>
