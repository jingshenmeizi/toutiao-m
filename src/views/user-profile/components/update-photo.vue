<template>
  <div class="update-photo">
    <img ref="imgRef" :src="img" class="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close-photo')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>
 <script>
// 导入copper
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user.js";
export default {
  name: "updatePhoto",
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 裁剪区域需要在dom加载完才显示，所以在mounted里面
    const image = this.$refs.imgRef;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updatePhoto(blob);
      });
    },
    async updatePhoto(blob) {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁用背景点击
          duration: 0, // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
        });
        const formData = new FormData();
        formData.append("photo", blob);
        const { data } = await updateUserPhoto(formData);
        console.log(data);
        // 关闭弹层
        this.$emit("close-photo");
        // 跟新视图头像
        this.$emit("update-photo", data.data.photo);
        // 更新成
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>