const cursor = document.querySelector("#cursor");

let beatIndex = 0;
let tickLoopId = 0;
let cursorAnimationId = 0;

function resetLooper() {
  stopLooper();
  setTimeout(startLooper, 100);
}
function stopLooper() {
  clearInterval(tickLoopId);
  clearInterval(cursorAnimationId);
  beatIndex = 0;
}

function startLooper() {
  startTickLoop();
  resetCursorAnimation();
  renderNotes();
}

function startTickLoop() {
  clearInterval(tickLoopId);

  tickLoopId = setInterval(e => {
    if (currentLoop.notes[beatIndex]) playNotes(currentLoop.notes[beatIndex]);
    beatIndex++;
    if (metronome && beatIndex % currentLoop.beatsPerBar === 0) {
      const note = {
        cID: 11,
        volume: 500,
        note_key: 70,
        velocity: 16,
        delay: 0.1
      };
      if (beatIndex === currentLoop.notes.length) note.note_key = 80;
      playNote(note);
    }
    if (beatIndex >= currentLoop.notes.length) {
      beatIndex = 0;
      resetCursorAnimation();
    }
  }, currentLoop.beatsPerTempo);
}

function resetCursorAnimation() {
  clearInterval(cursorAnimationId);

  const max = currentLoop.notes.length;
  const elem = document.getElementById("cursor");
  cursorAnimationId = setInterval(e => {
    if ((beatIndex * 70) / max >= 70) {
      clearInterval(cursorAnimationId);
    } else {
      elem.style.left = (beatIndex * 70) / max + "vw";
    }
  }, 15);
}

function resetMajorTicks(bars) {
  const looper = document.querySelector("#looper");

  looper.innerHTML = "<div id='cursor'></div>";

  for (let i = 1; i < bars; i++) {
    const tick = document.createElement("div");
    tick.style = `height: 30vh;
    width: 2px;
    background: black;
    position: absolute;
    left: ${i * (70 / bars)}vw
  `;
    looper.append(tick);
  }
}

function renderNotes() {
  resetMajorTicks(currentLoop.bars);

  for (let i = 0; i < currentLoop.notes.length; i++) {
    if (currentLoop.notes[i]) {
      for (let j = 0; j < currentLoop.notes[i].length; j++) {
        note = currentLoop.notes[i][j];
        renderNote(note, i);
      }
    }
  }
}

function renderNote(note, index) {
  const width = findWidthValue(note);
  const tick = document.createElement("div");

  tick.style = `
              height: 4px;
              width: ${width}vw;
              background: ${cIDtoColor[note.cID]};
              position: absolute;
              border: 1px solid black;
              border-radius: 5px;
              left: ${index * (70 / currentLoop.notes.length)}vw;
              bottom: ${((note.note_key - 10) / 105) * 27.5 + 0.1}vh;
              `;
  looper.append(tick);
}

function findWidthValue(note) {
  if (note.beat_index_off - note.beat_index > 0) {
    return (
      ((note.beat_index_off - note.beat_index) * 70) / currentLoop.notes.length
    );
  } else {
    return (
      ((currentLoop.notes.length - note.beat_index) * 70) /
      currentLoop.notes.length
    );
  }
}

const cIDtoColor = [
  "#ef5350",
  "#ec407a",
  "#ab47bc",
  "#7e57c2",
  "#5c6bc0",
  "#42a5f5",
  "#29b6f6",
  "#26c6da",
  "#26a69a",
  "#66bb6a",
  "#9ccc65",
  "#d4e157",
  "#ffee58",
  "#ffca28",
  "#ffa726",
  "#ff7043"
];
