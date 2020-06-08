const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.move circle ');
    const video = document.querySelector('.video-container video');
    const timeselect = document.querySelectorAll('.time-select button')

    const sound = document.querySelectorAll('.sound-picker button');

    const timedisplay = document.querySelector('.time-display');

    const outlinelength = outline.getTotalLength();

    let fakeduration = 600;

    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset = outlinelength;

    sound.forEach(sound => {
        sound.addEventListener("click", function () {

            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            check(song);
        })

    })

    play.addEventListener('click', () => {
        check(song);
    })

    timeselect.forEach(option => {


        option.addEventListener("click", function () {
            
            fakeduration = this.getAttribute("data-time");
            alert(`set time for ${Math.floor(fakeduration / 60)} mins `)
            timedisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(fakeduration % 60)}`;
            console.log(fakeduration);
        });
    })

    const check = song => {

        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }

    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeduration - currentTime;
        let second = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlinelength - (currentTime / fakeduration) * outlinelength;

        outline.style.strokeDashoffset = progress;

        timedisplay.textContent = `${minutes}:${second}`;
        if (currentTime >= fakeduration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    }




}

app();