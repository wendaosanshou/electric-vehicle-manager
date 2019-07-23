<template>
  <div class="device-manage">
    <div class="device-manage-title">
      <page-title>客户留言管理</page-title>
      <div class="manage-title-container">
        <!-- <device-dialog-upload class="device-btn" @onRefresh="onSearchFeedback"></device-dialog-upload> -->
      </div>
    </div>
    <div class="user-manage-header">
      <div class="user-menu-list">
        <div class="user-menu-item">
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">用户姓名</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="name" placeholder="请输入用户姓名"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label">用户手机号</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="account" placeholder="请输入手机号"></el-input>
          </div>
          <div class="menu-account menu-ipt-wraper">
            <span class="menu-label menu-label-half">状态</span>
            <el-select
              class="menu-ipt ipt-fix ipt-selector"
              size="mini"
              v-model="process"
              placeholder="请选择状态">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in processList"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input class="menu-ipt ipt-fix" size="mini" v-model="process" placeholder="请输入版本名称"></el-input> -->
          </div>
          <!-- <div class="menu-account menu-ipt-wraper">
            <span class="menu-label menu-label-half">操作人</span>
            <el-input class="menu-ipt ipt-fix" size="mini" v-model="operation" placeholder="请输入创建人"></el-input>
          </div> -->
        </div>
      </div>
      <div class="menu-btns">
        <el-button icon="el-icon-search" class="button-fix" type="primary" size="mini" @click="onSearchFeedback">查询</el-button>
        <el-button class="btn-clear button-fix" size="mini" @click="onClearSearchParams">清空</el-button>
      </div>
    </div>
    <div class="table-container">
    <!-- {{feedbackList}} -->
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      size="mini"
      :data="feedbackList"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="account" label="用户手机号"></el-table-column>
      <el-table-column align="center" prop="name" label="用户姓名"></el-table-column>
      <el-table-column align="center" prop="feedback_type" label="意见分类"></el-table-column>
      <el-table-column align="center" prop="content" label="意见内容"></el-table-column>
      <el-table-column align="center" prop="process" label="处理状态">
        <template slot-scope="scope">
          {{getProcessTips(scope.row.process)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="operation" label="处理人账号">
      </el-table-column>
      <el-table-column align="center" prop="process_time" label="处理时间">
        <template slot-scope="scope">
          {{$util.getFilterDefaultTime(scope.row.process_time)}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="scope">
          <el-button class="button-fix" icon="el-icon-edit" type="primary" size="mini" @click="onEditDetail(scope.row)">修改</el-button>
        </template>
        <!-- <template slot-scope="scope">
            <div class="btn-container">
              <app-dialog-delete :data="deepClone(scope.row)" @onRefresh="onSearchFeedback"></app-dialog-delete>
            </div>
          </template> -->
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
        :total="feedbackListTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
// import AppDialogDelete from "./AppDialogDelete";
// import AppDialogUpload from "./AppDialogUpload";

export default {
  data() {
    return {
      name: "",
      account: "",
      process: -1,
      operation: "",
      pageIndex: 1,
      pageSize: 10,
      processList: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '未处理'
        },
        {
          value: 1,
          label: '已处理'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['feedbackList', 'feedbackListTotal'])
  },
  methods: {
    ...mapActions(["getFeedback", "getFeedbackDetail"]),
    getProcessTips(process) {
      if (process === 0) {
        return '未处理'
      } else if (process === 1) {
        return '已处理'
      } else {
        return ''
      }
    },
    onClearSearchParams() {
      this.name = ''
      this.account = ''
      this.process = ''
      this.operation = ''
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    onSearchFeedback() {
      this.getFeedback({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        name: this.name,
        account: this.account,
        process: this.process,
        operation: this.operation
      });
    },
    async onEditDetail(item) {
      await this.getFeedbackDetail({
        id: item.id
      })
      this.$router.push('/user-feedback-detail')
      // console.log('edit-detail')
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.onSearchFeedback()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.onSearchFeedback()
    }
  },
  components: {
    PageTitle
  },
  mounted() {
    this.onSearchFeedback()
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
  margin-top: d2r(16px);
  .user-menu-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: d2r(23px);
    .user-menu-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
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
          width: d2r(144px);
          text-align: right;
        }
        .menu-label-half {
          display: block;
          width: d2r(74px);
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
    margin-left: d2r(16px);
    .el-btn {
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
