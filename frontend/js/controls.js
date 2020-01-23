const controls = document.querySelector("#controls");
const undoBtn = controls.querySelector("#undo-btn");
const updateFormElement = document.querySelector("#update-form");
const updateFormInputs = updateFormElement.querySelectorAll("input");
const volumeKnob = document.querySelector("#volume");
const volumeSlider = document.querySelector("#volume-slider");
const velocityKnob = document.querySelector("#velocity");
const velocitySlider = document.querySelector("#velocity-slider");

volumeSlider.value = volume;
velocitySlider.value = velocity;

function startRecording() {
  isRecording = true;
  undoBtn.disabled = true;
  currentRecording = new Recording();
  postRecording(currentRecording);
}

function endRecording() {
  undoBtn.disabled = false;
  isRecording = false;
}

function undoLastRecording() {
  deleteRecording();
}

let metronome = false;
const metro = document.querySelector("#metro");

metro.addEventListener("click", e => {
  metronome = !metronome;
  if (metronome) {
    e.target.style = "opacity: 1; background: red";
  } else {
    e.target.style = "";
  }
});

function updateForm() {
  updateFormElement.BPM.value = currentLoop.BPM;
  updateFormElement.name.value = currentLoop.name;
  updateFormElement.bars.value = currentLoop.bars;
}
controls.addEventListener("click", e => {
  if (e.target.id === "record-btn") {
    if (isRecording) {
      e.target.style = "";
      endRecording();
    } else {
      e.target.style = "opacity: 1; background: red";
      startRecording();
    }
  }
  if (e.target.id === "undo-btn") undoLastRecording();
});

updateFormElement.addEventListener("submit", e => {
  e.preventDefault();

  const body = {
    name: updateFormElement.name.value,
    BPM: updateFormElement.BPM.value,
    bars: updateFormElement.bars.value
  };
  const content = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  };
  fetch(LOOP_URL(currentLoop.id), content)
    .then(e => e.json())
    .then(e => {
      currentLoop.BPM = e.BPM;
      currentLoop.bars = e.bars;
      currentLoop.updateNotesLength();
      beatIndex = 0;
      startLooper();
    });
});

controls.addEventListener("mousewheel", e => {
  if (
    e.target.closest("div").id === "volume-div" ||
    e.target.closest("div").id === "volslide"
  ) {
    volume += parseInt(e.deltaY);
    if (volume > 512) {
      volume = 512;
    }
    if (volume < 0) {
      volume = 0;
    }
    volumeKnob.innerText = parseInt((volume * 100) / 512);
    volumeSlider.value = volume;
  }

  if (
    e.target.closest("div").id === "velocity-div" ||
    e.target.closest("div").id === "velslide"
  ) {
    velocity += parseInt(e.deltaY);
    if (velocity > 64) {
      velocity = 64;
    }
    if (velocity < 0) {
      velocity = 0;
    }
    velocityKnob.innerText = parseInt((velocity * 100) / 127);
    velocitySlider.value = velocity;
  }
});

volumeSlider.oninput = function() {
  volume = +this.value;
  volumeKnob.innerText = parseInt((volume * 100) / 512);
};
velocitySlider.oninput = function() {
  velocity = +this.value;
  velocityKnob.innerText = parseInt((velocity * 100) / 127);
};
