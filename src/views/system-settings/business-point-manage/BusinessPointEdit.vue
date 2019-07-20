<template>
  <div class="point-content">
    <!-- {{filterOrgAttribute}}<br/>{{businessForm}} -->
    <div class="point-item">
      <div class="point-item-label">当前组织名称</div>
      <el-input
        v-model="businessForm.name"
        class="item-ipt ipt-fix"
        size="mini"
        placeholder="请填写当前组织名称"
      ></el-input>
    </div>
    <div class="point-item point-item-textarea">
      <div class="point-item-label">备注</div>
      <el-input
        v-model="businessForm.note"
        type="textarea"
        class="item-ipt-textarea ipt-fix"
        size="mini"
        resize="none"
        maxlength="50"
        :autosize="{ minRows: 10, maxRows: 10}"
        placeholder="请输入备注信息（50字内）"
      ></el-input>
    </div>
    <div class="point-item">
      <div class="point-item-label">组织类型</div>
      <el-select
        class="item-ipt ipt-fix"
        size="small"
        @change="handleOrgChange"
        v-model="businessForm.organization_id"
        placeholder="请选择组织类型">
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in filterAllOrg" :key="index"></el-option>
      </el-select>
    </div>
    <div class="point-item">
      <div class="point-item-label">渠道属性</div>
      <el-select
        class="item-ipt ipt-fix"
        size="small"
        v-model="businessForm.attribute_id"
        @change="handleAttributeChange"
        :disabled="attributeDisable"
        placeholder="请选择渠道属性">
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in filterOrgAttribute" :key="index"></el-option>
      </el-select>
    </div>
    <div class="btn-confirm-wrap">
      <el-button
        class="point-btn point-btn-edit button-fix"
        :class="{active: isAllowAdd}"
        size="mini"
        type="primary"
        @click="handleEditBusinessPoint"
      >修改</el-button>
      <el-button class="point-btn button-fix" size="mini" @click="onCancleForm">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      attributeDisable: true,
      businessForm: {}
    };
  },
  props: {
    defaultForm: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    defaultForm() {
      this.initBusinessForm();
    }
  },
  computed: {
    ...mapGetters(["allOrg", 'businessType', "channelTypes", "orgAttribute"]),
    useOrg() {
      let useOrg = this.allOrg.filter(item => {
        return [1, 2, 3].indexOf(item.id) > -1
      })
      let businessPoint = this.businessType === 1 ? { "id": 4, "name": "业务办理点", "note": "" } : { "id": 4, "name": "设备安装点", "note": "" }
      return useOrg.concat([businessPoint])
    },
    filterAllOrg() {
      const { organization_id } = this.defaultForm
      if (organization_id && organization_id > 0) {
        return this.useOrg.filter(item => {
          if (organization_id > 3) {
            return item.id > 3
          } else {
            return item.id >= organization_id
          }
        })
      }
      return this.useOrg
    },
    filterOrgAttribute() {
      const { organization_id } = this.defaultForm
      if ([1, 2, 3].indexOf(organization_id) > -1) {
        return [{ "id": 0, "name": "无相关渠道属性", "note": "", "type": 2 }]
      } else {
        return this.orgAttribute
      }
    },
    isAllowAdd() {
      return Object.keys(this.businessForm).every(key => {
        if (
          ["name", "note", "parent_id", "organization_id"].indexOf(key) > -1
        ) {
          // 不限制为0的情况
          return this.businessForm[key] || this.businessForm[key] === 0;
        } else {
          return true;
        }
      });
    }
  },
  methods: {
    ...mapActions(["editBusinessPoint", "getOrgAttribute"]),
    onCancleForm() {
      this.$emit('on-cancle-form')
    },
    handleOrgChange(id) {
      let [currentItem] = this.filterAllOrg.filter(item => item.id === id)
      if (id !== 4) {
        this.attributeDisable = true
        this.businessForm.attribute_id = ''
      } else {
        this.attributeDisable = false
      }
    },
    handleAttributeChange(id) {
      let [currentItem] = this.filterOrgAttribute.filter(item => item.id === id)
      this.businessForm.attribute_id = currentItem.id
      this.businessForm.attribute_name = currentItem.name
    },
    async handleGetAttributeList() {
      await this.getOrgAttribute({
        pageSize: 100,
        pageIndex: 1,
        type: this.businessType
      })
    },
    initBusinessForm() {
      this.businessForm = JSON.parse(JSON.stringify(this.defaultForm));
      const { attribute_id, organization_id } = this.businessForm
      this.handleOrgChange(organization_id)
      if (this.businessForm && this.businessForm.children) {
        delete this.businessForm.children
      }
    },
    async handleEditBusinessPoint() {
      try {
        if (this.isAllowAdd) {
          console.log("handleEditBusinessPoint");
          await this.editBusinessPoint(this.businessForm);
          this.$emit("onRefresh");
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "编辑失败!"
        });
      }
    },
    async init() {
      await this.handleGetAttributeList()
      this.initBusinessForm();
    }
  },
  mounted() {
    this.init()
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.point-content {
  box-sizing: border-box;
  width: d2r(985px);
  height: d2r(747px);
  margin-top: d2r(22px);
  padding-top: d2r(60px);
  background: #f7f7f7;
  .point-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: d2r(20px);
    .point-item-label {
      width: d2r(154px);
      height: auto;
      text-align: right;
    }
    .item-ipt {
      margin-left: d2r(10px);
      width: d2r(500px);
      height: d2r(40px);
    }
    .item-ipt-textarea {
      margin-left: d2r(10px);
      width: d2r(500px);
      min-height: d2r(40px);
    }
  }
  .btn-confirm-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: d2r(60px) 0 0 d2r(164px);
  }
}

.point-btn-edit {
  opacity: 0.4;
  &.active {
    opacity: 1;
  }
}
</style>
