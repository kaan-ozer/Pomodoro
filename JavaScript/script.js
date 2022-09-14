"use strict";

/* Elements */
const countdownEl = document.querySelector(".countdown");
const btnStartStopEl = document.querySelector(".btn-start-stop");
const btnPomodoroEl = document.querySelector("#btn-pomodoro");
const btnShortBreakEl = document.querySelector("#btn-shortBreak");
const btnLongBreakEl = document.querySelector("#btn-longBreak");
const btnRightEl = document.querySelector(".btn-right");
const btnLeftEl = document.querySelector(".btn-left");
const sidebarClosed = document.querySelector(".side-bar-closed");
const sidebarOpen = document.querySelector(".side-bar-open");
const btnCloseModal = document.querySelector(".btn-close-modal");
const modalSettings = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const settingsAnchor = document.querySelector(".settings-anchor");
const settingsAnchorOpenBar = document.querySelector(
  ".settings-anchor-open-bar"
);
const btnSet = document.querySelector(".btn-set");

/* variables */

let pomodoroInput, shortBreakInput, longBreakInput, interval;

//pomodoro counter
let pomodoroCounter = 0;
//poomodoro starting minutes
let startingMinutes = 20;

//short break starting minutes
let shortBreakMinutes = 1;
//long break starting minutes
let longBreakMinutes = 1;
// time from second type
let totalTime = startingMinutes * 60;
let defaultIntervalForPomodoro = 4;
let refreshInterval, minutes, seconds;

let isShortBreakActive = false,
  isLongBreakActive = false,
  isPomodoroActive = true;

/* Functions */
function resetStartStop() {
  btnStartStopEl.innerHTML = "START";
  btnStartStopEl.style.backgroundColor = " rgba(222, 226, 230, 0.193)";
}

function setTime() {
  //get minutes
  minutes = Math.floor(totalTime / 60);

  // if it is less than 10 add 0 before the minute
  minutes = minutes < 10 ? "0" + minutes : minutes;

  //get seconds
  seconds = totalTime % 60;

  // if it is less than 10 add 0 before the second
  seconds = seconds < 10 ? "0" + seconds : seconds;

  //show the result
  countdownEl.innerHTML = `${minutes}:${seconds}`;
}

function updateCountdown() {
  // get minutes and seconds and show the result
  setTime();

  // total time will be decreased as one second in each second
  totalTime--;

  if (totalTime < 0) {
    //stop the setInterval when time = 0 for avoid negative time
    clearInterval(refreshInterval);

    if (isPomodoroActive) {
      //increase the counter
      pomodoroCounter++;

      //check the ınterval of pomodoro
      if (pomodoroCounter === defaultIntervalForPomodoro) {
        btnPomodoroEl.classList.remove("active-btn");
        btnLongBreakEl.classList.add("active-btn");
        isLongBreakActive = true;
        isPomodoroActive = false;

        totalTime = longBreakMinutes * 60;

        setTime();
        totalTime = 2;
        resetStartStop();
      } else {
        btnPomodoroEl.classList.remove("active-btn");
        btnShortBreakEl.classList.add("active-btn");
        isShortBreakActive = true;
        isPomodoroActive = false;

        totalTime = shortBreakMinutes * 60;

        setTime();
        resetStartStop();
      }
    } else if (isShortBreakActive) {
      btnPomodoroEl.classList.add("active-btn");
      btnShortBreakEl.classList.remove("active-btn");
      isShortBreakActive = false;
      isPomodoroActive = true;

      totalTime = minutes * 60;

      setTime();
      resetStartStop();
    } else if (isLongBreakActive) {
      btnLongBreakEl.classList.remove("active-btn");
      btnPomodoroEl.classList.add("active-btn");
      isLongBreakActive = false;
      isPomodoroActive = true;
      pomodoroCounter = 0;

      totalTime = minutes * 60;

      setTime();
      resetStartStop();
    }
  }
}

/*Event Listeners */
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

btnRightEl.addEventListener("click", function () {
  sidebarClosed.classList.add("hidden");
  sidebarOpen.classList.remove("hidden");
});

btnLeftEl.addEventListener("click", function () {
  sidebarClosed.classList.remove("hidden");
  sidebarOpen.classList.add("hidden");
});

btnCloseModal.addEventListener("click", function () {
  overlay.classList.add("hidden");
  modalSettings.classList.add("hidden");
});

settingsAnchor.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalSettings.classList.remove("hidden");
});
settingsAnchorOpenBar.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalSettings.classList.remove("hidden");
});
overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  modalSettings.classList.add("hidden");
});

btnSet.addEventListener("click", function () {
  const arr = [];
  for (let i = 1; i <= 4; i++) {
    arr[i] = document.querySelector(`.modal-input-${i}`).value;
  }
  pomodoroInput = arr[1];
  shortBreakInput = arr[2];
  longBreakInput = arr[3];
  interval = arr[4];

  //if there is custom setting
  startingMinutes = pomodoroInput;
  shortBreakMinutes = shortBreakInput;
  longBreakMinutes = longBreakInput;
  defaultIntervalForPomodoro = interval;

  totalTime = startingMinutes * 60;
  setTime();

  overlay.classList.add("hidden");
  modalSettings.classList.add("hidden");
});
