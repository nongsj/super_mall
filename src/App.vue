<template>
  <div id="app">
    <main-tabbar />
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  // @ 表示src目录,所以如果指定src目录下的文件的话，只需要 @/xxx/xxx   即可。
  import MainTabbar from "@/components/content/main_tabbar/MainTabbar.vue";

  export default {
    components: { MainTabbar },
  };
</script>

<style lang="scss">
  @import "~@/assets/css/base.css";
</style>
