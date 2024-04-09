use std::io::Cursor;

use quick_xml::events::{BytesText, Event};
use quick_xml::reader::Reader;
use quick_xml::Writer;

pub fn add_css(input_file: &[u8], font_weight: usize, bold_weight: usize) -> Vec<u8> {
    let mut reader = Reader::from_reader(input_file);
    // reader.trim_text_end(true);
    reader.trim_text(true);
    let mut buf = Vec::new();

    let mut writer = Writer::new(Cursor::new(Vec::new()));
    loop {
        match reader.read_event_into(&mut buf) {
            Err(e) => panic!("Error at position {}: {:?}", reader.buffer_position(), e),
            Ok(Event::Eof) => break,
            Ok(e) => writer.write_event(e).unwrap(),
        }
    }
    if bold_weight != 0 {
        add_bold_value(&mut writer, bold_weight);
    }
    if font_weight != 0 {
        add_font_weight(&mut writer, font_weight);
    }
    writer.into_inner().into_inner()
}
fn add_font_weight(writer: &mut Writer<Cursor<Vec<u8>>>, font_weight: usize) {
    let font_css: String = format!("\n * {{ font-weight: {font_weight} !important; }}");
    writer
        .write_event(Event::Text(BytesText::new(&font_css)))
        .unwrap();
}

fn add_bold_value(writer: &mut Writer<Cursor<Vec<u8>>>, bold_weight: usize) {
    let bold_css: String = format!("\n b {{ font-weight: {bold_weight} !important; }}");
    writer
        .write_event(Event::Text(BytesText::new(&bold_css)))
        .unwrap();
}
