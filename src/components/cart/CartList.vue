<template>
  <div class="cart_list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  mixins: [],
  components: { Scroll, CartListItem }, // 注册组件
  props: {}, // 接收父组件传参
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart_list {
  height: calc(100% - 133px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>