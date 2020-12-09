import { createApp, InjectionKey } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

type BindgenCommonFunction = (sourceText: string) => string;

const WASM_KEY: InjectionKey<{
  greet: BindgenCommonFunction;
  markdown_rs: BindgenCommonFunction;
  comrak: BindgenCommonFunction;
  strait_string: BindgenCommonFunction;
  reverse_string: BindgenCommonFunction;
}> = Symbol('wasm');

import('../wasm-markdown/pkg').then(wasm => {
  const app = createApp(App);
  app.provide(WASM_KEY, wasm);
  app.use(router).mount('#app');
});

export { WASM_KEY };
