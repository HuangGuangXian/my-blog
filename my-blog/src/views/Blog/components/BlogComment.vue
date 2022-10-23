<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import MessageArea from '@/components/MessageArea/index.vue';
import { getComment, postComment } from '@/api/blog';

export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  computed: {
    // 计算当前数据量是否超过总数据量
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getComment(this.$route.params.id, this.page, this.limit);
    },
    // 滚动事件 滚动到底部加载更多评论数据
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 定一个可接受的范围，在这个范围内都算达到了底部
      // 判断是否滚动到底部
      // 滚动的高度 + dom元素的视口高度 - 滚动条的高度
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    // 加载下一页
    async fetchMore() {
      // 没有更多啦
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page += 1;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total += 1;
      callback('评论成功'); // 告诉子组件，我这边处理完了，你继续
    },
  },
};
</script>

<style lang='less' scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>
