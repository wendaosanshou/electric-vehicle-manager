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
        <div class="item-selector-wraper ipt-fix">
          <div class="item-label">车主手机号</div>
          <el-input class="item-selector" size="mini" v-model="clientAccount" placeholder="请输入手机号"></el-input>
        </div>
        <template v-if="isProcessSearch">
          <div class="item-selector-wraper">
            <div class="item-label">业务办理人员手机号</div>
            <el-input
              class="item-selector ipt-fix"
              size="mini"
              v-model="installAccount"
              placeholder="请输入手机号"
            ></el-input>
          </div>
          <div class="item-selector-wraper">
            <div class="item-label">业务审核人员手机号</div>
            <el-input
              class="item-selector ipt-fix"
              size="mini"
              v-model="installAccount"
              placeholder="请输入手机号"
            ></el-input>
          </div>
        </template>
        <template v-else>
          <div class="item-selector-wraper">
            <div class="item-label">安装工手机号</div>
            <el-input
              class="item-selector ipt-fix"
              size="mini"
              v-model="installAccount"
              placeholder="请输入手机号"
            ></el-input>
          </div>
          <div class="item-selector-wraper">
            <div class="item-label">安装状态</div>
            <el-select
              class="item-selector ipt-fix"
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
        </template>
      </div>
      <div class="menu-item menu-col-less menu-item-long">
        <div class="item-selector-wraper">
          <div class="item-label">审核时间</div>
          <el-date-picker
            class="item-selector-datapicker ipt-fix"
            size="mini"
            v-model="auditTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <template v-if="isProcessSearch">
          <div class="item-selector-wraper">
            <div class="item-label">安装状态</div>
            <el-select
              class="item-selector item-selector-datapicker ipt-fix"
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
        </template>
        <template v-if="!isProcessSearch">
          <div class="item-selector-wraper">
          <div class="item-label ipt-fix">派单时间</div>
          <el-date-picker
            class="item-selector-datapicker ipt-fix"
            size="mini"
            v-model="distributeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label ipt-fix">安装时间</div>
          <el-date-picker
            class="item-selector-datapicker ipt-fix"
            size="mini"
            v-model="installTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        </template>
        
      </div>
      <div class="menu-item menu-col-more" v-if="!isProcessSearch">
        <div class="item-selector-wraper">
          <div class="item-label">合约期</div>
          <el-select class="item-selector ipt-fix" size="mini" v-model="contractContent" placeholder="请选择">
            <el-option
              v-for="item in contractContentList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">激活状态</div>
          <el-select
            class="item-selector ipt-fix"
            size="mini"
            v-model="contractActive"
            placeholder="请选择"
          >
            <el-option
              v-for="item in contractActiveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">IMEI</div>
          <el-input class="item-selector ipt-fix" size="mini" v-model="imei" placeholder="请输入IMEI"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">ICCID</div>
          <el-input
            class="item-selector ipt-fix"
            size="mini"
            v-model="iccid"
            placeholder="请输入ICCID"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="record-btn-contanier">
      <div class="btn-left-container">
        <el-button class="button-fix" size="mini" type="primary" @click="handleSearchWrokList">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleClearSearch">清空</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleQuickSearchOneButton" v-if="isProcessSearch">一键快查</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleQuickSearchOrder" v-if="isProcessManage">派单快查</el-button>
        <el-button class="button-fix" size="mini" @click="exportExcel">导出</el-button>
      </div>
      <div class="btn-right-container">
        <div class="btn-right-label color-primary" v-if="isRecordManage">请点击手机号码进行修改</div>
        <div class="btn-right-button" v-else-if="isProcessManage">
          <!-- <el-checkbox size="mini" class="checkbox-select-all" v-model="checked">全选</el-checkbox> -->
          <el-button
            class="btn-export button-fix"
            size="mini"
            type="primary"
            @click="onDistributeWork"
          >派单</el-button>
        </div>
      </div>
    </div>
    <el-table
      class="table-fix"
      id="out-table"
      :data="workList"
      size="mini"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="55" v-if="isProcessManage"></el-table-column>
      <el-table-column prop="own_name" label="车主姓名" align="center"></el-table-column>
      <el-table-column label="车主手机号" align="center">
        <template slot-scope="scope">
          <div v-if="isProcessSearch">{{scope.row.own_phone}}</div>
          <el-tooltip class="item" effect="dark" content="点击查看详细信息" placement="top" v-else-if="isProcessManage">
            <div class="table-mobile" @click="onProcessDilaogChange(scope.row)">{{scope.row.own_phone}}</div>
          </el-tooltip>
           <el-tooltip class="item" effect="dark" content="点击修改信息" placement="top" v-else-if="isRecordManage">
            <div class="table-mobile" @click="onMobileSetting(scope.row)">{{scope.row.own_phone}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center">
        <template slot-scope="scope">{{scope.row.own_sex === 0 ? "男" : "女"}}</template>
      </el-table-column>
      <el-table-column prop="business_name" label="业务办理点" align="center"></el-table-column>
      <el-table-column prop="install_name" label="设备安装点" align="center"></el-table-column>
      <el-table-column prop="sys_business_account" label="业务办理员手机" width="120" align="center"></el-table-column>
      <el-table-column prop="sys_audit_account" label="审核人手机" align="center"></el-table-column>
      <el-table-column prop="audit_time" label="审核时间" width="160px" align="center"></el-table-column>
      <el-table-column label="安装状态" align="center">
        <template slot-scope="scope">{{getProcessTips(scope.row.process)}}</template>
      </el-table-column>
    </el-table>
    <div class="pagination-wraper">
      <el-pagination
        class="pagination-fix"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :current-page.sync="pageIndex"
        :total="workListTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <procss-detail-dialog v-model="procssDetailDialogVisible" @change="onChangeDialog" @on-refresh="handleSearchWrokList"></procss-detail-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import OrgAddDialog from "../system-settings/user-manage/user-add/OrgAddDialog";
import BtnQuery from "./RecordManageQuery";
import ProcssDetailDialog from "./ProcssDetailDialog";

export default {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      procssDetailDialogVisible: false,
      businessPoint: {
        id: "",
        name: ""
      },
      installPoint: {
        id: "",
        name: ""
      },
      installAccount: "",
      clientAccount: "",
      businessAccount: "",
      auditAccount: "",
      imei: "",
      iccid: "",
      auditTime: [],
      installTime: [],
      distributeTime: [],
      selectList: [],
      checked: false,
      contractContent: 0,
      contractContentList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "一年合约期"
        },
        {
          value: 2,
          label: "两年合约期"
        }
      ],
      contractActive: 0,
      contractActiveList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "激活"
        },
        {
          value: 2,
          label: "过期"
        }
      ],
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
    ...mapGetters(["workList", "workItem", "workListTotal"]),
    isProcessManage() {
      return this.$route && this.$route.name === "ProcessManage";
    },
    isProcessSearch() {
      return this.$route && this.$route.name === "ProcessSearch";
    },
    isRecordManage() {
      return this.$route && this.$route.name === "RecordManage";
    }
  },
  methods: {
    ...mapMutations(['updateWorkItem']),
    ...mapActions(["getWorkList", "setWorkDistribute"]),
    handleSelectionChange(selectList) {
      console.log(selectList)
      this.selectList = selectList.filter(item => {
        return item.process === 2;
      })
      .map(item => {
        return item.id;
      });
      console.log(JSON.parse(JSON.stringify(this.selectList)))
    },
    handleSizeChange(pageSize = 10) {
      this.pageSize = pageSize
      console.log(pageSize)
    },
    handleCurrentChange(currentPage = 1) {
      this.pageIndex = currentPage
      this.handleSearchWrokList()
      console.log(currentPage)
    },
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
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
      this.installAccount = "";
      this.businessAccount = "";
      this.auditAccount = "";
      this.installStatus = "";
      this.auditTime = [];
      this.distributeTime = [];
      this.installTime = [];
      this.contractContent = 0;
      this.contractActive = 0;
      this.imei = "";
      this.iccid = "";
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
    async onDistributeWork() {
      if (this.selectList && this.selectList.length > 0) {
        await this.setWorkDistribute({
          distribute_id: this.selectList
        });
        this.getAllWorkList();
      } else {
        this.$message({
          type: "error",
          message: "未选中审核通过的订单!"
        })
      }
    },
    onProcessDilaogChange(workItem) {
      this.updateWorkItem(workItem)
      this.procssDetailDialogVisible = true
    },
    onChangeDialog() {
      this.procssDetailDialogVisible = false
    },
    onMobileSetting(workItem) {
      this.updateWorkItem(workItem)
      if (this.isRecordManage) {
        this.$router.push("/record-setting");
      }
    },
    getFormatTime(time) {
      let formatTime = "";
      if (time && time.length === 2) {
        const [startDate, endDate] = time;
        formatTime = `${dayjs(startDate).format("YYYY-MM-DD HH:mm:ss")}_${dayjs(
          endDate
        ).format("YYYY-MM-DD HH:mm:ss")}`;
      }
      return formatTime;
    },
    async handleSearchWrokList() {
      const searchParam = {
        page_size: this.pageSize,
        page_index: this.pageIndex,
        business: this.businessPoint.id,
        install: this.installPoint.id,
        client_account: this.clientAccount,
        install_account: this.installAccount,
        business_account: this.businessAccount,
        audit_account: this.auditAccount,
        install_status: this.installStatus,
        audit_time: this.getFormatTime(this.auditTime),
        distribute_time: this.getFormatTime(this.distributeTime),
        install_time: this.getFormatTime(this.installTime),
        contract_content: this.contractContent,
        contract_active: this.contractActive,
        imei: this.imei,
        iccid: this.iccid
      };
      await this.getWorkList(searchParam);
      console.log(searchParam);
    },
    handleQuickSearchOneButton() {
      this.pageSize = 10000
      this.handleClearSearch()
      this.handleSearchWrokList()
    },
    handleQuickSearchOrder() {
      this.pageSize = 10000
      this.installStatus = 3
      this.handleSearchWrokList()
    },
    async getAllWorkList() {
      await this.getWorkList({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        business: "",
        install: "",
        client_account: "",
        install_account: "",
        business_account: "",
        audit_account: "",
        install_status: "",
        audit_time: "",
        distribute_time: "",
        install_time: "",
        contract_content: "",
        contract_active: "",
        imei: "",
        iccid: ""
      });
    }
  },
  components: {
    BtnQuery,
    ProcssDetailDialog,
    OrgAddDialog
  },
  mounted() {
    this.handleSearchWrokList();
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
    width: 22%;
    height: 100%;
    &.menu-item-long-label .item-selector-wraper {
      .item-label {
        width: d2r(160px);
        white-space: nowrap;
      }
    }
    &.menu-item-long {
      width: 28%;
    }
    &.menu-item-point {
      width: 30%;
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
    width: d2r(320px) !important;
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
  &.not-allow-click {
    color: #3B4859FF;
  }
}
</style>
