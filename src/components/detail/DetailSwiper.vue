<template>
    <swiper class="detail_swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  mixins: [],
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {}, // 计算属性
  watch: {}, // watch的作用可以监控data中某个值的变换，并调用因为变化需要执行的方法。
  created() {}, // dom元素创建之前执行
  mounted() {}, // dom元素创建之后执行
  methods: {}, // 定义方法的地方
  destroyed() {}, // 销毁时操作可编辑在此处,例如：A组件跳转B组件，此时A组件会被销毁，则会调用
  activated() {}, // 组件活跃时,只有在使用<keep-alive>时才有效果
  deactivated() {}, // 组件不活跃时,只有在使用<keep-alive>时才有效果
};
</script>

<style scoped>
.detail_swiper {
  height: 300px;
  overflow: hidden;
}
</style>