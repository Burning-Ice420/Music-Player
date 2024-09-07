const wrapper = document.querySelector('.wrapper'),
    musicImg = wrapper.querySelector('img'),
    musicName = wrapper.querySelector('.name'),
    musicArtist = wrapper.querySelector('.artist'),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    prevBtn = wrapper.querySelector('#prev'),
    nextBtn = wrapper.querySelector('#next'),
    mainAudio = wrapper.querySelector('#main-audio'),
    progressArea = wrapper.querySelector('.progress-area'),
    progressBar = wrapper.querySelector('.progress-bar');

let musicIndex = Math.floor((Math.random()* allMusic.length) + 1);
isMusicPlaused = true;

window.addEventListener('load', () =>{
    loadMusic(musicIndex);
});


function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb-1].name;
    musicArtist.innerText = allMusic[indexNumb-1].artist;
    musicImg.src = `musicimg/${allMusic[indexNumb-1].src}.jpg`;
    mainAudio.src = `to_you/${allMusic[indexNumb-1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add('paused');
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class = 'fi fi-br-pause></i>`;
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove('paused');
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = '<i class = fi fi-br-play play></i>';
    mainAudio.pause();
}

function prevMusic(){
    musicIndex--; // decreases the value of music index by 1
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex; // checks if the value is less than one if its not lesss than 1 it stays the same
    loadMusic(musicIndex);
    playMusic();
}
function nextMusic(){
    musicIndex++; 
    musicIndex > allMusic.length ? musicIndex = 1: musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener('click' , () => {
    const isMusicplay = wrapper.classList.contains('paused');
    isMusicplay ? pauseMusic() : playMusic();
})


prevBtn.addEventListener('click', () => {
    prevMusic()
})

nextBtn.addEventListener('click', () => {
    nextMusic()
})

mainAudio.addEventListener('timeupdate', (e) =>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector('.current-time'),
        musicDuration = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener('loadeddata', () =>{
        let mainAndDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAndDuration/60);
        let totalSec = Math.floor(mainAndDuration%60);
        if(totalSec <10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime % 60);

    if(currentSec<10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`

})

progressArea.addEventListener('click',(e) =>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX/progressWidth) * songDuration;
    playMusic();
})