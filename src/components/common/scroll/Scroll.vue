<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
import Pullup from "@better-scroll/pull-up";
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);
BScroll.use(Pullup);
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      _scroll: null,
    };
  },
  mounted() {
    // 创建Bscroll对象
    this._scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: true,
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
    });
    // 监听滚动位置
    this._scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this._scroll.on("pullingUp", () => {
      console.log("上拉更多");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this._scroll && this._scroll.scrollTo && this._scroll.scrollTo(x, y, time);
    },
    refresh() {
      this._scroll.refresh();
    },
    finishPullUp() {
      this._scroll.finishPullUp();
    },
    getScrollY() {
      return this._scroll ? this._scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>