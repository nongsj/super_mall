<template>
  <div class="bottom_bar">
    <div class="check_content">
      <check-button
        class="check_button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "../content/check_button/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  mixins: [],
  components: { CheckButton }, // 注册组件
  props: {},
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1. 使用filter
      // return !(this.cartList.filter(item => !item.checked).length)
      // 2. 使用find
      return !this.cartList.find((item) => !item.checked);
      // 3. 普通遍历 
      // for (const item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // return true
    },
  },
  methods: {
    checkClick(){
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false);
      } else{ // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true);
      }
    }
  },
};
</script>

<style scoped>
.bottom_bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.check_content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check_button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>