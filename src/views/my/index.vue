<template>
  <div class="my-container">
    <!-- 已登录的个人信息头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round class="avater" :src="userInfo.photo" />
          <span class="text">{{userInfo.name}}</span>
        </div>  
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录的头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="gird-nav" :column-num="2" clickable>
      <van-grid-item class="gird-item">
        <i class="iconfont icon-shoucang" slot="icon"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="gird-item">
        <i class="iconfont icon-lishi" slot="icon"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell class="cell-msg" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" class="cell-logout" title="退出登录" @click="onLogout" clickable />
  </div>
</template>
 <script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";
export default {
  name: "my",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    if (this.$store.state.user) {
      this.loadUserInfo();
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 弹框确认
      this.$dialog
        .confirm({
          title: "确定退出吗？",
        })
        .then(() => {
          // on confirm
          this.$store.commit("setToken", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data.data;
      } catch (error) {
        this.$toast("获取用户失败，请稍后重试");
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.my-container {
  .header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }
  .user-info {
    color: #fff;
    .base-info {
      height: 239px;
      padding: 82px 31px 26px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avater {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
        }
        .text {
          font-size: 30px;
          margin-left: 23px;
        }
      }
    }
    .data-stats {
      height: 129px;
      display: flex;
      justify-content: space-around;
      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .gird-nav {
    .gird-item {
      .icon-shoucang {
        font-size: 45px;
        color: #eb5253;
      }
      .icon-lishi {
        font-size: 45px;
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .cell-msg,
  .cell-logout {
    margin-top: 9px;
  }
  .cell-logout {
    text-align: center;
  }
}
</style>