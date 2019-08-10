<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ly-flex-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.el-btn {
  cursor: pointer;
}

.el-button-fix {
  width: d2r(160px) !important;
  border-radius: 0 !important;
}

.button-fix {
  width: d2r(160px) !important;
  border-radius: 0 !important;
}

.dialog-fix {
  .el-dialog__header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: d2r(40px);
    padding: 0 0 0 d2r(18px);
    color: #ffffff;
    background: #ff7525;
    .el-dialog__title {
      font-size: d2r(18px);
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #ffffff;
    }
    .el-dialog__headerbtn {
      position: absolute;
      top: d2r(8px);
      right: d2r(18px);
      color: #ffffff;
      .el-dialog__close {
        color: #ffffff;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
  }
  .dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .el-button {
      width: d2r(160px);
      border-radius: 0;
    }
  }
}

.user-add-form {
  padding-top: d2r(15px);
  .el-form-item {
    margin-bottom: d2r(5px);
    &.is-error {
      margin-bottom: d2r(20px);
    }
    &.el-form-item-last .el-textarea {
      margin-top: d2r(5px);
      padding-bottom: d2r(10px);
    }
    .el-form-item__label {
      width: d2r(163px);
      text-align: right;
      font-size: d2r(16px);
    }
    .el-form-item__content {
      width: d2r(500px);
      .el-select {
        width: d2r(500px);
      }
    }
    .el-textare {
      margin-top: d2r(6px);
    }
    .el-form-item__error {
      padding-top: 0;
    }
  }
}

.form-fix {
  .el-form-item {
    .el-form-item__label {
      width: d2r(163px);
      text-align: right;
      font-size: d2r(16px);
    }
    .el-form-item__content {
      width: d2r(500px);
      .el-select {
        width: d2r(500px);
      }
    }
  }
}

.table-fix {
  .el-table__header-wrapper .el-table__header {
    thead {
      color: #ffffff;
      background: #bbbbc4;
      tr,
      th {
        background: #bbbbc4;
      }
    }
  }
  &.el-table .sort-caret.descending {
    border-top-color: #ffffff;
  }
  &.el-table .sort-caret.ascending {
    border-bottom-color: #ffffff;
  }
}

.el-table__fixed .el-table__header, .el-table__fixed-right .el-table__header{
  thead {
    color: #ffffff;
    background: #bbbbc4;
    tr,
    th {
      background: #bbbbc4;
    }
  }
}

.table-fix-yellow {
  .el-table__header-wrapper .el-table__header {
    thead {
      color: #ffffff;
      background: #ff7525ff;
      tr,
      th {
        background: #ff7525ff;
      }
    }
  }
}

.table-disable-hover {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent !important;
  }
}

.tree-fix {
  font-size: d2r(13px) !important;
  .el-tree-node__label {
    font-size: d2r(13px) !important;
  }
}

.ipt-fix {
  &.el-input__inner {
    border-radius: 0 !important;
  }
  .el-input__inner {
    border-radius: 0 !important;
  }
  .el-textarea__inner {
    border-radius: 0 !important;
  }
}

.el-select-dropdown__item,
.el-select-dropdown__empty {
  font-size: d2r(14px) !important;
}

.menu-fix {
  width: 100%;
  .el-menu-item,
  .el-submenu {
    text-align: left;
  }
}

.color-primary {
  color: #f66713;
  font-size: d2r(16px);
}

.dialog-small-right {
  .el-dialog {
    margin-top: d2r(230px) !important;
    margin-right: d2r(64px);
    width: d2r(300px);
    box-shadow: 0px 5px 20px 0px rgba(159, 158, 193, 1);
    border-radius: d2r(9px);
  }
}

.dialog-table-right {
  .el-dialog {
    margin-top: d2r(220px) !important;
    margin-right: d2r(37px);
    width: d2r(662px);
    box-shadow: 0px 5px 20px 0px rgba(159, 158, 193, 1);
    border-radius: d2r(9px);
  }
}

.dialog-small-left {
  .el-dialog {
    margin-top: d2r(280px) !important;
    margin-left: d2r(424px);
    width: d2r(300px);
  }
}

.dialog-small-org {
  .el-dialog {
    width: d2r(460px);
  }
}

.dialog-allow-click {
  &.el-dialog__wrapper {
    pointer-events: none;
    .el-dialog {
      pointer-events: auto;
    }
  }
}

.role-tag-fix {
  margin-left: d2r(6px);
  cursor: pointer;
}

.table-disable-select-all thead {
  .el-table-column--selection {
    .cell {
      display: none;
    }
  }
}

.mark-content,
.mark-content-1,
.mark-content-2,
.mark-content-3 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.mark-content {
  width: 134px;
  height: 124px;
  border-radius: 100%;
  background: url('~@/assets/icons/img_information.png');
  background-size: 100% 100%;
  .mark-content-1 {
    width: auto;
    height: auto;
    text-align: center;
    color: #ffffff;
    margin-top: d2r(5px);
    border-radius: 100%;
    .mark-content-2 {
      width: d2r(73px);
      height: d2r(73px);
      border-radius: 100%;
    }
    .mark-content-3 {
      width: d2r(48px);
      height: d2r(48px);
      line-height: d2r(48px);
      text-align: center;
      color: #ffffff;
      font-size: d2r(17px);
      border-radius: 100%;
    }
  }
}

.alarm-mark-content {
  width: d2r(22px);
  height: d2r(27px);
  background: url("~@/assets/icons/weiyi_icon@2x.png");
  background-size: 100% 100%;
  &.item-icon-weiyi {
    background: url("~@/assets/icons/weiyi_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-zhendong {
    background: url("~@/assets/icons/zhendong_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-gaowen {
    background: url("~@/assets/icons/gaowen_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-chaosu {
    background: url("~@/assets/icons/chaosu_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-diya {
    background: url("~@/assets/icons/diya_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-gaoya {
    background: url("~@/assets/icons/gaoya_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-neizhidiya {
    background: url("~@/assets/icons/neizhidiya_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-duandian {
    background: url("~@/assets/icons/duandian_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-duandian2 {
    background: url("~@/assets/icons/duandian2_icons@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-suaidao {
    background: url("~@/assets/icons/suaidao_icons@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-chaosu {
    background: url("~@/assets/icons/chaosu_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-jinjigaojing {
    background: url("~@/assets/icons/jinjigaojing_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-feifaxingshi {
    background: url("~@/assets/icons/duandian_icon@2x.png");
    background-size: 100% 100%;
  }
  &.item-icon-fangdao {
    background: url("~@/assets/icons/fangdao_icon@2x.png");
    background-size: 100% 100%;
  }
}

.amap-info {
  .amap-info-contentContainer {
    .amap-info-outer {
      border: 0;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    }
    &:hover {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    }
  }
}

.location-marker {
  position: relative;
  width: d2r(400px);
  height: d2r(290px);
  .location-marker-label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: d2r(23px);
    color: #ffffff;
    width: d2r(100px);
    height: d2r(100px);
    border-radius: 100%;
    background: #ffc8a7ff;
    &.active {
      background: #ff7525ff;
    }
  }
  .location-marker-label-1 {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .location-marker-label-2 {
    position: absolute;
    left: d2r(40px);
    bottom: d2r(117px);
  }
  .location-marker-label-3 {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .location-marker-label-4 {
    position: absolute;
    right: d2r(40px);
    bottom: d2r(117px);
  }
  .location-marker-label-5 {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .location-marker-icon {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: d2r(57px);
    height: d2r(97px);
    background: url("~@/assets/icons/weizhi@2x.png");
    background-size: 100% 100%;
  }
}

.mark-car {
  width: d2r(48px);
  height: d2r(53px);
  background: url("~@/assets/icons/motuochefuwu-copy@2x.png");
  background-size: 100% 100%;
}

.amap-info-content {
  background: #ffffff00;
  cursor: pointer;
}

.amap-info-outer,
.amap-menu-outer {
  box-shadow: 0;
  &:hover {
    box-shadow: 0;
  }
}

.amap-info-sharp {
  opacity: 0;
}

.context_menu {
  position: relative;
  padding: 0;
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px rgba(159, 158, 193, 1);
}

.context_menu p {
  box-sizing: border-box;
  width: d2r(120px);
  height: d2r(50px);
  line-height: d2r(50px);
  font-size: d2r(17px);
  padding-left: d2r(16px);
  text-align: left;
  background: #ffffff;
  cursor: pointer;
}

.context_menu p:hover {
  background: #ccc;
}

.dialog-no-header {
  .el-dialog .el-dialog__header {
    display: none !important;
  }
}

// .map-cursor-default {
//   .amap-labels {
//     cursor: default;
//   }
// }

// 修改滚动条样式
// ::-webkit-scrollbar {
//   /*滚动条整体样式*/
//   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
//   height: 1px;
// }

// ::-webkit-scrollbar-thumb {
//   /*滚动条里面小方块*/
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   background: #535353;
// }

// ::-webkit-scrollbar-track {
//   /*滚动条里面轨道*/
//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   border-radius: 10px;
//   background: #ededed;
// }

.hide-overflow-scrollbar {
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: none;
  }
}

.menu-label {
  font-size: d2r(14px);
}

.my-gallery {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img {
    margin-right: 16px;
    max-height: d2r(210px);
  }
}

.pswp__caption__center {
  text-align: center!important;
}


</style>
