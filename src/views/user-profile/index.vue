<template>
  <div class="user-profile">
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" ref="fileRef" @change="onFileChange" hidden />
    <van-cell title="头像" is-link @click="$refs.fileRef.click()">
      <van-image class="avater" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" @click="isNamePopShow=true" :value="user.name" is-link></van-cell>
    <van-cell title="性别" @click="isGenderPopShow=true" :value="user.gender===0?'男':'女'" is-link></van-cell>
    <van-cell title="生日" @click="isBirthPopShow=true" :value="user.birthday" is-link></van-cell>
    <!-- 修改头像 -->
    <van-popup v-if="isPhotoPopShow" v-model="isPhotoPopShow" position="bottom" :style="{ height: '100%' }">
      <update-photo @update-photo="user.photo=$event" :img="img" @close-photo="isPhotoPopShow=false" />
    </van-popup>
    <!-- 修改昵称弹层 -->
    <van-popup
      v-if="isNamePopShow"
      v-model="isNamePopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name v-model="user.name" @close-namepop="isNamePopShow=false" />
    </van-popup>
    <!-- 修改性别弹层 -->
    <van-popup v-if="isGenderPopShow" v-model="isGenderPopShow" position="bottom">
      <update-gender v-model="user.gender" @close-genderpop="isGenderPopShow=false" />
    </van-popup>
    <!-- 修改生日弹层 -->
    <van-popup v-if="isBirthPopShow" v-model="isBirthPopShow" position="bottom">
      <update-birth v-model="user.birthday" @close-birthpop="isBirthPopShow=false" />
    </van-popup>
  </div>
</template>
 <script>
import { getUserProfile } from "@/api/user.js";
import updateName from "./components/update-name";
import updateGender from "./components/update-gender";
import updateBirth from "./components/update-birth";
import updatePhoto from "./components/update-photo";
export default {
  name: "userProfile",
  components: {
    updateName,
    updateGender,
    updateBirth,
    updatePhoto,
  },
  props: {},
  data() {
    return {
      user: {},
      isPhotoPopShow: false,
      isNamePopShow: false,
      isGenderPopShow: false,
      isBirthPopShow: false,
      img: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.user = data.data;
      } catch (error) {
        this.$toast("获取信息失败");
      }
    },
    // 点击头像，选择文件后
    onFileChange() {
      const file = this.$refs.fileRef.files[0];
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file);
      this.isPhotoPopShow = true;
      // input的change时间，如果再次点击相同的文件，file的文件没有变化，则不会触发
      this.$refs.fileRef.value = "";
    },
  },
};
</script>
 <style lang='less' scoped>
.user-profile {
  .van-popup {
    background-color: rgb(245, 244, 244);
  }
  .avater {
    width: 60px;
    height: 60px;
  }
}
</style>