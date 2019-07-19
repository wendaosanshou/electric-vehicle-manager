<template>
  <div class="role-add">
    <el-button
      class="button-fix"
      icon="el-icon-folder-add"
      type="primary"
      size="mini"
      @click="onDialogShow"
    >添加渠道属性</el-button>
    <el-dialog
      class="dialog-fix"
      title="添加渠道属性"
      :visible.sync="dialogVisible"
      @close="onDialogHide">
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form">
          <el-form-item label="名称">
            <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
             <el-select
              class="ipt-fix ipt-selector"
              size="mini"
              v-model="form.type"
              placeholder="请选择类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in typeList"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明">
            <el-input type="textarea"
            class="ipt-fix"
            size="mini"
            resize="none"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="form.note" placeholder="请输入说明"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleAddAttribute">确 定</el-button>
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
      form: {
        name: "",
        note: "",
        type: 1
      },
      typeList: [{
        label: '业务办理点',
        value: 1
      },{
        label: '设备安装点',
        value: 2
      }]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["addAttribute"]),
    clearForm() {
      this.form = {
        name: "",
        note: "",
        type: 1
      }
    },
    async handleAddAttribute() {
      await this.addAttribute(this.form);
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
      this.dialogVisible = false;
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
