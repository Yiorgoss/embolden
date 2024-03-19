mod alter_identifier;
mod convert_to_bold;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn convert(arr: &[u8]) -> Vec<u8> {
    convert_to_bold::insert_bold_tags(arr)
}

#[wasm_bindgen]
pub fn alter_identifier(arr: &[u8]) -> Vec<u8> {
    alter_identifier::alter_identifier(arr)
}
