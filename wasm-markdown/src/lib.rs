mod utils;

use pulldown_cmark::{html, Options, Parser};
use wasm_bindgen::prelude::*;
extern crate markdown;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(a: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

macro_rules! measure_elapsed_time {
    ($t:tt, $s:block) => {{
        let window = web_sys::window().expect("should have a window in this context");
        let performance = window
            .performance()
            .expect("performance should be available");
        let start = performance.now();
        let result = { $s };
        let end = performance.now();
        console_log!("{}:{}[ms]", $t, end - start);
        result
    }};
}

#[wasm_bindgen]
pub fn greet(source_text: &str) -> String {
    measure_elapsed_time!("pulldown_cmark\telapsed:", {
        let markdown_input = source_text;

        // Set up options and parser. Strikethroughs are not part of the CommonMark standard
        // and we therefore must enable it explicitly.
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        let parser = Parser::new_ext(markdown_input, options);
        // Write to String buffer.
        let mut html_output = String::new();
        html::push_html(&mut html_output, parser);
        html_output
    })
}

#[wasm_bindgen]
pub fn markdown_rs(source_text: &str) -> String {
    measure_elapsed_time!("markdown.rs\telapsed:", { markdown::to_html(source_text) })
}

#[wasm_bindgen]
pub fn comrak(source_text: &str) -> String {
    measure_elapsed_time!("comrak\telapsed:", {
        comrak::markdown_to_html(source_text, &comrak::ComrakOptions::default())
    })
}

#[wasm_bindgen]
pub fn strait_string(source_text: &str) -> String {
    measure_elapsed_time!("strait_string\telapsed:", { source_text.to_string() })
}

#[wasm_bindgen]
pub fn reverse_string(source_text: &str) -> String {
    measure_elapsed_time!("reverse_string\telapsed:", {
        let chers = source_text.chars();
        chers.rev().collect()
    })
}
