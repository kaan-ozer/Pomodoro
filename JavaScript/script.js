"use strict";

/* Elements */
const countdownElement = document.querySelector(".countdown");

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

  countdownElement.innerHTML = `${minutes}:${seconds}`;

  totalTime--;

  if (totalTime < 0) {
    //stop the setInterval when time = 0 for avoid negative time
    clearInterval(refreshInterval);
  }
};

let refreshInterval = setInterval(updateCountdown, 1000);
