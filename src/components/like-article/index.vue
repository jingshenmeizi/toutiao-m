<template>
  <van-icon
    :class="isLiked==1?'liked':'unliked'"
    :name="isLiked==1?'good-job':'good-job-o'"
    @click="onLike"
    :loading="isLoading"
  />
</template>
 <script>
 import { delLikedArticleById, likedArticleById } from "@/api/article.js";
export default {
  name: "likeArticle",
  components: {},
  model: {
    prop: "isLiked",
    event: "update-liked",
  },
  props: {
    isLiked: {
      type: Number,
      required: true,
    },
    artId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLike() {
      this.isLoading = true;
      try {
        if (this.isLiked) {
          // 已收藏
          const { data } = await delLikedArticleById(this.artId);
        } else {
          // 未收藏
          const data = await likedArticleById(this.artId);
        }
        this.$emit("update-liked", this.isLiked==1?-1:1);
        this.$toast.success(this.isLiked==-1 ? "点赞成功" : "取消点赞");
      } catch (error) {
        this.$toast("操作失败，请稍后重试");
      }
      this.isLoading = false;
    },
  },
};
</script>
 <style lang='less' scoped>
.liked {
  color: rgb(248, 101, 101);
}
.unliked {
  color: "#777";
}
</style>