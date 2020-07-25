<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="article in list" :key="article.art_id" :article="article"></article-item>
        <!-- <van-cell v-for="item in list" :key="item.aut_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
 <script>
import ArticleItem from "@/components/article-item";
import { getArticleList } from "@/api/article.js";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      pre_timestamp: "",
      isRefreshing: false,
      refreshSuccessText: "刷新成功",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 加载文章列表
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now(),
          with_top: 0,
        });
        const { results } = data.data;
        this.list.push(...results);
        // 加载状态结束
        this.loading = false;
        // 判断本次请求回来的结果是否还有数据
        if (results.length) {
          // 还有数据，把返回的时间戳赋值给下次要传的参数里
          this.pre_timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    // 刷新文章列表
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0,
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.refreshSuccessText = `刷新成功，更新了${results.length}篇文章`;
        // 加载状态结束
        this.isRefreshing = false;
      } catch (error) {
        this.refreshSuccessText = "刷新失败";
        this.isRefreshing = false;
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.article-list-container {
  height: 79vh;
  overflow-y: auto;
}
</style>