<template>
  <section class="main-section">
    <div class="columnLeft">
      <textarea class="source-textarea" v-model="source.content" />
    </div>
    <div class="columnRight">
      <textarea class="source-textarea" v-model="source.content" disabled />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import sampleMd from '../assets/sample';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const source = reactive<{ content: string }>({ content: sampleMd });
    return { source };
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
