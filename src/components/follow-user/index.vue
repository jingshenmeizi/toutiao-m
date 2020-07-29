<template>
  <van-button v-if="isFollowed" @click="onFollow" round size="small" :loading="followLoading">已关注</van-button>
  <van-button
    v-else
    @click="onFollow"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
  >关注</van-button>
</template>
 <script>
import { addFollow, delFollow } from "@/api/user.js";
export default {
  name: "followUser",
  components: {},
  //   自定义组件的 v-model 来修改属性名称
  model: {
    prop: "isFollowed",
    event: "update-follow",
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      followLoading: false, // 关注按钮上面的loading
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      this.followLoading = true;
      try {
        if (this.isFollowed) {
          //已关注
          await delFollow(this.userId);
        } else {
          // 未关注
          await addFollow(this.userId);
        }
        // this.article.is_followed = !this.article.is_followed;
        this.$emit("update-follow", !this.isFollowed);
      } catch (error) {
        let msg = "操作失败，请稍后重试";
        if (error.response && error.response.status == 400) {
          msg = "不能关注自己";
        }
        this.$toast(msg);
      }
      this.followLoading = false;
    },
  },
};
</script>
 <style lang='less' scoped>
</style>