import Mock from 'mockjs';

Mock.mock('/api/about', 'get', {
  code: 0,
  msg: '',
  data: 'https://juejin.cn/user/2907538920314462', // http://skill.phodal.com/#_rs2tu_1_Name
});
