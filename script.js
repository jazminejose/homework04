
//assign variables
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: {
      a: "answer 1",
      b: "answer 2",
      c: "answer 3",
      d: "answer 4"
    },
    correctAnswer: "b"
  },
  {
    question: "What does javascript do in coding?",
    answers: {
      a: "answer 1",
      b: "answer 2",
      c: "answer 3",
      d: "answer 4"
    },
    correctAnswer: "c"
  },
  {
    question: "What does CSS stand for?"
  answers: {
      a: "answer 1",
      b: "answer 2",
      c: "answer 3",
      d: "answer 4"
    },
    correctAnswer: "d"
  }
]


//create timer
i = 60;
function onTimer() {
  document.getElementById('timer').innerHTML = i;
  i--;
  if (i < 0) {
    alert('You lose!');
  }
  else {
    setTimeout(onTimer, 1000);
  }
}











// document.getElementById('quizOptions').addEventListener('click',)() => newGame {
// }

// document.getElementById('displayQuestions').addEventListener('click',)() => newGame {

// }

// document.getElementById('scores').style.display ='none'

