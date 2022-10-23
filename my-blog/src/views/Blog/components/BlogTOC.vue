<template>
  <div class="blog-toc-container">
    <h1>目录</h1>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import { debounce } from '@/utils/';
import RightList from './RightList.vue';

export default {
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: '',
    };
  },
  props: {
    toc: {
      type: Array,
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on('mainScroll', this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.setSelectDebounce);
  },
  computed: {
    // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    tocWithSelect() {
      const getToc = (toc = []) => toc.map((t) => ({
        ...t,
        isSelect: t.anchor === this.activeAnchor,
        children: getToc(t.children),
      }));
      return getToc(this.toc);
    },
    // 根据toc得到它们对应的元素数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      window.location.hash = item.anchor;
    },
    // 设置activeAnchor为正确的值
    setSelect() {
      this.activeAnchor = ''; // 由于后续要重新设置，先清空之前的状态
      const range = 200;
      for (const dom of this.doms) {
        // 看一下当前这个dom元素是不是应该被选中
        if (!dom) {
          continue;
        }
        // 得到元素离视口顶部的距离
        const { top } = dom.getBoundingClientRect();
        // 在规定的范围内
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定的范围下方
          return;
        } else {
          // 在规定的范围上方
          this.activeAnchor = dom.id; // 先假设自己是激活的，然后继续看后面
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
