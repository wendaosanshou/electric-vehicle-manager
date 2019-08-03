<template>
  <div class="role-manage-tree">
    <div class="role-tree-title">选择角色模板</div>
    <div class="role-tree-content">
      <el-tree
        :data="roleManageData"
        class="role-tree tree-fix"
        show-checkbox
        default-expand-all
        node-key="id"
        :current-node-key="checkKeys"
        :default-checked-keys="defaultCheckKeys"
        highlight-current
        @check-change="handleCheckChange"
      ></el-tree>
    </div>
    <!-- <el-button class="btn-confirm button-fix" type="primary" size="mini">确定</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkKeys: '',
      roleManageData: [
        {
          id: 0,
          label: "管理平台",
          children: [
            {
              id: 1,
              label: "定位监控"
            },
            {
              id: 2,
              label: "历史轨迹"
            },
            {
              id: 3,
              label: "告警监控"
            },
            {
              id: 4,
              label: "告警分析"
            },
            {
              id: 5,
              label: "电子围栏"
            },
            {
              id: 6,
              label: "办理状态管理"
            },
            {
              id: 7,
              label: "办理状态查询"
            },
            {
              id: 8,
              label: "备案信息管理"
            }
          ]
        },
        {
          id: 9,
          label: "系统设置",
          children: [
            {
              id: 10,
              label: "工作人员管理"
            },
            {
              id: 11,
              label: "角色模板管理"
            },
            {
              id: 12,
              label: "业务办理点管理"
            },
            {
              id: 13,
              label: "设备安装点管理"
            },
            {
              id: 14,
              label: "APP资讯管理"
            },
            {
              id: 15,
              label: "设备管理"
            },
            {
              id: 16,
              label: "设备在线升级"
            },
            {
              id: 17,
              label: "设备版本管理"
            },
            // {
            //   id: 18,
            //   label: "商户APP代客预约"
            // },
            // {
            //   id: 19,
            //   label: "商户APP预约审核"
            // },
            // {
            //   id: 20,
            //   label: "商户APP现场安装"
            // },
            {
              id: 21,
              label: "APP升级管理"
            },
            {
              id: 22,
              label: "客户留言管理"
            },
            {
              id: 23,
              label: "渠道属性管理"
            }
          ]
        }
      ]
    };
  },
  props: {
    defaultCheck: {
      type: String,
      default: ''
    }
  },
  computed: {
    defaultCheckKeys() {
      return this.defaultCheck.split(',').filter(item => item !== '9' && item !== '0')
    }
  },
  methods: {
    handleCheckChange(data, isCheck, isChildrenCheck) {
      const { id } = data
      // 系统设置和管理平台权限去掉
      if (id !== 0 && id !== 9) {
        this.$emit('onChange', {role: data, isCheck, isChildrenCheck})
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

.role-manage-tree {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  min-height: d2r(443px);
  .role-tree-content {
    width: 100%;
    margin-top: d2r(20px);
    .role-tree {
      width: 100%;
      font-size: d2r(13px) !important;
    }
  }
  .btn-confirm {
    margin-top: d2r(24px);
    margin-left: d2r(30px);
  }
}
</style>
