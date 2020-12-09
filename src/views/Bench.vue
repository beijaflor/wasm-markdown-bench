<template>
  <section class="main-section">
    <h1>Bench</h1>
    <section class="bench-area">
      <div class="execute-container">
        <h2>JS</h2>
        <h3>reverse</h3>
        <p>
          <button @click="executeJs1Handler">execute</button>
          <input class="js-js-result" :value="jsResultTime1" disabled />
        </p>
        <h3>marked</h3>
        <p>
          <button @click="executeJs2Handler">execute</button>
          <input class="js-js-result" :value="jsResultTime2" disabled />
        </p>
      </div>
      <div class="execute-container">
        <h2>Rust</h2>
        <h3>strait</h3>
        <p>
          <button @click="executeRustHandler1">execute</button>
          <input class="js-rust-result" :value="rustResultTime1" disabled />
        </p>
        <h3>reverse</h3>
        <p>
          <button @click="executeRustHandler2">execute</button>
          <input class="js-rust-result" :value="rustResultTime2" disabled />
        </p>
        <h3>pulldown_cmark</h3>
        <p>
          <button @click="executeRustHandler3">execute</button>
          <input class="js-rust-result" :value="rustResultTime3" disabled />
        </p>
        <h3>markdown_rs</h3>
        <p>
          <button @click="executeRustHandler4">execute</button>
          <input class="js-rust-result" :value="rustResultTime4" disabled />
        </p>
        <h3>comrak</h3>
        <p>
          <button @click="executeRustHandler5">execute</button>
          <input class="js-rust-result" :value="rustResultTime5" disabled />
        </p>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as benchs from '../benchs';
import sampleMd from '../assets/sample';

export default defineComponent({
  name: 'PageJS',
  components: {},
  setup() {
    const start = performance.now();
    let str = '';
    for (let i = 0; i < 1_000_000; i++) {
      const index = Math.floor(Math.random() * 25);
      str = str + 'abcdefghijklmnopqrstuvxyz'.slice(index, index + 1);
    }
    const end = performance.now();
    console.log('generate string: ', end - start);

    const { jsResultTime1, executeJs1 } = benchs.useJsBench1();
    const { jsResultTime2, executeJs2 } = benchs.useJsBench2();
    const { rustResultTime1, executeRust1 } = benchs.useRustBench1();
    const { rustResultTime2, executeRust2 } = benchs.useRustBench2();
    const { rustResultTime3, executeRust3 } = benchs.useRustBench3();
    const { rustResultTime4, executeRust4 } = benchs.useRustBench4();
    const { rustResultTime5, executeRust5 } = benchs.useRustBench5();

    const executeJs1Handler = () => {
      executeJs1(str);
    };

    const executeJs2Handler = () => {
      executeJs2(sampleMd);
    };

    const executeRustHandler1 = () => {
      executeRust1(str);
    };

    const executeRustHandler2 = () => {
      executeRust2(str);
    };

    const executeRustHandler3 = () => {
      executeRust3(sampleMd);
    };

    const executeRustHandler4 = () => {
      executeRust4(sampleMd);
    };

    const executeRustHandler5 = () => {
      executeRust5(sampleMd);
    };

    return {
      jsResultTime1,
      jsResultTime2,
      executeJs1Handler,
      executeJs2Handler,
      executeRustHandler1,
      executeRustHandler2,
      executeRustHandler3,
      executeRustHandler4,
      executeRustHandler5,
      rustResultTime1,
      rustResultTime2,
      rustResultTime3,
      rustResultTime4,
      rustResultTime5,
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
}
</style>
