// Conteo regresivo hacia la Gran Apertura
// Viernes 02 de octubre de 2026, 6:00 p. m. (hora de República Dominicana, UTC-4)
const FECHA_EVENTO = new Date("2026-10-02T18:00:00-04:00").getTime();

function pad(num) {
  return String(num).padStart(2, "0");
}

function actualizarConteo() {
  const ahora = new Date().getTime();
  const restante = FECHA_EVENTO - ahora;

  const diasEl = document.getElementById("cd-days");
  const horasEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const segsEl = document.getElementById("cd-secs");

  if (restante <= 0) {
    diasEl.textContent = "00";
    horasEl.textContent = "00";
    minsEl.textContent = "00";
    segsEl.textContent = "00";
    clearInterval(temporizador);
    return;
  }

  const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segs = Math.floor((restante % (1000 * 60)) / 1000);

  diasEl.textContent = pad(dias);
  horasEl.textContent = pad(horas);
  minsEl.textContent = pad(mins);
  segsEl.textContent = pad(segs);
}

actualizarConteo();
const temporizador = setInterval(actualizarConteo, 1000);

/* ===== Sistema de música de fondo (Modal de Bienvenida) ===== */
let isPlaying = false;
let player = null;
let playerReady = false;
let enableMusic = false;
const YOUTUBE_VIDEO_ID = 'RoX_ftB2Nj8';

function setupModalButtons() {
  const enterWithMusic = document.getElementById('enterWithMusic');
  const enterWithoutMusic = document.getElementById('enterWithoutMusic');
  const modal = document.getElementById('welcomeModal');

  if (enterWithMusic) {
    enterWithMusic.onclick = function () {
      // El botón permanece deshabilitado hasta que el player de YouTube está
      // realmente listo, así que playVideo() siempre se ejecuta de forma
      // síncrona dentro del gesto del usuario (requisito de iOS Safari).
      enableMusic = true;
      if (modal) modal.style.display = 'none';
      if (playerReady && player) {
        const musicPlayer = document.getElementById('musicPlayer');
        if (musicPlayer) musicPlayer.style.display = 'block';
        player.playVideo();
        isPlaying = true;
        updateMusicIcon();
      }
    };
  }

  if (enterWithoutMusic) {
    enterWithoutMusic.onclick = function () {
      enableMusic = false;
      if (modal) modal.style.display = 'none';
    };
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setupModalButtons();

  const modal = document.getElementById('welcomeModal');
  if (modal) modal.style.display = 'flex';

  // Se precarga el player de YouTube desde el inicio (no en el click) para
  // que playVideo() se pueda ejecutar de forma síncrona dentro del gesto
  // del usuario. Esto es lo que exige iOS Safari.
  loadYouTubeAPI();

  // Salvaguarda: si el player no está listo en unos segundos (red lenta,
  // bloqueo, etc.), se habilita igual el botón para no dejar al invitado
  // atascado en la pantalla de bienvenida.
  setTimeout(enableMusicButton, 6000);
});

window.addEventListener('load', function () {
  setupModalButtons();
});

function loadYouTubeAPI() {
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(script);
  window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
}

function initializeYouTubePlayer() {
  if (player) return; // ya inicializado, evita crear el player dos veces

  player = new YT.Player('youtube-player', {
    height: '1',
    width: '1',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      playlist: YOUTUBE_VIDEO_ID
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  playerReady = true;
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  enableMusicButton();

  if (enableMusic && !isPlaying) {
    if (musicPlayer) musicPlayer.style.display = 'block';
    event.target.playVideo();
    isPlaying = true;
    updateMusicIcon();
  }
}

function enableMusicButton() {
  const btn = document.getElementById('enterWithMusic');
  const label = document.getElementById('enterWithMusicLabel');
  if (btn && btn.disabled) btn.disabled = false;
  if (label) label.textContent = 'Ingresar con música';
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
  } else if (event.data === YT.PlayerState.PAUSED) {
    isPlaying = false;
  }
  updateMusicIcon();
}

function onPlayerError(event) {
  const musicPlayer = document.getElementById('musicPlayer');
  if (musicPlayer) musicPlayer.style.display = 'block';
  isPlaying = false;
  updateMusicIcon();
  enableMusicButton();
}

function toggleMusic() {
  if (player) {
    if (isPlaying) {
      player.pauseVideo();
      isPlaying = false;
    } else {
      player.playVideo();
      isPlaying = true;
    }
    updateMusicIcon();
  }
}

function updateMusicIcon() {
  const volumeIcon = document.getElementById('volumeIcon');
  if (!volumeIcon) return;

  if (isPlaying) {
    volumeIcon.innerHTML = `
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#041830" stroke="#fff" stroke-width="1"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" stroke="#041830" stroke-width="2"></path>
      <circle cx="6.5" cy="12" r="1" fill="#c9a24b"/>
    `;
  } else {
    volumeIcon.innerHTML = `
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#041830" stroke="#fff" stroke-width="1"></polygon>
      <line x1="19" y1="9" x2="17" y2="11" stroke="#c9a24b" stroke-width="2"></line>
      <line x1="17" y1="9" x2="19" y2="11" stroke="#c9a24b" stroke-width="2"></line>
      <circle cx="6.5" cy="12" r="1" fill="#c9a24b"/>
    `;
  }
}

