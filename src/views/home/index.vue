<template>
  <div id="home">
    <var-bar class="shopping_cart">
      <div slot="center">购物街</div>
    </var-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab_control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import VarBar from "@/components/common/navbar/VarBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import GoodsList from "@/components/content/goods/GoodsList.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";

import HomeSwiper from "@/components/home/HomeSwiper.vue";
import FeatureView from "@/components/home/FeatureView.vue";
import RecommendView from "@/components/home/RecommendView.vue";

import { getHomeMultidata, getHomeGoods } from "@/api/home";
import { scrollTopMixin } from "@/utils/mixin";

export default {
  mixins: [scrollTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    // 创建home时，赋 y 值，滚动到指定位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 记住离开home销毁 的 y值
    // this.saveY = this.$refs.scroll.getScrollY();
    this.saveY = this.$refs.scroll._scroll.y;
    console.log(this.saveY);
  },
  created() {
    // 请求 banners 和 recommends 数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    /**
     * 事件监听相关方法
     */
    // '流行', '新款', '精选' 模块数据切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 获取高度，并决定是否显示返回顶部按钮
      this.isShowBackTop = -position.y > 1000;

      // 决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取<tab-control/> 组件的高度并赋值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata()
        .then((result) => {
          this.banners = result.data.banner.list;
          this.recommends = result.data.recommend.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((result) => {
          this.goods[type].list.push(...result.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    VarBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  }, // 注册组件
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.shopping_cart {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动，现换成 better-scroll 滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/

.tab_control {
  position: relative;
  z-index: 9;
}
</style>