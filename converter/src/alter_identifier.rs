use std::io::Cursor;

use quick_xml::events::{BytesText, Event};
use quick_xml::name::QName;
use quick_xml::reader::Reader;
use quick_xml::Writer;

pub fn alter_identifier(input_file: &[u8]) -> Vec<u8> {
    let mut reader = Reader::from_reader(input_file);
    // reader.trim_text_end(true);
    reader.trim_text(true);
    let mut buf = Vec::new();

    let mut writer = Writer::new(Cursor::new(Vec::new()));
    let mut identifier_open = false;
    loop {
        match reader.read_event_into(&mut buf) {
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
            Ok(Event::Eof) => break,
            Ok(Event::Start(e)) => {
                if e.name() == QName(b"dc:identifier") {
                    identifier_open = true;
                }
                writer.write_event(Event::Start(e)).unwrap();
            }
            Ok(Event::Text(e)) => {
                let text = e.unescape().unwrap().into_owned();

                if identifier_open == true {
                    let text = format!("{}_diff_copy", text);
                    writer
                        .write_event(Event::Text(BytesText::new(&text)))
                        .unwrap();
                }
            }
            Ok(Event::End(e)) => {
                if identifier_open == true {
                    identifier_open = false
                }
                writer.write_event(Event::End(e)).unwrap();
            }
            Ok(e) => writer.write_event(e).unwrap(),
        }
    }
    writer.into_inner().into_inner()
}
