<template>
  <div class="role-add">
    <el-button class="button-fix" icon="el-icon-refresh" type="primary" size="mini" @click="onDialogShow">单个升级</el-button>
    <el-dialog class="dialog-fix" title="单个设备升级" :visible.sync="dialogVisible" @close="onDialogHide">
      <div class="dialog-content">
        <el-form class="user-add-form device-form-fix" label-position="right" label-width="140px" :model="form">
          <el-form-item label="IMEI">
            <el-input class="ipt-fix" size="mini" v-model.number="form.imei" placeholder="请输入IMEI号"></el-input>
          </el-form-item>
          <el-form-item label="设备升级文件">
            <el-select class="ipt-fix" size="mini" @change="onVersionChange" v-model="form.version" placeholder="请选择">
              <el-option v-for="item in firewareList" :key="item.id" :label="item.version" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="handleUpdateDevice">确 定</el-button>
        <el-button size="mini" @click="onDialogHide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/PageTitle.vue'

export default {
  data() {
    return {
      dialogVisible: false,
      currentVersion: {},
      form: {
        imei: '',
        version: ''
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'is-edit'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'firewareList']),
    isAllowConfirm() {
      return this.form.imei && `${this.form.imei}`.length === 15 && this.form.version
    }
  },
  methods: {
    ...mapActions(['updateProduce']),
    onVersionChange(versionId) {
      console.log('onVersionChange', versionId)
      const [currentVersion] = this.firewareList.filter(item => item.id === versionId)
      this.currentVersion = currentVersion
      console.log(currentVersion)
    },
    onDialogShow() {
      if (this.isEditDialog) {
        this.form = this.data
      }
      this.dialogVisible = true
    },
    onDialogHide() {
      this.dialogVisible = false
      this.resetDevice()
    },
    resetDevice() {
      this.form = {
        imei: '',
        version: ''
      }
    },
    async handleUpdateDevice() {
      console.log(this.form)
      if (this.isAllowConfirm) {
        await this.updateProduce({
          imeis: [this.form.imei],
          version_url: this.currentVersion.version_url,
          update_operation: this.userInfo.account,
          md5: this.currentVersion.md5
        })
        this.onDialogHide()
        this.$emit('on-refresh')
      } else {
        this.$message({
          type: 'error',
          message: `请输入正确的信息（IMEI号长度需要是15位）`
        })
      }
    }
  },
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.dialog-title {
  box-sizing: border-box;
  width: 100%;
  height: d2r(51px);
  line-height: d2r(51px);
  font-size: d2r(16px);
  padding-left: d2r(22px);
  text-align: left;
  border-bottom: 1px solid #dddddd;
}

.dialog-content {
  padding: d2r(24px) d2r(25px) d2r(34px) d2r(22px);
}

.table-col-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: d2r(13px);
  color: #3b4859;
  min-height: d2r(443px);
}

.role-manage-table tr td:nth-child(3) .cell {
  padding: 0;
}

.role-manage-tree-wrap {
  width: 100%;
  height: d2r(500px);
  overflow: auto;
}

.el-form-item {
  .el-form-item__label {
    width: d2r(220px) !important;
  }
}

.form-btn-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .btn-select {
    margin-left: d2r(10px);
  }
}

.ipt-half-width {
  width: d2r(330px) !important;
}
</style>
