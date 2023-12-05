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

// Dark mode
let btn = document.querySelector("#darkMode");
// click
btn.addEventListener("click", toggleDarkMode);
//variable for the current mode
let isDarkMode = false;

// function to change the mode
function toggleDarkMode() {
  // find the button in "container"
  let quizContainer = document.querySelector("#quiz-container");
  // change the mode
  isDarkMode = !isDarkMode;

  // to apply the variables
  if (isDarkMode) {
    quizContainer.style.background = "black";
    quizContainer.style.color = "white";
    // change the text of button
    btn.textContent = "Light mode";
  } else {
    // Light mode
    quizContainer.style.background = ""; // value by default
    quizContainer.style.color = "";
    // change the text on button
    btn.textContent = "Dark mode";
  }
}
// Оголошення змінних та початкового індексу питання
let currentQuestionIndex = 0;

// Знаходження елементів DOM
const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("showBtn");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");

// Функція для виведення питання
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Спробуйте змінити innerHTML на innerText, якщо у вас виникають проблеми
  questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

  // Очистити результат, якщо він вже виведено
  resultContainer.innerHTML = "";

  // Якщо тип питання "true/false", вивести варіанти відповідей
  if (currentQuestion.type === "true/false") {
    questionContainer.innerHTML += `
      <label>
        <input type="radio" name="answer" value="true"> True
      </label>
      <label>
        <input type="radio" name="answer" value="false"> False
      </label>
    `;
  } else if (currentQuestion.type === "multiple-choice") {
    // Якщо тип питання "multiple-choice", вивести варіанти відповідей
    currentQuestion.options.forEach((option, index) => {
      questionContainer.innerHTML += `
        <label>
          <input type="radio" name="answer" value="${option}"> ${option}
        </label>
      `;
    });
  } else if (currentQuestion.type === "checkbox") {
    // Якщо тип питання "checkbox", вивести варіанти відповідей
    currentQuestion.options.forEach((option, index) => {
      questionContainer.innerHTML += `
        <label>
          <input type="checkbox" name="answer" value="${option}"> ${option}
        </label>
      `;
    });
  }
}

// Функція для запуску опитування
function startTheQuiz() {
  // Сховати кнопку "Let's Start" після початку опитування
  startButton.style.display = "none";
  // Показати кнопку "Next Question"
  nextButton.style.display = "block";

  // Показати перше питання
  showQuestion();
}

// Функція для виведення наступного питання
function showNextQuestion() {
  // Отримати вибрану відповідь
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Перевірити, чи вибрано відповідь
  if (!selectedAnswer) {
    resultContainer.innerHTML = "Please select an answer.";
    return;
  }

  // Перевірити, чи відповідь вірна
  const isCorrect =
    selectedAnswer.value ===
    (quizQuestions[currentQuestionIndex].answer ? "true" : "false");

  // Вивести результат
  resultContainer.innerHTML = isCorrect ? "Correct!" : "Incorrect.";

  // Збільшити поточний індекс питання
  currentQuestionIndex++;

  // Вивести наступне питання або завершити опитування
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    // Приховати кнопку "Next Question", якщо опитування завершено
    nextButton.style.display = "none";
  }
}
