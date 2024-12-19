// mod alter_uid;
mod add_global_styles;
mod convert_to_bold;
mod custom_font;
use std::str;

fn main() {
    let input: &str = "";
    // let input: &str = "<p class=\"calibre10\">“No signal. No Don Salvara. Can you breathe?”</p>";

    // let converted = convert_to_bold::insert_bold_tags(input.as_bytes(), true);
    let converted = add_global_styles::add_css(
        input.as_bytes(),
        true,
        true,
        400,
        500,
        String::from("asrt"),
        String::from("fonxxxt_name"),
    );
    // let converted = custom_font::insert_custom_font("filename");
    // let converted = custom_font::insert_into_content_opf(input.as_bytes(), "xxxx");
    println!("{}", input);
    println!("{}", str::from_utf8(&converted.to_owned()).unwrap())
}
