<template>
  <nav class="menu-container">
    <router-link
      :to="{name: item.name}"
      :exact="item.exact"
      :href="item.link"
      v-for="item in items"
      :key="item.link"
      exact-active-class=""
      active-class="selected"
      >
        <div class="icon">
            <Icon :type="item.icon" />
        </div>
        <span>{{ item.text }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon/index.vue';

export default {
  data() {
    return {
      items: [
        {
          name: 'Home',
          link: '/',
          icon: 'home',
          text: '首页',
          exact: true,
        },
        {
          name: 'Blog',
          link: '/blog',
          icon: 'blog',
          text: '文章',
          exact: false, // 只要当前路径以link开头，当前菜单就是选中
        },
        {
          name: 'About',
          link: '/about',
          icon: 'about',
          text: '关于我',
          exact: true,
        },
        {
          name: 'Project',
          link: '/project',
          icon: 'code',
          text: '项目&效果',
          exact: true,
        },
        {
          name: 'Message',
          link: '/message',
          icon: 'chat',
          text: '留言板',
          exact: true,
        },
      ],
    };
  },
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  margin: 24px 0 12px 0;
  color: @gray;
  a {
    padding: 0px 50px;
    display: flex;
    height: 45px;
    align-items: center;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.selected {
      background: darken(@words, 3%);
    }
  }
}
</style>
