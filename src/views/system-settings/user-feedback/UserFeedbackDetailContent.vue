<template>
  <div class="record-setting-container" :class="rootClass">
    <div class="setting-time setting-part-container">
      <page-title class="setting-title" :hasDot="false">预约信息</page-title>
      <div class="setting-content">
        <!-- {{feedbackDetail}} -->
        <el-row :gutter="20">
          <el-col :span="7">
            <div class="item-selector-wraper">
              <div class="item-label">预约时间</div>
              <el-input
                class="item-selector item-selector-timer ipt-fix"
                size="mini"
                v-model="form.pre_time"
                placeholder="请输入预约时间"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">当前合约期</div>
              <el-input
                class="item-selector item-selector-timer ipt-fix"
                size="mini"
                v-model="form.contract_active"
                placeholder="请输入预约时间"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-selector-wraper">
              <div class="item-label">业务办理点</div>
              <el-input
                class="item-selector item-selector-timer ipt-fix"
                size="mini"
                v-model="form.business_name"
                placeholder="请输入业务办理点"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">合约到期时间</div>
              <el-input
                class="item-selector item-selector-timer ipt-fix"
                size="mini"
                v-model="form.contract_expire"
                placeholder="请输入预约时间"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">设备安装点</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.install_name"
                placeholder="请输入设备安装点"
                disabled
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="setting-owner-info setting-part-container">
      <page-title class="setting-title" :hasDot="false">车主信息</page-title>
      <div class="setting-content">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">车主姓名</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.own_name"
                placeholder="请输入车主姓名"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">家庭住址</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.address"
                placeholder="请输入家庭住址"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">性别</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.own_sex"
                placeholder="请输入性别"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">证件类型</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.certificates"
                placeholder="请输入证件类型"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">手机号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.own_phone"
                placeholder="请输入手机号"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">证件号码</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.certificates_code"
                placeholder="请输入证件号码"
                disabled
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="setting-vehicle-info setting-part-container">
      <page-title class="setting-title" :hasDot="false">车辆信息</page-title>
      <div class="setting-content">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">品牌</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.brand"
                placeholder="请输入品牌"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">电池号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.battery"
                placeholder="请输入电池号"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">规格</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.model"
                placeholder="请输入规格"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">电机号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.power"
                placeholder="请输入电机号"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="item-selector-wraper item-selector-wraper-long">
              <div class="item-label">车架号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.frame"
                placeholder="请输入车架号"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper item-selector-wraper-long">
              <div class="item-label">防火防盗备案号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.theft"
                placeholder="请输入防火防盗备案号"
                disabled
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="setting-equipment-info setting-part-container">
      <page-title class="setting-title" :hasDot="false">设备信息</page-title>
      <div class="setting-content">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">IMEI</div>
              <el-input
                class="item-selector item-selector-long ipt-fix"
                size="mini"
                v-model="form.imei"
                placeholder="请输入IMEI"
                disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">ICCID</div>
              <el-input
                class="item-selector item-selector-long ipt-fix"
                size="mini"
                v-model="form.iccid"
                placeholder="请输入ICCID"
                disabled
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="setting-equipment-info setting-part-container">
      <page-title class="setting-title" :hasDot="false">留言信息</page-title>
      <div class="setting-content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="item-selector-wraper item-content-long">
              <div class="item-label">问题种类</div>
              <el-input
                class="item-selector ipt-fix item-selector-long"
                size="mini"
                v-model="form.feedback_type"
                placeholder="请输入问题种类"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper item-content-long">
              <div class="item-label">问题描述</div>
              <el-input
                class="item-selector ipt-fix item-selector-long"
                size="mini"
                v-model="form.imei"
                placeholder="请输入问题描述"
                disabled
              ></el-input>
            </div>
            <div class="item-selector-wraper item-content-long">
              <div class="item-label">照片信息</div>
              <div class="item-image-wraper">
                <img class="setting-image" :src="item" v-for="(item, index) in feedbackImgs" :key="index">
              </div>
            </div>
            <div class="item-selector-wraper item-content-long">
              <div class="item-label">问题处理过程</div>
              <el-input
                class="item-selector ipt-fix item-selector-long"
                type="textarea"
                size="mini"
                resize="none"
                :autosize="{ minRows: 5, maxRows: 5}"
                v-model="form.feedback_process"
                placeholder="问题描述"
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import { mapGetters, mapActions } from "vuex";
const SPLIT_IMAGE_SYMBOL = "$_$";

export default {
  data() {
    return {
      imageUploadUrl: "http://47.92.237.140/api/v1/img/web",
      form: {
        address: "",
        vehicle: "",
        brand: "",
        model: "",
        frame: "",
        battery: "",
        power: "",
        theft: "",
        device: "",
        imei: "",
        iccid: "",
        work: "",
        imgs: ""
      },
      feedbackImgs: [],
      value: ""
    };
  },
  computed: {
    ...mapGetters(["feedbackDetail", "workItem", "vehicleInfo"]),
    isRecordSetting() {
      return this.$route && this.$route.name === "RecordSetting";
    },
    isDialogSetting() {
      return !this.isRecordSetting;
    },
    rootClass() {
      return {
        "is-record-setting": this.isRecordSetting,
        "is-dialog-setting": !this.isRecordSetting
      };
    }
  },
  methods: {
    ...mapActions(["modifyWorkItem", "getVehicleInfo"]),
    onImageUploadSuccess(res) {
      const { code, data } = res;
      if (code === "10000") {
        this.$message({
          type: "success",
          message: "上传成功!"
        });
        // this.form.imgs = this.form.imgs ? `${this.form.imgs}${SPLIT_IMAGE_SYMBOL}${data}` : data
        this.form.imgs = data;
        console.log(this.form);
      } else {
        this.$message({
          type: "error",
          message: "上传失败!"
        });
      }
      console.log("onImageUploadSuccess", res);
    },
    async initVehicleInfo() {
      await this.getVehicleInfo({
        id: this.workItem.vehicle
      });
      this.initProcessDetail();
    },
    async initProcessDetail() {
      const {
        contract,
        device,
        feedback,
        user,
        vehicle
      } = this.feedbackDetail
      this.feedbackImgs = feedback.imgs ? feedback.imgs.split(',') : [feedback.imgs]
      this.form = {
        pre_time: contract.pre_time,
        contract_active: contract.contract_start,
        contract_expire: contract.contract_expire,
        business_name: contract.business_name,
        install_name: contract.install_name,
        contract_content: this.getContractContent(
          contract.contract_content
        ),
        own_name: user.name,
        own_sex: this.getSexContent(user.sex),
        certificates: this.getIdcardContent(user.certificates),
        own_phone: user.phone,
        certificates_code: user.certificates_code,
        address: user.address,
        brand: vehicle.brand,
        model: vehicle.model,
        frame: vehicle.frame,
        battery: vehicle.battery,
        power: vehicle.power,
        theft: vehicle.theft,
        imei: device.imei,
        iccid: device.iccid,
        feedback_type: feedback.feedback_type,
        feedback_content: feedback.content,
        feedback_imgs: feedback.imgs,
        feedback_process: feedback.process_feedback,
        feedback_id: feedback.id
      };
    },
    getIdcardContent(card) {
      if (card === 0) {
        return "身份证";
      } else if (card === 1) {
        return "居住证";
      } else if (card === 2) {
        return "暂居证";
      }
    },
    getSexContent(sex) {
      return sex === 0 ? "男" : "女";
    },
    getContractContent(contract_content) {
      if (contract_content === 0) {
        return "全部";
      } else if (contract_content === 1) {
        return "一年";
      } else if (contract_content === 2) {
        return "两年";
      }
    }
  },
  components: {
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}


.record-setting-container {
  padding: 0 d2r(161px) d2r(40px) 0;
  &.is-record-setting {
    padding: 0 d2r(161px) d2r(40px) d2r(60px);
  }
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
    .setting-title {
      width: d2r(120px);
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
        &.item-selector-wraper-long {
          .item-label {
            width: d2r(140px);
          }
        }
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
        .item-selector-timer {
          margin-left: d2r(6px);
          width: d2r(220px) !important;
        }
        .item-selector-datapicker {
          margin-left: d2r(6px);
          width: d2r(450px) !important;
        }
        .item-selector-long {
          width: d2r(750px)
        }
      }
      .item-image-wraper {
        margin-left: d2r(6px);
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
      align-items: flex-start;
      width: d2r(247px);
      height: d2r(120px);
      background: #f5f5f6;
      padding: d2r(13px) d2r(14px) d2r(10px) d2r(17px);
      .icon-large-gray {
        width: d2r(46px);
        height: d2r(46px);
        font-size: d2r(46px);
        color: #9e9db6ff;
        &.icon-large-light {
          width: d2r(46px);
          height: d2r(46px);
          font-size: d2r(46px);
          color: #ff7525ff;
        }
      }
      .card-title {
        font-size: d2r(17px);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        margin-top: d2r(7px);
      }
      .card-title-desc {
        font-size: d2r(14px);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        white-space: nowrap;
        margin-top: d2r(2px);
      }
    }
    .el-icon-right {
      margin: 0 d2r(22px);
    }
  }
  .setting-image {
    max-height: d2r(210px);
    margin-right: d2r(16px);
  }
}

.record-setting-container.is-dialog-setting {
  padding: d2r(25px) d2r(38px) d2r(33px) d2r(30px);
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
    .setting-content {
      margin-left: 0;
      margin-top: d2r(9px);
      .setting-image {
        max-height: d2r(210px);
        margin-right: d2r(16px);
      }
    }
  }
}

.setting-image-wraper {
  box-sizing: border-box;
  max-width: d2r(1232px);
  padding-right: d2r(36px)!important;
  overflow: scroll;
}
</style>
