<template>
  <div class="search-suggest">
    <van-cell
      :key="index"
      v-for="(text,index) in suggestions"
      icon="search"
      @click="$emit('search',text)"
    >
      <div slot="title" v-html="highLight(text)"></div>
    </van-cell>
  </div>
</template>
 <script>
import { getSuggestions } from "@/api/search.js";
import { debounce } from "lodash";
export default {
  name: "SearchSuggest",
  components: {},
  props: {
    seggestText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    // 监听seggestText的变化，只要变了立即调用接口
    seggestText: {
      // handler是固定写法
      // debounce是lodash里的，防抖节流阀函数
      handler: debounce(function (val) {
        this.loadSuggestions(val);
      }, 200),
      immediate: true, // 立即以表达式的当前值触发回调
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSuggestions(q) {
      try {
        const { data } = await getSuggestions(q);
        this.suggestions = data.data.options;
      } catch (error) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
    // 处理搜索关键字高亮
    highLight(text) {
      var repStr = `<span class="high">${this.seggestText}</span>`;
      var reg = new RegExp(this.seggestText, "gi");
      return text.replace(reg, repStr);
    },
  },
};
</script>
 <style lang='less' scoped>
.search-suggest {
  /deep/ .high {
    color: #3296fa;
  }
}
</style>