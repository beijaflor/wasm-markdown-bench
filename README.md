# Benchmark of markdown converter in rust-wasm and v8

## brief result

In use of string, v8 is 3 time faster in native, and 1.5 faster in web assembly in naive implementation

It may be way to optimize with rust implementation to make faster, but, in casual use, I prefer not using rust...

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
