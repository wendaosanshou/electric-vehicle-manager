<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>设备管理</page-title>
      <div class="manage-title-container">
        <device-edit type="is-add" @onRefresh="handleSearchProducts"></device-edit>
        <device-add-more @onRefresh="handleSearchProducts"></device-add-more>
        <el-button
          class="button-fix btn-refresh"
          :class="{active: hasRebotImeis}"
          icon="el-icon-refresh"
          type="primary"
          size="mini" @click="rebotDeivce">重启</el-button>
      </div>
    </div>
    <div class="device-manage-header">
      <div class="device-manage-menu">
        <div class="menu-item-container">
          <div class="menu-item">
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label">入库时间</span>
              <el-date-picker
                v-model="pickerTime"
                size="mini"
                class="ipt-fix ipt-long"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :picker-options="pickerOptions"></el-date-picker>
            </div>
          </div>
          <div class="menu-item menu-item-last">
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label">IMEI</span>
              <el-input class="menu-ipt ipt-fix" size="mini" v-model="imei" placeholder="请输入imei号"></el-input>
            </div>
            <div class="ipt-select-wraper">
              <span class="menu-label">使用状态</span>
              <el-select
              class="ipt-fix menu-ipt-selector"
              size="mini"
              v-model="isInstall"
              placeholder="请选择使用情况">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in installList"
                :key="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="menu-btn-wraper">
          <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="onSearchProducts">查询</el-button>
          <el-button class="button-fix" size="mini" @click="onClearSearchParams">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-container">
      <div class="device-total">设备总数：{{productListTotal}}</div>
      <el-table
        id="device-out-table"
        ref="userTable"
        class="table-fix"
        size="mini"
        :data="addIndexProductList"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="index" align="center" label="序号" sortable></el-table-column>
        <el-table-column prop="imei" align="center" label="IMEI" sortable></el-table-column>
        <el-table-column prop="operation" align="center" label="创建人" sortable></el-table-column>
        <el-table-column prop="import_time" align="center" label="入库时间" sortable></el-table-column>
        <el-table-column prop="is_install" align="center" label="使用状态" sortable>
          <template slot-scope="scope">
            {{getInstallStatus(scope.row.is_install)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280">
          <template slot-scope="scope">
            <div class="btn-container">
              <device-edit type="is-edit" :data="deepClone(scope.row)" @onRefresh="handleSearchProducts"></device-edit>
              <div class="part-line"></div>
              <device-delete :data="deepClone(scope.row)" @onRefresh="handleSearchProducts"></device-delete>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="note" align="center" label="备注信息" sortable></el-table-column>
      </el-table>
    </div>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="productListTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dayjs from 'dayjs'
import PageTitle from "@/components/PageTitle.vue";
import DeviceEdit from './DeviceEdit.vue'
import DeviceAddMore from './DeviceAddMore.vue'
import DeviceDelete from './DeviceDelete.vue'

export default {
  data() {
    return {
      allUser: [],
      pickerTime: [],
      pageSize: 10,
      pageIndex: 1,
      isInstall: -1, // 0-未安装 1-已安装 -1所有
      installList: [{
        value: -1,
        label: "全部"
      },{
        value: 0,
        label: "未使用"
      },{
        value: 1,
        label: "已使用"
      }],
      imei: "",
      rebotImeis: []
    };
  },
  computed: {
    ...mapGetters(["productList", "productListTotal", "pickerOptions"]),
    addIndexProductList() {
      return this.getPageIndexList(this.productList, this.pageSize, this.pageIndex)
    },
    hasRebotImeis() {
      return this.rebotImeis && this.rebotImeis.length > 0
    }
  },
  methods: {
    ...mapActions(["searchProducts", "rebotDevice"]),
    getInstallStatus(isInstall) {
      let isInstallLable = ''
      if (isInstall === 0) {
        isInstallLable = '未使用'
      } else if (isInstall === 1) {
        isInstallLable = '已使用'
      }
      return isInstallLable
    },
    async rebotDeivce() {
      if (this.hasRebotImeis) {
        await this.rebotDevice({
          imeis: this.rebotImeis
        })
        this.rebotImeis = []
        this.onSearchProducts()
      } else {
        this.$message({
          type: "error",
          message: "请选中需要重启的设备!"
        });
      }
    },
    handleSelectionChange(selectList) {
      console.log(selectList)
      if (selectList && selectList.length > 0) {
        this.rebotImeis = selectList.map(item => item.imei)
      }
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    onClearSearchParams() {
      this.imei = ''
      this.pickerTime = []
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handleSearchProducts()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.handleSearchProducts()
    },
    async handleSearchProducts() {
      const [startTime, endTime] = this.pickerTime
      let start = dayjs('2000-00-00 23:59:59').format("YYYY-MM-DD HH:mm:ss")
      let end = dayjs('2999-00-00 23:59:59').format("YYYY-MM-DD HH:mm:ss")
      if (startTime && endTime) {
        start = dayjs(startTime).format("YYYY-MM-DD HH:mm:ss")
        end = dayjs(endTime).format("YYYY-MM-DD HH:mm:ss")
      }
      await this.searchProducts({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        imei: this.imei,
        is_install: this.isInstall,
        start: start,
        end: end
      });
      this.onRefetchList()
    },
    onRefetchList() {
      if (this.productList && this.productList.length === 0 && this.pageIndex > 1) {
        let hasExtra = this.productListTotal % this.pageSize !== 0
        let maxIndex = Math.floor(this.productListTotal / this.pageSize) // 最大的index
        this.pageIndex = hasExtra ? maxIndex + 1 : maxIndex
        this.handleSearchProducts()
      }
    },
    onSearchProducts() {
      this.handleSearchProducts()
    }
  },
  components: {
    PageTitle,
    DeviceEdit,
    DeviceDelete,
    DeviceAddMore
  },
  mounted() {
    this.onSearchProducts()
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: d2r(30px);
  .manage-title-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0 0 d2r(20px) 0;
    .btn-refresh {
      margin-left: 10px;
    }
  }
}

.device-manage-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .device-manage-menu {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: d2r(80px);
    padding: 0 d2r(37px) 0 d2r(23px);
    background: #f5f5f6;
    .menu-item-container {
      padding: d2r(17px) 0;
    }
    .menu-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      &.menu-item-last {
        margin-top: 10px;
      }
    }
    .menu-ipt-wraper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .menu-label {
        display: block;
        width: d2r(80px);
        font-size: d2r(14px);
        text-align: right;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(59, 72, 89, 1);
        white-space: nowrap;
      }
      .ipt-long {
        width: d2r(600px);
        margin-left: d2r(10px);
      }
      .menu-ipt {
        margin-left: d2r(30px);
      }
    }
    .menu-user-name {
      margin-left: d2r(24px);
    }
    .ipt-select-wraper {
      margin-left: d2r(40px);
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

.btn-container {
  display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
  .part-line {
    width: d2r(10px);
  }
}

.menu-ipt-selector {
  margin-left: d2r(10px);
}

.device-total {
  text-align: left;
  width: 100%;
  height: d2r(34px);
  font-size: d2r(14px);
}
</style>
