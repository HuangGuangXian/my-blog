import eventBus from '@/eventBus';
import { debounce } from '@/utils';
import defaultGif from '@/assets/default.gif';

let imgs = [];

function setImage(img) {
  img.dom.src = defaultGif; // 先暂时使用着默认图片
  // 处理图片
  //   该图片是否在视口范围内
  const { clientHeight } = document.documentElement;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    // 在视口范围内
    const tempImg = new Image();
    tempImg.onload = () => {
      // 当真实图片加载完成之后
      img.dom.src = img.src;
    };
    tempImg.src = img.src;
    imgs = imgs.filter((i) => i !== img);
  }
}

// 希望，调用该函数，就可以设置那些合适的图片
function setImages() {
  for (const img of imgs) {
    // 处理该图片
    setImage(img);
  }
}

// 当滚动条滚动时开始处理图片
function handleScroll() {
  setImages();
}

eventBus.$on('mainScroll', debounce(handleScroll, 50));

export default {
  inserted(el, binding) {
    const img = {
      dom: el,
      src: binding.value,
    };
    imgs.push(img);
    // 当页面第一次加载时立即处理它
    setImage(img);
  },
  // 跳转页面时清空之前的图片
  unbind(el) {
    imgs.filter((img) => img.dom !== el);
  },
};
