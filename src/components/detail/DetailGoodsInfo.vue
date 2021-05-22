<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods_info">
    <div class="info_desc clear_fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info_key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info_list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  mixins: [],
  components: {}, // 注册组件
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imgLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods_info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info_desc {
  padding: 0 15px;
}

.info_desc .start,
.info_desc .end {
  width: 90px;
  height: 1px;
  background-color: #f3f3f5;
  position: relative;
}

.info_desc .start {
  float: left;
}

.info_desc .end {
  float: right;
}

.info_desc .start::before,
.info_desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info_desc .end::after {
  right: 0;
}

.info_desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info_key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info_list img {
  width: 100%;
}
</style>