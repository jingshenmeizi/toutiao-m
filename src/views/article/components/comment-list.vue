<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <comment-item
      :comment="item"
      v-for="(item,index) in list"
      :key="index"
      @click-reply="$emit('click-reply',$event)"
    />
  </van-list>
</template>
 <script>
import { getCommentList } from "@/api/comment.js";
import commentItem from "./comment-item.vue";
export default {
  name: "commentList",
  components: {
    commentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    replyType: {
      type: String,
      default: "a",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    // 手动调用onload第一次不会默认开始 loading
    this.loading = true;
    this.onLoad();
  },
  mounted() {},
  methods: {
    async onLoad() {
      this.loading = true;
      try {
        // 获取数据
        const { data } = await getCommentList({
          type: this.replyType,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        // 添加列表
        const { results } = data.data;
        this.list.push(...results);
        this.$emit("total-count", data.data);
        // 关闭loading
        this.loading = false;
        // 判断长度，跟新请求参数
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }

      // 结束
    },
  },
};
</script>
 <style lang='less' scoped>
</style>