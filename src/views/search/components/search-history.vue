<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="isDel">
        <span class="del-all" @click="$emit('clear-all-histories')">全部删除</span>
        <span @click="isDel=false">完成</span>
      </span>
      <van-icon name="delete" v-if="!isDel" @click="isDel=true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(history,index) in searchHistories"
      :key="index"
      :title="history"
      @click="onClickHistory(history,index)"
    >
      <van-icon name="close" v-if="isDel"></van-icon>
    </van-cell>
  </div>
</template>
 <script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDel: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickHistory(historyText, index) {
      if (this.isDel) {
        // 在删除状态下
        this.$emit("del-history", index);
        // 引用类型也可以直接修改，赋值不能，赋值父组件监听不到，但是修改值可以
        // this.searchHistories.splice(index, 1);
      } else {
        // 在搜索状态下
        this.$emit("search-history", historyText);
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.search-history {
  .del-all {
    padding-right: 15px;
  }
}
</style>