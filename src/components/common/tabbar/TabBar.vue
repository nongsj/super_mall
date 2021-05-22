<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  /* 此属性是自己添加的，当很多层使用绝对定位的时候，用z-index属性的大小决定谁处于最外层，数字越大的处于外层 */
  z-index: 991;
}
</style>