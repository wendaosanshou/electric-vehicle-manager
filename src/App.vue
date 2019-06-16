<template>
  <div id="app">
    <router-view/>
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
}

.table-disable-hover {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent !important;
  }
}

.tree-fix {
  font-size: d2r(13px) !important;
  .el-tree-node__label {
    font-size: d2r(13px)!important;
  }
}

.ipt-fix {
  &.el-input__inner {
    border-radius: 0;
  }
  .el-input__inner {
    border-radius: 0;
  }
  .el-textarea__inner {
    border-radius: 0;
  }
}

.el-select-dropdown__item {
  font-size: d2r(14px) !important;
}

.menu-fix {
  .el-menu-item,
  .el-submenu {
    text-align: left;
  }
}

.color-primary {
  color: #f66713;
  font-size: d2r(16px);
}
</style>
