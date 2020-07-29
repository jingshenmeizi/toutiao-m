<template>
  <div class="comment-pop">
    <van-field
      class="pop-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="pop-btn" :disabled="!message.length" @click="OnPublishComment">发布</van-button>
  </div>
</template>

<script>
import { publishComment } from "@/api/comment.js";
export default {
  name: "CommentPop",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  inject: {
    articleId: { type: [Number, String, Object], default: null },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发布文章
    async OnPublishComment() {
      this.$toast.loading({
        message: "发布...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
      });
      try {
        const { data } = await publishComment({
          target: this.target.toString(), // 评论的目标id
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : this.articleId, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        this.message = "";
        this.$emit("publish-success", data.data);
        this.$toast.success("发布成功");
      } catch (error) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-pop {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .pop-field {
    background-color: #f5f7f9;
  }
  .pop-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>