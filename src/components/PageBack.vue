<template>
  <div class="page-back">
    <i class="el-icon-back"></i>
    <span class="page-back-label" @click="onBack">返回上一级</span>
  </div>
</template>

<script>
export default {
  methods: {
    onBack() {
      history.back()
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.page-back {
  font-size: d2r(17px);
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #7aa9ec;
  cursor: pointer;
  .page-back-label {
      margin-left: d2r(11px);
  }
}
</style>
