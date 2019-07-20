<template>
  <div class="user-add">
    <div class="user-add-title">
      <page-title>{{isUserAdd ? '添加用户' : '编辑用户'}}</page-title>
      <page-back></page-back>
    </div>
    <!-- {{form}}--{{this.form.role_name.length}}--{{this.form.role_name && this.form.role_name.length > 0}} -->
    <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
      <el-form-item label="账号">
        <el-input class="ipt-fix" size="mini" v-model="form.account" placeholder="登录账号（手机号）" :disabled="!isUserAdd"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="ipt-fix" type="password" size="mini" v-model="form.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      
      <el-form-item label="角色定义">
        <div class="form-btn-wrap">
          <el-input
            class="ipt-fix ipt-select"
            size="mini"
            v-model="form.role_name"
            disabled
            placeholder="请选择所属角色"
          ></el-input>
          <user-add-dialog :defaultRoleId="form.role_id" @onSelectRole="handleSelectRole"/>
        </div>
      </el-form-item>
      <el-form-item label="所属组织">
        <div class="form-btn-wrap">
          <el-input
            class="ipt-fix ipt-select"
            size="mini"
            v-model="form.site_name"
            placeholder="请选择所属组织"
            disabled
          ></el-input>
          <org-add-dialog
            :disabled="!form.role_name" 
            :selectType="selectTreeType"
           @onConfirm="onSelectOrg"/>
        </div>
      </el-form-item>
      <el-form-item label="手机">
        <el-input class="ipt-fix" size="mini" v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input class="ipt-fix" size="mini" v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          class="ipt-fix"
          size="mini"
          resize="none"
          maxlength="50"
          :autosize="{ minRows: 10, maxRows: 10}"
          v-model="form.note"
          placeholder="请输入备注信息（50字内）"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="user-add-btn-wrap">
      <el-button
        class="button-fix button-add-confirm"
        size="mini"
        type="primary"
        @click="handleConfirm"
      >提交</el-button>
      <el-button class="button-fix" size="mini" type="primary" @click="onCancelEdit">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import OrgAddDialog from "./OrgAddDialog";
import UserAddDialog from "./UserAddDialog";

export default {
  data() {
    return {
      isUserEdit: this.$route && this.$route.path === "/user-edit",
      selectTreeType: 'all-tree',
      form: {
        account: "",
        name: "",
        pwd: "",
        site_id: "",
        site_name: "",
        role_id: "",
        role_name: "",
        phone: "",
        email: "",
        head: "",
        note: ""
      }
    };
  },
  computed: {
    ...mapGetters(["selectUser"]),
    role_name() {
      return this.form && this.form.role_name !== ""
    },
    isUserAdd() {
      return this.$route && this.$route.name === "UserAdd";
    },
    isAllowAdd() {
      let isAllowAdd = true;
      Object.keys(this.form).forEach(key => {
        if (key !== "head" && !this.form[key]) {
          isAllowAdd = false;
        }
      });
      return isAllowAdd;
    }
  },
  watch: {
    $route() {
      this.initFormData();
    }
  },
  methods: {
    ...mapActions(["addSysUser", "editSysUser"]),
    initSelectTreeType(roleName) {
      if (roleName.indexOf('办理') > -1) {
        this.selectTreeType = 'handle-tree'
      } else if (roleName.indexOf('安装') > -1) {
        this.selectTreeType = 'install-tree'
      } else {
        this.selectTreeType = 'all-tree'
      }
    },
    handleSelectRole(value) {
      const [role] = value;
      this.form.role_id = role.id;
      this.form.role_name = role.name;
      this.initSelectTreeType(role.name)
    },
    onSelectOrg(value) {
      this.form.site_id = value.id;
      this.form.site_name = value.name;
    },
    async handleAddSysUser() {
      await this.addSysUser(this.form);
    },
    async handleEditSysUser() {
      const params = {
        id: this.selectUser.id,
        ...this.form
      }
      console.log(params)
      await this.editSysUser(params);
    },
    async handleConfirm() {
      if (this.isUserAdd) {
        await this.handleAddSysUser();
      } else {
        await this.handleEditSysUser();
      }
    },
    initFormData() {
      if (!this.isUserAdd) {
        this.form = {
          account: this.selectUser.account,
          name: this.selectUser.name,
          pwd: this.selectUser.pwd,
          site_id: this.selectUser.site_id,
          site_name: this.selectUser.site_name,
          role_id: this.selectUser.role_id,
          role_name: this.selectUser.role_name,
          phone: this.selectUser.phone,
          email: this.selectUser.email,
          head: this.selectUser.head,
          note: this.selectUser.note
        };
        console.log("initFormData", this.form);
      }
    },
    onCancelEdit() {
      history.back()
    }
  },
  components: {
    PageTitle,
    PageBack,
    OrgAddDialog,
    UserAddDialog
  },
  mounted() {
    this.initFormData();
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.user-add {
  padding: d2r(29px) d2r(38px) d2r(62px) d2r(42px);
  .user-add-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .el-input,
  .el-textarea {
    width: d2r(500px);
  }
  .user-add-btn-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: d2r(112px);
    padding-top: d2r(41px);
  }
  .form-btn-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .ipt-select {
    width: d2r(330px);
  }
  .btn-select {
    margin-left: d2r(10px);
    width: d2r(160px);
    height: d2r(38px);
  }
}

.button-add-confirm {
  opacity: 1;
  &.active {
    opacity: 1;
  }
}
</style>
