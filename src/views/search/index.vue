<template>
  <div class="search-container">
    <!-- 搜索 -->
    <form action="/" class="search-form">
      <van-search
        v-model="seggestText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow=false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result :seggest-text="seggestText" v-if="isResultShow"></search-result>
    <!-- /搜索结果 -->

    <!-- 搜索建议 -->
    <search-suggest :seggest-text="seggestText" @search="onSearch" v-else-if="seggestText"></search-suggest>
    <!-- /搜索建议 -->

    <!-- 搜索历史 -->
    <search-history
      :search-histories="searchHistories"
      @del-history="updateHistory"
      @search-history="onSearch"
      @clear-all-histories="searchHistories = []"
      v-else
    ></search-history>
    <!-- /搜索历史 -->
  </div>
</template>
 <script>
import SearchHistory from "./components/search-history";
import SearchSuggest from "./components/search-suggest";
import SearchResult from "./components/search-result";
import { getItem, setItem } from "@/utils/storage.js";
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult,
  },
  props: {},
  data() {
    return {
      isResultShow: false,
      seggestText: "",
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORY") || [],
    };
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setItem("TOUTIAO_SEARCH_HISTORY", val);
    },
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      // 搜索框展示最新值
      this.seggestText = val;
      // 讲值存入历史记录
      this.saveToHistory();
      this.isResultShow = true;
    },
    saveToHistory() {
      const index = this.searchHistories.indexOf(this.seggestText);
      if (index !== -1) {
        // 已经存在了,删除
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(this.seggestText);
    },
    updateHistory(index) {
      this.searchHistories.splice(index, 1);
    },
    onCancel() {
      this.$toast("取消");
    },
  },
};
</script>
 <style lang='less' scoped>
.search-container {
  padding-top: 109px;
  .van-search__action {
    color: #fff;
    font-size: 28px;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>