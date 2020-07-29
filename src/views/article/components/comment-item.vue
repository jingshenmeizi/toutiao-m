<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{comment.content}}</p>
        <p>
          <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
          <van-button size="mini" type="default" @click="$emit('click-reply',comment)"> 回复 {{comment.reply_count}}</van-button>
        </p>
      </div>
      <van-icon
        slot="right-icon"
        :name="comment.is_liking? 'good-job' : 'good-job-o'"
        :color="comment.is_liking?'red':''"
        @click="onCommentLike"
      >{{comment.like_count || ' 赞'}}</van-icon>
    </van-cell>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { delLikedCommentById, likedCommentById } from "@/api/comment.js";
export default {
  name: "commentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },

  methods: {
    // 点赞文章
    async onCommentLike() {
      try {
        if (this.comment.is_liking) {
          await delLikedCommentById(this.comment.com_id);
          this.comment.like_count--;
        } else {
          await likedCommentById(this.comment.com_id);
          this.comment.like_count++;
        }
        this.comment.is_liking = !this.comment.is_liking;
      } catch (error) {
        console.log(error);
        this.$toast("操作失败，请重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>