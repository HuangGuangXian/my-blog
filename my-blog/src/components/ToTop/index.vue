<template>
  <div @click="handleClick" v-show="isShow" class="to-top-container">Top</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      // 当页面发生切换时，dom组件不存在，则不显示该组件
      if (!dom) {
        this.isShow = false;
        return;
      }
      this.isShow = dom.scrollTop >= 500;
    },
    // 回到顶部
    handleClick() {
      this.$bus.$emit('setMainScroll', 0);
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
.to-top-container {
  background: @lightWords;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 99;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  color: #fff;
}
</style>
