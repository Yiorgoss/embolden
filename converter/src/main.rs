mod alter_uid;
use std::str;

const INPUT: &str = include_str!("test/content.opf");
fn main() {
    let altered_vec = alter_uid::alter_uid(INPUT.as_bytes());
    let altered = str::from_utf8(&altered_vec[..]);
    println!("{:?}", altered.unwrap())
}
