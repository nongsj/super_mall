<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend_item">
      <a href="#">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
 .recommend {
   display: flex;
   width: 100%;
   text-align: center;
   font-size: 12px;
   padding: 10px 0 20px;
   border-bottom: 8px solid #eee;
 }
 .recommend_item {
   flex: 1;
 }
 .recommend_item img {
   width: 70px;
   height: 70px;
   margin-bottom: 10px;
   border-radius:50%; 
   overflow:hidden;
 }
</style>