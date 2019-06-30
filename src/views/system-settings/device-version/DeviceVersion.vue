<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>设备版本管理</page-title>
      <div class="manage-title-container">
        <device-version-upload class="device-btn"></device-version-upload>
        <device-version-delete class="device-btn"></device-version-delete>
      </div>
    </div>
    <div class="user-manage-header">
      <div class="user-menu-list">
        <div class="user-menu-item">
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">版本名称</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="imei" placeholder="请输入imei号"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">上传时间</span>
            <el-input
              class="menu-ipt ipt-fix"
              size="mini"
              v-model="enterDate"
              placeholder="请输入入库时间"
            ></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">上传操作人</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="operation" placeholder="请输入创建人"></el-input>
          </div>
        </div>
      </div>
      <div class="menu-btns">
        <div class="el-btn btn-search" @click="onSearchDeviceUpdate">查询</div>
        <div class="el-btn btn-clear" @click="onClearSearchParams">清空</div>
      </div>
    </div>
    <div class="table-container">

    </div>
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      size="mini"
      :data="allUser"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="account" label="版本号"></el-table-column>
      <el-table-column prop="name" label="上传时间"></el-table-column>
      <el-table-column prop="site_name" label="上传操作人"></el-table-column>
      <el-table-column prop="role_name" label="版本说明"></el-table-column>
    </el-table>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
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
import PageTitle from "@/components/PageTitle.vue";
import DeviceVersionDelete from './DeviceVersionDelete'
import DeviceVersionUpload from './DeviceVersionUpload'

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      allUser: []
    };
  },
  methods: {
    ...mapActions(['getProductPage']),
    onSearchDeviceUpdate() {

    },
    onClearSearchParams() {

    },
    handleSelectionChange() {},
    handleSelect() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleGetProductPage() {
    }
  },
  components: {
    PageTitle,
    DeviceVersionDelete,
    DeviceVersionUpload
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.device-manage {
    padding: 0 d2r(38px) d2r(36px) d2r(42px);
}

.role-manage-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: d2r(21px) 0 d2r(39px) 0;
}

.device-manage-title {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: d2r(30px);
  .manage-title-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0 0 d2r(20px) 0;
    .device-btn {
      margin-left: d2r(10px);
    }
  }
}

.user-manage-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: d2r(25px);
  background: #f5f5f6ff;
  .user-menu-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: d2r(23px);
    .user-menu-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: d2r(20px);
      .menu-ipt-wraper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-left: d2r(16px);
        .menu-label {
          display: block;
          width: d2r(124px);
          text-align: right;
        }
        .menu-ipt {
          margin-left: d2r(16px);
        }
      }
    }
  }
  .menu-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .el-btn {
      width: d2r(160px);
      height: d2r(35px);
      &.btn-search {
        background: #ff7525ff;
      }
      &.btn-clear {
        margin-left: d2r(9px);
        background: #a7b0bbff;
      }
    }
  }
}

.table-container {
    margin-top: d2r(20px);
}

.pagination-wraper {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>
