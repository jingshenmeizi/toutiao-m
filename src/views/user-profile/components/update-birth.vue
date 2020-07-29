<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close-birthpop')"
      @confirm="onConfirmBirth"
    />
  </div>
</template>
 <script>
import { updateUserProfile } from "@/api/user.js";
import dayjs from "dayjs";
export default {
  name: "updateBirth",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirmBirth() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
      });
      try {
        let currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        await updateUserProfile({
          birthday: currentDate,
        });
        // 跟新视图
        this.$emit("input", currentDate);
        // 关闭弹窗
        this.$emit("close-birthpop");
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
</style>