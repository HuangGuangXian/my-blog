<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import mainScroll from '@/mixins/mainScroll';
import fetchData from '@/mixins/fetchData';
import { getMessage, postMessage } from '@/api/message';
import MessageArea from '@/components/MessageArea/index.vue';

export default {
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('messageContainer')],
  components: {
    MessageArea,
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  methods: {
    async fetchData() {
      return getMessage(this.page, this.limit);
    },
    async fetchMore() {
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
    async handleSubmit(data, callback) {
      const resp = await postMessage(data);
      callback('感谢您的留言');
      this.data.rows.unshift(resp);
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
  },
};
</script>

<style lang='less' scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
