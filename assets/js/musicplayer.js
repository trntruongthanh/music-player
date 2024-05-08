const songs = [
  {
    name: "the world could end with you",
    singer: "Llunr",
    path: "./assets/music/theworldcouldendwithyou.mp3",
    image: "./assets/img/the_world_could_end_with_you.jpg",
  },
  {
    name: "Rude",
    singer: "MAGIC!",
    path: "./assets/music/MAGIC!-Rude.mp3",
    image: "./assets/img/Magic!_Rude.png",
  },
  {
    name: "Memories",
    singer: "Maroon5",
    path: "./assets/music/Memories-Maroon5.mp3",
    image: "./assets/img/memories.jpg",
  },
  {
    name: "Sign Of The Times",
    singer: "Harry Styles",
    path: "./assets/music/HarryStyles-SignOfTheTimes.mp3",
    image: "./assets/img/signofthetimes.jpg",
  },
  {
    name: "Never Enough",
    singer: "Loren Allred",
    path: "./assets/music/NeverEnough.mp3",
    image: "./assets/img/neverenough.jpg",
  },
  {
    name: "Count One Me",
    singer: "Bruno Mars",
    path: "./assets/music/CountOnMe-BrunoMars.mp3",
    image: "./assets/img/countonme.jpg",
  },
  {
    name: "Scared to Be Lonely",
    singer: "Dua Lipa, Martin Garrix",
    path: "./assets/music/ScaredToBeLonely.mp3",
    image: "./assets/img/Scared_to_Be_Lonely.jpg",
  },
  {
    name: "Never Not",
    singer: "Luv",
    path: "./assets/music/nevernot.mp3",
    image: "./assets/img/nevernot.jpg",
  },
];

const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);



const music = $("#audio");

const musicPlayer = $(".music-player");

const songName = $(".music-name");

const artistName = $(".artist-name");

const disk = $(".disk");

const seekBar = $(".range");

const currTime = $(".current-time");

const musicDuration = $(".song-duration");

const playBnt = $(".btn-toggle-play");

const backwardBtn = $(".btn-backward-step");

const forwardBtn = $(".btn-forward-step");

const shuffleBtn = $(".btn-shuffle");

const loopBtn = $(".btn-loop");


var isShuffle = false;

var isRepeat = false;

var currentIndex = 0;


// xu ly nut play/pause
playBnt.addEventListener("click", () => {
  
  musicPlayer.classList.toggle("playing"); // them vao playing neu chua co neu co roi thi xoa

  disk.classList.toggle("play");

  if (musicPlayer.className.includes("playing")) {

    music.play();
  } 
  else {
    music.pause();
  }

});



// load song music
function loadCurrentSong(i) {

  seekBar.value = 0;
  
  let song = songs[i];

  currentIndex = i;

  music.src = song.path;

  songName.innerHTML = song.name;
  
  artistName.innerHTML = song.singer;

  disk.style.backgroundImage = `url('${song.image}')`;

  currTime.innerHTML = "00:00";

  setTimeout(() => {

    seekBar.max = music.duration;

    musicDuration.innerHTML = formatTime(music.duration);

  }, 300);
}



// formatting time in min and seconds format
function formatTime(time) {

  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
  
}



// seek bars
setInterval(() => {

  seekBar.value = music.currentTime;

  currTime.innerHTML = formatTime(music.currentTime);

  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {

    if (!isRepeat) {

      forwardBtn.click();
    }
  }

}, 500);

seekBar.addEventListener("change", function () {

  music.currentTime = seekBar.value;

});



// auto play
function playMusic() {

  music.play();
  musicPlayer.classList.add("playing");
  disk.classList.add("play");

}


// forward and backward
forwardBtn.addEventListener("click", function () {

  if (isShuffle) {

   shuffleSongs();
  } 
  else if (currentIndex >= songs.length - 1) {

    currentIndex = 0; 
  } 
  else {

    currentIndex++;
  }

  loadCurrentSong(currentIndex);
  playMusic();
});


backwardBtn.addEventListener("click", function () {

  if (isShuffle) {

    shuffleSongs();
  } 
  else if (currentIndex <= 0) {

    currentIndex = songs.length - 1; 
  }
  else {

    currentIndex--;
  }

  loadCurrentSong(currentIndex);
  playMusic();

});



// shuffle song
shuffleBtn.addEventListener("click", function () {
  
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);

  if (!isShuffle) {

    restoreOriginalSong();
  }

});


function shuffleSongs() {

  let newIndex;
  do {

    newIndex = Math.floor(Math.random() * songs.length);

  } while (newIndex === currentIndex)

  currentIndex = newIndex;
};

function restoreOriginalSong() {

  songs.sort((a, b) => songs.indexOf(a) - songs.indexOf(b));
;}



// loop song
loopBtn.addEventListener("click", function() {

  isRepeat = !isRepeat;
  loopBtn.classList.toggle("active", isRepeat);
});


music.addEventListener("ended", function() {
  
  if (isRepeat) {

    music.currentTime = 0;
    music.play();
  }
  else {
    
    forwardBtn.click();
  }
});

loadCurrentSong(0);











// const checkFileExistence = () => {
//     app.songs.forEach(song => {
//         const audio = new Audio(song.path);

//         audio.addEventListener('error', () => {
//             console.error(`Error loading file for ${song.name}. Check if the path "${song.path}" is correct.`);
//         });

//         audio.addEventListener('canplay', () => {
//             console.log(`File for ${song.name} loaded successfully.`);
//         });

//         // Load the audio to trigger the events
//         audio.load();
//     });
// };

// // Call the function to check file existence
// checkFileExistence();
