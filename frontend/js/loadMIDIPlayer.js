window.onload = function() {
  const instrumentsName = [
    "acoustic_grand_piano",
    "acoustic_guitar_nylon",
    "acoustic_bass",
    "electric_bass_pick",
    "electric_piano_2",
    "violin",
    "tuba",
    "clarinet",
    "percussive_organ",
    "orchestral_harp",
    "ocarina",
    "music_box",
    "lead_1_square",
    "lead_2_sawtooth",
    "synth_bass_1",
    "synth_drum"
  ];

  const soundfontURL = "FatBoy/";

  MIDI.loadPlugin({
    soundfontUrl: soundfontURL,
    instruments: instrumentsName,
    onsuccess: function() {
      for (let i = 0; i < instrumentsName.length; i++) {
        MIDI.programChange(i, MIDI.GM.byName[instrumentsName[i]].number);
      }
      startLooper();
      stopLooper();
    }
  });
};
