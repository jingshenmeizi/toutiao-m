<template>
  <van-cell class="article-item">
    <div class="title van-multi-ellipsis--l2" slot="title">{{article.title}}阿凡達是否阿斯蒂芬哈士大夫哈里斯的法律上的回復a</div>
    <van-image
      fit="cover"
      class="img-right"
      v-if="article.cover.type===1"
      slot="default"
      :src="article.cover.images[0]"
    />
    <div slot="label" class="label-wrap">
      <div class="label-img-wrap" v-if="article.cover.type===3">
        <van-image
          fit="cover"
          class="label-item-img"
          v-for="(img,index) in article.cover.images"
          :key="index"
          :src="img"
        />
      </div>
      <div class="label-text-wrap">
        <span class="aut-name">{{article.aut_name}}</span>
        <span class="comm-count">{{article.comm_count}}评论</span>
        <span class="time">{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
  </van-cell>
</template>
 <script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
 <style lang='less' scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
  }
  .van-cell__value {
    width: 232px;
    height: 146px;
    margin-left: 6px;
  }
  .label-wrap {
    .label-img-wrap {
      display: flex;
      padding: 20px 0 30px;
      .label-item-img {
        display: flex;
        flex-direction: row;
        flex: 1;
        height: 146px;
        width: 100%;
        &:not(:last-child) {
          padding-right: 4px;
        }
      }
    }
    .label-text-wrap {
      font-size: 20px;
      color: #b4b4b4;
      span {
        margin-right: 28px;
      }
    }
  }
}
</style>