const BASE_URL = "http://localhost:3000/api/v1";
const NOTES_URL = BASE_URL + "/notes";
const NOTE_URL = id => NOTES_URL + "/" + id;
const LOOPS_URL = BASE_URL + `/loops`;
const LOOP_URL = id => LOOPS_URL + "/" + id;
const RECORDINGS_URL = BASE_URL + `/recordings`;
const RECORDING_URL = id => RECORDINGS_URL + "/" + id;
const modal = document.querySelector(".modal");
const duck = document.querySelector("#modal-logo");

let currentLoop = null;
let currentRecording = null;

duck.onclick = function() {
  honks[Math.floor(Math.random() * honks.length)].play();
  modal.className = "modal modal-animate";

  fadeOut();

  setTimeout(e => {
    modal.style.display = "none";
    startLooper();
    modal.className = "modal";
  }, 1000);
};

function fadeOut() {
  let vol_i = 0.05;
  const vol = setInterval(() => {
    vol_i -= 0.001;
    if (vol_i < 0) {
      vol_i = 0;
      intro.pause();
      clearInterval(vol);
    }
    intro.volume = vol_i;
  }, 100);
}

function fadeIn() {
  let vol_i = 0;
  const vol = setInterval(() => {
    vol_i += 0.001;
    if (vol_i > 0.05) {
      vol_i = 0.05;
      clearInterval(vol);
      modal.className = "modal";
    }
    intro.volume = vol_i;
  }, 100);
}

Recording.getLastRecordingId();

fetch(LOOPS_URL)
  .then(res => res.json())
  .then(e => {
    e.forEach(createLoop);
  });

const title = document.querySelector("#title > h1");
title.addEventListener("click", e => {
  honks[Math.floor(Math.random() * honks.length)].play();
  modal.style.display = "block";
  stopLooper();
  fadeIn();
  modal.className = "modal modal-animate-reverse";
  intro.play();
});
