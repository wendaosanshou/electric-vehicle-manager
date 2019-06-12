<template>
  <div class="user-manage">
    <h3 class="user-manage-title">用户管理</h3>
    <div class="user-manage-header">
      <div class="user-manage-menu">
        <div class="menu-account menu-ipt-wraper">
          <span class="menu-label">账号</span>
          <el-input size="small" class="menu-ipt" v-model="input" placeholder="请输入手机号"></el-input>
        </div>
        <div class="menu-user-name menu-ipt-wraper">
          <span class="menu-label">角色姓名</span>
          <el-input size="small" class="menu-ipt" v-model="input" placeholder="角色姓名"></el-input>
        </div>
        <div class="menu-btn-wraper">
          <div class="el-btn btn-search">查询</div>
          <div class="el-btn btn-clear">清空</div>
        </div>
      </div>
      <div class="user-manage-crud ly-flex-row">
        <div class="el-btn crud-btn-add crud-btn ly-flex-row">
          <i class="icon-btn-add"></i>
          <span class="btn-content">添加用户</span>
        </div>
        <div class="el-btn crud-btn-delete crud-btn ly-flex-row">
          <i class="icon-btn-delete"></i>
          <span class="btn-content">删除用户</span>
        </div>
        <div class="el-btn crud-btn-edit crud-btn ly-flex-row">
          <i class="icon-btn-edit"></i>
          <span class="btn-content">编辑用户</span>
        </div>
      </div>
    </div>
    <dir class="user-manage-export">
      <el-checkbox class="checkbox-select-all" v-model="checked">全选</el-checkbox>
      <el-button size="mini" class="btn-export">导出</el-button>
    </dir>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="账号（手机号）" width="180"></el-table-column>
      <el-table-column prop="address" label="账号姓名"></el-table-column>
      <el-table-column prop="address" label="所属组织（业务办理点）"></el-table-column>
      <el-table-column prop="address" label="手机号码"></el-table-column>
      <el-table-column prop="address" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.user-manage {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 25px 41px 27px;
  background: #ffffff;
}

.user-manage-title {
  width: 100%;
  height: 47px;
  line-height: 47px;
  font-size: 11px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(59, 72, 89, 1);
  text-align: left;
}

.user-manage-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .user-manage-menu {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    height: 53px;
    padding: 0 25px 0 15px;
    background: #f5f5f6;
    .menu-ipt-wraper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .menu-label {
        display: block;
        width: auto;
        height: 15px;
        font-size: 9px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(59, 72, 89, 1);
        white-space: nowrap;
      }
      .menu-ipt {
        margin-left: 4px;
      }
    }
    .menu-account {
    }
    .menu-user-name {
      margin-left: 16px;
    }
    .menu-btn-wraper {
      margin-left: 27px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .btn-search {
        width: 106px;
        height: 23px;
        line-height: 23px;
        background: #ff7525;
        font-size: 11px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
      }
      .btn-clear {
        width: 106px;
        height: 23px;
        line-height: 23px;
        margin-left: 6px;
        font-size: 11px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #ffffff;
        background: #a7b0bb;
      }
    }
  }
  .user-manage-crud {
    .crud-btn {
      width: 121px;
      height: 53px;
      font-size: 11px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      border-radius: 3px;
    }
    .crud-btn-add {
      margin-left: 14px;
      background: rgba(0, 211, 184, 1);
      .icon-btn-add {
        width: 27px;
        height: 20px;
        margin-left: 21px;
      }
    }
    .crud-btn-delete {
      margin-left: 7px;
      background: #f87554;
      .icon-btn-delete {
        width: 19px;
        height: 24px;
        margin-left: 21px;
      }
    }
    .crud-btn-edit {
      margin-left: 7px;
      background: #6fa8e0;
      .icon-btn-edit {
        width: 24px;
        height: 24px;
        margin-left: 21px;
      }
    }
  }
}

.user-manage-export {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .checkbox-select-all {
  }
  .btn-export {
    width: 106px;
    height: 23px;
  }
}
</style>
