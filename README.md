# Benchmark of markdown converter in rust-wasm and v8

https://beijaflor.github.io/wasm-markdown-bench/

## app

| method         | lang | bench(ns)          |
| -------------- | ---- | ------------------ |
| marked         | JS   | 4.480000003241003  |
| pulldown_cmark | Rust | 2.4299999931827188 |
| markdown_rs    | Rust | 41.44000000087544  |
| comrak         | Rust | 8.734999995795079  |

## native

### Rust

| method  | bench(ns) |
| ------- | --------- |
| reverse | 286       |
| strait  | 86        |

### node v8

| method         | bench(hz) |
| -------------- | --------- |
| reverse string | 9386      |
| strait string  | 130814    |

## web app

```
yarn install
yarn wasm:build
yarn serve
```

and access to localhost:8080

## native bench

```
yarn install
yarn bench:wasm
yarn bench:rust
```
