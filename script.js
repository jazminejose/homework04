let quizQuestions = [
  {
    title: "What functions as an interface for you to write on your actual page through code?",
    choices: ["HTML", "API", "DOM", "CSS"],
    answer: "DOM"
  },
  {
    title: "What is used for collecting quantities of data under the same location?",
    choices: ["arrays and objects", "var, const and let", "localstorage", "innerHTML"],
    answer: "parentheses"
  },
  {
    title: "What inputs a message to the web console?",
    choices: [
      "elements",
      "function()",
      "sources",
      "console.log()"
    ],
    answer: "console.log()"
  },
  {
    title: "What HTML element do we use for JavaScript?",
    choices: ["<javascript>", "<script>", "<heading>", "<style>"],
    answer: "<script>"
  },
  {
    title:
      "How do do you comment in JavaScript?",
    choices: ["//comment", "<-comment->", "<!-comment->", "(comment)"],
    answer: "//comment"
  },
  {
    title:
      "What does HTML stand for?",
    choices: ["hypertext mark language", "hypertext markup language ", "hyper markup language", "none of these"],
    answer: "hypertext markup language"
  }
];

let currentQuestionIndex = 0;
let time = quizQuestions.length * 10;
let timer;

// variables to reference DOM elements
let allQuestions = document.getElementById("questions");
let quizTimer = document.getElementById("counter");
let quizChoices = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let userName = document.getElementById("initials");
let response = document.getElementById("feedback");
let viewScores = document.getElementById("scores")

function totalTimer() {
  // update time
  time--;
  quizTimer.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function startQuiz() {
  // hide start screen
  let beginQuiz = document.getElementById("start-screen");
  beginQuiz.setAttribute("class", "hide");

  // un-hide questions section
  allQuestions.removeAttribute("class");

  // start timer
  timer = setInterval(totalTimer, 1000);

  // show starting time
  quizTimer.textContent = time;

  displayQuestion();
}

function displayQuestion() {
  // get current question object from array
  let currentQuestion = quizQuestions[currentQuestionIndex];

  // update title with current question
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  quizChoices.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    quizChoices.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== quizQuestions[currentQuestionIndex].answer) {
    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    quizTimer.textContent = time;

    response.textContent = "That is incorrect!";
    document.getElementById("feedback").style.color = "#8B0000";
    document.getElementById("feedback").style.fontWeight = "#700";
  } else {
    response.textContent = "That is correct!";
    document.getElementById("feedback").style.color = "#228B22";
    document.getElementById("feedback").style.fontWeight = "#700";
  }

  // flash right/wrong feedback on page for half a second
  response.setAttribute("class", "feedback");
  setTimeout(function () {
    response.setAttribute("class", "feedback hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === quizQuestions.length) {
    quizEnd();
  } else {
    displayQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timer);

  // show end screen
  let endQuiz = document.getElementById("end-screen");
  endQuiz.removeAttribute("class");

  // show final score
  let userScore = document.getElementById("final-score");
  userScore.textContent = time;

  // hide questions section
  allQuestions.setAttribute("class", "hide");
}


function saveHighscore() {
  // get value of input box
  let initials = userName.value.trim();
  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(localStorage.getItem("highscores")) || [];
    // format new score object for current user
    let newScore = {
      score: time,
      initials: initials
    };
    // save to localstorage
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

function displayScores() {
  let scoredQuiz = document.getElementById("end-screen");
  scoredQuiz.setAttribute("class", "hide");

  let allScores = document.getElementById("displayScores");
  allScores.removeAttribute("class");

  // either get scores from localstorage or set to empty array
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    let liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    let olEl = document.getElementById("initials");
    olEl.appendChild(liTag);
  });
}


startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;

userName.onkeyup = checkForEnter;

viewScores.onclick = displayScores;

