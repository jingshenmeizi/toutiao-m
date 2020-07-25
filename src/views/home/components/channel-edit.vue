<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="onChangeEdit"
      >{{ isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :column-num="4" :gutter="10">
      <van-grid-item
        :icon="isEdit&&!fixChannels.includes(channel.id)?'close':''"
        v-for="(channel,index) in MyChannels"
        :key="index"
        @click="onDelChannel(channel,index)"
      >
        <!-- <span slot="text" :class="index===active?'focus':''">{{channel.name}}</span> -->
        <span slot="text" :class="{focus:index===active}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="title" :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="tuijian-grid" :column-num="4" :gutter="10">
      <van-grid-item
        v-for="(channel,index) in tuiJianChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onAddToMyChannel(channel)"
      />
    </van-grid>
  </div>
</template>
 <script>
import {
  getAllChannels,
  addUserChannel,
  delUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    MyChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixChannels: [0], //固定的频道，不允许删除
    };
  },
  computed: {
    ...mapState(["user"]),
    tuiJianChannels() {
      //   const channels = [];
      //   this.allChannels.forEach((channel) => {
      //     let res = this.MyChannels.find((item) => {
      //       return item.id === channel.id;
      //     });
      //     if (!res) {
      //       channels.push(channel);
      //     }
      //   });
      //   return channels;

      // 优化后的代码
      return this.allChannels.filter((channel) => {
        return !this.MyChannels.find((item) => item.id === channel.id);
      });
    },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("获取频道列表失败");
      }
    },
    // 点击推荐频道，添加至我的频道
    onAddToMyChannel(channel) {
      this.MyChannels.push(channel);
      // ---持久化处理---
      // 登录和未登录是分开的
      // 1-首先判断用户是否登录
      this.addChannel(channel);
    },
    async addChannel(channel) {
      if (this.user) {
        // 已登录，通过请求添加
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.MyChannels.length,
          });
        } catch (error) {
          this.$toast("操作失败，请稍后重试");
        }
      } else {
        // 未登录，存放在本地存储
        setItem("LOCAL_CHANNELS", this.MyChannels);
      }
    },
    // 点击编辑
    onChangeEdit() {
      this.isEdit = !this.isEdit;
    },
    // 在编辑状态下，点击我的频道，删除
    onDelChannel(channel, index) {
      // 首先判断是否在编辑状态下
      if (this.isEdit) {
        if (index < this.active) {
          //如果删除的频道在激活的频道之前， 删除后当前激活的频道索引要减一
          this.$emit("update-channel", this.active - 1, true);
        }
        this.MyChannels.splice(index, 1);
      } else {
        // 切换频道，关闭弹层
        this.$emit("update-channel", index, false);
      }
      // ---持久化处理---
      this.deleteChannel(channel);
    },
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录，通过请求删除
        try {
          await delUserChannel(channel.id);
        } catch (error) {
          this.$toast("操作失败，请稍后重试");
        }
      } else {
        // 未登录，重置本地存储
        setItem("LOCAL_CHANNELS", this.MyChannels);
      }
    },
  },
};
</script>
 <style lang='less' scoped>
.channel-edit {
  padding-top: 85px;
  .title {
    font-size: 32px;
    color: #222;
  }
  .edit-btn {
    width: 103px;
    height: 48px;
    color: #f85c5c;
    border: 2px solid #f85c5c;
  }
  /deep/ .van-grid-item {
    width: 160px;
    height: 86px;
    white-space: nowrap;
    .focus {
      color: red !important;
    }
    .van-grid-item__content {
      background-color: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 28px;
      color: #222;
    }
  }
  /deep/ .my-grid {
    font-size: 28px;
    color: #222;
    .van-grid-item__content {
      position: relative;
      .van-icon-close {
        position: absolute;
        top: -12px;
        right: -12px;
        font-size: 30px;
        z-index: 2;
      }
    }
  }
  /deep/ .tuijian-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin: 0;
      }
    }
  }
}
</style>