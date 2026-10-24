function solution(m, musicinfos) {
  const played = [];

  const timeToMinute = (time) => {
    const parsed = time.split(":").map(Number);
    return parsed[0] * 60 + parsed[1];
  }

  const replaceSharp = (music) => {
    const sharps = ["C#", "D#", "F#", "G#", "A#"];
    const replacements = ["c", "d", "f", "g", "a"];

    for (let i = 0; i < sharps.length; i++) {
      music = music.replaceAll(sharps[i], replacements[i]);
    }

    return music;
  }

  musicinfos.forEach((info, i) => {
    const [start, end, title, music] = info.split(",");
    const startMinute = timeToMinute(start);
    const endMinute = timeToMinute(end);
    const runningTime = endMinute - startMinute;
    const normalizedMusic = replaceSharp(music);

    const repeated = Math.ceil(runningTime / normalizedMusic.length);

    played.push([normalizedMusic.repeat(repeated).slice(0, runningTime), title, i]);
  });


  const normalized = replaceSharp(m);
  const filtered = played.filter(p => p[0].includes(normalized)).sort((a, b) => b[0].length - a[0].length || a[2] - b[2]);

  return filtered.length ? filtered[0][1] : "(None)";
}