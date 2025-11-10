const faqList = [
  {
    question: "Are my books safe? What about my data?",
    contentList: [
      {
        text: "Absolutely! Your uploaded books are processed within your own browser, so we never store or share any of your files or data. ",
      },
    ],
  },
  {
    question: "What file format does Embolden support?",
    contentList: [
      {
        text: "Currently, Embolden works with EPUB files, a widely used format for e-books If your book isn't in EPUB format, you can easily convert it using free online tools.",
      },
    ],
  },
  {
    question: "What is the best way to read Emboldened books?",
    contentList: [
      {
        text: "Embolden will work with any ebook reader, though it has largely been tested using apple iBooks",
      },
    ],
  },
  {
    question:
      "Why is only the bold part of the font is using the custom embedded font?",
    contentList: [
      {
        text: "This is a known problem within iBooks, due to iBooks forcing precedence to the fonts picked inside the app.",
      },
      {
        text: "The solution is to switch the font back to Original, within iBooks.",
      },
    ],
  },
  // {
  //   question: "Need a question answered that isn't covered here?",
  //   contentList: [
  //     {
  //       text: "We'd love to hear from you and are here to answer any questions you may have.",
  //     },
  //     {
  //       text: "Contact us at embolden@calisto.studio or write to us on our feedback form listed on our business website.",
  //     },
  //   ],
  // },
  // {
  //   question: "",
  //   contentList: [
  //     {
  //       text: "content text",
  //     },
  //   ],
  // },
];
export default faqList;
