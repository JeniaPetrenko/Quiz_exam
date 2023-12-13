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
      "Which of the following years were the years of Eurovision in Ukraine?",
    options: ["2000", "2005", "2017", "2022"],
    answer: ["2005", "2017"],
  },
  {
    type: "checkbox",
    class: "answer-checkbox",
    question:
      "Which cities hosted matches during the UEFA Euro 2012 held in Ukraine?",
    options: ["Kyiv", "Barcelona", "Lviv", "Warsaw"],
    answer: ["Kyiv", "Lviv"],
  },
  {
    type: "checkbox",
    class: "answer-checkbox",
    question:
      "Which of the following dishes are traditional in Ukrainian cuisine?",
    options: ["Sushi", "Bortsh", "Vareniks (dumplings)", "Pasta"],
    answer: ["Bortsh", "Vareniks (dumplings)"],
  },
  // Add more questions as needed
];

// Оголошення змінних та початкового індексу питання
let isDarkMode = false;
let currentQuestionIndex = 0;
let correctAnswers = 0; // Змінив назву змінної для зберігання кількості правильних відповідей

// Знаходження елементів DOM
const btn = document.querySelector("#darkMode");
const quizContainer = document.querySelector("#quiz-container");
const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("showBtn");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const showResultButton = document.getElementById("showResultBtn");
const startAgainButton = document.getElementById("startAgainBtn");

// Додавання слухача подій для кнопки "Let's Start", "Next Question", "Dark mode"
btn.addEventListener("click", toggleDarkMode);
startButton.addEventListener("click", startTheQuiz);
nextButton.addEventListener("click", showNextQuestion);
showResultButton.addEventListener("click", showResults);
startAgainButton.addEventListener("click", startAgain);

// Dark mode
// function to change the mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  const bgColor = isDarkMode ? "grey" : "";
  const textColor = isDarkMode ? "white" : "";

  quizContainer.style.background = bgColor;
  quizContainer.style.color = textColor;
  btn.textContent = isDarkMode ? "Light mode" : "Dark mode";
}

// function to start the quiz
function startTheQuiz() {
  // hide  "Let's Start"
  startButton.style.display = "none";
  // show  "Next Question"
  nextButton.style.display = "block";
  // show the first question
  showQuestion();
}

// to show next question
function showNextQuestion() {
  // get the selected answers
  const selectedAnswers = document.querySelectorAll(
    'input[name="answer"]:checked'
  );

  // Check if at least one answer is selected
  if (selectedAnswers.length > 0) {
    // Check if the selected answers are correct based on question type
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let isCorrect;

    if (
      currentQuestion.type === "true/false" ||
      currentQuestion.type === "multiple-choice"
    ) {
      // For true/false and multiple-choice, compare with the single correct answer
      isCorrect = selectedAnswers[0].value === String(currentQuestion.answer);
    } else if (currentQuestion.type === "checkbox") {
      // For checkbox, compare arrays of selected values and correct options
      const correctOptions = currentQuestion.answer;
      const selectedValues = Array.from(
        selectedAnswers,
        (input) => input.value
      );
      isCorrect = arraysEqual(selectedValues, correctOptions);
    }

    // check if the answer is counted
    if (isCorrect) {
      correctAnswers++;
      console.log("correct");
    } else {
      console.log("noncorrect");
    }

    // Increment the current question index
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < quizQuestions.length) {
      // Display the next question
      showQuestion();
    } else {
      // reached the last question, hide next button and show result button
      nextButton.style.display = "none";
      showResultButton.style.display = "block";
    }
  } else {
    // Display an error message or handle the case where no answer is selected
    alert(
      "Please select at least one answer before moving to the next question."
    );
  }
}

// Function to display the question
function showQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

  // Clear the result if it has been displayed when a new question is shown
  resultContainer.innerHTML = "";

  //to hide question-container
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";

  // If the question type is "true/false", display answer options
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
    // If the question type is "multiple-choice", display answer options
    currentQuestion.options.forEach((option) => {
      questionContainer.innerHTML += `
        <label>
          <input type="radio"  name="answer" value="${option}"> ${option}
        </label>
      `;
    });
  } else if (currentQuestion.type === "checkbox") {
    // If the question type is "checkbox", display answer options
    currentQuestion.options.forEach((option) => {
      questionContainer.innerHTML += `
        <label>
          <input type="checkbox" name="answer" value="${option}"> ${option}
        </label>
      `;
    });
  }
  //if it's the last question to display "start again" question
  if (currentQuestionIndex === quizQuestions.length - 1) {
    startAgainButton.style.display = "block";
  }
  questionContainer.style.display = "block";
}

// Function to compare two arrays
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// Function to display results
function showResults() {
  //  Find all selected answers
  const selectedAnswers = document.querySelectorAll(
    'input[name="answer"]:checked'
  );
  console.log("selected answer", selectedAnswers);

  // calculate the percentage of correct answers
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
  //to show result-container and hide question container
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  //show the "start again" button
  startAgainButton.style.display = "block";
}
//start again function
function startAgain() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  nextButton.style.display = "block";
  showResultButton.style.display = "none";
  startAgainButton.style.display = "none";
  showQuestion();
}
