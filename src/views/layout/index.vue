<template>
  <div class="layout-container">
    <!-- 放置路由出口 -->
    <router-view></router-view>
    <van-tabbar router v-model="active" class="layout-tabbar">
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="vedio">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
 <script>
export default {
  name: "layout",
  components: {},
  props: {},
  data() {
    return { active: 0 };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
 <style lang='less' scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 46px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>