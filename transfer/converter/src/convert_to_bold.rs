use std::io::Cursor;

use quick_xml::events::{BytesEnd, BytesStart, BytesText, Event};
use quick_xml::name::QName;
use quick_xml::reader::Reader;
use quick_xml::Writer;

pub fn insert_bold_tags(file_contents: &[u8], bold_fullstop: bool) -> Vec<u8> {
    // let mut reader = &file_contents;
    let mut reader = Reader::from_reader(file_contents);
    // reader.trim_text_end(true);
    reader.trim_text(true);
    let mut buf = Vec::new();

    println!("Creating Writer");
    let mut writer = Writer::new_with_indent(Cursor::new(Vec::new()), b' ', 4);
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
                // let replace_text = e.borrow();
                // let unescaped_u8 = e.borrow().unescape().unwrap().as_ref().split(" ");
                let unescaped = e.unescape().unwrap().as_ref().to_owned();
                for text in unescaped.split(' ') {
                    // for text in unescaped.split([' ', '-']) {
                    // bug where dashed togethre words are treaded as one big word
                    match text.len() {
                        0 => (),
                        1..=4 => {
                            surround_with_bold_tags(&mut writer, text, 1, bold_fullstop);
                        }
                        5..=7 => {
                            surround_with_bold_tags(&mut writer, text, 2, bold_fullstop);
                        }
                        8..=10 => {
                            surround_with_bold_tags(&mut writer, text, 3, bold_fullstop);
                        }
                        _ => surround_with_bold_tags(&mut writer, text, 4, bold_fullstop),
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

fn surround_with_bold_tags(
    writer: &mut Writer<Cursor<Vec<u8>>>,
    text: &str,
    index: usize,
    bold_fullstop: bool,
) {
    //whats stopping me from using bold taags appended to string? might be faster?
    if text.len() == 0 {
        return;
    }
    let bold = text
        .trim()
        .char_indices()
        .take(index)
        .fold("".to_string(), |acc, x| acc + &x.1.to_string());

    let mut rest = text
        .trim()
        .char_indices()
        .skip(index)
        .fold("".to_string(), |acc, x| acc + &x.1.to_string());

    // println!("full = {:?} bold - {:?} rrest - {:?}", text, bold, rest);
    let mut last_fullstop = false;
    if bold_fullstop && rest.len() > 0 {
        let last = rest.chars().last().unwrap();
        if last == '.' {
            last_fullstop = true;
            rest = rest[..rest.len() - 1].to_string()
        }
    }

    writer
        .write_event(Event::Start(BytesStart::new("b")))
        .unwrap();
    writer
        .write_event(Event::Text(BytesText::new(&bold)))
        .unwrap();
    writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();

    writer
        .write_event(Event::Text(BytesText::new(&rest)))
        .unwrap();

    if bold_fullstop && last_fullstop {
        writer
            .write_event(Event::Start(BytesStart::new("b")))
            .unwrap();
        writer
            .write_event(Event::Text(BytesText::new(".")))
            .unwrap();
        writer.write_event(Event::End(BytesEnd::new("b"))).unwrap();
    }
    writer
        .write_event(Event::Text(BytesText::new(" ")))
        .unwrap();
}
