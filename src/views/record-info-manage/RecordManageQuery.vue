<template>
  <div class="record-manage-query">
    <el-button type="primary" @click="onDialogShow">查询</el-button>
    <el-dialog title="查询" :visible.sync="queryFromVisible" width="600px" lock-scroll>
      <el-form class="form-content" :model="form" label-width="130px">
        <el-form-item label="区县">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道办事处">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务办理点">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县区">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道办事处">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备安装点">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车主手机号">
          <el-col :span="11">
            <el-input class="form-selector" v-model="form.mobile1" placeholder="请输入内容"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="安装工手机号">
          <el-col :span="11">
            <el-input class="form-selector" v-model="form.mobile2" placeholder="请输入内容"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="安装状态">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="派单时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="安装时间">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合约期">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="激活状态">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IMEI">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ICCID">
          <el-select class="form-selector" v-model="form.countyArea" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onDialogHide">取 消</el-button>
        <el-button type="primary" @click="onDialogHide">查 询</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryFromVisible: false,
      formLabelWidth: "200px",
      form: {
        countyArea: "",
        mobile1: "",
        mobile2: ""
      },
      options: [{
        label: '广州',
        value: 0
      }, {
         label: '深圳',
        value: 1
      }]
    };
  },
  methods: {
    onDialogShow() {
      this.queryFromVisible = true;
    },
    onDialogHide() {
      this.queryFromVisible = false;
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/style/function.scss";

.record-manage-query {
  margin-right: 9px;
}

.form-content {
  max-height: d2r(600px);
  overflow: scroll;
}

.form-selector {
  width: 400px;
  input {
    width: 400px;
  }
}

.el-form-item__content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
