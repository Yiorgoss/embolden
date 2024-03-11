use std::io::Cursor;

use quick_xml::events::{BytesEnd, BytesStart, BytesText, Event};
use quick_xml::name::QName;
use quick_xml::reader::Reader;
use quick_xml::Writer;

pub fn insert_bold_tags(file_contents: &[u8]) -> Vec<u8> {
    // let mut reader = &file_contents;
    let mut reader = Reader::from_reader(file_contents);
    // reader.trim_text_end(true);
    reader.trim_text(true);
    let mut buf = Vec::new();

    println!("Creating Writer");
    let mut writer = Writer::new(Cursor::new(Vec::new()));
    let mut skip_tag = false;
    loop {
        match reader.read_event_into(&mut buf) {
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
            Ok(Event::Eof) => break,
            Ok(Event::Start(e)) => {
                if e.name() == QName(b"style") {
                    skip_tag = true;
                }
                writer.write_event(Event::Start(e)).unwrap();
            }
            Ok(Event::End(e)) => {
                if e.name() == QName(b"style") {
                    skip_tag = false;
                }
                writer.write_event(Event::End(e)).unwrap();
            }
            Ok(Event::Text(e)) => {
                if skip_tag == true {
                    writer.write_event(Event::Text(e)).unwrap();
                    continue;
                }
                let replace_text = e.borrow();
                let aa = replace_text.split(|num| *num == 32_u8);
                for i in aa {
                    match i.len() {
                        0 => (),
                        1 => {
                            // let bold = &i;
                            writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(i).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(" ")))
                                .unwrap();
                        }
                        2..=4 => {
                            let bold = &i[0..1];
                            let rest = &i[1..i.len()];
                            writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(" ")))
                                .unwrap();
                        }
                        5..=7 => {
                            let bold = &i[0..2];
                            let rest = &i[2..i.len()];
                            writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(" ")))
                                .unwrap();
                        }
                        8..=10 => {
                            let bold = &i[0..3];
                            let rest = &i[3..i.len()];
                            writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(" ")))
                                .unwrap();
                        }
                        _ => {
                            let bold = &i[0..4];
                            let rest = &i[4..i.len()];
                            writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .unwrap();
                            writer
                                .write_event(Event::Text(BytesText::new(" ")))
                                .unwrap();
                        }
                    }
                }
            }
            Ok(e) => writer.write_event(e).unwrap(),
        }
    }
    let result = writer.into_inner().into_inner();

    result
    // std::str::from_utf8(&result).unwrap().to_owned()
}
