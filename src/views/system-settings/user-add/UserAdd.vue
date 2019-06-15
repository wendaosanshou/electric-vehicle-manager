<template>
  <div class="user-add">
    <div class="user-add-title">
      <page-title>{{isUserAdd ? '添加用户' : '编辑用户'}}</page-title>
      <page-back></page-back>
    </div>
    <el-form class="user-add-form" label-position="right" label-width="80px" :model="form">
      <el-form-item label="账号">
        <el-input class="ipt-fix" size="mini" v-model="form.name" placeholder="登录账号（手机号）"></el-input>
      </el-form-item>
      <el-form-item label="序号">
        <el-input class="ipt-fix" size="mini" v-model="form.region" placeholder="自动填充"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="所属组织">
        <div class="form-btn-wrap">
          <el-input class="ipt-fix ipt-select" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
          <!-- <el-button class="button-fix btn-select" size="mini" type="primary">提交</el-button> -->
          <org-add-dialog/>
        </div>
      </el-form-item>
      <el-form-item label="角色定义">
        <div class="form-btn-wrap">
          <el-input class="ipt-fix ipt-select" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
          <!-- <el-button class="button-fix btn-select" size="mini" type="primary">提交</el-button> -->
          <user-add-dialog/>
        </div>
      </el-form-item>
      <el-form-item label="手机">
        <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input class="ipt-fix" size="mini" v-model="form.type" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          class="ipt-fix"
          size="mini"
          resize="none"
          :autosize="{ minRows: 10, maxRows: 10}"
          v-model="form.type"
          placeholder="输入姓名"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="user-add-btn-wrap">
        <el-button class="button-fix" size="mini" type="primary">提交</el-button>
        <el-button class="button-fix" size="mini" type="primary">取消</el-button>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import PageBack from "@/components/PageBack.vue";
import OrgAddDialog from './OrgAddDialog'
import UserAddDialog from './UserAddDialog'

export default {
  data() {
    return {
      form: {
        data1: "",
        data2: "",
        data3: ""
      },
      options: [{ value: "1", label: "1" }]
    };
  },
  computed: {
    isUserAdd() {
      return this.$route && this.$route.name === 'UserAdd'
    }
  },
  components: {
    PageTitle,
    PageBack,
    OrgAddDialog,
    UserAddDialog
  },
  mounted() {
    console.log(this.$route)
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
  .el-input, .el-textarea{
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
</style>
