<template>
  <div class="renew">
    <div class="el-btn btn-renew" @click="onDialogShow">续费</div>
    <el-dialog class="dialog-fix" title="续费信息" :visible.sync="dialogFormVisible" width="500px">
      <div class="dialog-renew">
        <el-form class="form-fix">
          <el-form-item label="新增合约期">
            <el-select class="ipt-fix" size="mini" v-model="contract" placeholder="请选择活动区域">
              <el-option :label="item.label" :value="item.value" v-for="item in contractList" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
             <el-date-picker
              class="ipt-fix"
              size="mini"
              v-model="pickerTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogConfirm">确 定</el-button>
        <el-button size="mini" @click="onDialogCancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      pickerTime: '',
      contract: 1,
      contractList: [
        {
          label: '一年',
          value: 1
        }
      // {
      //   label: '两年',
      //   value: 2
      // }
      ]
    }
  },
  computed: {
    ...mapGetters(['workItem', 'userInfo']),
  },
  methods: {
    ...mapActions(['renewContract']),
    resetForm() {
      this.contract = 1
      this.pickerTime = ''
    },
    onDialogShow() {
      this.resetForm()
      this.dialogFormVisible = true
    },
    onDialogConfirm() {
      this.handleRenew()
    },
    onDialogCancle() {
      this.dialogFormVisible = false
    },
    handleRenew() {
      const params = {
        work: this.workItem.id,
        contract: this.contract,
        start: this.pickerTime ? dayjs(this.pickerTime).format("YYYY-MM-DD HH:mm:ss") : '',
        operation_id: this.userInfo.id,
        operation_account: this.userInfo.account
      }
      let isAllowRenew = Object.keys(params).every(key => params[key])
      if (isAllowRenew) {
        this.renewContract(params)
      } else {
        this.$message({
          type: "error",
          message: "续费失败！"
        });
      }
      console.log(params)
      this.dialogFormVisible = false
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

.dialog-renew {
  padding-top: d2r(68px);
}

.ipt-fix {
  width: d2r(220px);
}

</style>
