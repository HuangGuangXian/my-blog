<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout/index.vue';
import BlogCategory from './components/BlogCategory.vue';
import BlogList from './components/BlogList.vue';

export default {
  components: {
    Layout,
    BlogCategory,
    BlogList,
  },
};
</script>

<style>

</style>
