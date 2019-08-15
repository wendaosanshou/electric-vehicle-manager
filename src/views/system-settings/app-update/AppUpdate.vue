<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>APP升级管理</page-title>
      <div class="manage-title-container">
        <app-dialog-upload class="device-btn" @onRefresh="onSearchApkList"></app-dialog-upload>
      </div>
    </div>
    <!-- {{apkList}} -->
    <div class="table-container">
      <el-table
        ref="userTable"
        class="table-fix table-disable-select-all"
        size="mini"
        :data="apkList"
        border
        style="width: 100%">
        <el-table-column align="center" prop="id" min-width="70" label="序号" sortable></el-table-column>
        <el-table-column align="center" prop="name" min-width="120" label="APP名称" sortable></el-table-column>
        <el-table-column align="center" prop="version" min-width="120" label="版本名称" sortable></el-table-column>
        <el-table-column align="center" prop="update_time" min-width="140" label="更新时间" sortable></el-table-column>
        <el-table-column align="center" prop="operation" min-width="120" label="操作人" sortable></el-table-column>
        <el-table-column align="center" prop="note" min-width="200" label="版本说明" sortable></el-table-column>
        <el-table-column align="center" prop="download" min-width="220" label="下载地址" sortable></el-table-column>
        <el-table-column align="center" prop="operation" min-width="120" label="是否强制升级" sortable>
          <template slot-scope="scope">
            {{getUpgradeLable(scope.row.upgrade)}}
          </template>
        </el-table-column>
        <el-table-column align="center" width="160" label="操作">
          <template slot-scope="scope">
            <div class="btn-container">
              <app-dialog-delete :data="deepClone(scope.row)" @onRefresh="onSearchApkList"></app-dialog-delete>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="apkListTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import AppDialogDelete from "./AppDialogDelete";
import AppDialogUpload from "./AppDialogUpload";

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
    ...mapGetters(["apkList", "apkListTotal"])
  },
  methods: {
    ...mapActions(["getApkList"]),
    onClearSearchParams() {
      this.version = "";
      this.uploadDate = "";
      this.operation = "";
    },
    getUpgradeLable(upgrade) {
      return upgrade === 1 ? '强制升级' : '非强制升级'
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    onSearchApkList() {
      this.getApkList({
        page_size: this.pageSize,
        page_index: this.pageIndex
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.onSearchApkList();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.onSearchApkList();
    }
  },
  components: {
    PageTitle,
    AppDialogDelete,
    AppDialogUpload
  },
  mounted() {
    this.onSearchApkList();
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
