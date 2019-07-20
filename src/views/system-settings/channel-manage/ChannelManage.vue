<template>
  <div class="channel-manage">
      <div class="channel-title">
          <page-title>渠道属性管理</page-title>
          <channel-manage-add @onRefresh="initAttributeList"></channel-manage-add>
      </div>
    <div class="channel-manage-header">
        <!-- <div class="manage-header-label">当前渠道属性</div> -->
        <div class="menu-account menu-ipt-wraper">
          <span class="menu-label">渠道类型</span>
          <el-select
              class="menu-label-ipt ipt-fix ipt-selector"
              size="mini"
              v-model="searchType"
              placeholder="请选择类型">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in typeList"
                :key="item.value"
              ></el-option>
            </el-select>
        </div>
        <el-button icon="el-icon-search" class="button-fix" size="mini" type="primary" @click="handleRefresh">查询</el-button>
    </div>
    <div class="table-container">
        <el-table class="table-analysis table-fix" align="center" size="mini" :data="attributeList" border style="width: 100%">
            <el-table-column prop="id" align="center" label="类型编号">
              <template slot-scope="scope">
                {{getAttributeId(scope.row.id)}}
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="类型名称"></el-table-column>
            <el-table-column prop="type" align="center" label="所属渠道">
              <template slot-scope="scope">
                {{getAttributeLable(scope.row.type)}}
              </template>
            </el-table-column>
            <el-table-column prop="note" align="center" label="渠道类型说明"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <channel-manange-delete :defaultData="scope.row" @onRefresh="initAttributeList"></channel-manange-delete>
              </template>
            </el-table-column>
        </el-table>
    </div>

    <div class="pagination-wraper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="attributeListCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PageTitle from "@/components/PageTitle.vue";
import ChannelManageAdd from './ChannelManageAdd'
import ChannelManangeDelete from './ChannelManangeDelete'

export default {
    data() {
      return {
        pageSize: 10,
        pageIndex: 1,
        searchType: 0,
        tableData: [],
        typeList: [{
          label: '全部',
          value: 0
        },{
          label: '业务办理点',
          value: 1
        },{
          label: '设备安装点',
          value: 2
        }]
      }
    },
    computed: {
      ...mapGetters(['attributeList', 'attributeListCount'])
    },
    methods: {
      ...mapActions(['getAttributeList', 'deleteAttribute']),
      getAttributeId(id) {
        return `000${id}`.substr(-3)
      },
      getAttributeLable(type) {
        console.log(type)
        let label = '业务办理点'
        switch (type) {
          case 1:
            label = '业务办理点'
            break;
          case 2:
            label = '设备安装点'
            break;
          default:
            break;
        }
        return label
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex
        this.initAttributeList()
      },
      async handleRefresh() {
        await this.getAttributeList({
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          type: this.searchType
        })
        // this.$message({
        //   type: "success",
        //   message: "刷新当前列表成功!"
        // });
      },
      initAttributeList() {
        this.getAttributeList({
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          type: this.searchType
        })
      },
      async handleDelete(item) {
        await this.deleteAttribute({
          id: item.id
        })
        this.initAttributeList()
      }
    },
    components: {
        PageTitle,
        ChannelManageAdd,
        ChannelManangeDelete
    },
    mounted() {
      this.initAttributeList()
    }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.channel-manage {
  padding: 0 d2r(38px) d2r(112px) d2r(41px);
  .channel-title {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: d2r(100px);
    padding-top: d2r(29px);
    padding-right: d2r(21px);
  }
  .channel-manage-header {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: d2r(80px);
      padding: 0 d2r(21px);
      background:rgba(245,245,246,1);
  }
  .table-container {
      margin-top: d2r(20px);
  }
  .menu-label-ipt {
    margin-left: d2r(14px);
  }
}
</style>
