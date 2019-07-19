<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>设备版本管理</page-title>
      <div class="manage-title-container">
        <device-version-upload class="device-btn" @onRefresh="onSearchDeviceUpdate"></device-version-upload>
      </div>
    </div>
    <div class="user-manage-header">
      <div class="user-menu-list">
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">版本名称</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="version" placeholder="请输入版本名称"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">上传时间</span>
             <el-date-picker
              size="mini"
              class="menu-ipt ipt-fix"
              v-model="uploadDate"
              type="date"
              placeholder="请输入上传时间">
            </el-date-picker>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label menu-label-long">上传操作人</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="operation" placeholder="请输入上传操作人"></el-input>
          </div>
      </div>
      <div class="menu-btns">
        <el-button icon="el-icon-search" class="button-fix" type="primary" size="mini" @click="onSearchDeviceUpdate">查询</el-button>
        <el-button class="btn-clear button-fix" size="mini" @click="onClearSearchParams">清空</el-button>
      </div>
    </div>
    <div class="table-container"></div>
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      size="mini"
      :data="firewareList"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="id" label="序号"></el-table-column>
      <el-table-column align="center" prop="version" label="版本名称"></el-table-column>
      <el-table-column align="center" prop="version_date" label="上传时间"></el-table-column>
      <el-table-column align="center" prop="operation" label="上传操作人"></el-table-column>
      <el-table-column align="center" prop="note" label="版本说明"></el-table-column>
      <el-table-column align="center" prop="version_url" width="320" label="下载地址"></el-table-column>
      <el-table-column align="center" prop="md5" width="180" label="md5特征值"></el-table-column>
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="scope">
            <div class="btn-container">
              <device-version-delete :data="deepClone(scope.row)" @onRefresh="onSearchDeviceUpdate"></device-version-delete>
            </div>
          </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="firewareListTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import DeviceVersionDelete from "./DeviceVersionDelete";
import DeviceVersionUpload from "./DeviceVersionUpload";

export default {
  data() {
    return {
      version: "",
      uploadDate: "",
      operation: "",
      pageIndex: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapGetters(['firewareList', 'firewareListTotal'])
  },
  methods: {
    ...mapActions(["getFirmwareList"]),
    onClearSearchParams() {
      this.version = ''
      this.uploadDate = ''
      this.operation = ''
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    onSearchDeviceUpdate() {
      const uploadDate = this.uploadDate ? dayjs(this.uploadDate).format("YYYY-MM-DD") : this.updateTime
      this.getFirmwareList({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        version: this.version,
        date: uploadDate,
        operation: this.operation
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.onSearchDeviceUpdate()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.onSearchDeviceUpdate()
    }
  },
  components: {
    PageTitle,
    DeviceVersionDelete,
    DeviceVersionUpload
  },
  mounted() {
    this.onSearchDeviceUpdate()
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
  padding-bottom: d2r(23px);
  padding-top: d2r(23px);
  .user-menu-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .menu-ipt-wraper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-left: d2r(16px);
      .menu-label {
        display: block;
        width: d2r(100px);
        text-align: right;
        &.menu-label-long {
          width: d2r(120px);
        }
      }
      .menu-ipt {
        width: d2r(200px);
        margin-left: d2r(16px);
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
