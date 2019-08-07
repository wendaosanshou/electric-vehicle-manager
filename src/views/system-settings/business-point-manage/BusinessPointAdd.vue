<template>
  <div class="point-content">
    <!-- {{businessForm}} -->
    <!-- {{businessForm}}<br/>{{defaultForm}} -->
    <!-- {{filterAllOrg}}--{{useOrg}}--{{businessType}} -->
    <div class="point-item" v-if="isAddForm">
      <div class="point-item-label">父节点组织名称</div>
      <el-input class="item-ipt ipt-fix" v-model="businessForm.parentName" size="mini" placeholder="请填写当前组织名称" disabled></el-input>
    </div>
    <div class="point-item">
      <div class="point-item-label">当前组织名称</div>
      <el-input class="item-ipt ipt-fix" size="mini" v-model="businessForm.name" placeholder="请填写当前组织名称" :disabled="isDeleteForm"></el-input>
    </div>
    <div class="point-item point-item-textarea">
      <div class="point-item-label">备注</div>
      <el-input
        type="textarea"
        class="item-ipt-textarea ipt-fix"
        size="mini"
        resize="none"
        maxlength="50"
        :autosize="{ minRows: 10, maxRows: 10}"
        v-model="businessForm.note"
        placeholder="请输入备注信息（50字内）"
        :disabled="isDeleteForm"
      ></el-input>
    </div>
    <div class="point-item">
      <div class="point-item-label">组织类型</div>
      <el-select
        class="item-ipt ipt-fix"
        size="small"
        @change="handleOrgChange"
        v-model="businessForm.organization_id"
        :disabled="!hasOrgSelector || isDeleteForm"
        placeholder="请选择组织类型"
      >
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in filterAllOrg" :key="index"></el-option>
      </el-select>
    </div>
    <div class="point-item">
      <div class="point-item-label">渠道属性</div>
      <el-select class="item-ipt ipt-fix" size="small" v-model="businessForm.attribute_id" @change="handleAttributeChange" :disabled="disabledAttribute" placeholder="请选择渠道属性">
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in orgAttribute" :key="index"></el-option>
      </el-select>
    </div>
    <div class="btn-confirm-wrap">
      <div class="btn-wrap">
        <el-button class="point-btn point-btn-add button-fix" :class="{active: isBtnActive}" size="mini" type="primary" @click="handleConfirm">{{isDeleteForm ? '删除' : '保存'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setTimeout } from 'timers'

export default {
  data() {
    return {
      organization: [],
      attributeDisable: false,
      businessForm: {
        name: '',
        note: '',
        country: '',
        street: '',
        parentName: '',
        parent_id: '',
        type: 0,
        organization_id: '',
        attribute_id: '',
        attribute_name: ''
      }
    }
  },
  props: {
    defaultForm: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  watch: {
    defaultForm() {
      this.initBusinessForm(this.defaultForm)
    },
    type() {
      this.initBusinessForm(this.defaultForm)
    },
    $route() {
      this.resetBusinessForm()
    }
  },
  computed: {
    ...mapGetters(['allOrg', 'businessType', 'channelTypes', 'orgAttribute']),
    disabledAttribute() {
      return this.attributeDisable || !this.hasOrgSelector || this.isDeleteForm
    },
    isAddForm() {
      return this.type && this.type === 'form-add'
    },
    isEditForm() {
      return this.type && this.type === 'form-edit'
    },
    isDeleteForm() {
      return this.type && this.type === 'form-delete'
    },
    useOrg() {
      let useOrg = this.allOrg.filter(item => {
        return [1, 2, 3].indexOf(item.id) > -1
      })
      let businessPoint = this.businessType === 1 ? { id: 4, name: '业务办理点', note: '' } : { id: 4, name: '设备安装点', note: '' }
      return useOrg.concat([businessPoint])
    },
    filterAllOrg() {
      let { organization_id } = this.defaultForm
      // 处理organization_id出现异常的情况
      organization_id = organization_id > 4 ? 4 : organization_id
      if (organization_id && organization_id > 0) {
        if (this.isAddForm) {
          return this.useOrg.filter(item => item.id > organization_id)
        } else {
          return this.useOrg.filter(item => item.id === organization_id)
        }
      }
      return this.useOrg
    },
    hasOrgSelector() {
      return this.filterAllOrg && this.filterAllOrg.length > 0
    },
    addBusinessType() {
      if ([1, 2, 3].indexOf(this.businessForm.organization_id) > -1) {
        return 0
      } else {
        return this.businessType
      }
    },
    isBtnActive() {
      const organization_id = this.businessForm['organization_id']
      console.log('organization_id', organization_id)
      return Object.keys(this.businessForm).every(key => {
        if (['name', 'parent_id', 'organization_id', 'attribute_id'].indexOf(key) > -1) {
          // 如果organization_id小于4则不用判断attribute_id
          if (key === 'attribute_id' && organization_id < 4) {
            return true
          } else {
            return this.businessForm[key]
          }
        } else {
          return true
        }
      })
    }
  },
  methods: {
    ...mapActions(['addBusinessPoint', 'editBusinessPoint', 'getOrgAttribute', 'deleteBusinessPoint']),
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
      let [currentItem] = this.orgAttribute.filter(item => item.id === id)
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
      this.resetBusinessForm()
      if (this.isAddForm) {
        this.initAddBusinessForm()
      } else {
        this.initEditBusinessForm()
      }
    },
    initEditBusinessForm() {
      console.log('initEditBusinessForm', JSON.parse(JSON.stringify(this.defaultForm)))
      if (this.defaultForm && Object.keys(this.defaultForm).length > 0) {
         this.businessForm = JSON.parse(JSON.stringify(this.defaultForm))
        if (this.businessForm && this.businessForm.organization_id > 4) {
          // 处理organization_id异常的情况
          this.businessForm.organization_id = 4
        }
        const { attribute_id, organization_id } = this.businessForm
        this.handleOrgChange(organization_id)
        if (this.businessForm && this.businessForm.children) {
          delete this.businessForm.children
        }
      }
    },
    resetBusinessForm() {
      this.businessForm = {
        name: '',
        note: '',
        country: '',
        street: '',
        parentName: '',
        parent_id: '',
        type: 0,
        organization_id: '',
        attribute_id: '',
        attribute_name: ''
      }
    },
    initAddBusinessForm() {
      let { name, id, country, street, organization_id } = this.defaultForm
      // 1是市
      if (organization_id === 1) {
        country = this.businessForm.name
        // 2是街道
      } else if (organization_id === 2) {
        country = name
        street = this.businessForm.name
        // 3是街道
      } else if (organization_id === 3) {
        street = name
      } else {
        // 处理organization_id异常的情况
        this.businessForm.organization_id = ''
      }

      this.businessForm = {
        ...this.businessForm,
        parentName: name,
        parent_id: id,
        country,
        street
      }
    },
    async handleEditBusinessPoint() {
      try {
        if (this.isBtnActive) {
          console.log('handleEditBusinessPoint', this.businessForm)
          await this.editBusinessPoint(this.businessForm)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async handleAddBusinessPoint() {
      this.initAddBusinessForm()
      try {
        if (this.isBtnActive) {
          console.log({
            ...this.businessForm,
            type: this.addBusinessType
          })
          await this.addBusinessPoint({
            ...this.businessForm,
            type: this.addBusinessType
          })
        }
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async handleDeleteBusinessPoint() {
      try {
        await this.$confirm(`此操作将永久删除当前节点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.deleteBusinessPoint({
          id: this.defaultForm.id
        })

      } catch (error) {
        console.log(error)
      }
    },
    async handleConfirm() {
      if (this.isBtnActive) {
        if (this.isAddForm) {
          await this.handleAddBusinessPoint()
        } else if (this.isDeleteForm) {
          await this.handleDeleteBusinessPoint()
        } else {
          await this.handleEditBusinessPoint()
        }
        this.$emit('onRefresh')
      }
    },
    async init() {
      this.$nextTick(() => {
        this.initBusinessForm()
      })
    }
  },
  mounted() {
    this.init()
  }
}
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
  padding-top: d2r(60px);
  overflow: auto;
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
      font-size: d2r(14px);
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
    padding: d2r(60px) 0 0 d2r(160px);
    .btn-wrap {
      width: d2r(500px);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}

.point-btn-add {
  opacity: 0.4;
  width: d2r(320px) !important;
  &.active {
    opacity: 1;
  }
}
</style>
