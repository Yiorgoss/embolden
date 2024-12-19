use std::io::Cursor;

use quick_xml::events::{BytesStart, Event};
use quick_xml::name::QName;
use quick_xml::reader::Reader;
use quick_xml::Writer;

pub fn insert_into_content_opf(input_file: &[u8], font_name: &str) -> Vec<u8> {
    let mut reader = Reader::from_reader(input_file);
    // reader.trim_text_end(true);
    reader.trim_text(true);
    let mut buf = Vec::new();

    println!("Creating Writer");
    let mut writer = Writer::new_with_indent(Cursor::new(Vec::new()), b' ', 4);

    loop {
        match reader.read_event_into(&mut buf) {
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
            Ok(Event::Eof) => break,
            Ok(Event::End(e)) => {
                if e.name() == QName(b"manifest") {
                    let font_path = format!("{font_name}");
                    let mut font_item = BytesStart::new("item");

                    font_item.push_attribute(("href", font_path.as_str()));
                    font_item.push_attribute(("id", "font_id"));
                    font_item.push_attribute(("media-type", "font/ttf"));

                    writer.write_event(Event::Empty(font_item)).unwrap();
                }
                writer.write_event(Event::End(e)).unwrap();
            }
            Ok(e) => writer.write_event(e).unwrap(),
        }
    }
    let result = writer.into_inner().into_inner();
    result
}
