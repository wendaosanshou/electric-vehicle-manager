<template>
  <div class="export-table">
       <el-table
      class="table-fix export-table"
      id="export-out-table"
      :data="workList"
      size="mini"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="isProcessManage"></el-table-column>
      <el-table-column fixed prop="own_name" label="车主姓名" align="center"></el-table-column>
      <el-table-column label="车主手机号" width="120" align="center">
        <template slot-scope="scope">
          <div v-if="isProcessSearch">{{scope.row.own_phone}}</div>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击查看详细信息"
            placement="top"
            v-else-if="isProcessManage"
          >
            <div
              class="table-mobile"
              @click="onProcessDilaogChange(scope.row)"
            >{{scope.row.own_phone}}</div>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="点击修改信息"
            placement="top"
            v-else-if="isRecordManage"
          >
            <div class="table-mobile" @click="onMobileSetting(scope.row)">{{scope.row.own_phone}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="own_sex" label="性别" align="center">
        <template slot-scope="scope">{{scope.row.own_sex === 0 ? "男" : "女"}}</template>
      </el-table-column>
      <el-table-column prop="business_name" width="120" label="业务办理点" align="center"></el-table-column>
      <el-table-column prop="install_name" width="120" label="设备安装点" align="center"></el-table-column>
      <el-table-column prop="sys_business_account" width="120" label="业务办理员手机" align="center"></el-table-column>
      <el-table-column prop="sys_audit_account" width="120" label="审核人手机" align="center"></el-table-column>
      <el-table-column prop="audit_time" width="180" label="审核时间" align="center"></el-table-column>
      <el-table-column prop="sys_distribute_account" width="120" label="派单员手机" align="center"></el-table-column>
      <el-table-column prop="distribute_time" label="派单时间" align="center"></el-table-column>
      <el-table-column label="安装状态" align="center">
        <template slot-scope="scope">{{getProcessTips(scope.row.process)}}</template>
      </el-table-column>
      <el-table-column prop="sys_install_account" width="120"  label="安装工手机" align="center"></el-table-column>
      <el-table-column prop="install_time" width="180"  label="安装时间" align="center"></el-table-column>
      <el-table-column prop="install_position" width="120"  label="安装地理位置" align="center"></el-table-column>
      <el-table-column prop="imei" label="IMEI" width="120"  align="center"></el-table-column>
      <el-table-column prop="iccid" label="iccid" width="120"  align="center"></el-table-column>
      <el-table-column prop="contract_content" width="120"  label="合约期" align="center">
        <template slot-scope="scope">{{getContractContent(scope.row.contract_content)}}</template>
      </el-table-column>
      <el-table-column prop="contract_active" width="120"  label="激活状态" align="center">
        <template slot-scope="scope">{{getActiveTips(scope.row.contract_active)}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
