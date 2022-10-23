<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <router-view></router-view>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from './components/Layout/index.vue';
import SiteAside from './components/SiteAside/index.vue';
import ToTop from './components/ToTop/index.vue';

export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 250px;
  height: 100%;
}
</style>
