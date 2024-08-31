document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const volumeBar = document.getElementById('volume-bar');
    let isPlaying = false;
    let currentTrackIndex = 0;

    const tracks = [
        {
            title: "Whistle Podu (From \"The Greatest Of All Time\")",
            artist: "Yuvan Shankar Raja",
            album: "The Greatest Of All Time",
            src: "/audio/track1.mp3",
            cover: "/images/img1.jpg"
        }
       
    ];

    function loadTrack(index) {
        audio.src = tracks[index].src;
        document.getElementById('track-title').textContent = tracks[index].title;
        document.getElementById('track-artist').textContent = tracks[index].artist;
        document.getElementById('album-name').textContent = tracks[index].album;
        document.getElementById('album-art-img').src = tracks[index].cover;
        audio.load();
    }

    function playPauseTrack() {
        if (isPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    }

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    volumeBar.addEventListener('input', () => {
        audio.volume = volumeBar.value / 100;
    });

    playPauseButton.addEventListener('click', playPauseTrack);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    // Initialize first track
    loadTrack(currentTrackIndex);
});
