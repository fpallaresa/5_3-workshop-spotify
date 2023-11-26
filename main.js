const list = [
    {id: 0,author: "C.Tangana",title: "Me Maten",cover: "tangana_cover.png",duration: 10},
    {id: 1,author: "Rosalía",title: "Despechá",cover: "rosalia_cover.png",duration: 5},
    {id: 2,author: "Shakira",title: "Te felicito",cover: "shakira_cover.png",duration: 8},
    {id: 3,author: "Quevedo",title: "Quédate",cover: "quevedo_cover.png",duration: 12},
    {id: 4,author: "Bad Bunny",title: "Tití me preguntó",cover: "bad_cover.png",duration: 20}
];

// PASA LOS SEGUNDOS A MINUTOS
        const getMinutes = (s) => {
        const minutes = (Math.floor(s / 60) < 10) ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
        const seconds = (Math.floor(s % 60) < 10) ? '0' + Math.floor(s % 60) : Math.floor(s % 60);
        return minutes + ':' + seconds;
        }

//VARIABLES BASE

        let songDurationStart = '00:00';
        let currentSong = 0;
        let currentTime = 0;
        let duration = list[currentSong].duration;
        let isPlaying = false;
        let isLooping = false;
        let isRandom = false;

//RENDERIZADO CANCIONES

        let renderSongs = () => {
            let elementTitle = document.getElementsByClassName('card__title');
            elementTitle[0].textContent = list[currentSong].title;

            let elementAuthor = document.getElementsByClassName('card__author');
            elementAuthor[0].textContent = list[currentSong].author;

            let elementCover = document.getElementsByClassName('card__img');
            elementCover[0].src = './assets/'+ list[currentSong].cover;

            let elementDurationStart = document.getElementsByClassName('card__counter--start');
            elementDurationStart[0].textContent = songDurationStart;

            let elementDurationEnd = document.getElementsByClassName('card__counter--end');
            elementDurationEnd[0].textContent = getMinutes(list[currentSong].duration);
        };
        renderSongs();

// PROGRESSBAR

let updateProgress = () => {
    let progressBar = document.querySelector('.card__progressbar');
    let progress = (currentTime / duration) * 100;
    progressBar.value = progress;

    let elementDurationStart = document.getElementsByClassName('card__counter--start');
    elementDurationStart[0].textContent = getMinutes(currentTime);

    if (currentTime < duration && isPlaying) {
        currentTime++;
        setTimeout(updateProgress, 1000);
    } else {
        if (isLooping) {
            currentTime = 0;
            setTimeout(updateProgress, 1000);
        } else {
            currentTime = 0;
            isPlaying = false;
            nextSong();
        }
    }
};

// PLAY

        let playSong = () => {
            isPlaying = true;
            updateProgress();
        };

// PAUSE

        let pauseSong = () => {
            isPlaying = false;
        };

// TOGGLE PLAY/PAUSE

        let togglePlayPause = () => {
            let playPauseButton = document.getElementsByClassName('card__play')[0];

            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }

            playPauseButton.classList.toggle('icon-pause');
            playPauseButton.classList.toggle('icon-play');
        };

// PREVIOUS

        let previousSong = () => {
            currentSong = currentSong !== 0 ? currentSong - 1 : list.length - 1;
            renderSongs();
        };

// NEXT

        let nextSong = () => {
            currentSong = currentSong !== list.length - 1 ? currentSong + 1 : 0;
            renderSongs();
        };

// BUCLE

        let toggleLoop = () => {
            isLooping = !isLooping;
            let loopButton = document.querySelector('.card__bucle');
            loopButton.classList.toggle('card__bucle--active', isLooping);
        };

// RANDOM

        let toggleRandom = () => {
            isRandom = !isRandom;
            let randomButton = document.querySelector('.card__random');
            randomButton.classList.toggle('card__bucle--active', isRandom);
        };

// EVENTLISTERNER CLICK BOTONES

        const mainButtons = document.querySelectorAll('button');

        mainButtons.forEach((button) => {
            button.addEventListener('click', () => {
                if (button.classList.contains('card__play')) {
                    togglePlayPause();
                } else if (button.classList.contains('card__pause')) {
                    pauseSong();
                } else if (button.classList.contains('card__previous')) {
                    previousSong();
                } else if (button.classList.contains('card__next')) {
                    nextSong();
                } else if (button.classList.contains('card__bucle')) {
                    toggleLoop();
                } else if (button.classList.contains('card__random')) {
                    toggleRandom();
                }
            });
        });