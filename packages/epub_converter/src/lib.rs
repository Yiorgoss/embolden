mod add_global_styles;
mod alter_identifier;
mod convert_to_bold;
mod custom_font;

use wasm_bindgen::prelude::*;
//
// #[wasm_bindgen]
// pub fn add_css(
//     arr: &[u8],
//     no_custom_font: bool,
//     undo_text_transform: bool,
//     font_weight: usize,
//     bold_weight: usize,
//     font_path: &str,
//     font_name: &str,
// ) -> Vec<u8> {
//     //quick fix cos im lazy but refactor to using just javaasrcipt will be necessaary since this is
//     //a fuckign xml parser and im writing css smh
//     add_global_styles::add_css(
//         arr,
//         no_custom_font,
//         undo_text_transform,
//         font_weight,
//         bold_weight,
//         font_path,
//         font_name,
//     )
// }

// #[wasm_bindgen]
// pub fn insert_custom_font(input_file: &[u8], string: &str) -> Vec<u8> {
//     custom_font::insert_custom_font(input_file, string)
// }

#[wasm_bindgen]
pub fn insert_into_content_opf(input_file: &[u8], font_name: &str) -> Vec<u8> {
    custom_font::insert_into_content_opf(input_file, font_name)
}

#[wasm_bindgen]
pub fn convert(arr: &[u8], bold_fullstop: bool) -> Vec<u8> {
    convert_to_bold::insert_bold_tags(arr, bold_fullstop)
}

#[wasm_bindgen]
pub fn alter_identifier(arr: &[u8]) -> Vec<u8> {
    alter_identifier::alter_identifier(arr)
}
