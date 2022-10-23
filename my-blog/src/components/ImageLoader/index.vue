<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
      :src="src"
      alt=""
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      originLoaded: false, // 原图是否加载完成
      everythingDone: false, // 所有事情是否完成
    };
  },
  props: {
    src: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit('load');
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>
