<template>
  <van-icon
    :class="isCollected?'collected':'unCollected'"
    :name="isCollected?'star':'star-o'"
    @click="onCollect"
  />
</template>
 <script>
import { collectArticleById, delCollectArticleById } from "@/api/article.js";
export default {
  name: "collectArticle",
  components: {},
  model: {
    prop: "isCollected",
    event: "update-collected",
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true,
    },
    artId: {
      type: [Number, String, Object],
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
  methods: {
    async onCollect() {
      try {
        if (this.isCollected) {
          // 已收藏
          const { data } = await delCollectArticleById(this.artId);
        } else {
          // 未收藏
          const data = await collectArticleById(this.artId);
        }
        this.$emit("update-collected", !this.isCollected);
        this.$toast.success(!this.isCollected ? "收藏成功" : "取消收藏");
      } catch (error) {
        this.$toast("操作失败，请稍后重试");
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.collected {
  color: coral;
}
.unCollected {
  color: "#777";
}
</style>