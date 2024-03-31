// mod alter_uid;
// mod convert_to_bold;
mod add_global_styles;
use std::str;

fn main() {
    let input: &str = "<p >“Nosignal. i   ”</p>";
    // let input: &str = "<p class=\"calibre10\">“No signal. No Don Salvara. Can you breathe?”</p>";

    // let converted = convert_to_bold::insert_bold_tags(input.as_bytes(), true);
    let converted = add_global_styles::add_css_end(input.as_bytes(), 900);
    println!("{}", input);
    println!("{:?}", str::from_utf8(&converted.to_owned()).unwrap())
}
