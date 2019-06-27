<template>
  <div class="page-record">
    <div class="record-menu-container">
      <div class="menu-item menu-col-less">
        <div class="item-selector-wraper">
          <div class="item-label">县区</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
        <div class="item-selector-wraper ipt-fix">
          <div class="item-label">车主手机号</div>
          <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">安装工手机号</div>
          <el-input class="item-selector ipt-fix" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">安装状态</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="installStatus" placeholder="请选择">
            <el-option
              v-for="item in installStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="menu-item menu-col-less menu-item-long">
        <div class="item-selector-wraper">
          <div class="item-label ipt-fix">审核时间</div>
          <el-date-picker
            class="item-selector-datapicker"
            size="mini"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label ipt-fix">派单时间</div>
          <el-date-picker
            class="item-selector-datapicker"
            size="mini"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label ipt-fix">安装时间</div>
          <el-date-picker
            class="item-selector-datapicker"
            size="mini"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="menu-item menu-col-more">
        <div class="item-selector-wraper">
          <div class="item-label ipt-fix">合约期</div>
          <el-select class="item-selector" size="mini" v-model="countyArea" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">激活状态</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">IMEI</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">ICCID</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="countyArea" placeholder="请选择">
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
        <el-button class="button-fix" size="mini" type="primary" @click="getAllWorkList">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary">清空</el-button>
        <el-button class="button-fix" size="mini" type="primary" v-if="isProcessManage">派单快查</el-button>
        <el-button class="button-fix" size="mini">导出</el-button>
      </div>
      <div class="btn-right-container">
        <div class="btn-right-label color-primary" v-if="isRecordInfoManage">请点击手机号码进行修改</div>
        <div class="btn-right-button" v-else-if="isProcessManage">
          <el-checkbox size="mini" class="checkbox-select-all" v-model="checked">全选</el-checkbox>
          <el-button class="btn-export button-fix" size="mini" type="primary" @click="onDistributeWork">派单</el-button>
        </div>
      </div>
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
    <procss-detail-dialog v-model="procssDetailDialogVisible" @change="onChangeDialog"></procss-detail-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BtnQuery from "./RecordManageQuery";
import ProcssDetailDialog from "./ProcssDetailDialog";

export default {
  data() {
    return {
      checked: false,
      input: '',
      value1: '',
      options: [],
      procssDetailDialogVisible: false,
      countyArea: "",
      installStatus: 0,
      installStatusList: [
        {
          value: 0,
          label: '默认'
        },
        {
          value: 1,
          label: '预约状态'
        },
        {
          value: 2,
          label: '已审核'
        },
        {
          value: 3,
          label: '已指派'
        },
        {
          value: 4,
          label: '已安装'
        }
      ],
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
      return this.$route && this.$route.name === "ProcessManage";
    },
    isProcessSearch() {
      return this.$route && this.$route.name === "ProcessSearch";
    },
    isRecordInfoManage() {
      return this.$route && this.$route.name === "RecordInfoManage";
    }
  },
  methods: {
    ...mapActions(["getWorkList", 'setWorkDistribute']),
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
    async onDistributeWork() {
      let ids = this.workList.filter(item => {
        return item.install_status === 2
      }).map(item => {
        return item.id
      })
      if (this.checked) {
        await this.setWorkDistribute({
          distribute_id: ids
        })
        this.getAllWorkList()
      }
    },
    onChangeDialog() {

    },
    onMobileSetting() {
      this.$router.push("/record-setting");
    },
    async getAllWorkList() {
      await this.getWorkList({
        page_size: 100,
        page_index: 1,
        business: 2,
        install: 3,
        client_account: "",
        install_account: "",
        business_account: "",
        audit_account: "",
        install_status: this.installStatus,
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
  components: {
    BtnQuery,
    ProcssDetailDialog
  },
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
  overflow: scroll;
  .menu-item {
    width: 19%;
    height: 100%;
    &.menu-item-long {
      width: 24%;
    }
  }
}

.menu-col-less {
  padding-top: d2r(30px);
}

.menu-col-more {
  padding-top: d2r(11px);
  .item-selector-wraper {
    margin-top: d2r(9px);
  }
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
  .item-selector-datapicker {
    margin-left: d2r(6px);
    width: d2r(300px) !important;
  }
}

  .item-selector-datapicker {
    margin-left: d2r(6px);
    width: d2r(450px) !important;
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
