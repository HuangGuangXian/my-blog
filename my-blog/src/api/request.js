import axios from 'axios';
import showMessage from '../utils/showMessage';

const instance = axios.create(); // 创建一个axios的实例
instance.interceptors.response.use((resp) => {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: 'error',
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

export default instance;
