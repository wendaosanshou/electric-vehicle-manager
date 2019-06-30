<template>
  <div class="business-point-manage">
    <div class="point-manage-title">
      <page-title>{{pagetTitle}}</page-title>
      {{formType}}
    </div>
    <div class="point-manange-content">
      <div class="point-manage-tree">
        <div class="city-header">深圳市</div>
        <el-tree
          :data="businessTree"
          :expand-on-click-node="false"
          class="role-tree tree-fix"
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @node-click="handleNodeClick"
          @check="onTreeCheck"
          @check-change="onCheckChange"
        ></el-tree>
      </div>
      <div class="point-content-right">
        <div class="point-btn-wrap">
          <el-button
            class="point-btn button-fix"
            size="mini"
            type="primary"
            @click="handleAdd"
          >添加子节点</el-button>
          <el-button class="point-btn button-fix" size="mini" @click="handleDelete">删除节点</el-button>
          <el-button class="point-btn button-fix" size="mini" @click="handleEdit">修改节点</el-button>
        </div>
        <business-point-add :currentBusinessPoint="currentBusinessPoint" @onRefresh="onRefreshBusinessPoint" v-if="isAddForm"></business-point-add>
        <business-point-delete
          :defaultForm="currentBusinessPoint"
          @onRefresh="onRefreshBusinessPoint"
          v-if="isDeleteForm"
        ></business-point-delete>
        <business-point-edit :defaultForm="currentBusinessPoint" v-else-if="isEditForm" @onRefresh="onRefreshBusinessPoint"></business-point-edit>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import BusinessPointAdd from "./BusinessPointAdd.vue";
import BusinessPointDelete from "./BusinessPointDelete.vue";
import BusinessPointEdit from "./BusinessPointEdit.vue";

export default {
  data() {
    return {
      formType: "form-edit",
      currentBusinessPoint: {},
      checkChangePoint: {}
    };
  },
  computed: {
    ...mapGetters(["allBusinessPoint", "businessHandleTree", "businessInstallTree"]),
    isBusinessHandle() {
      const { path } = this.$route
      return path && path === '/business-manage'
    },
    businessTree() {
      return this.isBusinessHandle ? this.businessHandleTree : this.businessInstallTree
    },
    isAddForm() {
      return this.formType && this.formType === "form-add";
    },
    isEditForm() {
      return this.formType && this.formType === "form-edit";
    },
    isDeleteForm() {
      return this.formType && this.formType === "form-delete";
    },
    pagetTitle() {
      const { name } = this.$route;
      if (name === "BusinessPointManage") {
        return "业务办理点（所属组织）管理";
      } else if (name === "EquipmentManage") {
        return "设备安装点管理";
      }
    }
  },
  watch: {
    $route() {
      this.initAllBusinessPoint();
    }
  },
  methods: {
    ...mapActions(["getAllOrg", "getAllBusinessPoint", 'getBusinessHandle', 'getBusinessInstall']),
    deepClone(data) {
      return JSON.parse(JSON.stringify(data))
    },
    onTreeCheck(a, b) {
      if (b.checkedKeys.length > 0) {
        this.$refs.tree.setCheckedKeys([a.id]);
      }
      this.currentBusinessPoint = a;
    },
    handleNodeClick(data) {
      this.formType = "form-edit";
      this.currentBusinessPoint = data;
    },
    onCheckChange(data, isCheck) {
      // if (data.id === this.currentBusinessPoint.id) {
      //   // console.log(data, isCheck)
      // }
    },
    handleAdd() {
      this.formType = "form-add";
    },
    handleDelete() {
      this.formType = "form-delete";
    },
    handleEdit() {
      this.formType = "form-edit";
    },
    async initAllBusinessPoint() {
      this.formType = "form-add";
      await this.getAllOrg();
      await this.getAllBusinessPoint();
      if (this.isBusinessHandle) {
        await this.getBusinessHandle()
      } else {
        await this.getBusinessInstall()
      }
    },
    async onRefreshBusinessPoint() {
      this.initAllBusinessPoint()
    }
  },
  components: {
    PageTitle,
    BusinessPointAdd,
    BusinessPointEdit,
    BusinessPointDelete
  },
  mounted() {
    this.initAllBusinessPoint();
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.point-manage-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: d2r(29px) 0 d2r(37px) d2r(41px);
}

.point-manange-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 d2r(38px) 0 d2r(65px);
  .point-manage-tree {
    width: d2r(460px);
    height: d2r(825px);
    border: 1px solid #dddddd;
    .city-header {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: d2r(53px);
      padding-left: d2r(23px);
      border-bottom: 1px solid #dddddd;
    }
  }
  .point-content-right {
    .point-btn-wrap {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .point-btn {
        height: d2r(60px);
      }
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
  }
}
</style>
