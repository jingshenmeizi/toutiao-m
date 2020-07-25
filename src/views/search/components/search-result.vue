<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
 <script>
import { getSearchResults } from "@/api/search.js";
export default {
  name: "SearchResult",
  components: {},
  props: {
    seggestText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      pageNum: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 给列表中添加数据
      try {
        const { data } = await getSearchResults({
          page: this.pageNum,
          per_page: 10,
          q: this.seggestText,
        });
        const { results } = data.data;
        this.list.push(...results);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (results.length) {
          this.pageNum++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
 <style lang='less' scoped>
</style>