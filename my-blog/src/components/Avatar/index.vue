<template>
  <img
    class="avatar-container"
    :src="imgUrl"
    alt=""
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script>
export default {
  props: {
    // 图片路径
    imgUrl: {
      type: String,
      require: true,
    },
    // 图片大小，默认值：50
    size: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-container {
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
</style>
