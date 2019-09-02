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
          <div class="user-menu-row">
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label">用户姓名</span>
              <el-input class="menu-ipt ipt-fix" size="mini" v-model="name" placeholder="请输入用户姓名"></el-input>
            </div>
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label">用户手机号</span>
              <el-input class="menu-ipt ipt-fix" size="mini" v-model="account" placeholder="请输入手机号"></el-input>
            </div>
          </div>
          <div class="user-menu-row">
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label menu-label-short">状态</span>
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
            </div>
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label menu-label-half">意见分类</span>
              <el-select
                class="menu-ipt ipt-fix ipt-selector"
                size="mini"
                v-model="feedbackType"
                placeholder="请选择意见分类">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in feedbackTypeList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="user-menu-row">
            <div class="menu-account menu-ipt-wraper">
              <span class="menu-label">处理人账号</span>
              <el-input class="menu-ipt ipt-fix" size="mini" v-model="operation" placeholder="请输入处理人账号"></el-input>
            </div>
            <div class="menu-account menu-ipt-wraper">
            </div>
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
    <!-- <div class="menu-btns">
        <el-button icon="el-icon-search" class="button-fix" type="primary" size="mini" @click="onSearchFeedback">查询</el-button>
        <el-button class="btn-clear button-fix" size="mini" @click="onClearSearchParams">清空</el-button>
      </div> -->
    <div class="table-container">
    <!-- {{feedbackList}} -->
    <el-table
      ref="userTable"
      class="table-fix table-disable-select-all"
      size="mini"
      :data="addIndexFeedbackList"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="index" label="序号" sortable></el-table-column>
      <el-table-column align="center" prop="account" label="用户手机号" min-width="140" sortable></el-table-column>
      <el-table-column align="center" prop="name" label="用户姓名" min-width="100" sortable></el-table-column>
      <el-table-column align="center" prop="feedback_type" label="意见分类" min-width="100" sortable></el-table-column>
      <el-table-column align="center" width="260" prop="content" label="意见内容" sortable></el-table-column>
      <el-table-column align="center" prop="process" label="处理状态" min-width="100" sortable>
        <template slot-scope="scope">
          {{getProcessTips(scope.row.process)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="operation" label="处理人账号" min-width="120" sortable>
      </el-table-column>
      <el-table-column align="center" width="160" prop="process_time" label="处理时间" sortable>
        <template slot-scope="scope">
          {{$util.getFilterDefaultTime(scope.row.process_time)}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="操作" sortable>
        <template slot-scope="scope">
          <el-button class="button-fix" type="primary" size="mini" @click="onEditDetail(scope.row)">问题处理</el-button>
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
      feedbackType: '',
      feedbackTypeList: [
        {
          value:  '',
          label: '全部'
        },
        {
          value: 'APP问题',
          label: 'APP问题'
        },
        {
          value: '设备问题',
          label: '设备问题'
        },
        {
          value: '售后问题',
          label: '售后问题'
        },
        {
          value: '其它问题',
          label: '其它问题'
        }
      ],
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
    ...mapGetters(['feedbackList', 'feedbackListTotal']),
    addIndexFeedbackList() {
      return this.getPageIndexList(this.feedbackList, this.pageSize, this.pageIndex)
    }
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
      this.process = -1
      this.operation = ''
    },
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    onRefetchList() {
      if (this.feedbackList && this.feedbackList.length === 0 && this.pageIndex > 1) {
        let hasExtra = this.feedbackListTotal % this.pageSize !== 0
        let maxIndex = Math.floor(this.feedbackListTotal / this.pageSize) // 最大的index
        this.pageIndex = hasExtra ? maxIndex + 1 : maxIndex
        this.handleSearchFeedback()
      }
    },
    onSearchFeedback() {
      this.handleSearchFeedback()
    },
    initSearchFeedback() {
      this.handleSearchFeedback()
    },
    async handleSearchFeedback() {
      await this.getFeedback({
        page_size: this.pageSize,
        page_index: this.pageIndex,
        type: this.feedbackType,
        name: this.name,
        account: this.account,
        process: this.process,
        operation: this.operation
      });
      this.onRefetchList()
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
      this.handleSearchFeedback()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.handleSearchFeedback()
    }
  },
  components: {
    PageTitle
  },
  mounted() {
    this.initSearchFeedback()
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
  box-sizing: border-box;
  width: 100%;
  height: d2r(140px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: d2r(25px);
  padding-top: d2r(20px);
  background: #f5f5f6ff;
  margin-top: d2r(16px);
  .user-menu-list {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .user-menu-item {
      width: auto;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .user-menu-row {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      .menu-ipt-wraper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-right: d2r(16px);
        .menu-label {
          display: block;
          min-width: d2r(100px);
          width: auto;
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

}

.menu-btns {
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

.menu-label {
  font-size: d2r(14px);
}

.menu-label-short {
  width: d2r(60px);
}

.menu-account {
  &:nth-last-child(1) {
    margin-top: d2r(16px);
  }
}
</style>
