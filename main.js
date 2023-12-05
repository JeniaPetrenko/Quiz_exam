// Sample quiz questions
const quizQuestions = [
  {
    type: "true/false",
    question: "Kyiv is the capital of Ukraine.",
    answer: true,
  },
  {
    type: "true/false",
    question: "Ukraine is the largest country entirely in Europe.",
    answer: true,
  },
  {
    type: "true/false",
    question: "The official language of Ukraine is Russian.",
    answer: false,
  },
  {
    type: "true/false",
    question: "Ukraine gained independence from the Soviet Union in 1991.",
    answer: true,
  },
  {
    type: "true/false",
    question:
      "Chernobyl, the site of a nuclear disaster, is located in Ukraine.",
    answer: true,
  },
  {
    type: "multiple-choice",
    question: "What is the official language of Ukraine?",
    options: ["Ukrainian", "Russian", "Polish", "English"],
    answer: "Ukrainian",
  },
  {
    type: "multiple-choice",
    question: "Which river is the longest entirely within Ukraine?",
    options: ["Dnieper", "Danube", "Volga", "Don"],
    answer: "Dnieper",
  },
  {
    type: "multiple-choice",
    question: "When did Ukraine host the Eurovision Song Contest?",
    options: ["2004", "2012", "2017", "2021"],
    answer: "2017",
  },
  {
    type: "multiple-choice",
    question: "What is the currency of Ukraine?",
    options: ["Euro", "Hryvnia", "Zloty", "Kuna"],
    answer: "Hryvnia",
  },
  {
    type: "multiple-choice",
    question: 'Which Ukrainian boxer is known as "Dr. Ironfist"?',
    options: [
      "Vitali Klitschko",
      "Oleksandr Usyk",
      "Wladimir Klitschko",
      "Vasyl Lomachenko",
    ],
    answer: "Vitali Klitschko",
  },
  {
    type: "checkbox",
    question: "Which of the following are Eastern European countries?",
    options: ["Ukraine", "France", "Italy", "Poland"],
    answer: ["Ukraine", "Poland"],
  },
  {
    type: "checkbox",
    question: "Select the neighboring countries of Ukraine.",
    options: ["Russia", "Germany", "Belarus", "Romania"],
    answer: ["Russia", "Belarus", "Romania"],
  },
  {
    type: "checkbox",
    question:
      "Which cities hosted matches during the UEFA Euro 2012 held in Ukraine?",
    options: ["Kyiv", "Barcelona", "Lviv", "Warsaw"],
    answer: ["Kyiv", "Lviv"],
  },
  {
    type: "checkbox",
    question: "Select the Ukrainian composers.",
    options: ["Mozart", "Tchaikovsky", "Shostakovich", "Lysenko"],
    answer: ["Tchaikovsky", "Lysenko"],
  },
  {
    type: "checkbox",
    question: "Choose the Ukrainian historical figures.",
    options: [
      "Ivan the Terrible",
      "Taras Shevchenko",
      "Catherine the Great",
      "Bohdan Khmelnytsky",
    ],
    answer: ["Taras Shevchenko", "Bohdan Khmelnytsky"],
  },
  // Add more questions as needed
];
