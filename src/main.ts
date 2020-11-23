import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const WASM_KEY = Symbol('wasm');

import('../wasm-markdown/pkg').then(wasm => {
  const app = createApp(App);
  app.provide(WASM_KEY, wasm);
  app.use(router).mount('#app');
});

export { WASM_KEY };
