
// Timer 
function startTimer() {
  var counter = 60;
  setInterval(function () {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
      // alert('sorry, out of time');
      // clearInterval(counter);
      span = document.getElementById("count");
      span.innerHTML = "00"
      endQuiz(); 
    }
  }, 1000);
}
function start() {
  document.getElementById("count").style = "color:black;";
  startTimer();
};

function startQuiz() {
  
}

function nextQuestion () {

}

function endQuiz () {

}