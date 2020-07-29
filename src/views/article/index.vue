<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail markdown-body">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

          <!-- 
          :is-followed="article.is_followed"
          @update-follow="article.is_followed=!article.is_followed"
          简写为：v-model="article.is_followed"
          -->
          <follow-user v-model="article.is_followed" :user-id="article.aut_id" class="follow-btn"></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="articleContentRef" class="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论 -->
        <comment-list
          :source="article.art_id"
          :list="commentList"
          @total-count="totalComments=$event.total_count"
          @click-reply="onClickReply"
          :immediate-check="false"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isCommentPopShow=true"
            class="comment-btn"
            type="default"
            round
            size="small"
          >写评论</van-button>
          <van-icon name="comment-o" :info="totalComments" color="#777" />
          <!-- 收藏 -->
          <collect-article v-model="article.is_collected" :art-id="article.art_id" color="#777" />
          <!-- 点赞 -->
          <like-article v-model="article.attitude" :art-id="article.art_id" />
          <van-icon name="share" color="#777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层 -->
        <van-popup v-model="isCommentPopShow" position="bottom">
          <comment-pop :target="article.art_id" @publish-success="onPublishSuccess" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errCode===404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论的回复 -->
    <!-- popup默认是懒渲染的，所以一旦渲染完成，之后的打开关闭都是将第一次渲染的内容进行显示和影藏，导致无论点击那个回复，都只展示第一个回复列表，所以这里使用v-if去控制，关闭弹层时，不去渲染，相当于销毁 -->
    <van-popup
      v-if="isReplyPopShow"
      v-model="isReplyPopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply :comment="currentComment" @close-reply="isReplyPopShow = false" />
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { getArticleById } from "@/api/article.js";
import followUser from "@/components/follow-user";
import collectArticle from "@/components/collect-article";
import likeArticle from "@/components/like-article";
import commentList from "./components/comment-list.vue";
import commentPop from "./components/comment-pop.vue";
import commentReply from "./components/comment-reply.vue";
export default {
  name: "articleIndex",
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPop,
    commentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object], //为什么是两种类型？因为如果是通过文章列表点击进来的，type是Number类型，但是如果是通过路由直接访问，传进来的id是字符串类型
      required: true,
    },
  },
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  data() {
    return {
      article: {},
      isLoading: true,
      errCode: 0, // 错误状态码
      totalComments: 0,
      isCommentPopShow: false, // 评论弹出层
      commentList: [], // 评论列表
      isReplyPopShow: false, //评论的回复弹出层
      currentComment: {}, // 当前评论项
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.isLoading = true;
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;
        // 拿到文章节点,setTimeout是为了加延迟，在刚访问到接口时，页面还没有渲染出来，所以拿到的content为undefined
        setTimeout(() => {
          let content = this.$refs.articleContentRef;
          let imgs = content.querySelectorAll("img");
          const imgUrls = [];
          imgs.forEach((item, index) => {
            imgUrls.push(item.src);
            item.addEventListener("click", () => {
              ImagePreview({
                images: imgUrls,
                startPosition: index,
              });
            });
          });
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errCode = 404;
        }
      }
      this.isLoading = false;
    },
    // 文章评论发布
    onPublishSuccess(data) {
      // 关闭弹窗
      this.isCommentPopShow = false;
      // 添加list
      this.commentList.unshift(data.new_obj);
    },
    // 点击评论回复，弹出层
    onClickReply(comment) {
      this.isReplyPopShow = true;
      this.currentComment = comment;
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
