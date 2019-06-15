<template>
  <div class="renew">
    <div class="el-btn btn-renew" @click="onDialogShow">续费</div>
    <el-dialog class="dialog-fix" title="续费信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form-fix">
        <el-form-item label="新增合约期">
          <el-select size="small" v-model="form.data1" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-select size="small" v-model="form.data2" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        data1: '',
        data2: ''
      }
    }
  },
  methods: {
    onDialogShow() {
      this.dialogFormVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.el-btn {
  width: d2r(160px);
  height: d2r(35px);
  font-size: d2r(16px);
  text-align: center;
  line-height: d2r(35px);
  color: #ffffff;
  background: #7aa9ec;
}
</style>
