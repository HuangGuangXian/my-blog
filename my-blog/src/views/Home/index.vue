<template>
  <div
    class="home-container"
    ref="container"
    @wheel='handleWheel'
    v-loading='loading'>
    <ul
      class="carousel-container"
      @transitionend='handleTransitionend'
      :style="{ marginTop }"
      >
      <li v-for="item in data" :key="item.id">
        <Carousel :carousel="item" />
      </li>
    </ul>
    <div v-show="index >= 1" class="icon icon-up" @click="switchTo(index - 1)">
      <Icon type='arrowUp' />
    </div>
    <div v-show="index < data.length - 1" class="icon icon-down" @click="switchTo(index + 1)">
      <Icon type='arrowDown' />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
        :class="{active: index===i}"></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from '@/components/Icon/index.vue';
import Carousel from './Carouselitem.vue';

export default {
  data() {
    return {
      index: 0, // 当前显示的是第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在切换中
    };
  },
  components: {
    Carousel,
    Icon,
  },
  computed: {
    // 当图片轮播时，重新计算容器的外边距
    marginTop() {
      return `${-this.index * this.containerHeight}px`;
    },
    ...mapState('banner', ['loading', 'data']),
  },
  created() {
    this.$store.dispatch('banner/fetchBanner');
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    // 通过鼠标滚轮切换图片
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      // 向上滚动
      if (e.deltaY < -5 && this.index > 0) {
        this.index -= 1;
        this.switching = true;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) { // 向下滚动
        this.index += 1;
        this.switching = true;
      }
    },
    handleTransitionend() {
      this.switching = false;
    },
    // 监听窗口改变
    handleResize() {
      // 如果窗口改变，则重新获取容器的高度
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  @gap: 25px;
  font-size: 30px;
  .self-center();
  color: #fff;
  color: @gray;
  transform: translateX(-50%);
  cursor: pointer;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    bottom: @gap;
    top: auto;
    animation: jump-down 2s infinite;
  }
}
@jump: 5px;
@keyframes jump-up {
  0% {
    transform: translate(-50%, @jump);
  }
  50% {
    transform: translate(-50%, -@jump);
  }
  100% {
    transform: translate(-50%, @jump);
  }
}
@keyframes jump-down {
  0% {
    transform: translate(-50%, -@jump);
  }
  50% {
    transform: translate(-50%, @jump);
  }
  100% {
    transform: translate(-50%, -@jump);
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>
