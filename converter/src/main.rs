// mod alter_uid;
mod convert_to_bold;
use std::str;

fn main() {
    let input: &str = "<p >“Nosignal. i   ”</p>";
    // let input: &str = "<p class=\"calibre10\">“No signal. No Don Salvara. Can you breathe?”</p>";
    let converted = convert_to_bold::insert_bold_tags(input.as_bytes(), true);

    println!("{}", input);
    println!("{:?}", str::from_utf8(&converted.to_owned()).unwrap())
}
