<template>
  <div class="user-manage">
    <h3 class="user-manage-title">
      <i class="icon-dot"></i>
      <span class="title-label">工作人员管理</span>
    </h3>
    <div class="user-manage-header">
      <div class="user-manage-menu">
        <div class="menu-item">
          <div class="item-selector-wraper">
            <div class="item-label">业务办理点</div>
            <el-input
              class="item-selector ipt-fix item-selector-long"
              size="mini"
              v-model="businessPoint.label"
              placeholder="请选择业务办理点"
              disabled
            >
              <el-button slot="append" icon="el-icon-edit-outline" @click="handleRenderOrgBusiness"></el-button>
            </el-input>
            <org-add-dialog
              selectType="handle-tree"
              :isSearch="true"
              @onConfirm="onSelectBusinessPoint"
              ref="orgBusiness"
            ></org-add-dialog>
          </div>
          <div class="item-selector-wraper">
            <div class="item-label">业务办理渠道</div>
            <el-select
              class="item-selector ipt-fix item-selector-long"
              size="mini"
              v-model="businessAttribute"
              placeholder="请选择"
            >
              <el-option
                v-for="item in mergeBusinessAttributeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="menu-item">
          <div class="item-selector-wraper">
            <div class="item-label">设备安装点</div>
            <el-input
              class="item-selector ipt-fix item-selector-long"
              size="mini"
              v-model="installPoint.label"
              placeholder="请选择设备安装点"
              disabled
            >
              <el-button slot="append" icon="el-icon-edit-outline" @click="handleRenderOrgInstall"></el-button>
            </el-input>
            <org-add-dialog
              selectType="install-tree"
              :isSearch="true"
              @onConfirm="onSelectInstallPoint"
              ref="orgInstall"
            ></org-add-dialog>
          </div>
          <div class="item-selector-wraper">
            <div class="item-label">设备安装渠道</div>
            <el-select
              class="item-selector ipt-fix item-selector-long"
              size="mini"
              v-model="installAttribute"
              placeholder="请选择"
            >
              <el-option
                v-for="item in mergeInstallAttributeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="menu-item">
          <div class="item-selector-wraper">
            <span class="item-label">账号</span>
            <el-input
              class="item-selector ipt-fix"
              size="mini"
              v-model="searchAccount"
              placeholder="请输入手机号"
            ></el-input>
          </div>
          <div class="item-selector-wraper">
            <span class="item-label">角色名称</span>
            <el-select
              class="item-selector ipt-fix"
              size="mini"
              v-model="searchRole"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-wraper">
      <el-button
        icon="el-icon-search"
        class="button-fix"
        size="mini"
        type="primary"
        @click="onSearchAllUser"
      >查询</el-button>
      <el-button class="button-fix" size="mini" type="primary" @click="handleClearSearchParams">清空</el-button>
      <el-button size="mini" class="button-fix btn-export" @click="exportCurrentExcel">导出当前</el-button>
      <el-button size="mini" class="button-fix btn-export" @click="exportAllExcel">导出全部</el-button>
      <div class="btn-right">
        <el-button
        class="button-fix"
        icon="el-icon-folder-add"
        type="primary"
        size="mini"
        @click="handleUserAdd"
        >添加用户</el-button>
      </div>
    </div>

    <!-- {{allUser[0]}} -->
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      id="user-export-table"
      size="mini"
      :data="filterUserList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column prop="index" align="center" width="70" label="序号" sortable></el-table-column>
      <el-table-column prop="account" align="center" width="140" label="账号（手机号）" sortable></el-table-column>
      <el-table-column prop="name" align="center" width="100" label="账号姓名" sortable></el-table-column>
      <el-table-column prop="site_name" align="center" width="120" label="所属组织" sortable></el-table-column>
      <el-table-column prop="site_type" align="center" width="100" label="组织类型" sortable>
        <template slot-scope="scope">
          {{getAttributeTypeLable(scope.row.site_type)}}
        </template>
      </el-table-column>
      <el-table-column prop="attribute" align="center" width="100" label="渠道属性" sortable></el-table-column>
      <el-table-column prop="role_name" align="center" width="100" label="角色名称" sortable></el-table-column>
      <el-table-column prop="phone" align="center" width="100" label="手机号码" sortable></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱" sortable></el-table-column>
      <el-table-column prop="note" align="center" label="备注" sortable></el-table-column>
      <el-table-column width="280" align="center" label="操作">
        <template slot-scope="scope">
          <div class="btn-container">
            <el-button
              class="button-fix"
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="handleUserEdit(scope.row)"
            >编辑</el-button>
            <div class="part-line"></div>
            <user-delete @onRefresh="handelRefresh" :selectUser="scope.row" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 导数据用的table -->
    <el-table
      id="user-export-all"
      ref="userTable"
      class="table-fix table-disable-select-all table-hide"
      size="mini"
      :data="filterExportAllUser"
      v-show="false"
    >
      <el-table-column prop="index" align="center" width="50" label="序号"></el-table-column>
      <el-table-column prop="account" align="center" width="100" label="账号（手机号）"></el-table-column>
      <el-table-column prop="name" align="center" width="100" label="账号姓名"></el-table-column>
      <el-table-column prop="site_name" align="center" width="120" label="所属组织"></el-table-column>
      <el-table-column prop="site_type" align="center" width="100" label="组织类型">
        <template slot-scope="scope">
          {{getAttributeTypeLable(scope.row.site_type)}}
        </template>
      </el-table-column>
      <el-table-column prop="attribute" align="center" width="100" label="渠道属性"></el-table-column>
      <el-table-column prop="role_name" align="center" width="100" label="角色名称"></el-table-column>
      <el-table-column prop="phone" align="center" width="100" label="手机号码"></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱"></el-table-column>
      <el-table-column prop="note" align="center" label="备注"></el-table-column>
    </el-table>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="allUserTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import OrgAddDialog from "./user-add/OrgAddDialog";
import { mapGetters, mapMutations, mapActions } from "vuex";
import UserDelete from "./UserDelete";

export default {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      searchAccount: "",
      searchRole: "",
      isCheckedAll: false,
      selectItem: "",
      tableData: [],
      businessAttribute: "",
      installAttribute: "",
      businessPoint: {},
      installPoint: {}
    };
  },
  computed: {
    ...mapGetters([
      "exportAllUser",
      "allUser",
      "allRoles",
      "selectUser",
      "allUserTotal",
      "businessAttributeList",
      "installAttributeList"
    ]),
    filterUserList() {
      return this.allUser.map((item, index) => {
        return {
          index: (this.pageIndex - 1) * this.pageSize + index + 1,
          ...item
        }
      })
    },
    filterExportAllUser() {
      return this.exportAllUser.map((item, index) => {
        return {
          index: (this.pageIndex - 1) * this.pageSize + index + 1,
          ...item
        }
      })
    },
    roles() {
      let roles = [
        {
          value: "",
          label: "全部"
        }
      ];
      this.allRoles.forEach(item => {
        roles.push({
          value: item.name,
          label: item.name
        });
      });
      return roles;
    }
  },
  methods: {
    ...mapMutations(["udpateSelectUser"]),
    ...mapActions(["getAllUser", "getAllRoles", "getBusinessAttributeList", "getInstallAttributeList", "getExportAllUser"]),
    getAttributeTypeLable(type) {
      let attributeLable = ''
      if (type === 1) {
        attributeLable = '业务办理点'
      } else if (type === 2) {
        attributeLable = '设备安装点'
      }
      return attributeLable
    },
    handleRenderOrgBusiness() {
      this.$refs.orgBusiness.onDialogShow();
    },
    handleRenderOrgInstall() {
      this.$refs.orgInstall.onDialogShow();
    },
    onSelectBusinessPoint(data) {
      console.log("onSelectBusinessPoint", data);
      this.businessPoint = data;
    },
    onSelectInstallPoint(data) {
      console.log("onSelectInstallPoint", data);
      this.installPoint = data;
    },
    exportExcel(id) {
      console.log('exportExcel', id)
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector(id)
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        let currentTime = this.getCurrentTime()
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          `工作人员管理-${currentTime}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportCurrentExcel() {
      this.exportExcel('#user-export-table')
    },
    async exportAllExcel() {
      this.exportExcel('#user-export-all')
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.handleSearchAllUser();
    },
    handleCurrentChange(pageIndex) {
      console.log(pageIndex);
      this.pageIndex = pageIndex;
      this.handleSearchAllUser();
    },
    initExportAllUser() {
      this.getExportAllUser({
        page_size: 10000,
        page_index: 1,
        account: "",
        role: "",
        business: "",
        install: "",
        attribute_business: "",
        attribute_install: ""
      });
    },
    onSearchAllUser() {
      this.pageIndex = 1
      this.handleSearchAllUser()
    },
    handleSearchAllUser() {
      this.getAllUser({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        account: this.searchAccount,
        role: this.searchRole,
        business: this.businessPoint.id,
        install: this.installPoint.id,
        attribute_business: this.businessAttribute,
        attribute_install: this.installAttribute
      });
    },
    handleClearSearchParams() {
      this.searchAccount = "";
      this.searchRole = "";
      this.businessPoint = {}
      this.installPoint = {}
      this.businessAttribute = ""
      this.installAttribute = ""
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange");
      if (val.length > 1) {
        this.$refs.userTable.clearSelection();
        this.$refs.userTable.toggleRowSelection(val.pop());
      }
    },
    handleSelect(val) {
      console.log("handleSelect", val);
      const [selectItem] = val;
      this.udpateSelectUser(selectItem);
    },
    handleUserAdd() {
      this.$router.push({
        path: "user-add"
      });
    },
    handleUserDelete(selectUser) {
      this.udpateSelectUser(selectUser);
    },
    handleUserEdit(selectUser) {
      this.udpateSelectUser(selectUser);
      if (this.selectUser && this.selectUser.account) {
        this.$router.push({
          path: "user-edit"
        });
      } else {
        this.$message({
          type: "info",
          message: "请至少选择一个用户!"
        });
      }
    },
    initAllUser() {
      this.getAllUser({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        account: this.searchAccount,
        role: this.searchRole,
        business: this.businessPoint.id,
        install: this.installPoint.id,
        attribute_business: this.businessAttribute,
        attribute_install: this.installAttribute
      });
      this.getAllRoles();
      this.getBusinessAttributeList()
      this.getInstallAttributeList()
    },
    handelRefresh() {
      this.initAllUser();
    }
  },
  components: {
    UserDelete,
    OrgAddDialog
  },
  mounted() {
    this.initAllUser();
    this.initExportAllUser()
  }
};
</script>

<style lang="scss">
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.user-manage {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 d2r(38px) d2r(62px) d2r(42px);
  background: #ffffff;
}

.user-manage-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: d2r(70px);
  color: rgba(59, 72, 89, 1);
  .icon-dot {
    width: d2r(12px);
    height: d2r(12px);
    border-radius: 100%;
    background: #ff7525;
  }
  .title-label {
    margin-left: d2r(10px);
    font-size: d2r(17px);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #3b4859;
  }
}

.user-manage-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: d2r(16px);
  .user-manage-menu {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: auto;
    background: #f5f5f6;
    padding: 10px 10px 10px 0;
    .menu-item {
      width: auto;
      height: auto;
      margin-left: 10px;
      &:nth-child(1) {
        margin-left: 0;
      }
      .item-selector-wraper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        &:nth-child(1) {
          margin-top: 0;
        }
        .item-label {
          font-size: d2r(14px);
          width: d2r(120px);
          font-size: d2r(14px);
          text-align: right;
        }
        .item-selector {
          width: d2r(280px);
          margin-left: 10px;
        }
      }
    }
    .menu-ipt-wraper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .menu-label {
        display: block;
        width: auto;
        font-size: d2r(14px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(59, 72, 89, 1);
        white-space: nowrap;
      }
      .menu-ipt {
        margin-left: d2r(6px);
      }
    }
    .menu-account {
    }
    .menu-user-name {
      margin-left: d2r(24px);
    }
    .menu-btn-wraper {
      margin-left: d2r(40px);
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .btn-search {
        width: d2r(160px);
        height: d2r(35px);
        line-height: d2r(35px);
        background: #ff7525;
        font-size: d2r(16px);
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
      }
      .btn-clear {
        width: d2r(160px);
        height: d2r(35px);
        line-height: d2r(35px);
        margin-left: d2r(9px);
        font-size: d2r(16px);
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
        background: #a7b0bb;
      }
    }
  }
  .user-manage-crud {
    .crud-btn {
      width: d2r(181px);
      height: d2r(80px);
      font-size: d2r(16px);
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      border-radius: d2r(4px);
    }
    .crud-btn-add {
      margin-left: d2r(10px);
      background: rgba(0, 211, 184, 1);
    }
    .icon-btn-add {
      width: d2r(41px);
      height: d2r(30px);
      font-size: d2r(30px);
      margin-left: d2r(32px);
    }
    .crud-btn-edit {
      margin-left: 7px;
      background: #6fa8e0;
    }
  }
}

.user-manage-export {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .btn-export {
  }
}

.pagination-wraper {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .part-line {
    width: d2r(10px);
  }
}

.btn-wraper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  .btn-right {
    margin-left: auto;
  }
}
</style>
