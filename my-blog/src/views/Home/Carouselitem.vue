<template>
  <div
    class="carousel-item-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    ref="container">
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        :src='carousel.bigImg'
        :placeholder="carousel.midImg"
        @load="showWords" />
    </div>
    <div class="title" ref='title'>{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader/index.vue';

export default {
  data() {
    return {
      titleWidth: 0, // 标题的宽度
      descWidth: 0, // 描述的宽度
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层容器的尺寸
      mouseX: 0, // 鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  components: {
    ImageLoader,
  },
  props: ['carousel'],
  computed: {
    // 获取图片的坐标
    imagePosition() {
      if (!this.containerSize || !this.innerSize) {
        return {};
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; // 多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; // 多出的宽度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    // 获取标题和描述的宽度
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener('resize', this.setSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize);
  },
  methods: {
    // 显示文字
    showWords() {
      const titleDom = this.$refs.title;
      const descDom = this.$refs.desc;

      titleDom.style.opacity = 1;
      titleDom.style.width = 0;
      // 强制让浏览器渲染一次
      titleDom.clientWidth; // 触发reflow
      titleDom.style.transition = '1s';
      titleDom.style.width = `${this.titleWidth}px`;

      descDom.style.opacity = 1;
      descDom.style.width = 0;
      // 强制让浏览器渲染一次
      descDom.clientWidth; // 触发reflow
      descDom.style.transition = '2s 1s';
      descDom.style.width = `${this.descWidth}px`;
    },
    // 鼠标移入
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    // 鼠标移出
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    // 获取里层和外层容器的尺寸
    setSize() {
      this.containerSize = {
        height: this.$refs.container.clientHeight,
        width: this.$refs.container.clientWidth,
      };
      this.innerSize = {
        height: this.$refs.image.clientHeight,
        width: this.$refs.image.clientWidth,
      };
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
}
.title,
.desc {
  position: absolute;
  left: 30px;
  color: #fff;
  letter-spacing: 3px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>
