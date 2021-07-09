import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import App from './App.vue';
// ==========ant-design-vue==========
import 'ant-design-vue/dist/antd.css';
// ===========Tailwind样式============
import '@/assets/styles/tailwind.css';
// ===============路由================
import router from './router';
// =============全局样式===============
import '@/assets/styles/app.less';
// ===================================

// 生成自定义font图标
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2663455_nqtxc2ikc8.js', // 在 iconfont.cn 上生成
});

createApp(App)
  .use(Antd)
  .use(router)
  .component('icon-font', IconFont)
  .mount('#app');
