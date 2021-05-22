<template>
  <div id="nav_bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    created() {},// dom元素创建之前执行
    mounted() {},// dom元素创建之后执行
    methods: {},// 定义方法的地方
    computed: {},// 计算属性
    components: {},// 注册组件
    destroyed() {},// 销毁时操作可编辑在此处,例如：A组件跳转B组件，此时A组件会被销毁，则会调用
    activated() {},// 组件活跃时,只有在使用<keep-alive>时才有效果
    deactivated() {},// 组件不活跃时,只有在使用<keep-alive>时才有效果
  }
</script>

<style scoped>
 #nav_bar {
   display: flex;
   height: 44px;
   line-height: 44px;
   text-align: center;
   box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
 }
  
  .left,.right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>