import { createApp } from 'vue';  // 注意，这里是从 vue 中导入 createApp
import App from './App.vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';  // 导入 Element Plus 样式
import router from './router';  // 引入路由配置


const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);  // 使用 Element Plus
app.use(router);
app.mount('#app');
