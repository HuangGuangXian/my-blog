<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import { getBlog } from '@/api/blog';
import { titleController } from '@/utils';
import Layout from '@/components/Layout/index.vue';
import BlogDetail from './components/BlogDetail.vue';
import BlogTOC from './components/BlogTOC.vue';
import BlogComment from './components/BlogComment.vue';

export default {
  mixins: [fetchData(null), mainScroll('mainContainer')],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  updated() {
    const { hash } = window.location;
    window.location.hash = '';
    setTimeout(() => {
      window.location.hash = hash;
    }, 50);
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      if (!resp) {
        // 文章不存在
        this.$router.push('/404');
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
};
</script>

<style lang='less' scoped>
.main-container {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
