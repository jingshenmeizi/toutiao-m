<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close-namepop')"
      @click-right="onClickRight"
    />
    <div class="field-warp">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
 <script>
import { updateUserProfile } from "@/api/user.js";
export default {
  name: "updateName",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
      });
      try {
        let localName = this.localName;
        if (!localName) {
          return;
        }
        await updateUserProfile({
          name: localName,
        });
        // 跟新视图
        this.$emit("input", localName);
        // 关闭弹窗
        this.$emit("close-namepop");
        this.$toast.success("保存成功");

        // 提示成功
      } catch (error) {
        this.$toast("操作失败，请稍后重试");
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.update-name {
  .field-warp {
    padding: 20px;
  }
}
</style>