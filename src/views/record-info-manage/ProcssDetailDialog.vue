<template>
  <div class="dialog">
    <el-dialog custom-class="process-dialog" class="process-detail-dialog dialog-fix" title="办理状态详细信息查看" :visible="dialogVisible" width="960px" @close="onDialogHide">
      <div class="record-setting-container setting-dialog">
        <div class="setting-time setting-part-container">
          <page-title class="setting-title">预约时间</page-title>
          <div class="setting-content">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6" class="item-btn-wrap">
                <renew-btn></renew-btn>
                <renew-btn-log></renew-btn-log>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="setting-owner-info setting-part-container">
          <page-title class="setting-title">车主信息</page-title>
          <div class="setting-content">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="setting-vehicle-info setting-part-container">
          <page-title class="setting-title">车辆信息</page-title>
          <div class="setting-content">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="setting-equipment-info setting-part-container">
          <page-title class="setting-title">设备信息</page-title>
          <div class="setting-content">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="item-selector-wraper">
                  <div class="item-label">预约时间</div>
                  <el-input class="item-selector" size="mini" v-model="input" placeholder="请输入手机号"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="setting-picture-info setting-part-container">
          <page-title class="setting-title">照片信息</page-title>
          <div class="setting-content">
            <el-upload
              size="mini"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <div class="setting-processing-process setting-part-container">
          <page-title class="setting-title">业务办理流程</page-title>
          <div class="setting-content">
            <div class="box-card">
              <div class="card-title">预约登记</div>
              <div class="card-title-desc">预约时间：2019-05-12 00:0</div>
            </div>
            <i class="el-icon-right"></i>
            <div class="box-card">
              <div class="card-title">预约审核</div>
              <div class="card-title-desc">预约时间：2019-05-13 00:0</div>
            </div>
            <i class="el-icon-right"></i>
            <div class="box-card">
              <div class="card-title">安装派单</div>
              <div class="card-title-desc">预约时间：暂无</div>
            </div>
            <i class="el-icon-right"></i>
            <div class="box-card">
              <div class="card-title">现场安装</div>
              <div class="card-title-desc">预约时间：暂无</div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="onDialogHide">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'

export default {
  data() {
    return {
      form: {
        data1: "",
        data2: ""
      }
    };
  },
  model: {
    prop: "dialogVisible",
    event: "change"
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    onDialogShow() {
      this.dialogVisible = true;
    },
    onDialogHide() {
      this.$emit("change", this.dialogVisible);
      // this.dialogVisible = false;
    }
  },
  components: {
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
// @import "~@/assets/style/function.scss";

$basic-ratio: 1.4;

@function d2r($designpx) {
    @return $designpx / $basic-ratio;
}

.process-dialog {
  padding: 0;
  .el-dialog .el-dialog__body {
    padding: 0!important;
  }
}

.el-dialog__body {
  padding: 0!important;
}

.record-setting-container {
  padding: 0 d2r(161px) d2r(40px) 0;
  .setting-part-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: d2r(20px);
    .setting-label {
      width: d2r(162px);
      text-align: right;
      font-size: d2r(17px);
    }
    .setting-content {
      box-sizing: border-box;
      width: d2r(1232px);
      min-height: d2r(70px);
      margin-left: d2r(25px);
      padding: d2r(18px) 0 d2r(22px) 0;
      background: #f5f5f6;
      .item-selector-wraper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: d2r(20px);
        &:nth-child(1) {
          margin-top: 0;
        }
        .item-label {
          width: d2r(110px);
          height: d2r(22px);
          text-align: right;
        }
        .item-selector {
          margin-left: d2r(6px);
          width: d2r(180px);
        }
        .item-selector-datapicker {
          margin-left: d2r(6px);
          width: d2r(450px) !important;
        }
      }
      .item-btn-wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .el-btn {
        width: d2r(160px);
        height: d2r(35px);
        font-size: d2r(16px);
        text-align: center;
        line-height: d2r(35px);
        color: #ffffff;
        background: #7aa9ec;
      }
      .btn-renew-log {
        margin-top: 10px;
      }
    }
  }
  .setting-time {
    .setting-content {
      padding-right: d2r(21px);
    }
  }
  .setting-picture-info {
    .setting-content {
      display: flex;
      flex-direction: row;
      padding: 0;
      background: #ffffff;
    }
  }
  .setting-processing-process {
    .setting-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background: #ffffff;
      padding: 0;
    }
    .box-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      width: d2r(247px);
      height: d2r(120px);
      background: #f5f5f6;
      padding: d2r(13px) d2r(14px) d2r(10px) d2r(17px);
      .card-title {
        font-size: d2r(17px);
        font-family: PingFangSC-Medium;
        font-weight: 500;
      }
      .card-title-desc {
        font-size: d2r(14px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        white-space: nowrap;
      }
    }
    .el-icon-right {
      margin: 0 d2r(22px);
    }
  }
  .btn-save {
    margin-top: d2r(40px);
    margin-left: d2r(187px);
    width: d2r(160px);
    height: d2r(35px);
    line-height: d2r(35px);
    font-size: d2r(16px);
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #ffffff;
    background: #ff7525;
  }
}

.record-setting-container.setting-dialog {
  padding: 0;
  overflow: scroll;
  .setting-part-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 0;
    margin-top: d2r(11px);
    &:nth-child(0) {
      margin-top: 0;
    }
    .setting-title {
    }
    .setting-content {
      margin-left: 0;
      margin-top: d2r(9px);
    }
  }
}
</style>
