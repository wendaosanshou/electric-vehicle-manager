<template>
  <div class="user-manage">
    <h3 class="user-manage-title">
      <i class="icon-dot"></i>
      <span class="title-label">用户管理</span>
    </h3>
    <div class="user-manage-header">
      <div class="user-manage-menu">
        <div class="menu-account menu-ipt-wraper">
          <span class="menu-label">账号</span>
          <el-input class="menu-ipt ipt-fix" size="mini" v-model="searchAccount" placeholder="请输入手机号"></el-input>
        </div>
        <div class="menu-user-name menu-ipt-wraper">
          <span class="menu-label">角色名称</span>
          <el-select class="menu-ipt ipt-fix" size="mini" v-model="searchRole" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="menu-btn-wraper">
          <div class="el-btn btn-search" @click="handleSearchAllUser">查询</div>
          <div class="el-btn btn-clear" @click="handleClearSearchParams">清空</div>
        </div>
      </div>
      <div class="user-manage-crud ly-flex-row">
        <el-button class="button-fix" icon="el-icon-folder-add" type="primary" size="mini" @click="handleUserAdd">添加用户</el-button>
        <el-button size="mini" class="button-fix btn-export" @click="exportExcel">导出</el-button>
        <!-- <div class="el-btn crud-btn-add crud-btn ly-flex-row" @click="handleUserAdd">
          <i class="el-icon-folder-add icon-btn-add"></i>
          <span class="btn-content">添加用户</span>
        </div> -->
        <!-- <user-delete @onRefresh="handelRefresh"/> -->
        <!-- <div class="el-btn crud-btn-edit crud-btn ly-flex-row" @click="handleUserEdit">
          <i class="el-icon-edit-outline icon-btn-add"></i>
          <span class="btn-content">编辑用户</span>
        </div> -->
      </div>
    </div>
    <el-table ref="userTable" class="table-fix table-disable-select-all" size="mini" :data="allUser" border style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="handleSelect">
      <el-table-column prop="id" align="center" label="序号"></el-table-column>
      <el-table-column prop="account" align="center" label="账号（手机号）"></el-table-column>
      <el-table-column prop="name" align="center" label="账号姓名"></el-table-column>
      <el-table-column prop="site_name" align="center" label="所属组织（业务办理点）"></el-table-column>
      <el-table-column prop="role_name" align="center" label="角色名称"></el-table-column>
      <el-table-column prop="phone" align="center" label="手机号码"></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱"></el-table-column>
      <el-table-column prop="note" align="center" label="备注"></el-table-column>
      <el-table-column width="280" align="center" label="操作">
         <template slot-scope="scope">
            <div class="btn-container">
              <el-button class="button-fix" icon="el-icon-edit" type="primary" size="mini" @click="handleUserEdit(scope.row)">编辑</el-button>
              <div class="part-line"></div>
              <user-delete @onRefresh="handelRefresh" :selectUser="scope.row"/>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <!-- 导数据用的table -->
    <el-table id="user-export-table" ref="userTable" class="table-fix table-disable-select-all table-hide" size="mini" :data="allUser" v-show="false">
      <el-table-column prop="id" align="center" label="序号"></el-table-column>
      <el-table-column prop="account" align="center" label="账号（手机号）"></el-table-column>
      <el-table-column prop="name" align="center" label="账号姓名"></el-table-column>
      <el-table-column prop="site_name" align="center" label="所属组织（业务办理点）"></el-table-column>
      <el-table-column prop="role_name" align="center" label="角色名称"></el-table-column>
      <el-table-column prop="phone" align="center" label="手机号码"></el-table-column>
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
      selectItem: '',
      tableData: []
    };
  },
  computed: {
    ...mapGetters(['allUser', 'allRoles', 'selectUser', 'allUserTotal']),
    roles() {
      let roles = [{
        value: '',
        label: "全部"
      }]
      this.allRoles.forEach(item => {
        roles.push({
          value: item.name,
          label: item.name
        })
      });
      return roles
    }
  },
  methods: {
    ...mapMutations(['udpateSelectUser']),
    ...mapActions(["getAllUser", "getAllRoles"]),
     exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#user-export-table"));
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
          "用户管理.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.handleSearchAllUser()
    },
    handleCurrentChange(pageIndex) {
      console.log(pageIndex)
      this.pageIndex = pageIndex
      this.handleSearchAllUser()
    },
    initSearchAllUser() {
      this.getAllUser({
        page_size: 1000,
        page_index: 1,
        account: '',
        role: ''
      });
    },
    handleSearchAllUser() {
      this.getAllUser({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        account: this.searchAccount,
        role: this.searchRole
      });
    },
    handleClearSearchParams() {
      this.searchAccount = ''
      this.searchRole = ''
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange')
      if (val.length > 1) {
        this.$refs.userTable.clearSelection()
        this.$refs.userTable.toggleRowSelection(val.pop())
      }
    },
    handleSelect(val) {
      console.log('handleSelect', val)
      const [selectItem] = val
      this.udpateSelectUser(selectItem)
    },
    handleUserAdd() {
      this.$router.push({
        path: "user-add"
      });
    },
    handleUserDelete(selectUser) {
      this.udpateSelectUser(selectUser)
    },
    handleUserEdit(selectUser) {
      this.udpateSelectUser(selectUser)
      if(this.selectUser && this.selectUser.account) {
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
        role: ""
      });
      this.getAllRoles()
    },
    handelRefresh() {
      this.initAllUser()
    }
  },
  components: {
    UserDelete
  },
  mounted() {
    this.initAllUser();
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
    width: auto;
    height: d2r(80px);
    padding: 0 d2r(37px) 0 d2r(23px);
    background: #f5f5f6;
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
</style>
