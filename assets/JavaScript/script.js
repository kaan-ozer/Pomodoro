"use strict";

function showNotification(title, body) {
  const notification = new Notification("title", {
    body: "body",
  });

  notification.onclick = (e) => {};
}

if (Notification.permission === "granted") {
  showNotification();
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") showNotification("test", "test body");
  });
}

/* Elements */
const countdownEl = document.querySelector(".countdown");
const btnResetAnchor = document.querySelectorAll(".reset-anchor");
const pomodoroInterface = document.querySelector(".pomodoro-interface");
const btnResetAnchorWide = document.querySelector(".reset-anchor-wide");
const btnStartStopEl = document.querySelector(".btn-start-stop");
const btnPomodoroEl = document.querySelector("#btn-pomodoro");
const btnShortBreakEl = document.querySelector("#btn-shortBreak");
const btnLongBreakEl = document.querySelector("#btn-longBreak");
const btnRightEl = document.querySelector(".btn-right");
const btnLeftEl = document.querySelector(".btn-left");
const sidebarClosed = document.querySelector(".closed-bar");
const sidebarOpen = document.querySelector(".open-bar");
const btnCloseModal = document.querySelector(".btn-close-modal");
const modalSettings = document.querySelector(".my-modal");
const overlay = document.querySelector(".overlay");
const settingsAnchor = document.querySelectorAll(".settings-anchor");
const settingsAnchorWide = document.querySelector(".settings-anchor-wide");
const btnSet = document.querySelector(".btn-set");
const dingEl = document.querySelector("#mySound");

/* variables */

let pomodoroInput, shortBreakInput, longBreakInput, interval;

//pomodoro counter
let pomodoroCounter = 0;
//poomodoro starting minutes
let startingMinutes = 25;
//short break starting minutes
let shortBreakMinutes = 5;
//long break starting minutes
let longBreakMinutes = 30;
// time from second type
let totalTime = startingMinutes * 60;
//set pomodoro interval
let defaultIntervalForPomodoro = 4;
let refreshInterval, minutes, seconds;

//first step will start with pomodoro
let isShortBreakActive = false,
  isLongBreakActive = false,
  isPomodoroActive = true;

/* Functions */

//it will reset the button's text and bg
function resetStartStop() {
  btnStartStopEl.innerHTML = "START";
  btnStartStopEl.style.backgroundColor = " rgba(222, 226, 230, 0.193)";
}

//set the time and show
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
  defaultIntervalForPomodoro = Number(interval);

  if (isPomodoroActive) {
    totalTime = startingMinutes * 60;
  } else if (isShortBreakActive) {
    totalTime = shortBreakMinutes * 60;
  } else if (isLongBreakActive) {
    totalTime = longBreakMinutes * 60;
  }

  setTime();

  overlay.classList.add("hidden");
  modalSettings.classList.add("hidden");
});

function updateCountdown() {
  // total time will be decreased as one second in each second
  totalTime--;

  if (totalTime < 0) {
    dingEl.play();
    //stop the setInterval when time = 0 for avoid negative time
    clearInterval(refreshInterval);

    if (isPomodoroActive) {
      // short break is turned into active
      btnPomodoroEl.classList.remove("active-btn");
      isPomodoroActive = false;

      //increase the counter
      pomodoroCounter++;

      //if long interval won't start, next pomodoro will start
      if (pomodoroCounter !== defaultIntervalForPomodoro) {
        //make the short break active
        btnShortBreakEl.classList.add("active-btn");
        isShortBreakActive = true;

        // time is setted for short break
        totalTime = shortBreakMinutes * 60;
      } else if (pomodoroCounter === defaultIntervalForPomodoro) {
        //make the long break active
        btnLongBreakEl.classList.add("active-btn");
        isLongBreakActive = true;

        console.log("Long break çalıştı");
        //time is setted for long break
        totalTime = longBreakMinutes * 60;
      }

      if (!window.Notification) {
        return;
      } else {
        showNotification(
          "time is over",
          `You finished your study, and now it is time to break, Have fun...`
        );
      }

      setTime();
      resetStartStop();
    } else if (isShortBreakActive) {
      //we need to remove active class for short break for the both cases
      btnShortBreakEl.classList.remove("active-btn");
      isShortBreakActive = false;

      btnPomodoroEl.classList.add("active-btn");
      isPomodoroActive = true;
      totalTime = minutes * 60;

      pomodoroInterface.innerHTML = `#${pomodoroCounter + 1}`;

      if (!window.Notification) {
        return;
      } else {
        showNotification(
          "time is over",
          `You finished your break, and now it is time to study again, Have fun...`
        );
      }

      setTime();
      resetStartStop();
    } else if (isLongBreakActive) {
      btnLongBreakEl.classList.remove("active-btn");
      btnPomodoroEl.classList.add("active-btn");
      isLongBreakActive = false;
      isPomodoroActive = true;

      pomodoroCounter = 0;

      pomodoroInterface.innerHTML = `#${pomodoroCounter + 1}`;
      //time is setted for pomodoro after long break
      totalTime = minutes * 60;

      if (!window.Notification) {
        return;
      } else {
        showNotification(
          "time is over",
          `You finished your break, and now it is time to study again, Have fun...`
        );
      }

      setTime();
      resetStartStop();
    }
  } else {
    // change the time if it is not over
    setTime();
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

for (let i = 0; i < settingsAnchor.length; i++) {
  settingsAnchor[i].addEventListener("click", function () {
    overlay.classList.remove("hidden");
    modalSettings.classList.remove("hidden");
  });
}

settingsAnchorWide.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalSettings.classList.remove("hidden");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  modalSettings.classList.add("hidden");
});

btnShortBreakEl.addEventListener("click", function () {
  btnPomodoroEl.classList.remove("active-btn");
  btnLongBreakEl.classList.remove("active-btn");
  btnShortBreakEl.classList.add("active-btn");
  isPomodoroActive = false;
  isLongBreakActive = false;
  isShortBreakActive = true;

  totalTime = shortBreakMinutes * 60;

  setTime();
});

btnPomodoroEl.addEventListener("click", function () {
  btnPomodoroEl.classList.add("active-btn");
  btnLongBreakEl.classList.remove("active-btn");
  btnShortBreakEl.classList.remove("active-btn");
  isPomodoroActive = true;
  isLongBreakActive = false;
  isShortBreakActive = false;

  totalTime = startingMinutes * 60;

  setTime();
});

btnLongBreakEl.addEventListener("click", function () {
  btnPomodoroEl.classList.remove("active-btn");
  btnLongBreakEl.classList.add("active-btn");
  btnShortBreakEl.classList.remove("active-btn");
  isPomodoroActive = false;
  isLongBreakActive = true;
  isShortBreakActive = false;

  totalTime = longBreakMinutes * 60;

  setTime();
});

for (let i = 0; i < btnResetAnchor.length; i++) {
  btnResetAnchor[i].addEventListener("click", function () {
    btnPomodoroEl.classList.add("active-btn");
    btnLongBreakEl.classList.remove("active-btn");
    btnShortBreakEl.classList.remove("active-btn");

    isPomodoroActive = true;
    isLongBreakActive = false;
    isShortBreakActive = false;

    pomodoroCounter = 0;

    pomodoroInterface.innerHTML = `#${pomodoroCounter + 1}`;

    startingMinutes = 25;

    shortBreakMinutes = 5;

    longBreakMinutes = 30;

    totalTime = startingMinutes * 60;

    setTime();
  });
}

btnResetAnchorWide.addEventListener("click", function () {
  btnPomodoroEl.classList.add("active-btn");
  btnLongBreakEl.classList.remove("active-btn");
  btnShortBreakEl.classList.remove("active-btn");

  isPomodoroActive = true;
  isLongBreakActive = false;
  isShortBreakActive = false;

  pomodoroCounter = 0;

  pomodoroInterface.innerHTML = `#${pomodoroCounter + 1}`;

  startingMinutes = 25;

  shortBreakMinutes = 5;

  longBreakMinutes = 30;

  totalTime = startingMinutes * 60;

  setTime();
});
