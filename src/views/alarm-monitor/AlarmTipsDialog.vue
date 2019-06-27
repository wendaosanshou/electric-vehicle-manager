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
      <div class="dialog-content">
        <div class="form-item" v-for="(item, index) in dialogList" :key="index">
          <i class="item-icon" :class="[`item-icon-${item.icon}`]"></i>
          <span class="item-content">{{item.content}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogList: [
        {
          icon: "weiyi",
          content: "位移告警（0）"
        },
        {
          icon: "zhendong",
          content: "震动告警（0）"
        },
        {
          icon: "gaowen",
          content: "高温告警（0）"
        },
        {
          icon: "chaosu",
          content: "超速告警（0）"
        },
        {
          icon: "diya",
          content: "电瓶低电压告警（0）"
        },
        {
          icon: "gaoya",
          content: "充电高电压告警（0）"
        },
        {
          icon: "neizhidiya",
          content: "内置电池低电压告警（0）"
        },
        {
          icon: "duandian",
          content: "外置电源断电告警（0）"
        }
      ]
    };
  },
  computed: {
      getDialogListImage() {
          return this.dialogList.map(item => {
              item.icon = require(`@/assets/icons/${item.icon}_icon@2x.png`)
              return item
          })
      }
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
    onDialogHide() {
      this.$emit("change", false);
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
    overflow: scroll;
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
      .item-icon {
        width: d2r(22px);
        height: d2r(27px);
        broder: 0;
        background: url('~@/assets/icons/weiyi_icon@2x.png');
        background-size: 100% 100%; 
        &.item-icon-weiyi {
            background: url('~@/assets/icons/weiyi_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-zhendong {
            background: url('~@/assets/icons/zhendong_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-gaowen {
            background: url('~@/assets/icons/gaowen_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-chaosu {
            background: url('~@/assets/icons/chaosu_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-diya {
            background: url('~@/assets/icons/diya_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-gaoya {
            background: url('~@/assets/icons/gaoya_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-neizhidiya {
            background: url('~@/assets/icons/neizhidiya_icon@2x.png');
            background-size: 100% 100%; 
        }
        &.item-icon-duandian {
            background: url('~@/assets/icons/duandian_icon@2x.png');
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
