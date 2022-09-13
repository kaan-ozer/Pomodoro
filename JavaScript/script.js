"use strict";

/* Elements */
const countdownEl = document.querySelector(".countdown");
const btnStartStopEl = document.querySelector(".btn-start-stop");

const startingMinutes = 20;

// time from second type
let totalTime = startingMinutes * 60;

/* Functions */
const updateCountdown = function () {
  let minutes = Math.floor(totalTime / 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;

  let seconds = totalTime % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  console.log(minutes, seconds, totalTime);

  countdownEl.innerHTML = `${minutes}:${seconds}`;

  totalTime--;

  if (totalTime < 0) {
    //stop the setInterval when time = 0 for avoid negative time
    clearInterval(refreshInterval);
  }
};

// let refreshInterval = setInterval(updateCountdown, 1000);
let refreshInterval;
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
