<template>
  <div class="role-manage-tree">
    <div class="role-tree-title">选择角色权限</div>
    <div class="role-tree-content">
      <el-tree
        :data="roleManageData"
        class="role-tree tree-fix"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
    </div>
    <el-button class="btn-confirm button-fix" type="primary" size="mini">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleManageData: [
        {
          id: 1,
          label: "管理平台",
          children: [
            {
              id: 4,
              label: "定位监控"
            },
            {
              id: 9,
              label: "历史轨迹"
            },
            {
              id: 10,
              label: "告警监控"
            }
          ]
        },
        {
          id: 2,
          label: "系统设置",
          children: [
            {
              id: 5,
              label: "用户管理"
            },
            {
              id: 6,
              label: "角色权限管理"
            }
          ]
        }
      ]
    };
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
