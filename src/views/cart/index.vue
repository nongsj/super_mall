<template>
  <div class="cart">
    <!-- 导航 -->
    <var-bar class="nav_bar">
      <div slot="center">购物车({{ length }})</div>
    </var-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import VarBar from "@/components/common/navbar/VarBar.vue";
import CartList from "../../components/cart/CartList.vue";
import CartBottomBar from "../../components/cart/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    VarBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    /**两种语法 */
    // ...mapGetters(["cartLength", "cartList"]),
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav_bar {
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>