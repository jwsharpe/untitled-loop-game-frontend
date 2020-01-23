class Recording {
  constructor() {
    this.id = Recording.incrementId();
  }
  static getLastRecordingId() {
    fetch(RECORDINGS_URL)
      .then(res => res.json())
      .then(recordings => {
        const recordingIds = recordings.map(e => e.id);
        const maxId = Math.max(...recordingIds);
        this.latestId = maxId;
      });
  }
  static incrementId() {
    this.latestId++;
    return this.latestId;
  }
}

function postRecording(recording) {
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ id: recording.id })
  };

  fetch(RECORDINGS_URL, content);
}

function deleteRecording() {
  fetch(RECORDING_URL(currentLoop.id), {
    method: "DELETE",

    headers: { Accept: "application/json" }
  })
    .then(res => res.json())
    .then(loop => {
      currentLoop.notes = [];
      currentLoop.notes.length = currentLoop.beatsPerBar * currentLoop.bars;
      if (loop.notes) {
        loop.notes.forEach(e => {
          if (currentLoop.notes[e.beat_index]) {
            currentLoop.notes[e.beat_index].push(e);
          } else {
            currentLoop.notes[e.beat_index] = [e];
          }
        });
      }
      resetLooper();
    });
}
