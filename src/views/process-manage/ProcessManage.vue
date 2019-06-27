<template>
  <div class="page-record">
    <div class="record-menu-container">
      <div class="menu-item menu-col-less">
        <div class="item-selector-wraper">
          <div class="item-label">县区</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">街道办事处</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务办理点</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="menu-item menu-col-less">
        <div class="item-selector-wraper">
          <div class="item-label">县区</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">街道办事处</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">设备安装点</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="menu-item menu-col-less menu-item-long-label">
        <div class="item-selector-wraper">
          <div class="item-label">车主手机号</div>
          <el-input class="item-selector ipt-fix" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务办理人员手机号</div>
          <el-input class="item-selector ipt-fix" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务审核人员手机号</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="menu-item menu-col-less menu-item-long-ipt">
        <div class="item-selector-wraper">
          <div class="item-label">审核时间</div>
          <el-date-picker
            class="item-selector-long ipt-fix"
            size="mini"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">安装状态</div>
          <el-select
            class="item-selector item-selector-long ipt-fix"
            size="mini"
            v-model="countyArea"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="record-btn-contanier">
      <div class="btn-left-container">
        <el-button class="button-fix" size="mini" type="primary">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary">清空</el-button>
        <el-button class="button-fix" size="mini" type="primary">一键快查</el-button>
        <el-button class="button-fix" size="mini">导出</el-button>
      </div>
      <!-- <div class="btn-right-container">
        <el-checkbox size="mini" class="checkbox-select-all" v-model="checked">全选</el-checkbox>
        <el-button class="btn-export button-fix" size="mini" type="primary">派单</el-button>
      </div> -->
    </div>
    <el-table class="table-fix" :data="workList" size="mini" border stripe style="width: 100%">
      <el-table-column prop="own_nam" label="车主姓名" width="180" align="center"></el-table-column>
      <el-table-column label="车主手机号" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击修改信息" placement="top">
            <div class="table-mobile" @click="onMobileSetting">{{scope.row.own_phone}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="processPoint" label="业务办理点" align="center"></el-table-column>
      <el-table-column prop="install_name" label="设备安装点" align="center"></el-table-column>
      <el-table-column prop="sys_business_account" label="业务办理员手机" align="center"></el-table-column>
      <el-table-column prop="sys_audit_account" label="审核人手机" align="center"></el-table-column>
      <el-table-column prop="audit_time" label="审核时间" width="160px" align="center"></el-table-column>
      <el-table-column label="安装状态" align="center">
        <template slot-scope="scope">
          {{getProcessTips(scope.row.process)}}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wraper">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      checked: false,
      input: '',
      value1: '',
      options: [],
      countyArea: "",
      countyAreas: [
        {
          value: 1,
          label: "北京"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['workList']),
    isProcessManage() {
      return this.$route && this.$route.name === "ProcessManange";
    },
    isProcessSearch() {
      return this.$route && this.$route.name === "ProcessSearch";
    }
  },
  methods: {
    ...mapActions(["getWorkList"]),
    getProcessTips(process) {
      let processTips = ''
      switch (process) {
        case 0:
          processTips = '默认'
          break;
        case 1:
          processTips = '预约状态'
          break;
        case 2:
          processTips = '已审核'
          break;
        case 3:
          processTips = '已指派'
          break;
        case 4:
          processTips = '已安装'
          break;
        default:
          break;
      }
      return processTips
    },
    onMobileSetting() {
      this.$router.push("/record-setting");
    },
    async getAllWorkList() {
      await this.getWorkList({
        page_size: 100,
        page_index: 1,
        business: 2,
        install: 2,
        client_account: "",
        install_account: "",
        business_account: "",
        audit_account: "",
        install_status: 1,
        audit_time: "",
        distribute_time: "",
        install_time: "",
        contract_content: 0,
        contract_active: 0,
        imei: "",
        iccid: ""
      });
    }
  },
  components: {},
  mounted() {
    this.getAllWorkList()
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.page-record {
  padding: d2r(20px) d2r(38px) d2r(42px) d2r(41px);
}

.record-menu-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 0 d2r(14px) d2r(15px) d2r(11px);
  background: #f5f5f6;
  .menu-item {
    width: 22%;
    height: 100%;
    &.menu-item-long-label .item-selector-wraper {
      .item-label {
        width: d2r(160px);
      }
    }
    &.menu-item-long-ipt {
      width: 25%;
    }
    .item-selector-wraper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: d2r(20px);
      &:nth-child(1) {
        margin-top: 0;
      }
      .item-label {
        width: d2r(110px);
        height: d2r(22px);
        text-align: right;
      }
      .item-selector {
        margin-left: d2r(6px);
        width: d2r(180px);
      }
      .item-selector-long {
        margin-left: d2r(6px);
        width: d2r(280px) !important;
      }
    }
  }
}

.menu-col-less {
  padding-top: d2r(30px);
  padding-left: 0;
  padding-right: 0;
}

.menu-col-more {
  padding-top: d2r(11px);
  .item-selector-wraper {
    margin-top: 9px;
  }
}

.menu-col-long {
  .item-selector-wraper {
    .item-label {
      width: d2r(170px);
      white-space: nowrap;
    }
  }
}

.record-btn-contanier {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: d2r(9px);
  margin-bottom: d2r(10px);
}

.table-mobile {
  color: #0960bd;
  cursor: pointer;
}
</style>
