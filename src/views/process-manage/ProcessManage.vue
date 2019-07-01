<template>
  <div class="page-record">
    <div class="record-menu-container">
      <div class="menu-item menu-item-point menu-col-less">
        <div class="item-selector-wraper">
          <div class="item-label">业务办理点</div>
          <el-input
            class="item-selector"
            size="mini"
            v-model="businessPoint.name"
            placeholder="请选择业务办理点"
            disabled
          ></el-input>
          <org-add-dialog selectType="handle-tree" @onConfirm="onSelectBusinessPoint"></org-add-dialog>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">设备安装点</div>
          <el-input
            class="item-selector ipt-fix"
            size="mini"
            v-model="installPoint.name"
            placeholder="请选择设备安装点"
            disabled
          ></el-input>
          <org-add-dialog selectType="install-tree" @onConfirm="onSelectInstallPoint"></org-add-dialog>
        </div>
      </div>
      <div class="menu-item menu-col-less menu-item-long-label">
        <div class="item-selector-wraper">
          <div class="item-label">车主手机号</div>
          <el-input
            class="item-selector ipt-fix"
            size="mini"
            v-model="clientAccount"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务办理人员手机号</div>
          <el-input
            class="item-selector ipt-fix"
            size="mini"
            v-model="businessAccount"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务审核人员手机号</div>
          <el-input
            class="item-selector ipt-fix"
            size="mini"
            v-model="auditAccount"
            placeholder="请输入手机号"
          ></el-input>
        </div>
      </div>
      <div class="menu-item menu-col-less menu-item-long-ipt">
        <div class="item-selector-wraper">
          <div class="item-label">审核时间</div>
          <el-date-picker
            class="item-selector-long ipt-fix"
            size="mini"
            v-model="auditTime"
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
            v-model="installStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in installStatusList"
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
        <el-button class="button-fix" size="mini" type="primary" @click="handleSearchWrokList">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleClearSearch">清空</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="getAllWorkList">一键快查</el-button>
        <el-button class="button-fix" size="mini" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <el-table
      class="table-fix"
      id="process-export-table"
      :data="workList"
      size="mini"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="own_name" label="车主姓名" width="180" align="center"></el-table-column>
      <el-table-column label="车主手机号" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击修改信息" placement="top">
            <div class="table-mobile" @click="onMobileSetting">{{scope.row.own_phone}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center">
        <template slot-scope="scope">{{scope.row.own_sex === 0 ? "男" : "女"}}</template>
      </el-table-column>
      <el-table-column prop="business_name" label="业务办理点" align="center"></el-table-column>
      <el-table-column prop="install_name" label="设备安装点" align="center"></el-table-column>
      <el-table-column prop="sys_business_account" label="业务办理员手机" align="center"></el-table-column>
      <el-table-column prop="sys_audit_account" label="审核人手机" align="center"></el-table-column>
      <el-table-column prop="audit_time" label="审核时间" width="160px" align="center"></el-table-column>
      <el-table-column label="安装状态" align="center">
        <template slot-scope="scope">{{getProcessTips(scope.row.process)}}</template>
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
import dayjs from "dayjs";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import OrgAddDialog from "../system-settings/user-manage/user-add/OrgAddDialog";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      businessPoint: {
        id: "",
        name: ""
      },
      installPoint: {
        id: "",
        name: ""
      },
      clientAccount: "",
      businessAccount: "",
      auditAccount: "",
      auditTime: [],
      form: {
        business: 0,
        install: 0,
        client_account: "",
        install_account: "",
        business_account: "",
        audit_account: "",
        install_status: "",
        audit_time: "",
        distribute_time: "",
        install_time: "",
        contract_content: 0,
        contract_active: 0,
        imei: "",
        iccid: ""
      },
      checked: false,
      installStatus: 0,
      installStatusList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "已预约"
        },
        {
          value: 2,
          label: "已审核"
        },
        {
          value: 3,
          label: "已指派"
        },
        {
          value: 4,
          label: "已安装"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["workList"]),
    isProcessManage() {
      return this.$route && this.$route.name === "ProcessManange";
    },
    isProcessSearch() {
      return this.$route && this.$route.name === "ProcessSearch";
    }
  },
  methods: {
    ...mapActions(["getWorkList"]),
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#process-export-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleClearSearch() {
      this.businessPoint = {};
      this.installPoint = {};
      this.clientAccount = "";
      this.businessAccount = "";
      this.auditAccount = "";
    },
    onSelectBusinessPoint(data) {
      console.log("onSelectBusinessPoint", data);
      this.businessPoint = data;
    },
    onSelectInstallPoint(data) {
      console.log("onSelectInstallPoint", data);
      this.installPoint = data;
    },
    getProcessTips(process) {
      let processTips = "";
      switch (process) {
        case 0:
          processTips = "全部";
          break;
        case 1:
          processTips = "已预约";
          break;
        case 2:
          processTips = "已审核";
          break;
        case 3:
          processTips = "已指派";
          break;
        case 4:
          processTips = "已安装";
          break;
        default:
          break;
      }
      return processTips;
    },
    onMobileSetting() {
      this.$router.push("/record-setting");
    },
    async handleSearchWrokList() {
      let audit_time = "";
      if (this.auditTime && this.auditTime.length === 2) {
        const [startDate, endDate] = this.auditTime;
        const audit_time = `${dayjs(startDate).format(
          "YYYY-MM-DD HH:mm:ss"
        )}_${dayjs(endDate).format("YYYY-MM-DD HH:mm:ss")}`;
      }
      console.log(this.auditTime);
      const searchParam = {
        page_size: 100,
        page_index: 1,
        business: this.businessPoint.id,
        install: this.installPoint.id,
        client_account: this.clientAccount,
        install_account: "",
        business_account: this.businessAccount,
        audit_account: this.auditAccount,
        install_status: this.installStatus,
        audit_time: audit_time,
        distribute_time: "",
        install_time: "",
        contract_content: 0,
        contract_active: 0,
        imei: "",
        iccid: ""
      };
      await this.getWorkList(searchParam);
      console.log(searchParam);
    },
    async getAllWorkList() {
      await this.getWorkList({
        page_size: 100,
        page_index: 1,
        business: "",
        install: "",
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
  components: {
    OrgAddDialog
  },
  mounted() {
    this.getAllWorkList();
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
    &.menu-item-point {
      width: 32%;
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

.item-selector-point {
  width: d2r(600px);
}
</style>
