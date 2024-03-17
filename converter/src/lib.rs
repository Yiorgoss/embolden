mod convert_to_bold;

use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
// extern "C" {
//     fn alert(s: &str);
// }
#[wasm_bindgen]
pub fn convert(arr: &[u8]) -> Vec<u8> {
    convert_to_bold::insert_bold_tags(arr)
}

// #[wasm_bindgen]
// pub fn greet() {
// alert("Hello, wasm-game-of-life!");
// }
