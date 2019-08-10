<template>
  <div class="page-title">
    <i class="icon-dot" v-if="hasDot"></i>
    <span class="title-label">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    hasDot: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
$basic-ratio: 1.4;

@function d2r($designpx) {
  @return $designpx / $basic-ratio;
}

.page-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: d2r(22px);
  color: rgba(59, 72, 89, 1);
  .icon-dot {
    display: block;
    width: d2r(12px);
    height: d2r(12px);
    border-radius: d2r(12px);
    background: #ff7525;
  }
  .title-label {
    margin-left: d2r(10px);
    font-size: d2r(17px);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #3b4859;
    white-space: nowrap;
  }
}
</style>
