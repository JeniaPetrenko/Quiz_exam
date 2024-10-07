const quizQuestions = [
  {
    type: "true/false",
    question: "Ukraine is the largest country entirely in Europe.",
    answer: true,
  },
  {
    type: "true/false",
    question: "The largest solar power plant in Europe is located in Ukraine.",
    answer: true,
  },
  {
    type: "true/false",
    question: "Ukraine is a country with a territory larger than Russia.",
    answer: false,
  },
  {
    type: "true/false",
    question: "Is there a village in Ukraine where ethnic Swedes still live?",
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
    question: "How many times has Ukraine won the Eurovision Song Contest?",
    options: ["never", "one", "two", "three"],
    answer: "three",
  },
  {
    type: "checkbox",
    class: "answer-checkbox",
    question:
      "Which of the following years were the years of Eurovision in Ukraine? (choose more than one answer)",
    options: ["2000", "2005", "2017", "2022"],
    answer: ["2005", "2017"],
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
    class: "answer-checkbox",
    question:
      "Which cities hosted matches during the UEFA Euro 2012 held in Ukraine? (choose more than one question)",
    options: ["Kyiv", "Barcelona", "Lviv", "Warsaw"],
    answer: ["Kyiv", "Lviv"],
  },
  {
    type: "checkbox",
    class: "answer-checkbox",
    question:
      "Which of the following dishes are traditional in Ukrainian cuisine? (choose more than one quesiton)",
    options: ["Sushi", "Bortsh", "Vareniks (dumplings)", "Pasta"],
    answer: ["Bortsh", "Vareniks (dumplings)"],
  },
];

let isDarkMode = false;
let currentQuestionIndex = 0;
let correctAnswers = 0;

const btn = document.querySelector("#darkMode");
const quizContainer = document.querySelector("#quiz-container");
const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("showBtn");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const showResultButton = document.getElementById("showResultBtn");
const startAgainButton = document.getElementById("startAgainBtn");
const progressBar = document.getElementById("progress-bar");
const showAnswersButton = document.getElementById("showAnswersBtn");

btn.addEventListener("click", toggleDarkMode);
startButton.addEventListener("click", startTheQuiz);
nextButton.addEventListener("click", showNextQuestion);
showResultButton.addEventListener("click", showResults);
startAgainButton.addEventListener("click", startAgain);
showResultButton.addEventListener("click", showResults);
showAnswersButton.addEventListener("click", showAnswers);
startAgainButton.addEventListener("click", startAgain);

function handleError(message) {
  console.error(message);
  alert(`An error occurred: ${message}`);
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  const bgColor = isDarkMode ? "grey" : "";
  const textColor = isDarkMode ? "white" : "";

  quizContainer.style.background = bgColor;
  quizContainer.style.color = textColor;
  btn.textContent = isDarkMode ? "Light mode" : "Dark mode";
}

function startTheQuiz() {
  startButton.style.display = "none";
  nextButton.style.display = "block";
  showQuestion();
}

function showNextQuestion() {
  const selectedAnswers = document.querySelectorAll(
    'input[name="answer"]:checked'
  );

  if (selectedAnswers.length > 0) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let isCorrect;

    if (
      currentQuestion.type === "true/false" ||
      currentQuestion.type === "multiple-choice"
    ) {
      isCorrect = selectedAnswers[0].value === String(currentQuestion.answer);
    } else if (currentQuestion.type === "checkbox") {
      const correctOptions = currentQuestion.answer;
      const selectedValues = Array.from(
        selectedAnswers,
        (input) => input.value
      );
      isCorrect = arraysEqual(selectedValues, correctOptions);
    }

    if (isCorrect) {
      correctAnswers++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      nextButton.style.display = "none";
      showResultButton.style.display = "block";
    }
    updateProgressBar();
  } else {
    alert(
      "Please select at least one answer before moving to the next question."
    );
  }
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return (
    arr1.every((item) => set2.has(item)) && arr2.every((item) => set1.has(item))
  );
}

function showQuestion() {
  try {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;
    resultContainer.innerHTML = "";

    questionContainer.style.display = "block";
    resultContainer.style.display = "none";

    if (currentQuestion.type === "true/false") {
      questionContainer.innerHTML += `
        <div class="options true-false-options">
          <div class="option-wrapper">
            <input type="radio" id="true" name="answer" value="true">
            <label for="true">True</label>
          </div>
          <div class="option-wrapper">
            <input type="radio" id="false" name="answer" value="false">
            <label for="false">False</label>
          </div>
        </div>
      `;
    } else if (currentQuestion.type === "multiple-choice") {
      questionContainer.innerHTML += `<div class="options multiple-choice-options">`;
      currentQuestion.options.forEach((option, index) => {
        questionContainer.innerHTML += `
          <div class="option-wrapper">
            <input type="radio" id="option${index}" name="answer" value="${option}">
            <label for="option${index}">${option}</label>
          </div>
        `;
      });
      questionContainer.innerHTML += `</div>`;
    } else if (currentQuestion.type === "checkbox") {
      questionContainer.innerHTML += `<div class="options checkbox-options">`;
      currentQuestion.options.forEach((option, index) => {
        questionContainer.innerHTML += `
          <div class="option-wrapper">
            <input type="checkbox" id="option${index}" name="answer" value="${option}">
            <label for="option${index}">${option}</label>
          </div>
        `;
      });
      questionContainer.innerHTML += `</div>`;
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      startAgainButton.style.display = "block";
    }

    updateProgressBar();
  } catch (error) {
    handleError(error.message);
  }
}

function showResults() {
  const percentage = (correctAnswers / quizQuestions.length) * 100;
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

  resultContainer.innerHTML = `<p style="color: ${resultColor};">${resultText}</p>`;
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  showResultButton.style.display = "none";
  showAnswersButton.style.display = "block";
  startAgainButton.style.display = "block";
}

function showAnswers() {
  questionContainer.innerHTML = "";
  quizQuestions.forEach((question, index) => {
    let answerHtml = "";
    if (question.type === "true/false" || question.type === "multiple-choice") {
      answerHtml = `<p>Answer: ${question.answer}</p>`;
    } else if (question.type === "checkbox") {
      answerHtml = `<p>Answers: ${question.answer.join(", ")}</p>`;
    }

    questionContainer.innerHTML += `
      <div class="question-answer">
        <h3>Question ${index + 1}:</h3>
        <p>${question.question}</p>
        ${answerHtml}
      </div>
    `;
  });

  resultContainer.style.display = "none";
  questionContainer.style.display = "block";
  showAnswersButton.style.display = "none";
}

function startAgain() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  nextButton.style.display = "block";
  showResultButton.style.display = "none";
  showAnswersButton.style.display = "none";
  startAgainButton.style.display = "none";
  showQuestion();
  updateProgressBar();
}

function updateProgressBar() {
  const progressPercentage =
    (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}
