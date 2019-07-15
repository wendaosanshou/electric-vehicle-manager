<template>
  <div class="point-content">
    <div class="point-item">
      <div class="point-item-label">当前组织名称</div>
      <el-input v-model="defaultForm.name" class="item-ipt ipt-fix" size="mini" placeholder="请填写当前组织名称" disabled></el-input>
    </div>
    <div class="point-item point-item-textarea">
      <div class="point-item-label">备注</div>
      <el-input
        v-model="defaultForm.note"
        type="textarea"
        class="item-ipt-textarea ipt-fix"
        size="mini"
        resize="none"
        maxlength="50"
        :autosize="{ minRows: 10, maxRows: 10}"
        placeholder="请输入备注信息（50字内）"
        disabled
      ></el-input>
    </div>
    <div class="point-item">
      <div class="point-item-label">组织类型</div>
      <el-select v-model="defaultForm.organization_id" class="item-ipt ipt-fix" size="small" placeholder="请选择活动区域" disabled>
        <el-option :label="item.name" :value="item.id" v-for="(item, index) in allOrg" :key="index"></el-option>
      </el-select>
    </div>
    <div class="btn-confirm-wrap">
      <el-button class="point-btn button-fix" size="mini" type="primary" @click="handleDeleteBusinessPoint">删除</el-button>
      <el-button class="point-btn button-fix" size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      organization: []
    };
  },
  props: {
    defaultForm: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['allOrg'])
  },
  methods: {
    ...mapActions(['deleteBusinessPoint']),
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
        this.$emit('onRefresh')
      } catch (error) {
        console.log(error)
        // this.$message({
        //   type: 'info',
        //   message: '删除失败!'
        // });
      }
    }
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
</style>
