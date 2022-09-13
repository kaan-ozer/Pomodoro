"use strict";

/* Elements */
const countdownEl = document.querySelector(".countdown");
const btnStartStopEl = document.querySelector(".btn-start-stop");

/* variables */

//pomodoro counter
let pomodoroCounter = 0;
//poomodoro starting minutes
const startingMinutes = 1;
//short break starting minutes
const shortBreakMinutes = 5;
// time from second type
let totalTime = startingMinutes * 60;
let refreshInterval;

/* Functions */
function updateCountdown() {
  let minutes = Math.floor(totalTime / 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;

  let seconds = totalTime % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  console.log(minutes, seconds, totalTime);

  countdownEl.innerHTML = `${minutes}:${seconds}`;

  totalTime--;

  if (totalTime < 0) {
    pomodoroCounter++;

    if (pomodoroCounter === 4) {
      document.getElementsById("btn-pomodoro").classList.remove("active-btn");
    } else {
      document.getElementsById("btn-shortBreak").classList.add("active-btn");
      totalTime = shortBreakMinutes * 60;
      countdownEl.innerHTML = `${minutes}:${seconds}`;
      //stop the setInterval when time = 0 for avoid negative time
      clearInterval(refreshInterval);
    }
  }
}

// let refreshInterval = setInterval(updateCountdown, 1000);

btnStartStopEl.addEventListener("click", function () {
  console.log(btnStartStopEl.textContent);

  if (btnStartStopEl.textContent === "START") {
    refreshInterval = setInterval(updateCountdown, 1000);

    btnStartStopEl.innerHTML = "STOP";
    btnStartStopEl.style.backgroundColor = " rgba(52, 58, 64, 0.447)";
  } else if (btnStartStopEl.textContent === "STOP") {
    clearInterval(refreshInterval);

    btnStartStopEl.innerHTML = "START";
    btnStartStopEl.style.backgroundColor = " rgba(222, 226, 230, 0.193)";
  }
});
