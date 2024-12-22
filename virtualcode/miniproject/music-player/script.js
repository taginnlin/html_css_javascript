let songName = document.getElementById('song-name');
let songSinger = document.getElementById('song-singer');
let songImage = document.querySelector('.song-image');
let playPauseImg = document.getElementById('play-pause');
let volumeRange = document.getElementById('volume-range');
let songRange = document.getElementById('song-duration');
let volSvg = document.getElementById('vol-svg');
let musicAnim = document.getElementById('musicanim');
let playlistImg = document.getElementById('playlist-img');
let playlist = document.querySelector('.playlist');
let playlistSong = document.querySelectorAll('.playlist-song');
let index = 0;
let playingSong = false;
let track = document.createElement('audio');
let songs = [
  {
    name: '稻香',
    path: '1.mp3',
    image: '1.jpg',
    singer: '周杰伦'
  },
  {
    name: '奢香夫人',
    path: '2.mp3',
    image: '2.jpg',
    singer: '凤凰传奇'
  },
  {
    name: '我怀念的',
    path: '3.mp3',
    image: '3.jpg',
    singer: '孙燕姿'
  },
  {
    name: '发如雪',
    path: '4.mp3',
    image: '4.jpg',
    singer: '周杰伦'
  }
];

function loadTrack(index) {
  track.src = songs[index].path;
  track.currentTime = 0;
  songRange.value = track.currentTime;
  songRange.max = track.duration;
  songName.innerHTML = songs[index].name;
  songSinger.innerHTML = songs[index].singer;
  songImage.style = `background-image: url(${songs[index].image});`;
  track.loop = true;
  volume();
  duration();
  setInterval(() => {
    songRange.max = track.duration;
    songRange.value = track.currentTime;
  }, 1000);
  track.load();
}
loadTrack(index);

function playPause() {
  if(!playingSong) {
    playSong();
    musicAnim.style.display = 'block';
  } else {
    pauseSong();
    musicAnim.style.display = 'none';
  }
}

function playSong() {
  track.play();
  playingSong = true;
  playPauseImg.src = 'pause.svg';
}

function pauseSong() {
  track.pause();
  playingSong = false;
  playPauseImg.src = 'play.svg';
}

function nextSong() {
  if(index < songs.length - 1) {
    index++;
    loadTrack(index);
    playSong();
  } else {
    index = 0;
    loadTrack(index);
    playSong();
  }
}

function previousSong() {
  if(index > 0) {
    index--;
    loadTrack(index);
    playSong();
  } else {
    index = songs.length - 1;
    loadTrack(index);
    playSong();
  }
}

function volume() {
  track.volume = volumeRange.value / 100;
  if(volumeRange.value == 0) {
    volSvg.src = 'mute.svg';
  } else {
    volSvg.src = 'volume.svg';
  }
}

function duration() {
  track.currentTime = songRange.value;
}

playlistImg.addEventListener('click', () => {
  playlist.classList.toggle('playlist-active');
  if(playlist.classList.contains('playlist-active')) {
    playlistImg.src = 'cross.svg';
  } else {
    playlistImg.src = 'playlist.svg';
  }
});

playlistSong.forEach((song, index) => {
  song.addEventListener('click', () => {
    loadTrack(index);
    playSong();
    playlist.classList.remove('playlist-active');
    playlistImg.src = 'playlist.svg';
  });
});