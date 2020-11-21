<template>
  <section class="main-section">
    <div class="columnLeft">
      <textarea class="source-textarea" v-model="source.content" @keyup="updateHandler" />
    </div>
    <div class="columnRight">
      <section class="output-htmlarea" v-html="source.html" />
    </div>
  </section>
  <section class="status-container">
    <dl class="performance-list">
      <dt class="listItem">lategst:&nbsp;</dt>
      <dd class="listItem">{{ status.latest }}</dd>
      <dt class="listItem" style="margin-left: 20px;">average:&nbsp;</dt>
      <dd class="listItem">{{ status.average }}</dd>
    </dl>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import marked from 'marked';
import sampleMd from '../assets/sample';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const source = reactive<{ content: string; html: string }>({ content: sampleMd, html: '' });
    const status = reactive<{ latest: number; average: number }>({ latest: 0, average: 0 });

    const updateHtml = () => {
      const markedHtml = marked(source.content);
      source.html = markedHtml;
    };

    const updateSpeed = (start: number, end: number) => {
      const duration = end - start;
      status.latest = Math.floor(duration * 1000) / 1000;
      status.average = Math.floor(((status.average + duration) / 2) * 1000) / 1000;
    };

    const updateHandler = () => {
      // const updateHandler = (e: KeyboardEvent) => {
      // const target = e.target as HTMLTextAreaElement;
      // if (target) target.disabled = true;
      const start = performance.now();

      updateHtml();

      const end = performance.now();

      updateSpeed(start, end);
      // setTimeout(() => {
      //   target.disabled = false;
      // }, 1000);
    };

    updateHtml();
    return { source, status, updateHandler };
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
