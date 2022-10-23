import Icon from '@/components/Icon/index.vue';
import getComponentRootDom from './getComponentRootDom';
import styles from './showMessage.module.less';

/**
 *
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info success error warn
 * @param {Number} duration 消失时间
 * @param {HTMLDOM} container 容器，消息会显示到该容器的正中；如果不传，会显示到页面正中
 */
export default function (options) {
  const content = options.content || '';
  const type = options.type || 'info';
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  // 创建消息元素
  const div = document.createElement('div');
  // 得到组件中的根元素
  const iconDom = getComponentRootDom(Icon, {
    type,
  });
  // 设置样式
  div.className = `${styles.message} ${styles[`message-${type}`]}`; // 类型样式名
  // 添加内容
  div.innerHTML = `<span class='${styles.icon}'>${iconDom.outerHTML}</span><div>${content}</div>`;
  // 将div加入到容器中
  if (getComputedStyle(container).position === 'static') { // 因为div定位为absolute, 所以需要判断是否是static
    container.style.position = 'relative';
  }
  container.appendChild(div);
  // 浏览器强行渲染
  div.clientHeight; // 导致reflow

  // 回归到正常位置
  div.style.opacity = 1;
  div.style.transform = 'translate(-50%, -50%)';

  // 等待一段时间,消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = 'translate(-50%, -50%) translateY(-25px)';
    div.addEventListener('transitionend', () => {
      div.remove();
      // 运行回调函数
      options.callback && options.callback();
    }, {
      once: true,
    });
  }, duration);
}
