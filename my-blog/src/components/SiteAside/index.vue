<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :imgUrl="data.avatar" :size="150" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
    <p v-if="data" class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Avatar from '@/components/Avatar/index.vue';
import Menu from './Menu/index.vue';
import Contact from './Contact/index.vue';

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState('setting', ['data']),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0 10px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  margin: 0 auto;
}
.title {
 text-align: center;
 font-size: 1.2em;
 color: #fff;
}
.footer {
  text-align: center;
  font-size: 12px;
}
</style>
