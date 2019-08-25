<template>
  <div class="location-dialog">
    <el-dialog
        class="dialog-table-right dialog-fix dialog-allow-click dialog-no-header"
        title="详细信息"
        :visible.sync="dialogVisible"
        @close="onDialogHide"
        :modal="false"
        :close-on-click-modal="false"
      >
        <div class="dialog-content">
          <!-- {{filterAlarmAnalyse[0]}} -->
        <el-table ref="userTable" class="table-analysis table-fix table-fix-yellow table-disable-select-all" size="mini" :data="filterAlarmAnalyse" border style="width: 100%" max-height="340">
            <el-table-column prop="vehicleAccount" label="车主姓名"></el-table-column>
            <el-table-column prop="imei" width="130" label="IMEI"></el-table-column>
            <el-table-column prop="signal_time" width="120" label="告警时间">
              <template slot-scope="scope">
                {{getUtcOffsetTime(scope.row.signal_time)}}
              </template>
            </el-table-column>
            <el-table-column prop="note" width="120" label="告警类型">
              <template slot-scope="scope">
                {{getAlarmNote(scope.row.note)}}
              </template>
            </el-table-column>
            <el-table-column prop="formattedAddress" min-width="430" label="告警地点"></el-table-column>
        </el-table>

        <el-pagination
        class="pagination-fix"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="prev, pager, next"
          :current-page.sync="localPageIndex"
          :total="alarmAnalyseTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
          <el-button size="mini" @click="onDialogHide">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      localPageIndex: 0
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  computed: {
      ...mapGetters(['allUser', 'alarmAnalyseTotal', 'deviceInfo']),
      user_info() {
        const { user_info } = this.deviceInfo
        return user_info || ''
      },
      filterAlarmAnalyse() {
        const { user_info, vehicle_info } = this.deviceInfo
        if (user_info && vehicle_info && this.alarmAnalyse && this.alarmAnalyse.length > 0) {
           return this.alarmAnalyse.map(item => {
            item.vehicleAccount = user_info.name || '暂无数据'
            item.invoice = vehicle_info.invoice | '暂无数据'
            item.theft = vehicle_info.theft || '暂无数据'
            return item
          })
        } else {
          return []
        }
      }
  },
  props: {
    alarmAnalyse: {
      type: Array,
      default: () => {
        return []
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    pageIndex: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
      this.localPageIndex = this.pageIndex
    },
    pageIndex() {
      this.localPageIndex = this.pageIndex
    }
  },
  methods: {
    getAlarmNote(note) {
      if (note) {
        return note.replace(/[^\u4e00-\u9fa5|,]/gi, '')
      }
      return note
    },
    handleSizeChange(pageSize) {
      this.$emit('size-change', pageSize)
    },
    handleCurrentChange(pageIndex){
      this.$emit('current-change', pageIndex)
    },
    onDialogHide() {
      this.$emit('change', false)
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-small-right {
  .dialog-content {
    max-height: d2r(611px);
    background: #ffffff;
    overflow: auto;
    .form-title {
      box-sizing: border-box;
      width: 100%;
      height: d2r(33px);
      font-size: d2r(13px);
      line-height: d2r(33px);
      color: #4a4a4a;
      text-align: left;
      padding-left: d2r(23px);
      background: #ffffff;
    }
    .form-item-wrap {
      .form-item {
        box-sizing: border-box;
        width: 100%;
        height: d2r(34px);
        line-height: d2r(34px);
        font-size: d2r(13px);
        color: #9b9b9b;
        text-align: left;
        padding-left: d2r(23px);
        margin-top: 2px;
        background:rgba(221,221,221,0.24);
        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }
  }
}

.dialog-content {
  box-sizing: border-box;
}

.dialog-no-header {
  .el-dialog .el-dialog__header {
    display: none !important;
  }
}

</style>
