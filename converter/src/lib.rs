mod add_global_styles;
mod alter_identifier;
mod convert_to_bold;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_css(arr: &[u8], font_weight: usize, bold_weight: usize) -> Vec<u8> {
    add_global_styles::add_css(arr, font_weight, bold_weight)
}

#[wasm_bindgen]
pub fn convert(arr: &[u8], bold_fullstop: bool) -> Vec<u8> {
    convert_to_bold::insert_bold_tags(arr, bold_fullstop)
}

#[wasm_bindgen]
pub fn alter_identifier(arr: &[u8]) -> Vec<u8> {
    alter_identifier::alter_identifier(arr)
}
