<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
            :time="10*1000"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            @click="onSendSms"
            class="send-sms-btn"
            round
            size="small"
            type="default"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
 <script>
import { login, sendSms } from "@/api/user.js";
export default {
  name: "loginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111111", //手机号
        code: "246810" //验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /^1[3-9]{1}\d{9}$/,
            message: "手机号格式错误"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误"
          }
        ]
      },
      isCountDownShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1-拿到表单数据
      const user = this.user;
      // 2-验证
      //  在组件中必须使用this.$
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000，如果为0则一直提示，但是当新的toast被调用时，旧的就会被覆盖
      });
      // 3-发送请求 // 4-处理结果
      try {
        const res = await login(user);
        this.$toast.success("登录成功");
        // 登录成功，保存token
        this.$store.commit("setToken", res.data.data);
        this.$router.back();
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          console.log("登录失败，请稍后重试", error);
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      // 1-校验手机号
      try {
        await this.$refs.loginFormRef.validate("mobile");
      } catch (error) {
        return console.log("验证失败", error);
      }
      // 2-验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3-发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (error) {
        this.isCountDownShow = false;
        if (error.response.status === 429) {
          this.$toast("您的操作太频繁了,请稍后重试");
        } else {
          this.$toast("发送失败,请稍后重试");
        }
      }
    }
  }
};
</script>
 <style lang='less' scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    margin: 53px 31px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>