let player = document.querySelector('.playerVid')
let video = document.querySelector('video')
let progressBar = document.querySelector('.progress-bar')
let playerBar = document.querySelector('.player-bar')
let playPause = document.getElementById('play-pause')
let volume = document.getElementById('mute')
let volumeBar = document.getElementById('volume-bar')
let fullWidthBtn = document.getElementById('full-width')

// Bouton Play/ Pause

const togglePlay = () => {
	video.paused ? ( playPause.className = 'pause', video.play () ) 
				 : ( playPause.className = 'play', video.pause () )
}


playPause.onclick = togglePlay


playPause.keydown = event => {
	if(event.keyCode === '32') {
		togglePlay()
	}
}


//  Bouton Mute/ Unmute

const toggleMute = () => {
	let volumeValue = volumeBar.value
	if(volumeBar.value !== '0') {
	setVolume = localStorage.setItem('volume', volumeValue)
	}
	getVolume = localStorage.getItem('volume')

	video.muted ? ( volume.className = 'volume-up', video.muted = false, video.volume = getVolume / 100, volumeBar.value = getVolume ) 
				: ( volume.className = 'volume-mute', video.muted = true , volumeBar.value = '0' )
}


volume.onclick = toggleMute


// Barre de volume

const volumeState = () => {
	video.volume = volumeBar.value/ 100
	video.volume > 0.5 ?  volume.className = 'volume-up'
   :video.volume == 0 ? volume.className = 'volume-mute'
   :volume.className = 'volume-down'
}


volumeBar.onchange = volumeState


// Barre de progression

// // Progression en fonction du temps de la vidéo

const timeBar = () => {
	currentProgression = video.currentTime / video.duration
	progressBar.style.width = currentProgression * 100 + '%'
	progressBar.style.transition = 'all 0.1s'
}

video.ontimeupdate = timeBar


// // Click pour modifier le TimeCode de la vidéo
let infoBar = playerBar.getBoundingClientRect ()
let widthBar = infoBar.width

const timeCodeClick = event => {
	let x = event.clientX - infoBar.left
	currentProgression = (x * 100) / widthBar
	progressBar.style.width = currentProgression + '%'
	video.currentTime = (currentProgression / 100) * video.duration

}

playerBar.onclick = timeCodeClick


// Plein écran

const fullscreen = () => {
	video.requestFullscreen ? video.requestFullscreen() : video.exitFullscreen()
}

fullWidthBtn.onclick = fullscreen