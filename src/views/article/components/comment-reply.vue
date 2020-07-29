<template>
  <div class="comment-reply">
    <van-nav-bar
      class="nav-bar-reply"
      :title="comment.reply_count>0?comment.reply_count +'条回复':'暂无回复'"
    >
      <van-icon slot="left" name="cross" size="18" @click="$emit('close-reply')" />
    </van-nav-bar>
    <div class="scroll-warp">
      <comment-item :comment="comment" />
      <van-cell title="全部回复"></van-cell>
      <comment-list :source="comment.com_id" :list="replytList" :replyType="'c'" />
    </div>
    <div class="bottom-comment">
      <van-button class="com-btn" size="small" type="info" round @click="isReplyPopShow=true">写评论</van-button>
    </div>
    <van-popup v-model="isReplyPopShow" position="bottom">
      <comment-pop
        :target="comment.com_id"
        @publish-success="onPublishSuccess"
      />
    </van-popup>
  </div>
</template>
 <script>
import commentItem from "./comment-item.vue";
import commentList from "./comment-list.vue";
import commentPop from "./comment-pop.vue";
export default {
  name: "commentReply",
  components: {
    commentItem,
    commentList,
    commentPop,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isReplyPopShow: false,
      replytList: [], // 评论的回复列表
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPublishSuccess(data) {
      console.log(data);
      // 跟新评论数量
      this.comment.reply_count++;
      // 关闭弹层
      this.isReplyPopShow = false;
      // 给list添加数据
      this.replytList.unshift(data.new_obj);
    },
  },
};
</script>
 <style lang='less' scoped>
.comment-reply {
  .bottom-comment {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 88px;
    border-top: 1px solid #bfbfbf;
    display: flex;
    justify-content: center;
    align-items: center;
    .com-btn {
      width: 500px;
    }
  }
  .scroll-warp {
    position: fixed;
    bottom: 90px;
    top: 92px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
}
</style>