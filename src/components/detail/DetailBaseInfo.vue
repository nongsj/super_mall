<template>
  <div v-if="Object.keys(goods).length !== 0" class="base_info">
    <div class="info_title">{{ goods.title }}</div>
    <div class="info_price">
      <span class="n_price">{{ goods.newPrice }}</span>
      <span class="o_price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info_other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info_servcie">
      <span
        class="info_service_item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.info_title {
  color: #222;
}

.info_price {
  margin-top: 10px;
}

.info_price .n_price {
  font-size: 24px;
  color: var(--color-high-text);
}

.info_price .o_price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.info_price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;

  /* 让元素上浮一些：使用相对定位即可 */
  position: relative;
  top: -8px;
}

.info_other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 1);
  justify-content: space-between;
}

.info_servcie {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info_service_item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info_service_item span {
  font-size: 13px;
  color: #333;
}
</style>