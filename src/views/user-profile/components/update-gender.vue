<template>
  <div>
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirmGender"
      @cancel="$emit('close-genderpop')"
      @change="onChangeGender"
      :default-index="localGender"
    />
  </div>
</template>
 <script>
import { updateUserProfile } from "@/api/user.js";
export default {
  name: "updateGender",
  components: {},
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirmGender(value, index) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
      });
      try {
        let localGender = this.localGender;
        await updateUserProfile({
          gender: localGender,
        });
        // 跟新视图
        this.$emit("input", localGender);
        // 关闭弹窗
        this.$emit("close-genderpop");
        this.$toast.success("保存成功");

        // 提示成功
      } catch (error) {
        this.$toast("操作失败，请稍后重试");
      }
    },
    onChangeGender(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>
 <style lang='less' scoped>
</style>