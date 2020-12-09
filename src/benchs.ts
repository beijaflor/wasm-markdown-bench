import { inject, ref } from 'vue';
import { WASM_KEY } from './main';

import marked from 'marked';

const reverseString = (input: string): string => {
  let ret = '';
  for (let i = 1; i < input.length; i++) {
    ret += input.slice(-i - 1, -i);
  }
  ret = input.slice(-1) + ret;
  return ret;
};

export const useJsBench1 = () => {
  const jsResultTime = ref<string>('');
  const executeJs = (input: string) => {
    const start = performance.now();
    reverseString(input);
    const end = performance.now();
    jsResultTime.value = (end - start).toString();
  };
  return { jsResultTime1: jsResultTime, executeJs1: executeJs };
};

export const useJsBench2 = () => {
  const jsResultTime = ref<string>('');
  const executeJs = (input: string) => {
    const start = performance.now();
    marked(input);
    const end = performance.now();
    jsResultTime.value = (end - start).toString();
  };
  return { jsResultTime2: jsResultTime, executeJs2: executeJs };
};

export const useRustBench1 = () => {
  const wasm = inject(WASM_KEY);

  const rustResultTime = ref<string>('');
  const executeRust = (input: string) => {
    const start = performance.now();
    wasm?.strait_string(input);
    const end = performance.now();
    rustResultTime.value = (end - start).toString();
  };
  return { rustResultTime1: rustResultTime, executeRust1: executeRust };
};

export const useRustBench2 = () => {
  const wasm = inject(WASM_KEY);

  const rustResultTime = ref<string>('');
  const executeRust = (input: string) => {
    const start = performance.now();
    wasm?.reverse_string(input);
    const end = performance.now();
    rustResultTime.value = (end - start).toString();
  };
  return { rustResultTime2: rustResultTime, executeRust2: executeRust };
};

export const useRustBench3 = () => {
  const wasm = inject(WASM_KEY);

  const rustResultTime = ref<string>('');
  const executeRust = (input: string) => {
    const start = performance.now();
    wasm?.pulldown_cmark(input);
    const end = performance.now();
    rustResultTime.value = (end - start).toString();
  };
  return { rustResultTime3: rustResultTime, executeRust3: executeRust };
};

export const useRustBench4 = () => {
  const wasm = inject(WASM_KEY);

  const rustResultTime = ref<string>('');
  const executeRust = (input: string) => {
    const start = performance.now();
    wasm?.markdown_rs(input);
    const end = performance.now();
    rustResultTime.value = (end - start).toString();
  };
  return { rustResultTime4: rustResultTime, executeRust4: executeRust };
};

export const useRustBench5 = () => {
  const wasm = inject(WASM_KEY);

  const rustResultTime = ref<string>('');
  const executeRust = (input: string) => {
    const start = performance.now();
    wasm?.comrak(input);
    const end = performance.now();
    rustResultTime.value = (end - start).toString();
  };
  return { rustResultTime5: rustResultTime, executeRust5: executeRust };
};
