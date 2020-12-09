#![feature(test)]

extern crate test;

fn strait_string(source_text: &str) -> String {
  source_text.to_string()
}

fn reverse_string(source_text: &str) -> String {
  let chers = source_text.chars();
  chers.rev().collect()
}

#[bench]
fn wasm_markdown_strait_string_bench(b: &mut test::Bencher) {
  let str = "abcdefghijklmnopqrstu";
  b.iter(|| strait_string(str))
}

#[bench]
fn wasm_markdown_reverse_string_bench(b: &mut test::Bencher) {
  let str = "abcdefghijklmnopqrstu";
  b.iter(|| reverse_string(str))
}
