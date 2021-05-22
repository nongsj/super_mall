<template>
  <div id="shop_item">
    <div class="item_selector">
      <check-button
        :isChecked="itemInfo.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="item_img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <!-- <div class="item_info">
      <div class="item_title">{{ itemInfo.title }}</div>
      <div class="item_desc">{{ itemInfo.desc }}</div>
      <div class="info_bottom">
        <div class="item_price left">￥{{ itemInfo.price }}</div>
        <div class="item_price right">{{ itemInfo.count }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CheckButton from "../content/check_button/CheckButton.vue";
export default {
  name: "",
  mixins: [],
  components: { CheckButton }, // 注册组件
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    },
  },
};
</script>

<style scoped>
.shop_item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item_selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item_title,
.item_desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item_img {
  padding: 5px;
}

.item_img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item_info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item_info .item_desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info_bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info_bottom .item_price {
  color: orangered;
}
</style>