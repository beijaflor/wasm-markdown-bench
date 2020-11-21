<template>
  <section class="main-section">
    <div class="columnLeft">
      <textarea class="source-textarea" v-model="source.content" @blur="updateHandler" />
    </div>
    <div class="columnRight">
      <textarea class="source-textarea" v-model="source.html" disabled />
    </div>
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
    const updateHtml = () => {
      const markedHtml = marked(source.content);
      source.html = markedHtml;
    };

    const updateHandler = (e: FocusEvent) => {
      const target = e.target as HTMLTextAreaElement;
      if (target) target.disabled = true;

      updateHtml();

      setTimeout(() => {
        target.disabled = false;
      }, 1000);
    };
    return { source, updateHandler };
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
  }
}

.source-textarea {
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
}
</style>
