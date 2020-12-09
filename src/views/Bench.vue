<template>
  <section class="main-section">
    <h1>Bench</h1>
    <section class="bench-area">
      <div class="execute-container">
        <h2>JS</h2>
        <button @click="executeJsHandler">execute</button>
        <input class="js-js-result" :value="jsResultTime" disabled />
      </div>
      <div class="execute-container">
        <h2>Rust</h2>
        <button @click="executeRustHandler1">execute</button>
        <input class="js-rust-result" :value="rustResultTime1" disabled />
        <button @click="executeRustHandler2">execute</button>
        <input class="js-rust-result" :value="rustResultTime2" disabled />
        <button @click="executeRustHandler3">execute</button>
        <input class="js-rust-result" :value="rustResultTime3" disabled />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { WASM_KEY } from '../main';

const reverseString = (input: string): string => {
  let ret = '';
  for (let i = 1; i < input.length; i++) {
    ret += input.slice(-i - 1, -i);
  }
  ret = input.slice(-1) + ret;
  return ret;
};

export default defineComponent({
  name: 'PageJS',
  components: {},
  setup() {
    const wasm = inject(WASM_KEY);

    const start = performance.now();
    let str = '';
    for (let i = 0; i < 10_000_000; i++) {
      const index = Math.floor(Math.random() * 25);
      str = str + 'abcdefghijklmnopqrstuvxyz'.slice(index, index + 1);
    }
    const end = performance.now();
    console.log('generate string: ', end - start);

    const { jsResultTime, executeJs } = (() => {
      const jsResultTime = ref<string>('');
      const executeJs = (input: string) => {
        const start = performance.now();
        reverseString(input);
        const end = performance.now();
        jsResultTime.value = (end - start).toString();
      };
      return { jsResultTime, executeJs };
    })();

    const { rustResultTime1, executeRust1 } = (() => {
      const rustResultTime = ref<string>('');
      const executeRust = (input: string) => {
        const start = performance.now();
        wasm?.strait_string(input);
        const end = performance.now();
        rustResultTime.value = (end - start).toString();
      };
      return { rustResultTime1: rustResultTime, executeRust1: executeRust };
    })();

    const { rustResultTime2, executeRust2 } = (() => {
      const rustResultTime = ref<string>('');
      const executeRust = (input: string) => {
        const start = performance.now();
        wasm?.reverse_string(input);
        const end = performance.now();
        rustResultTime.value = (end - start).toString();
      };
      return { rustResultTime2: rustResultTime, executeRust2: executeRust };
    })();

    const executeJsHandler = () => {
      executeJs(str);
    };

    const executeRustHandler1 = () => {
      executeRust1(str);
    };

    const executeRustHandler2 = () => {
      executeRust2(str);
    };

    return {
      jsResultTime,
      executeJsHandler,
      executeRustHandler1,
      executeRustHandler2,
      rustResultTime1,
      rustResultTime2,
    };
  },
});
</script>

<style lang="scss" scoped>
.bench-area {
  display: flex;
  justify-content: space-around;
}

.execute-container {
  border: 1px solid #dedede;
  border-radius: 10px;
  width: 35vw;
  height: 35vw;
}
</style>
