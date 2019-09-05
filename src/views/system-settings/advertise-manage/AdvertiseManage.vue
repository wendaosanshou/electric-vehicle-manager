<template>
  <div class="advertise-manage">
    <div class="advertise-manage-title">
      <page-title>APP广告管理</page-title>
      <div class="manage-title-container">
        <advertise-manage-add @onRefresh="onSearchAllGuide"></advertise-manage-add>
      </div>
    </div>
    <!-- {{allGuide[0]}} -->
    <div class="table-container">
      <el-table
        ref="userTable"
        class="table-fix table-disable-select-all"
        size="mini"
        :data="addIndexAllGuide"
        border
        style="width: 100%">
        <el-table-column align="center" prop="index" min-width="70" label="序号" sortable></el-table-column>
        <el-table-column align="center" prop="img_url" min-width="220" label="广告页图片" sortable></el-table-column>
        <el-table-column align="center" prop="page_url" min-width="220"  label="广告页链接" sortable></el-table-column>
        <el-table-column align="center" prop="create_time" min-width="160"  label="创建时间" sortable></el-table-column>
        <el-table-column align="center" prop="start_time" min-width="160"  label="生效时间" sortable></el-table-column>
        <el-table-column align="center" prop="end_time" min-width="160"  label="截止时间" sortable></el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <div class="btn-container">
              <!-- <advertise-manage-add type="is-edit" :advertiseData="deepClone(scope.row)" @onRefresh="onSearchAllGuide"></advertise-manage-add>
              <div class="part-line"></div> -->
              <advertise-delete :advertiseData="deepClone(scope.row)" @onRefresh="onSearchAllGuide"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="note" width="220"  label="备注信息" sortable></el-table-column>
      </el-table>
    </div>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="allGuideTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import AdvertiseManageAdd from "./AdvertiseManageAdd.vue";
import AdvertiseDelete from "./AdvertiseDelete.vue";

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
    ...mapGetters(["allGuide", "allGuideTotal"]),
    addIndexAllGuide() {
      return this.getPageIndexList(this.allGuide, this.pageSize, this.pageIndex)
    }
  },
  methods: {
    ...mapActions(["getAllGuide"]),
    onClearSearchParams() {
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    onRefetchList() {
      if (this.allGuide && this.allGuide.length === 0 && this.pageIndex > 1) {
        let hasExtra = this.allGuideTotal % this.pageSize !== 0
        let maxIndex = Math.floor(this.allGuideTotal / this.pageSize) // 最大的index
        this.pageIndex = hasExtra ? maxIndex + 1 : maxIndex
        this.onSearchAllGuide()
      }
    },
    async onSearchAllGuide() {
      await this.getAllGuide({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
      this.onRefetchList()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.onSearchAllGuide();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.onSearchAllGuide();
    }
  },
  components: {
    PageTitle,
    AdvertiseManageAdd,
    AdvertiseDelete
  },
  mounted() {
    this.onSearchAllGuide();
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.advertise-manage {
  padding: 0 d2r(38px) d2r(36px) d2r(42px);
}

.role-manage-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: d2r(21px) 0 d2r(39px) 0;
}

.advertise-manage-title {
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

.image-picture {
  width: d2r(80px);
  height: auto;
}
</style>
