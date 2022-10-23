import Mock from 'mockjs';

Mock.mock('/api/setting', 'get', {
  code: 0,
  msg: '',
  data: {
    avatar: 'http://mdrs.yuanjin.tech/FgMwAPYq17So9nwVH44ltDHo7u3c',
    siteTitle: '我的个人空间',
    github: 'https://github.com/HuangGuangXian',
    qq: '1213728753',
    qqQrCode: 'https://developer.duyiedu.com/img/wexin.jpg',
    weixin: '13286472355',
    weixinQrCode: 'https://developer.duyiedu.com/img/wexin.jpg',
    mail: '1213728753@qq.com',
    icp: '粤ICP备17001719号',
    githubName: 'HuangGuangXian',
    favicon: 'http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f',
  },
});
