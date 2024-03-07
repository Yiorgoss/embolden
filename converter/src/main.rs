// const INPUT: &str = "<p class=\"x04-Body-Text\"> AAAA<span epub:type=\"pagebreak\" id=\"page_268\" title=\"268\"/> BBBBB </p>";
// const INPUT: &str = "<p>aaaa <a>a</a> aBBB</p>";
// const INPUT: &str = "<p class=\"x03-CO-Body-Text\"><i>W</i><i>e huma</i></p>";
const INPUT: &str = include_str!("../tmp/07_Introduction_copy.xhtml");

use std::fs::File;
use std::io::BufWriter;

use quick_xml::events::{BytesEnd, BytesStart, BytesText, Event};
use quick_xml::reader::Reader;
use quick_xml::Writer;

fn main() {
    convert_to_bold("")
}

fn convert_to_bold(_filename: &str) {
    let mut reader = Reader::from_str(INPUT);
    reader.trim_text_end(true);
    let mut buf = Vec::new();

    // let mut writer = Writer::new_with_indent(Cursor::new(Vec::new()), b' ', 4);
    println!("Creating Writer");
    let mut writer = Writer::new(BufWriter::new(
        File::create("tmp/OEBPS/xhtml/07_Introduction.xhtml").unwrap(),
    ));
    loop {
        match reader.read_event_into(&mut buf) {
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
            Ok(Event::Eof) => break,
            Ok(Event::Text(e)) => {
                let replace_text = e.borrow();
                let aa = replace_text.split(|num| *num == 32_u8);
                for i in aa {
                    match i.len() {
                        0 => (),
                        1 => {
                            let bold = &i;
                            assert!(writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::End(BytesEnd::new("b"))).is_ok());
                            assert!(writer.write_event(Event::Text(BytesText::new(" "))).is_ok());
                        }
                        2..=4 => {
                            let bold = &i[0..1];
                            let rest = &i[1..i.len()];
                            assert!(writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::End(BytesEnd::new("b"))).is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| "")
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::Text(BytesText::new(" "))).is_ok());
                        }
                        5..=7 => {
                            let bold = &i[0..2];
                            let rest = &i[2..i.len()];
                            assert!(writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::End(BytesEnd::new("b"))).is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::Text(BytesText::new(" "))).is_ok());
                        }
                        8..=10 => {
                            let bold = &i[0..3];
                            let rest = &i[3..i.len()];
                            assert!(writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::End(BytesEnd::new("b"))).is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::Text(BytesText::new(" "))).is_ok());
                        }
                        _ => {
                            let bold = &i[0..4];
                            let rest = &i[4..i.len()];
                            assert!(writer
                                .write_event(Event::Start(BytesStart::new("b")))
                                .is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(bold).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::End(BytesEnd::new("b"))).is_ok());
                            assert!(writer
                                .write_event(Event::Text(BytesText::new(
                                    std::str::from_utf8(rest).unwrap_or_else(|_| ""),
                                )))
                                .is_ok());
                            assert!(writer.write_event(Event::Text(BytesText::new(" "))).is_ok());
                        }
                    }
                }
            }
            Ok(e) => {
                assert!(writer.write_event(e).is_ok())
            }
        }
    }
    // let result = writer.into_inner().into_inner();

    // println!("=======================");
    // println!("{:?}", std::str::from_utf8(&result).unwrap());
    // println!("=======================");
    // assert_eq!(result, xml.as_bytes());
}
