<template>
  <div class="page-record">
    <div class="record-menu-container">
      <div class="menu-item menu-item-point menu-col-more">
        <div class="item-selector-wraper">
          <div class="item-label">业务办理点</div>
          <el-input
            class="item-selector ipt-fix item-selector-long"
            size="mini"
            v-model="businessPoint.label"
            placeholder="请选择业务办理点"
            disabled>
            <el-button class="el-button" slot="append" icon="el-icon-edit-outline" @click="handleRenderOrgBusiness"></el-button>
          </el-input>
          <org-add-dialog selectType="handle-tree" :defaultBusinessId="defaultBusinessId" :isSearch="true" @onConfirm="onSelectBusinessPoint" ref="orgBusiness"></org-add-dialog>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">业务办理渠道</div>
          <el-select
            class="item-selector ipt-fix item-selector-long"
            size="mini"
            v-model="businessAttribute"
            :disabled="isHandleUser"
            placeholder="请选择">
            <el-option
              v-for="item in mergeBusinessAttributeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">设备安装点</div>
          <el-input
            class="item-selector ipt-fix item-selector-long"
            size="mini"
            v-model="installPoint.label"
            placeholder="请选择设备安装点"
            disabled>
              <el-button slot="append" icon="el-icon-edit-outline" @click="handleRenderOrgInstall"></el-button>
            </el-input>
          <org-add-dialog selectType="install-tree" :isSearch="true" @onConfirm="onSelectInstallPoint" ref="orgInstall"></org-add-dialog>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">设备安装渠道</div>
          <el-select
            class="item-selector ipt-fix item-selector-long"
            size="mini"
            v-model="installAttribute"
            placeholder="请选择">
            <el-option
              v-for="item in mergeInstallAttributeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
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
              v-model="businessAccount"
              placeholder="请输入手机号"
              :disabled="isHandleUser"
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
          <!-- <div class="item-selector-wraper">
            <div class="item-label">合约期</div>
            <el-select
              class="item-selector item-selector-datapicker ipt-fix"
              size="mini"
              v-model="contractContent"
              placeholder="请选择">
              <el-option
                v-for="item in contractContentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
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
      <div class="menu-item menu-col-less menu-item-long menu-item-last" v-if="!isProcessSearch">
        <div class="item-selector-wraper">
          <div class="item-label">激活状态</div>
          <el-select
            class="item-selector ipt-fix ipt-long"
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
          <el-input class="item-selector ipt-fix ipt-long" size="mini" v-model="imei" placeholder="请输入IMEI"></el-input>
        </div>
        <div class="item-selector-wraper">
          <div class="item-label">ICCID</div>
          <el-input
            class="item-selector ipt-fix ipt-long"
            size="mini"
            v-model="iccid"
            placeholder="请输入ICCID"
          ></el-input>
        </div>
      </div>
    </div>

    <div class="record-btn-contanier">
      <div class="btn-left-container">
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchWorkList">查询</el-button>
        <el-button class="button-fix" size="mini" type="primary" @click="handleClearSearch">清空</el-button>
        <el-button
          class="button-fix"
          size="mini"
          type="primary"
          @click="handleQuickSearchOneButton"
          v-if="isProcessSearch"
        >一键快查</el-button>
        <el-button
          class="button-fix"
          size="mini"
          type="primary"
          @click="handleQuickSearchOrder"
          v-if="isProcessManage"
        >派单快查</el-button>
        <el-button class="button-fix" size="mini" @click="exportExcelCurrent">导出当前</el-button>
        <el-button class="button-fix" size="mini" @click="exportExcelAll">导出全部</el-button>
      </div>
      <div class="btn-right-container">
        <div class="btn-right-label color-primary" v-if="isRecordManage">请点击手机号码进行修改</div>
        <div class="btn-right-button" v-else-if="isProcessManage">
          <el-button
            class="btn-export button-fix"
            size="mini"
            type="primary"
            :class="{'active': hasSelectList}"
            @click="onDistributeWork"
          >派单</el-button>
        </div>
      </div>
    </div>
    <!-- 显示用的table -->
    <el-table
      class="table-fix"
      :data="workList"
      size="mini"
      border
      stripe
      style="width: 100%"
      :cell-class-name="cellcb"
      id="record-export-page"
      v-if="reloadTable"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="isSelectionActive"></el-table-column>
      <el-table-column prop="own_name" width="100" label="车主姓名" align="center" sortable></el-table-column>
      <el-table-column label="车主手机号" width="120" align="center" sortable>
        <template slot-scope="scope">
          <div v-if="isProcessSearch">{{scope.row.own_phone}}</div>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击查看详细信息"
            placement="top"
            v-else>
            <div
              class="table-mobile"
              @click="onProcessDilaogChange(scope.row)"
            >{{scope.row.own_phone}}</div>
          </el-tooltip>
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="点击修改信息"
            placement="top"
            v-else-if="isRecordManage">
            <div class="table-mobile" @click="onMobileSetting(scope.row)">{{scope.row.own_phone}}</div>
          </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center" sortable>
        <template slot-scope="scope">{{scope.row.own_sex === 0 ? "男" : "女"}}</template>
      </el-table-column>
      <el-table-column prop="business_name" width="120" label="业务办理点" align="center" sortable></el-table-column>
      <el-table-column prop="business_attribute_name" width="120" label="业务办理渠道" align="center" sortable></el-table-column>
      <el-table-column prop="install_name" width="120" label="设备安装点" align="center" sortable></el-table-column>
      <el-table-column prop="install_attribute_name" width="120" label="设备安装渠道" align="center" sortable></el-table-column>
      <el-table-column prop="sys_business_account" width="140" label="业务办理员手机" align="center" sortable></el-table-column>
      <el-table-column prop="sys_audit_account" width="120" label="审核人手机" align="center" sortable></el-table-column>
      <el-table-column prop="audit_time" width="180" label="审核时间" align="center" sortable>
        <template slot-scope="scope">{{getInstallTime(scope.row.audit_time)}}</template>
      </el-table-column>
      <el-table-column prop="sys_distribute_account" width="120" label="派单员手机" align="center" v-if="!isProcessSearch" sortable></el-table-column>
      <el-table-column prop="distribute_time" width="180" label="派单时间" align="center">
        <template slot-scope="scope">{{getInstallTime(scope.row.distribute_time)}}</template>
      </el-table-column>
      <el-table-column label="安装状态" width="120" align="center" sortable>
        <template slot-scope="scope">{{getProcessTips(scope.row.process)}}</template>
      </el-table-column>
      <el-table-column prop="sys_install_account" width="120"  label="安装工手机" align="center" v-if="!isProcessSearch" sortable></el-table-column>
      <el-table-column prop="install_time" width="180"  label="安装时间" align="center" sortable>
        <template slot-scope="scope">{{getInstallTime(scope.row.install_time)}}</template>
      </el-table-column>
      <el-table-column prop="install_position" width="230"  label="安装地理位置" align="center" sortable></el-table-column>
      <el-table-column prop="imei" label="IMEI" width="180"  align="center" v-if="!isProcessSearch" sortable></el-table-column>
      <el-table-column prop="iccid" label="ICCID" width="180"  align="center" v-if="!isProcessSearch" sortable></el-table-column>
      <el-table-column prop="contract_content" width="120"  label="合约期" align="center" sortable>
        <template slot-scope="scope">{{getContractContent(scope.row.contract_content)}}</template>
      </el-table-column>
      <el-table-column prop="contract_active" width="120"  label="激活状态" align="center" sortable>
        <template slot-scope="scope">{{getActiveTips(scope.row.contract_active)}}</template>
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

    <procss-detail-dialog
      v-model="procssDetailDialogVisible"
      :forbidModify="forbidModify"
      @change="onChangeDialog"
      @on-refresh="handleSearchWrokList"></procss-detail-dialog>


    <!-- 导数据用的table,不需要显示出来 -->
    <el-table
      class="table-fix export-table"
      id="record-export-all"
      :data="exportWorkList"
      size="mini"
      border
      stripe
      style="width: 100%"
      v-show="false">
             <el-table-column type="selection" width="55" v-if="isSelectionActive"></el-table-column>
      <el-table-column prop="own_name" label="车主姓名" align="center"></el-table-column>
      <el-table-column label="车主手机号" width="120" align="center">
        <template slot-scope="scope">
          <div v-if="isProcessSearch">{{scope.row.own_phone}}</div>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击查看详细信息"
            placement="top"
            v-else-if="isProcessManage"
          >
            <div
              class="table-mobile"
              @click="onProcessDilaogChange(scope.row)"
            >{{scope.row.own_phone}}</div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击修改信息"
            placement="top"
            v-else-if="isRecordManage"
          >
            <div class="table-mobile" @click="onMobileSetting(scope.row)">{{scope.row.own_phone}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center">
        <template slot-scope="scope">{{scope.row.own_sex === 0 ? "男" : "女"}}</template>
      </el-table-column>
      <el-table-column prop="business_name" width="120" label="业务办理点" align="center"></el-table-column>
      <el-table-column prop="business_attribute_name" width="120" label="业务办理渠道" align="center"></el-table-column>
      <el-table-column prop="install_name" width="120" label="设备安装点" align="center"></el-table-column>
      <el-table-column prop="install_attribute_name" width="120" label="设备安装渠道" align="center"></el-table-column>
      <el-table-column prop="sys_business_account" width="100" label="业务办理员手机" align="center"></el-table-column>
      <el-table-column prop="sys_audit_account" width="100" label="审核人手机" align="center"></el-table-column>
      <el-table-column prop="audit_time" width="100" label="审核时间" align="center">
        <template slot-scope="scope">{{getInstallTime(scope.row.audit_time)}}</template>
      </el-table-column>
      <el-table-column prop="sys_distribute_account" width="80" label="派单员手机" align="center" v-if="!isProcessSearch"></el-table-column>
      <el-table-column prop="distribute_time" label="派单时间" align="center">
        <template slot-scope="scope">{{getInstallTime(scope.row.distribute_time)}}</template>
      </el-table-column>
      <el-table-column label="安装状态" align="center">
        <template slot-scope="scope">{{getProcessTips(scope.row.process)}}</template>
      </el-table-column>
      <el-table-column prop="sys_install_account" width="80"  label="安装工手机" align="center" v-if="!isProcessSearch"></el-table-column>
      <el-table-column prop="install_time" width="100"  label="安装时间" align="center">
        <template slot-scope="scope">{{getInstallTime(scope.row.install_time)}}</template>
      </el-table-column>
      <el-table-column prop="install_position" width="230"  label="安装地理位置" align="center"></el-table-column>
      <el-table-column prop="imei" label="IMEI" width="80"  align="center" v-if="!isProcessSearch"></el-table-column>
      <el-table-column prop="iccid" label="ICCID" width="80"  align="center" v-if="!isProcessSearch"></el-table-column>
      <el-table-column prop="contract_content" width="80"  label="合约期" align="center">
        <template slot-scope="scope">{{getContractContent(scope.row.contract_content)}}</template>
      </el-table-column>
      <el-table-column prop="contract_active" width="80"  label="激活状态" align="center">
        <template slot-scope="scope">{{getActiveTips(scope.row.contract_active)}}</template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapMutations } from "vuex";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import OrgAddDialog from "../system-settings/user-manage/user-add/OrgAddDialog.vue";
import BtnQuery from "./RecordManageQuery.vue";
import ProcssDetailDialog from "./ProcssDetailDialog.vue";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      reloadTable: true,
      procssDetailDialogVisible: false,
      forbidModify: false,
      defaultBusinessId: '',
      businessPoint: {
        id: "",
        name: ""
      },
      installPoint: {
        id: "",
        name: ""
      },
      installAccount: "",
      businessAttribute: "",
      installAttribute: "",
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
          label: "一年"
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
    ...mapGetters(["exportWorkList", "workList", "workItem", "workListTotal", "businessAttributeList", "installAttributeList", "isHandleUser", "isStoreManager", "userInfo"]),
    mergeBusinessAttributeList() {
      return [{
        id: '',
        name: '全部'
      }, ...this.businessAttributeList]
    },
    mergeInstallAttributeList() {
      return [{
        id: '',
        name: '全部'
      }, ...this.installAttributeList]
    },
    isSelectionActive() {
      return this.hasAuditOrder && this.isProcessManage
    },
    isProcessManage() {
      return this.$route && this.$route.name === "ProcessManage";
    },
    isProcessSearch() {
      return this.$route && this.$route.name === "ProcessSearch";
    },
    isRecordManage() {
      return this.$route && this.$route.name === "RecordManage";
    },
    hasAuditOrder() {
      return this.workList.every(item => item.process === 2)
    },
    hasSelectList() {
      return this.selectList && this.selectList.length > 0
    }
  },
  methods: {
    ...mapMutations(["updateWorkItem"]),
    ...mapActions(["getWorkList", "setWorkDistribute", "getExportWorkList", "getBusinessAttributeList", "getInstallAttributeList"]),
    cellcb(row){
      if(row.columnIndex === 0 && !this.isSelectionActive){
        return "not-active"
      }
    },
    handleRenderOrgBusiness() {
      this.$refs.orgBusiness.onDialogShow()
      // if (this.isStoreManager || this.isHandleUser) {
      //   this.$message({
      //     type: 'error',
      //     message: `对不起，您没有相关查询权限！`
      //   })
      // } else {
      //   this.$refs.orgBusiness.onDialogShow()
      // }
    },
    handleRenderOrgInstall() {
      this.$refs.orgInstall.onDialogShow()
    },
    getMenuName() {
      if (this.isProcessManage) {
        return '办理状态管理'
      } else if (this.isProcessSearch) {
        return '办理状态查询'
      } else if (this.isRecordManage) {
        return '备案信息管理'
      }
    },
    getInstallTime(installTime) {
      if (installTime.indexOf('2000-01-01') > -1) {
        return ''
      }
      return installTime
    },
    handleSelectionChange(selectList) {
      console.log(selectList);
      this.selectList = selectList
        .filter(item => {
          return item.process === 2;
        })
        .map(item => {
          return item.id;
        });
      console.log(JSON.parse(JSON.stringify(this.selectList)));
    },
    handleSizeChange(pageSize = 10) {
      this.pageSize = pageSize;
      console.log(pageSize);
    },
    handleCurrentChange(currentPage = 1) {
      this.pageIndex = currentPage;
      this.handleSearchWrokList();
      console.log(currentPage);
    },
    async handleExportExcel() {
      await this.getWorkList({
        page_size: 100,
        page_index: this.pageIndex,
        business: "",
        install: "",
        client_account: "",
        install_account: "",
        business_account: "",
        audit_account: "",
        install_status: 2, // 安装状态为已审核
        audit_time: "",
        distribute_time: "",
        install_time: "",
        contract_content: "",
        contract_active: "",
        imei: "",
        iccid: ""
      });
      console.log(this.exportWorkList)
      this.exportExcel()
    },
    exportExcelCurrent() {
      this.exportExcel('#record-export-page')
    },
    async exportExcelAll() {
      await this.handleGetExportWorkList()
      this.exportExcel('#record-export-all')
    },
    exportExcel(id) {
      /* 从表生成工作簿对象 */
      let excelName = this.getMenuName()
      var wb = XLSX.utils.table_to_book(document.querySelector(id));
      console.log(wb)
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
          `${excelName}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleClearSearch() {
      this.pageIndex = 1
      this.businessPoint = {};
      this.installPoint = {};
      this.clientAccount = "";
      this.installAccount = "";
      this.businessAccount = "";
      this.auditAccount = "";
      this.installStatus = 0;
      this.auditTime = [];
      this.distributeTime = [];
      this.installTime = [];
      this.contractContent = 0;
      this.contractActive = 0;
      this.imei = "";
      this.iccid = "";
      this.businessAttribute = ""
      this.installAttribute = ""
      this.initIsHandleUser()
      this.initIsStoreManager()
    },
    onSelectBusinessPoint(data) {
      console.log("onSelectBusinessPoint", data);
      this.businessPoint = data;
    },
    onSelectInstallPoint(data) {
      console.log("onSelectInstallPoint", data);
      this.installPoint = data;
    },
    getContractContent(contract_content) {
      let contractContent = "";
      switch (contract_content) {
        case 0:
          contractContent = "全部";
          break;
        case 1:
          contractContent = "一年";
          break;
        case 2:
          contractContent = "两年";
          break;
        default:
          break;
      }
      return contractContent;
    },
    getActiveTips(contract_active) {
      let activeTips = "";
      switch (contract_active) {
        case 0:
          activeTips = "未激活";
          break;
        case 1:
          activeTips = "激活";
          break;
        case 2:
          activeTips = "过期";
          break;
        default:
          break;
      }
      return activeTips;
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
    async onDistributeWork(data) {
      if (this.hasSelectList) {
        await this.setWorkDistribute({
          distribute_id: this.selectList
        });
        this.handleSearchWrokList()
      }
    },
    getForbidModify(workItem) {
      return workItem && workItem.process === 4 && this.isRecordManage
    },
    onProcessDilaogChange(workItem) {
      this.forbidModify = this.getForbidModify(workItem)
      this.updateWorkItem(workItem);
      this.procssDetailDialogVisible = true;
    },
    onChangeDialog() {
      this.procssDetailDialogVisible = false;
      this.forbidModify = false
    },
    onMobileSetting(workItem) {
      console.log(JSON.parse(JSON.stringify(workItem)))
      this.updateWorkItem(workItem);
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
    onSearchWorkList() {
      this.pageIndex = 1
      this.handleSearchWrokList()
    },
    forceUpdateTable() {
      this.reloadTable = false
      this.$nextTick(() => {
        this.reloadTable = true
      })
    },
    async handleSearchWrokList() {
      const searchParam = {
        page_size: this.pageSize,
        page_index: this.pageIndex,
        business: this.businessPoint.id,
        business_attribute: this.businessAttribute,
        install: this.installPoint.id,
        install_attribute: this.installAttribute,
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
      this.forceUpdateTable()
      console.log(searchParam);
    },
    handleQuickSearchOneButton() {
      this.handleQuickSearchOrder()
    },
    async handleQuickSearchOrder() {
      let auditTime = dayjs().set('hour', 18).format('YYYY-MM-DD HH:mm:ss')
      this.installStatus = 2
      await this.getWorkList({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        business: this.businessPoint.id,
        business_attribute: this.businessAttribute,
        install: this.installPoint.id,
        install_attribute: this.installAttribute,
        client_account: this.clientAccount,
        install_account: this.installAccount,
        business_account: this.businessAccount,
        audit_account: this.auditAccount,
        install_status: this.installStatus, // 安装状态为已审核
        audit_time: `2018-01-01 00:00:00_${auditTime}`,
        distribute_time: this.getFormatTime(this.distributeTime),
        install_time: this.getFormatTime(this.installTime),
        contract_content: this.contractContent,
        contract_active: this.contractActive,
        imei: this.imei,
        iccid: this.iccid
      });
    },
    async handleGetExportWorkList() {
      const searchParam = {
        page_size: 10000,
        page_index: this.pageIndex,
        business: this.businessPoint.id,
        business_attribute: this.businessAttribute,
        install: this.installPoint.id,
        install_attribute: this.installAttribute,
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
      await this.getExportWorkList(searchParam);
    },
    initIsHandleUser() {
      if (this.isHandleUser) {
        this.businessAccount = this.userInfo.phone
        this.businessAttribute = this.business.attribute_id
        this.initBusinessPointRule()
      }
    },
    initBusinessPointRule() {
      if (this.isStoreManager || this.isHandleUser) {
        const { type, attribute_name, name, id } = this.business
        let site_type = type === 1 ? '办理点' : '安装点'
        let attribute_label = attribute_name ? `(${attribute_name}-${site_type})` : ''
        let site_label = `${name}${attribute_label}`
        this.defaultBusinessId = id
        this.businessPoint = {
          id: id,
          name: name,
          label: site_label
        }
      }
    },
    initIsStoreManager() {
      if (this.isStoreManager) {
        this.initBusinessPointRule()
      }
    },
    initSearchWrokList() {
      this.resetSearchParams()
      this.handleSearchWrokList();
    }
  },
  components: {
    BtnQuery,
    ProcssDetailDialog,
    OrgAddDialog
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.handleClearSearch()
      vm.initIsHandleUser()
      vm.initIsStoreManager()
      vm.handleSearchWrokList()
    })
  },
  mounted() {
    // 更新业务办理渠道和业务安装渠道
    this.getBusinessAttributeList()
    this.getInstallAttributeList()
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
  overflow: auto;
  .menu-item {
    width: auto;
    height: 100%;
    margin-left: d2r(31px);
    &:nth-child(1) {
      margin-left: 0;
    }
    &.menu-item-long-label .item-selector-wraper {
      .item-label {
        width: d2r(160px);
        white-space: nowrap;
      }
    }
    &.menu-item-last {
      padding-right: d2r(16px);
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
    font-size: d2r(14px);
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
  .item-selector-long {
    width: d2r(320px);
  }
  .ipt-long {
    width: d2r(220px);
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
    color: #3b4859ff;
  }
}

.export-table {
  display: none;
}

.btn-export {
  opacity: 0.6;
  &.active {
    opacity: 1;
  }
}

.not-active {
  display: none;
}
</style>
