<template>
  <div class="bottom_bar">
    <dir class="bar_item bar_left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </dir>
    <div class="bar_item bar_right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  mixins: [],
  components: {}, // 注册组件
  props: {}, // 接收父组件传参
  data() {
    return {};
  },
  methods: {
    addToCart(){
      this.$emit('addToCart')
    }
  }
};
</script>

<style scoped>
/* .bottom_bar{
  height: 58px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
} */
.bottom_bar {
  height: 49px;
  background: #fff;
  position: relative;

  display: flex;
  text-align: center;
}

.bar_item {
  flex: 1;
  display: flex;
}

.bar_item > div {
  flex: 1;
}

.bar_left .text {
  font-size: 13px;
}

.bar_left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 3px;
  background: url("~@/assets/img/detail/detail_bottom.png");
}

.bar_left .service {
  background-position: 0 -54px;
}

.bar_left .shop {
  background-position: 0 -98px;
}

.bar_right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}

.bar_right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar_right .buy {
  background-color: #f69;
}
</style>