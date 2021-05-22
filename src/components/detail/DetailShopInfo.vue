<template>
  <div class="shop_info">
    <div class="shop_top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop_middle">
      <div class="shop_middle_item shop_middle_left">
        <div class="info_sells">
          <div class="sells_count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells_text">总销量</div>
        </div>
        <div class="info_goods">
          <div class="goods_count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods_text">全部宝贝</div>
        </div>
      </div>
      <div class="shop_middle_item shop_middle_right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ score_better: item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ better_more: item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop_bottom">
      <div class="enter_shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  mixins: [],
  components: {}, // 注册组件
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop_info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop_top {
  line-height: 45px;
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
}

.shop_top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 1);
}

.shop_top .title {
  margin-left: 10px;
  vertical-align: center;
}

.shop_middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shop_middle_item {
  flex: 1;
}

.shop_middle_left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 1);
}

.sells_count,
.goods_count {
  font-size: 18px;
}

.sells_text,
.goods_text {
  margin-top: 10px;
  font-size: 12px;
}

.shop_middle_right table {
  width: 120px;
  margin-left: 30px;
}

.shop_middle_right table td {
  padding: 5px 0;
}

.shop_middle_right .score {
  color: #5ea732;
}

.shop_middle_right .score_better {
  color: #f12e3a;
}

.shop_middle_right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shop_middle_right .better_more span {
  background-color: #f13e3a;
}

.shop_bottom {
  text-align: center;
  margin-top: 10px;
}

.enter_shop{
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>