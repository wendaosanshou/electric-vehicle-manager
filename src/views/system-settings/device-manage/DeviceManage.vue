<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>设备管理</page-title>
      <div class="manage-title-container">
        <device-edit type="is-add"></device-edit>
      </div>
    </div>
    <div class="device-manage-header">
      <div class="device-manage-menu">
        <div class="menu-account menu-ipt-wraper">
          <span class="menu-label">IMEI</span>
          <el-input class="menu-ipt ipt-fix" size="mini" v-model="imei" placeholder="请输入imei号"></el-input>
        </div>
        <div class="menu-btn-wraper">
          <div class="el-btn btn-search" @click="onSearchProducts">查询</div>
        </div>
      </div>
    </div>
    <div class="table-container">
      <el-table
        id="out-table"
        ref="userTable"
        class="table-fix table-disable-select-all"
        size="mini"
        :data="productList"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="imei" label="IMEI"></el-table-column>
        <el-table-column prop="operation" label="创建人"></el-table-column>
        <el-table-column prop="import_time" label="入库时间"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <div class="btn-container">
              <device-edit :data="deepClone(scope.row)"></device-edit>
              <div class="part-line"></div>
              <device-delete :data="deepClone(scope.row)" @onRefresh="onSearchProducts"></device-delete>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注信息"></el-table-column>
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
import PageTitle from "@/components/PageTitle.vue";
import DeviceEdit from './DeviceEdit.vue'
import DeviceDelete from './DeviceDelete.vue'

export default {
  data() {
    return {
      allUser: [],
      pageSize: 10,
      pageIndex: 1,
      imei: ""
    };
  },
  computed: {
    ...mapGetters(["productList", "productListTotal"])
  },
  methods: {
    ...mapActions(["searchProducts"]),
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.onSearchProducts()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.onSearchProducts()
    },
    onSearchProducts() {
      this.searchProducts({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        imei: this.imei
      });
    }
  },
  components: {
    PageTitle,
    DeviceEdit,
    DeviceDelete
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
    padding: 0 0 d2r(20px) 0;
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
    justify-content: flex-start;
    align-items: center;
    width: 100%;
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
        width: d2r(80px);
        font-size: d2r(14px);
        text-align: right;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(59, 72, 89, 1);
        white-space: nowrap;
      }
      .menu-ipt {
        margin-left: d2r(10px);
      }
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

</style>
