<template>
  <div class="record-setting-container" :class="rootClass">
    <div class="setting-time setting-part-container">
      <page-title class="setting-title" :hasDot="false">预约时间</page-title>
      <div class="setting-content" v-if="isRecordSetting">
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
                v-model="form.pre_time"
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
                v-model="form.pre_time"
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
          <el-col :span="4" class="item-btn-wrap">
            <div class="item-selector-wraper">
              <renew-btn></renew-btn>
            </div>
            <div class="item-selector-wraper">
              <renew-btn-log></renew-btn-log>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="setting-content" v-else>
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
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">业务办理点</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.business_name"
                placeholder="请输入业务办理点"
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
          <el-col :span="5" class="item-btn-wrap">
            <div class="item-selector-wraper">
              <div class="item-label">合约期</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.contract_content"
                placeholder="请输入合约期"
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
                placeholder="请输入平台"
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">电池号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.battery"
                placeholder="请输入电池号"
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
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">电机号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.power"
                placeholder="请输入电机号"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">车架号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.frame"
                placeholder="请输入车架号"
              ></el-input>
            </div>
            <div class="item-selector-wraper">
              <div class="item-label">防盗备案号</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.theft"
                placeholder="请输入防盗备案号"
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
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.imei"
                placeholder="请输入IMEI"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item-selector-wraper">
              <div class="item-label">ICCID</div>
              <el-input
                class="item-selector ipt-fix"
                size="mini"
                v-model="form.iccid"
                placeholder="请输入ICCID"
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="setting-picture-info setting-part-container">
      <page-title class="setting-title" :hasDot="false">照片信息</page-title>
      <div class="setting-content setting-image-wraper">
        <img class="setting-image" :src="item" v-for="(item, index) in imagelist" :key="index">
        <el-upload
          class="page-upload"
          list-type="picture-card"
          :show-file-list="false"
          :action="imageUploadUrl"
          :on-success="onImageUploadSuccess"
          v-if="isRecordSetting"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
    <div class="setting-processing-process setting-part-container">
      <page-title class="setting-title" :hasDot="false">业务办理流程</page-title>
      <div class="setting-content">
        <div class="box-card">
          <i
            class="el-icon-s-order icon-large-gray"
            :class="{'icon-large-light' : workItem.process >= 1}"
          ></i>
          <div class="card-title">预约登记</div>
          <div class="card-title-desc">预约时间：{{getTimeLabel(workItem.pre_time)}}</div>
        </div>
        <i class="el-icon-right icon-large-gray"></i>
        <div class="box-card">
          <i class="el-icon-s-claim icon-large-gray" :class="{'icon-large-light' : workItem.process >= 2}"></i>
          <div class="card-title">预约审核</div>
          <div class="card-title-desc">审核时间：{{getTimeLabel(workItem.audit_time)}}</div>
        </div>
        <i class="el-icon-right"></i>
        <div class="box-card">
          <i
            class="el-icon-s-promotion icon-large-gray"
            :class="{'icon-large-light' : workItem.process >= 3}"
          ></i>
          <div class="card-title">安装派单</div>
          <div class="card-title-desc">派单时间：{{getTimeLabel(workItem.distribute_time)}}</div>
        </div>
        <i class="el-icon-right"></i>
        <div class="box-card">
          <i
            class="el-icon-setting icon-large-gray"
            :class="{'icon-large-light' : workItem.process >= 4}"
          ></i>
          <div class="card-title">现场安装</div>
          <div class="card-title-desc">安装时间：{{getTimeLabel(workItem.install_time)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import RenewBtn from "./RenewBtn.vue";
import RenewBtnLog from "./RenewBtnLog.vue";
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
      defaultImages: [],
      value: ""
    };
  },
  computed: {
    ...mapGetters(["workItem", "vehicleInfo"]),
    imagelist() {
      const { imgs } = this.form;
      let images = []
      if (imgs && imgs.split(SPLIT_IMAGE_SYMBOL).length > 0) {
        images = imgs.split(SPLIT_IMAGE_SYMBOL);
      } else {
        images = [imgs]
      }
      return [...this.defaultImages, ...images];
    },
    getAllImages() {
      const { imgs } = this.form;
      if (imgs && imgs.split(SPLIT_IMAGE_SYMBOL).length > 0) {
        imgs.split(SPLIT_IMAGE_SYMBOL);
      }
    },
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
    getTimeLabel(time) {
      return time ? time : "暂无";
    },
    handleModifyWorkItem() {
      let params = {
        user: this.form.user,
        address: this.form.address,
        vehicle: this.form.vehicle,
        brand: this.form.brand,
        model: this.form.model,
        frame: this.form.frame,
        battery: this.form.battery,
        power: this.form.power,
        theft: this.form.theft,
        device: this.form.device,
        imei: this.form.imei,
        iccid: this.form.iccid,
        work: this.form.work,
        imgs: this.form.imgs
      };
      //   this.modifyWorkItem(params)
      console.log("modifyWorkItem", params);
    },
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
    getWorkItemValue() {},
    getVehicleValue(key) {
      return this.vehicleInfo ? this.vehicleInfo[key] : "";
    },
    async initProcessDetail() {
      // // 获取车辆信息后更新
      await this.getVehicleInfo({
        id: this.workItem.vehicle
      });
      const { img_own, img_frame, img_device, img_vehicle } = this.workItem
      this.defaultImages = [img_own, img_frame, img_device, img_vehicle]
      this.form = {
        pre_time: this.workItem.pre_time,
        business_name: this.workItem.business_name,
        install_name: this.workItem.install_name,
        contract_content: this.getContractContent(
          this.workItem.contract_content
        ),
        own_name: this.workItem.own_name,
        own_sex: this.getSexContent(this.workItem.own_sex),
        certificates: this.getIdcardContent(this.workItem.certificates),
        own_phone: this.workItem.own_phone,
        certificates_code: this.workItem.certificates_code,
        user: this.workItem.user,
        address: this.workItem.own_address,
        vehicle: this.workItem.vehicle,
        brand: this.getVehicleValue("brand"),
        model: this.getVehicleValue("model"),
        frame: this.getVehicleValue("frame"),
        battery: this.getVehicleValue("battery"),
        power: this.getVehicleValue("power"),
        theft: this.getVehicleValue("theft"),
        device: this.workItem.device,
        imei: this.workItem.imei,
        iccid: this.workItem.iccid,
        work: this.workItem.id,
        imgs: this.workItem.imgs
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
        return "一年合约期";
      } else if (contract_content === 2) {
        return "两年合约期";
      }
    }
  },
  components: {
    PageTitle,
    RenewBtn,
    RenewBtnLog
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
