<template>
  <div class="electric-fence">
    <div class="fence-title">
      <div class="search-item">
        <el-select
          class="ipt-fix ipt-selector"
          size="mini"
          v-model="fenceModelValue"
          @change="fenceModelChange"
          placeholder="请选择围栏模式"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in fenceModels"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="pickerTime"
          size="mini"
          class="ipt-fix time-picker"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
        <div class="button-container">
          <el-button
            class="button-search button-fix"
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="handleSearchFenceAlarms"
          >查询</el-button>
          <electric-fence-delete
            :fenceList="fenceObjList"
            class="button-delete"
            ref="fenceDelete"
            @on-delete="handleDeletFench"
          ></electric-fence-delete>
        </div>
      </div>
      <div class="search-item">
        <el-select
          class="ipt-fix ipt-selector ipt-selector-long"
          size="mini"
          @change="handleFenceChange"
          v-model="fenceValue"
          placeholder="请选择电子围栏"
          multiple
          :disabled="isModifyModel"
        >
          <el-option :label="item.name" :value="item.id" v-for="item in allFence" :key="item.id"></el-option>
        </el-select>
        <el-button class="button-export button-fix" size="mini" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="monitor-container js-map-container map-cursor-default" :style="{height: pageHeight}">
      <div class="map-content" id="electric-map-container"></div>
      <div class="electric-desc-content">
        <div class="electric-item">
          <div class="electric-item-title">闯禁区违法情况</div>
          <div class="electric-item-content">
            <div class="electric-alarm-list" v-if="hasFenceAlarmArea">
              <div class="electric-alarm-item" v-for="(item, index) in fenceAlarmArea" :key="index">
                <div class="alarm-item-title">
                  <i class="item-icon"></i>
                  <span class="item-text">违章{{index + 1}}</span>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">时 间：</div>
                  <div class="item-desc-content">{{item.start_time}}</div>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">违法人：</div>
                  <div class="item-desc-content">{{item.certificates_code}}</div>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">车牌号：</div>
                  <div class="item-desc-content">{{item.plate}}</div>
                </div>
              </div>
            </div>
            <div class="empty-data" v-else>暂无数据</div>
          </div>
        </div>
        <div class="electric-item">
          <div class="electric-item-title">违章停放情况</div>
          <div class="electric-item-content">
            <div class="electric-alarm-list" v-if="hasFenceAlarmPark">
              <div class="electric-alarm-item" v-for="(item, index) in fenceAlarmPark" :key="index">
                <div class="alarm-item-title">
                  <i class="item-icon"></i>
                  <span class="item-text">违章{{index + 1}}</span>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">时 间：</div>
                  <div class="item-desc-content">{{item.start_time}}</div>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">违法人：</div>
                  <div class="item-desc-content">{{item.certificates_code}}</div>
                </div>
                <div class="alarm-item-desc">
                  <div class="item-desc-label">车牌号：</div>
                  <div class="item-desc-content">{{item.plate}}</div>
                </div>
              </div>
            </div>
            <div class="empty-data" v-else>暂无数据</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      class="dialog-fix"
      title="保存电子围栏"
      :visible.sync="dialogVisible"
      @close="onDialogHide"
    >
      <div class="dialog-content">
        <el-form
          class="user-add-form device-form-fix"
          label-position="right"
          label-width="220px"
          :model="form"
        >
          <el-form-item label="电子围栏命名">
            <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="请输入电子围栏名称"></el-input>
          </el-form-item>
          <el-form-item label="电子围栏说明">
            <el-input
              type="textarea"
              class="ipt-fix"
              size="mini"
              resize="none"
              :autosize="{ minRows: 10, maxRows: 10}"
              v-model="form.note"
              placeholder="请输入电子围栏说明"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleConfirmAddFence">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 导出数据使用 -->
    <el-table
      class="table-fix"
      id="process-export-table"
      size="mini"
      :data="fenceAlarm"
      border
      style="width: 100%"
      v-show="false"
    >
      <el-table-column prop="start_time" label="时 间" align="center"></el-table-column>
      <el-table-column prop="certificates_code" label="违法人" width="120" align="center"></el-table-column>
      <el-table-column prop="plate" label="车牌号" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import MapMixin from "@/mixins/map-mixin";
import dayjs from "dayjs";
import MenuContent from "./menu-context";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import ElectricFenceDelete from "./ElectricFenceDelete";
import { setTimeout } from "timers";

export default {
  mixins: [MapMixin],
  data() {
    return {
      pickerTime: "",
      fenceValue: [],
      fenceObjList: [],
      fencePolygons: [],
      dialogVisible: false,
      mouseTool: "",
      pathString: "",
      fenceModelValue: 1,
      fenceModels: [
        {
          value: 0,
          label: "编辑模式"
        },
        {
          value: 1,
          label: "查询模式"
        }
      ],
      form: {
        name: "",
        note: ""
      }
    };
  },
  computed: {
    ...mapGetters([
      "pickerOptions",
      "accountList",
      "allLocationInfo",
      "allFence",
      "fenceAlarm",
      "fenceAlarmTotal"
    ]),
    isModifyModel() {
      return this.fenceModelValue === 0;
    },
    fenceAlarmArea() {
      if (this.fenceAlarm && this.fenceAlarm.length > 0) {
        return this.fenceAlarm.filter(item => item.alarm_type === 0);
      }
      return [];
    },
    hasFenceAlarmArea() {
      return this.fenceAlarmArea && this.fenceAlarmArea.length > 0;
    },
    fenceAlarmPark() {
      if (this.fenceAlarm && this.fenceAlarm.length > 0) {
        return this.fenceAlarm.filter(item => item.alarm_type === 1);
      }
      return [];
    },
    hasFenceAlarmPark() {
      return this.fenceAlarmPark && this.fenceAlarmPark.length > 0;
    }
  },
  methods: {
    ...mapMutations(["resetFenceAlarm"]),
    ...mapActions([
      "getWebDevice",
      "addFence",
      "getAllFence",
      "deleteFence",
      "getFenceAlarm"
    ]),
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#process-export-table")
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "电子围栏.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    fenceModelChange(fenceModel) {
      this.resetMap();
      if (fenceModel === 0) {
        this.initFenceEnv();
        this.map.setDefaultCursor("crosshair");
      } else if (fenceModel === 1) {
        this.map.setDefaultCursor("pointer");
        if (this.mouseTool) {
          this.mouseTool.close();
        }
      }
    },
    resetMap() {
      this.map.clearMap();
      this.fenceValue = [];
      this.fenceObjList = [];
      this.fencePolygons = [];
    },
    drawFence(data) {
      let path = data
        .split(";")
        .filter(item => item)
        .map(item => {
          let [first, last] = item.split(",");
          return [last, first];
        });
      var polygon = new AMap.Polygon({
        path: path,
        fillColor: "#F8755487",
        strokeColor: "#F87554FF"
      });

      this.map.add(polygon);
      this.fencePolygons.push(polygon);
    },
    drawAllFence() {
      this.map.clearMap();
      this.fencePolygons = [];
      this.fenceObjList.forEach(item => {
        this.drawFence(item.data);
      });
      this.map.setFitView(this.fencePolygons);
    },
    async handleDeletFench() {
      let promiseAll = [];
      this.fenceValue.forEach(id => {
        let promise = this.deleteFence({
          id: id
        });
        promiseAll.push(promise);
      });
      await Promise.all(promiseAll);
      this.fenceValue = [];
      this.map.clearMap();
      this.getAllFence();
      this.$refs.fenceDelete.onDialogHide();
    },
    handleFenceChange(fenceId) {
      this.fenceObjList = this.allFence.filter(item => {
        return this.fenceValue.indexOf(item.id) > -1;
      });
      this.drawAllFence();
    },
    onDialogHide() {
      this.map.clearMap();
      this.resetFormData()
      this.dialogVisible = false;
    },
    resetFormData() {
      this.form = {
        name: "",
        note: ""
      }
    },
    async handleConfirmAddFence() {
      const [startDate, endDate] = this.pickerTime;
      if (this.form.name && this.form.name.length > 10) {
        return this.$message({
          type: "error",
          message: `名称较长无法保存`
        });
      }
      if (!this.form.name || !this.form.note) {
        return this.$message({
          type: "error",
          message: `输入信息不完整`
        });
      }
      if (startDate && endDate) {
        const params = {
          start_time: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end_time: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"),
          data: this.pathString,
          name: this.form.name,
          note: this.form.note
        };
        await this.addFence(params);
        this.form.name = "";
        this.form.note = "";
        this.getAllFence();
      } else {
        this.$message({
          type: "error",
          message: `请选择开始日期和结束日期`
        });
      }
      this.onDialogHide();
    },
    async handleSearchFenceAlarms() {
      const [startDate, endDate] = this.pickerTime;
      if (startDate && endDate) {
        const params = {
          start_time: dayjs(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end_time: dayjs(endDate).format("YYYY-MM-DD HH:mm:ss"),
          arr_id: this.fenceValue,
          page_size: 10,
          page_index: 1
        };
        await this.getFenceAlarm(params);
        this.form.name = "";
        this.form.note = "";
      } else {
        this.$message({
          type: "error",
          message: `请选择开始日期和结束日期`
        });
      }
    },
    initFenceEnv() {
      this.mouseTool = new AMap.MouseTool(this.map);
      this.mouseTool.polygon({
        fillColor: "#F8755487",
        strokeColor: "#F87554FF"
      });
      this.mouseTool.on("draw", e => {
        let paths = e.obj.getPath();
        this.pathString = "";
        paths.forEach((item, index) => {
          const { lat, lng } = item;
          this.pathString += `${lat},${lng};`;
        });
        this.dialogVisible = true;
      });
    },
    drawAMap() {
      const [{ lng, lat }] = this.allLocationInfo;
      const positionCenter = [lng, lat];
      this.initAMap("electric-map-container", positionCenter);
    },
    async init() {
      this.resetFenceAlarm();
      await this.getWebDevice();
      this.getAllFence();
      this.drawAMap();
    }
  },
  components: {
    ElectricFenceDelete
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.electric-fence {
  padding: d2r(20px) d2r(43px) 0 d2r(42px);
  .fence-title {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: 0 d2r(17px) d2r(10px) d2r(20px);
    background: #f5f5f6;
    .search-item {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-top: d2r(10px);
      .time-picker {
        margin-left: d2r(18px);
        width: d2r(610px);
      }
      .button-container {
        margin-left: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        .button-delete {
          margin-left: d2r(10px);
        }
      }
      .button-export {
        margin-left: auto;
      }
      .ipt-selector-long {
        width: d2r(870px);
      }
    }
  }
  .monitor-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: d2r(820px);
    margin-top: d2r(19px);
    cursor: default;
    .map-tips {
      position: absolute;
      top: d2r(22px);
      left: d2r(20px);
      width: d2r(350px);
      height: d2r(50px);
      line-height: d2r(50px);
      font-size: d2r(17px);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #6fa8e0;
      background: #ffffff;
      box-shadow: 0px 5px 20px 0px rgba(159, 158, 193, 1);
      z-index: 100;
      cursor: pointer;
    }
    .map-content {
      box-sizing: border-box;
      flex-grow: 1;
      height: 100%;
    }
    .electric-desc-content {
      box-sizing: border-box;
      width: d2r(320px);
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      .electric-item {
        width: d2r(300px);
        height: 50%;
        margin-top: d2r(10px);
        border: 1px solid rgba(229, 233, 238, 1);
        &:nth-child(1) {
          margin-top: 0;
        }
        .electric-item-title {
          box-sizing: border-box;
          padding-left: d2r(10px);
          width: 100%;
          height: d2r(40px);
          font-size: d2r(14px);
          text-align: left;
          line-height: d2r(40px);
          background: #9e9db6ff;
          color: #3b4859ff;
        }
        .electric-item-content {
          width: 100%;
          height: auto;
          max-height: d2r(340px);
          font-size: d2r(13px);
          color: #3b4859ff;
          overflow: scroll;
        }
        .empty-data {
          height: d2r(340px);
          line-height: d2r(340px);
        }
        .electric-alarm-item {
          padding-top: d2r(19px);
          .alarm-item-title {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding-left: d2r(10px);
            margin-bottom: d2r(10px);
            .item-icon {
              display: block;
              width: 14px;
              height: 14px;
              background: url("~@/assets/icons/icon_weizhangchaxun_png@2x.png");
              background-size: 100% 100%;
            }
            .item-text {
              font-size: d2r(13px);
              color: #3b4859ff;
              text-align: left;
              margin-left: d2r(6px);
            }
          }
          .alarm-item-desc {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            padding-left: d2r(10px);
            font-size: d2r(13px);
            height: d2r(24px);
            line-height: d2r(24px);
            color: #3b4859ff;
            .item-desc-label {
              width: d2r(82px);
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
