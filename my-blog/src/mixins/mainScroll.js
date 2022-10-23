export default function (refValue) {
  return {
    mounted() {
      this.$bus.$on('setMainScroll', this.handleSetMainScroll);
      this.$refs[refValue].addEventListener('scroll', this.handleMainScroll);
    },
    beforeDestroy() {
    // 当切换页面时，让ToTop组件销毁，不传入dom元素
      this.$bus.$emit('mainScroll');
      this.$refs[refValue].removeEventListener('srcoll', this.handleMainScroll);
      this.$bus.$off('setMainScroll', this.handleSetMainScroll);
    },
    methods: {
      handleMainScroll() {
        this.$bus.$emit('mainScroll', this.$refs[refValue]);
      },
      // 让滚动跳回到顶部
      handleSetMainScroll(scrollTop) {
        this.$refs[refValue].scrollTop = scrollTop;
      },
    },
  };
}
