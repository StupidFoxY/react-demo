import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  // light/dark
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  // side/top/mix
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '动森狸猫站',
  pwa: false,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
