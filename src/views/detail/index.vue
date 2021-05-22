<template>
  <div id="detail">
    <detail-nav-bar
      class="detail_nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="" :show=""></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "@/components/detail/DetailNavBar.vue";
import DetailSwiper from "@/components/detail/DetailSwiper.vue";
import DetailBaseInfo from "@/components/detail/DetailBaseInfo.vue";
import DetailShopInfo from "@/components/detail/DetailShopInfo.vue";
import DetailGoodsInfo from "@/components/detail/DetailGoodsInfo.vue";
import DetailParamInfo from "@/components/detail/DetailParamInfo.vue";
import DetailCommentInfo from "@/components/detail/DetailCommentInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from "../../components/detail/DetailBottomBar.vue";
// import Toast from "../../components/common/toast/Toast.vue";

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "@/api/detail";
import { debouce } from "@/utils/debouce";
import { scrollTopMixin } from "@/utils/mixin";

import { mapActions } from "vuex";

export default {
  name: "detail", //这里关乎 keep-alive 中的 exclude 是否生效 <keep-alive exclude="detail">
  mixins: [scrollTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.获取商品id
    this.iid = this.$route.params.iid;
    // 2.请求商品详情数据
    this.getDetail();
    // 3.请求推荐数据
    this.getRecommend();
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debouce(() => {
      // 获取 商品、参数、评论、推荐等坐标
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["addCart"]),
    getDetail() {
      getDetail(this.iid)
        .then((result) => {
          const data = result.result;
          // 获取顶部轮播图
          this.topImages = data.itemInfo.topImages;

          // 获取商品信息
          this.goods = new Goods(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          );

          // 创建店铺信息对象
          this.shop = new Shop(data.shopInfo);

          // 获取商品详情信息
          this.detailInfo = data.detailInfo;

          // 获取参数信息
          this.paramInfo = new GoodsParam(
            data.itemParams.info,
            data.itemParams.rule
          );

          // 获取评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    getRecommend() {
      getRecommend()
        .then((result) => {
          this.recommends = result.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detailImageLoad() {
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 获取高度，并决定是否显示返回顶部按钮
      this.isShowBackTop = -position.y > 1000;
      // 取坐标y
      const positionY = -position.y;
      let length = this.themeTopYs.length;

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product);
      this.addCart(product).then((res) => {
        console.log(this.$toast);
        this.$toast.methods.show(res,2000)
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 992;
  background-color: #fff;
  height: 100vh;
}

.detail_nav {
  position: relative;
  z-index: 993;
  background-color: #fff;
}

.content {
  /* 93px:顶部44px  底部49px */
  height: calc(100% - 93px);
}
</style>