<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>设备在线升级</page-title>
      <div class="manage-title-container">
        <device-update-one class="device-btn" @on-refresh="handleGetProductPage"></device-update-one>
        <device-update-more class="device-btn"></device-update-more>
        <device-update-history class="device-btn"></device-update-history>
      </div>
    </div>
    <div class="user-manage-header">
      <div class="user-menu-list">
        <div class="user-menu-item">
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">IMEI</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="imei" placeholder="请输入imei号"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">入库时间</span>
             <el-date-picker
              size="mini"
              class="menu-ipt ipt-fix"
              v-model="importTime"
              type="date"
              placeholder="请输入入库时间">
            </el-date-picker>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">创建人</span>
            <el-input
              class="menu-ipt ipt-fix"
              size="mini"
              v-model="importOperation"
              placeholder="请输入创建人"
            ></el-input>
          </div>
        </div>
        <div class="user-menu-item">
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">版本信息</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="version" placeholder="请输入版本信息"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">升级时间</span>
            <el-date-picker
              v-model="updateTime"
              type="date"
              size="mini"
              class="menu-ipt ipt-fix"
              placeholder="请输入升级时间">
            </el-date-picker>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">升级操作人</span>
            <el-input
              class="menu-ipt ipt-fix"
              size="mini"
              v-model="updateOperation"
              placeholder="请输入升级操作人"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="menu-btns">
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="handleGetProductPage">查询</el-button>
        <el-button class="button-fix" size="mini" @click="onClearSearchParams">清空</el-button>
      </div>
    </div>
    <!-- {{productPages}} -->
    <div class="table-container">
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      size="mini"
      :data="productPages"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column align="center" prop="id" label="序号"></el-table-column>
      <el-table-column align="center" prop="imei" label="IMEI"></el-table-column>
      <el-table-column align="center" prop="operation" label="创建人"></el-table-column>
      <el-table-column align="center" prop="import_time" label="入库时间"></el-table-column>
      <el-table-column align="center" prop="version" label="版本信息"></el-table-column>
      <el-table-column align="center" prop="update_date" label="升级时间"></el-table-column>
      <el-table-column align="center" prop="update_operation" label="升级操作人"></el-table-column>
    </el-table>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="productPagesTotal"
      ></el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import DeviceUpdateHistory from "./DeviceUpdateHistory";
import DeviceUpdateOne from "./DeviceUpdateOne";
import DeviceUpdateMore from "./DeviceUpdateMore";

export default {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      imei: "",
      importOperation: "",
      importTime: "",
      updateOperation: "",
      updateTime: "",
      version: "",
      allUser: []
    };
  },
  computed: {
    ...mapGetters(['productPages', 'productPagesTotal'])
  },
  methods: {
    ...mapActions(["getProductPage"]),
    onClearSearchParams() {
      this.imei = ""
      this.importOperation = ""
      this.importTime = ""
      this.updateOperation = ""
      this.updateTime = ""
      this.version = ""
    },
    handleSelectionChange() {},
    handleSelect() {},
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handleGetProductPage()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.handleGetProductPage()
    },
    async handleGetProductPage() {
      const updateTime = this.updateTime ? dayjs(this.updateTime).format("YYYY-MM-DD HH:mm:ss") : this.updateTime
      const importTime = this.importTime ? dayjs(this.importTime).format("YYYY-MM-DD HH:mm:ss") : this.importTime
      await this.getProductPage({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        imei: this.imei,
        import_operation: this.importOperation, //引入操作人
        update_operation: this.updateOperation, //升级操作人
        update_time: updateTime, //升级时间
        import_time: importTime, //引入时间
        version: this.version //版本
      });
    }
  },
  components: {
    PageTitle,
    DeviceUpdateHistory,
    DeviceUpdateOne,
    DeviceUpdateMore
  },
  mounted() {
    this.handleGetProductPage()
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
