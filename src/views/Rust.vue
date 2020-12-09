<template>
  <section class="main-section">
    <div class="columnLeft">
      <textarea class="source-textarea" v-model="source.content" @keyup="keyupHandler" @blur="blurHandler" />
    </div>
    <div class="columnRight">
      <section class="output-htmlarea" v-html="source.html" />
    </div>
  </section>
  <section class="status-container">
    <label class="floatLeft"><input type="checkbox" v-model="autoUpdate" />auto update</label>
    <dl class="performance-list">
      <dt class="listItem">lategst:&nbsp;</dt>
      <dd class="listItem">{{ status.latest }}&nbsp;[ms]</dd>
      <dt class="listItem" style="margin-left: 20px;">average:&nbsp;</dt>
      <dd class="listItem">{{ status.average }}&nbsp;[ms]</dd>
    </dl>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue';
import sampleMd from '../assets/sample';
import { WASM_KEY } from '../main';

const renderStatusComposition = () => {
  const status = reactive<{ latest: number; average: number }>({ latest: 0, average: 0 });
  const updateSpeed = (start: number, end: number) => {
    const duration = end - start;
    status.latest = Math.floor(duration * 1000) / 1000;
    status.average = Math.floor(((status.average + duration) / 2) * 1000) / 1000;
  };

  return { status, updateSpeed };
};

const sourceComposition = () => {
  const wasm = inject(WASM_KEY);
  const source = reactive<{ content: string; html: string }>({ content: sampleMd, html: '' });
  const updateHtml = () => {
    const markedHtml = wasm?.pulldown_cmark(source.content);
    source.html = markedHtml || '';
  };

  return { source, updateHtml };
};

export default defineComponent({
  name: 'PageJS',
  components: {},
  setup() {
    const autoUpdate = ref<boolean>(false);

    const { source, updateHtml } = sourceComposition();
    const { status, updateSpeed } = renderStatusComposition();

    const executeUpdateSequence = () => {
      const start = performance.now();
      updateHtml();
      const end = performance.now();
      updateSpeed(start, end);
    };

    const keyupHandler = () => {
      if (!autoUpdate.value) return;

      executeUpdateSequence();
    };

    const blurHandler = (e: KeyboardEvent) => {
      autoUpdate.value;
      const target = e.target as HTMLTextAreaElement;
      if (target) target.disabled = true;

      executeUpdateSequence();

      target.disabled = false;
    };

    updateHtml();
    return { autoUpdate, blurHandler, source, status, keyupHandler };
  },
});
</script>

<style lang="scss" scoped>
.main-section {
  display: flex;
  justify-content: space-around;

  > .columnLeft,
  > .columnRight {
    width: 45vw;
    height: 80vh;
    border: 1px solid #ddd;
    overflow-y: scroll;
  }
}

.source-textarea {
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
}

.output-htmlarea {
  padding: 20px;
  text-align: left;
}

.status-container {
  height: 5vh;
  background: #f0f0f0;

  > .floatLeft {
    float: left;
    line-height: 5vh;
    font-size: 11px;
    color: #555;
  }
}

.performance-list {
  text-align: right;
  padding: 0 10px;

  > .listItem {
    line-height: 5vh;
    list-style: none;
    font-size: 11px;
    display: inline;
    color: #555;
  }
}
</style>
