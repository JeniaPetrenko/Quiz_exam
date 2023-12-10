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
const showResultButton = document.getElementById("showResultBtn");
showResultButton.addEventListener("click", showResults);

// function to start the quiz
function startTheQuiz() {
  // Сховати  "Let's Start" після початку опитування
  startButton.style.display = "none";
  // Показати  "Next Question"
  nextButton.style.display = "block";

  // Показати перше питання
  showQuestion();
}

//variable to store the number of correct answers
let correctAnswer = 0;

// Функція для виведення питання
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

  // Очистити результат, якщо він вже виведено, коли виведено нове питання
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
    currentQuestion.options.forEach((option) => {
      questionContainer.innerHTML += `
        <label>
          <input type="checkbox" name="answer" value="${option}"> ${option}
        </label>
      `;
    });
  }
}

// to show next question
function showNextQuestion() {
  // get the selected answer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Check if an answer is selected
  if (selectedAnswer) {
    // Check if the selected answer is correct
    const isCorrect =
      selectedAnswer.value ===
      String(quizQuestions[currentQuestionIndex].answer);

    // Increment the correctAnswers count if the answer is correct
    if (isCorrect) {
      correctAnswer++;
    }

    // Increment the current question index
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      // Display the next question
      showQuestion();
    } else {
      //reached the last question, hide next button and show result button
      nextButton.style.display = "none";
      document.getElementById("showResultBtn").style.display = "block";
    }
  } else {
    // Display an error message or handle the case where no answer is selected
    console.error(
      "Please select an answer before moving to the next question."
    );
  }
}

// Function for result
function showResults() {
  // Find all selected answers
  const selectedAnswers = document.querySelectorAll(
    'input[name="answer"]:checked'
  );

  // Variable to store the number of correct answers
  let correctAnswers = 0;

  selectedAnswers.forEach((selectedAnswer, index) => {
    const currentQuestion = quizQuestions[index];

    if (currentQuestion.type === "true/false") {
      // For true/false questions, compare boolean values
      const isCorrect = selectedAnswer.value === String(currentQuestion.answer);
      if (isCorrect) {
        correctAnswers++;
      }
    } else {
      // For other question types, compare string values
      const isCorrect = selectedAnswer.value === currentQuestion.answer;
      if (isCorrect) {
        correctAnswers++;
      }
    }
  });

  // Calculate the percentage of correct answers
  const percentage = (correctAnswers / quizQuestions.length) * 100;

  // Display the result message
  let resultMessage, resultColor;
  if (percentage < 50) {
    resultMessage = "Fail";
    resultColor = "red";
  } else if (percentage >= 50 && percentage <= 75) {
    resultMessage = "Good";
    resultColor = "orange";
  } else {
    resultMessage = "Really good job";
    resultColor = "green";
  }

  const resultText = `${resultMessage}: ${correctAnswers} out of ${quizQuestions.length} questions.`;

  // Show the message with results
  resultContainer.innerHTML = `<p style="color: ${resultColor};">${resultText}</p>`;
  resultContainer.style.display = "block";
}
