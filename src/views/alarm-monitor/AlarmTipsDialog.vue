<template>
  <div class="location-dialog">
    <el-dialog
      class="dialog-small-left dialog-fix dialog-allow-click dialog-no-header"
      title="告警类型"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
      :modal="false"
      :close-on-click-modal="false"
    >
      <!-- {{alarmTypeList}} -->
      <div class="dialog-content">
        <div class="form-item" v-for="(item, index) in alarmTypeList" :key="index" @click="onAlarmTipsClick(item)">
          <i class="item-icon" :class="[`item-icon-${item.icon}`]"></i>
          <span class="item-content">{{`${item.content}(${item.count})`}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["alarmLatest", "alarmTypeList"]),
  },
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible;
    }
  },
  methods: {
    ...mapMutations(['updateAlarmTypeList']),
    onDialogHide() {
      this.$emit("change", false);
    },
    onAlarmTipsClick(item) {
      console.log('onAlarmTipsClick', item)
      this.$emit('on-select-alarm', item.value)
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-small-left {
  .el-dialog__header {
    display: none !important;
  }
  .dialog-content {
    box-sizing: border-box;
    width: 100%;
    max-height: d2r(611px);
    background: #ffffff;
    overflow: auto;
    padding: 0 d2r(15px);
    border-radius: d2r(4px);
    border: 2px solid rgba(240, 243, 247, 1);
    .form-item {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: d2r(50px);
      padding-left: d2r(16px);
      border-bottom: 1px solid #f0f3f7;
      cursor: pointer;
      .item-icon {
        width: d2r(22px);
        height: d2r(27px);
        broder: 0;
        background: url("~@/assets/icons/weiyi_icon@2x.png");
        background-size: 100% 100%;
        &.item-icon-weiyi {
          background: url("~@/assets/icons/weiyi_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-zhendong {
          background: url("~@/assets/icons/zhendong_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-gaowen {
          background: url("~@/assets/icons/gaowen_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-chaosu {
          background: url("~@/assets/icons/chaosu_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-diya {
          background: url("~@/assets/icons/diya_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-gaoya {
          background: url("~@/assets/icons/gaoya_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-neizhidiya {
          background: url("~@/assets/icons/neizhidiya_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-duandian {
          background: url("~@/assets/icons/duandian_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-duandian2 {
          background: url("~@/assets/icons/duandian2_icons@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-suaidao {
          background: url("~@/assets/icons/suaidao_icons@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-chaosu {
          background: url("~@/assets/icons/chaosu_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-jinjigaojing {
          background: url("~@/assets/icons/jinjigaojing_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-feifaxingshi {
          background: url("~@/assets/icons/duandian_icon@2x.png");
          background-size: 100% 100%;
        }
        &.item-icon-fangdao {
          background: url("~@/assets/icons/fangdao_icon@2x.png");
          background-size: 100% 100%;
        }
      }
      .item-content {
        font-size: d2r(13px);
        color: #989898;
        margin-left: d2r(19px);
      }
    }
  }
}
</style>
