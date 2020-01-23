class Loop {
  constructor(loop) {
    this.id = loop.id;
    this.name = loop.name;

    this.beatsPerBar = loop.beats_per_bar;
    this.bars = loop.bars;
    this.BPM = loop.BPM;

    this.notes = [];
    this.notes.length = loop.beats_per_bar * loop.bars;

    loop.notes.forEach(e => {
      if (this.notes[e.beat_index]) {
        this.notes[e.beat_index].push(e);
      } else {
        this.notes[e.beat_index] = [e];
      }
    });

    Loop.all.push(this);
  }

  delete() {
    const arr = Loop.all;
    const index = arr.indexOf(this);
    arr.splice(index, 1);

    const content = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(LOOP_URL(this.id), content);
  }

  updateNotesLength() {
    this.notes.length = this.beatsPerBar * this.bars;
  }

  get beatsPerTempo() {
    return 60000 / this.BPM / this.beatsPerBar;
  }

  static all = [];

  static find(id) {
    return Loop.all.find(e => e.id == id);
  }
}

currentLoop = "";
function createLoop(loop) {
  const newLoop = new Loop(loop);
  if (!currentLoop) {
    currentLoop = newLoop;
    updateForm();
  }

  const li = document.createElement("li");
  li.dataset.loopId = newLoop.id;

  const p = document.createElement("p");
  p.innerText = newLoop.name;
  li.append(p);

  const btn = document.createElement("btn");
  btn.innerText = "x";
  li.append(btn);

  loops.appendChild(li);
}

function resetSidebar() {
  loops.innerHTML = "";
}
