<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" size="small" type="primary" round to="/search">
        <i class="iconfont icon-sousuo"></i> 搜索
      </van-button>
    </van-nav-bar>
    <!-- 滑动tab -->
    <van-tabs class="tab-box" v-model="active" animated swipeable>
      <van-tab :key="channel.id" v-for="channel in channels" :title="channel.name">
        <!-- 文章列表子组件 -->
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder" />
      <div slot="nav-right" class="hanbao-btn" @click="isChannelShow=true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="isChannelShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit @update-channel="onUpdateChannel" :my-channels="channels" :active="active"></channel-edit>
    </van-popup>
  </div>
</template>
 <script>
import { getUserChannels } from "@/api/user.js";
// 导入文章列表组件
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage.js";
export default {
  name: "home",
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChannelShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadUserChannels();
  },
  mounted() {},
  methods: {
    async loadUserChannels() {
      let channelTemp = [];
      try {
        if (this.user) {
          // 用户登录了，去接口获取频道列表
          const { data } = await getUserChannels();
          channelTemp = data.data.channels;
        } else {
          // 未登录，从本地存储中获取
          const localChannel = getItem("LOCAL_CHANNELS");
          if (localChannel) {
            channelTemp = localChannel;
          } else {
            // 本地存储没有数据
            const { data } = await getUserChannels();
            channelTemp = data.data.channels;
          }
        }
        this.channels = channelTemp;
      } catch (error) {
        this.$toast("加载频道列表失败！");
      }
    },
    //  在子组件中，请求切换频道
    onUpdateChannel(channel, isChannelShow = this.isChannelShow) {
      this.active = channel;
      // 如果是因为编辑删除了频道导致激活的channel的索引变化，不需要关闭弹层
      this.isChannelShow = isChannelShow;
    },
  },
};
</script>
 <style lang='less' scoped>
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    background-color: #5babfb;
    border: 0;
    .icon-sousuo {
      font-size: 32px;
    }
  }
  .tab-box {
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0px;
      width: 100%;
      .van-tabs__nav {
        padding-bottom: 0;
        .van-tab {
          min-width: 192px;
          border: 1px solid #edeff3;
          padding: 0;
          .van-tab__text {
            font-size: 28px !important;
            color: #777;
          }
        }
        .van-tab--active {
          .van-tab__text {
            color: #333 !important;
            font-weight: 700;
          }
        }
        .van-tabs__line {
          width: 31px !important;
          height: 6px !important;
          bottom: 15px;
          background-color: #3296fa !important;
        }
        .hanbao-btn {
          position: fixed;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 68px;
          height: 83px;
          background-color: #fff;
          opacity: 0.902;
          .iconfont {
            font-size: 33px;
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            width: 1px;
            height: 100%;
            background: url(~@/assets/gradient-gray-line.png);
            background-size: contain;
          }
        }
        .placeholder {
          width: 68px;
          height: 83px;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>