<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment_info">
    <div class="info_header">
      <div class="header_title">用户评价</div>
      <div class="header_more">
        更多
        <i class="arrow_right"></i>
      </div>
    </div>

    <div class="info_user">
      <img :src="commentInfo.user.avatar" alt="" @load="detailImageLoad" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info_detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info_other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info_imgs">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/format_date";

export default {
  name: "DetailCommentInfo",
  mixins: [],
  components: {}, // 注册组件
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  }, // 接收父组件传参
  filters: {
    showDate: function (val) {
      // 1、将时间戳转换成Date对象
      let date = new Date(val * 1000);
      // 2、将时间进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    detailImageLoad() {
      this.$emit("detailImageLoad");
    },
  },
};
</script>

<style scoped>
.comment_info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}

.info_header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}

.header_title {
  float: left;
  font-size: 15px;
}

.header_more {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}

.info_user {
  padding: 10px 0 5px;
}

.info_user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info_user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info_detail {
  padding: 0 5px 15px;
}

.info_detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info_detail .info_other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info_other .date {
  margin-right: 8px;
}

.info_imgs {
  margin-top: 10px;
}

.info_imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>