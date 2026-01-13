const PLAYLISTS_ID = [
    { name: "Ale", id: 'PLaF8FbChcxg6wfsLJqVkrD19oqKdvmv7I' },
    { name: "8D", id: 'PL4Nzei3ISixLfnoCCW-0i60CSUvdIkYPJ' }
  ];
  
  let player;
  let isShuffle = true;
  let isLoop = true;
  
  // 1. Povoar a Select Box mal a página carrega
  const select = document.getElementById('playlistSelect');
  PLAYLISTS_ID.forEach((pl, index) => {
    let opt = document.createElement('option');
    opt.value = pl.id;
    opt.innerText = pl.name;
    select.appendChild(opt);
  });
  
  // 2. Evento de mudança de playlist
  select.addEventListener('change', (e) => {
    const newPlaylistId = e.target.value;
    if (player && player.loadPlaylist) {
      player.loadPlaylist({
        list: newPlaylistId,
        listType: 'playlist',
        index: 0,
        startSeconds: 0
      });
      // Forçar shuffle se estiver ativo
      if (isShuffle) player.setShuffle(true);
    }
  });
  
  function onYouTubeIframeAPIReady() {
    // Certifique-se que o array existe antes de tentar carregar
    if (!PLAYLISTS_ID || PLAYLISTS_ID.length === 0) return;

    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            listType: 'playlist',
            list: PLAYLISTS_ID[0].id,
            autoplay: 1,
            controls: 0,
            mute: 1,
            enablejsapi: 1
        },
        events: {
            'onReady': (event) => {
                console.log("Player pronto!");
                document.body.classList.add('player-ready');
                
                // Tenta dar play imediatamente (pode falhar silenciosamente por causa do browser)
                event.target.playVideo();
                
                player.setShuffle(isShuffle);
                player.setLoop(isLoop);
                startUpdateTimer();
            },
            'onStateChange': onPlayerStateChange,
            'onError': (e) => console.error("Erro no Player:", e.data)
        }
    });
}

  function onPlayerStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
      document.getElementById('playPauseBtn').innerText = '⏸';
      document.getElementById('trackTitle').innerText = player.getVideoData().title;
    } else {
      document.getElementById('playPauseBtn').innerText = '▶';
    }
  }

  function startUpdateTimer() {
    setInterval(() => {
      if (!player || !player.getCurrentTime) return;

      // Lógica de Anúncios
      const isAd = player.getAdState && (player.getAdState() > 0);
      document.getElementById("adOverlay").style.display = isAd ? "flex" : "none";
      if (isAd) player.seekTo(player.getDuration(), true);

      // Progresso
      const cur = player.getCurrentTime();
      const dur = player.getDuration();
      if (dur > 0) {
        document.getElementById('progressBar').style.width = (cur / dur * 100) + '%';
        document.getElementById('curTime').innerText = formatTime(cur);
        document.getElementById('durTime').innerText = formatTime(dur);
      }
    }, 500);
  }

  // Verificação de segurança: Só executa se o player estiver pronto
function isPlayerReady() {
    return player && typeof player.getPlayerState === 'function';
}

// Controlos
document.getElementById('playPauseBtn').onclick = () => {
    if (!isPlayerReady()) return; // Ignora o clique se não estiver pronto
    player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo();
};

document.getElementById('nextBtn').onclick = () => {
    if (isPlayerReady()) player.nextVideo();
};

document.getElementById('prevBtn').onclick = () => {
    if (isPlayerReady()) player.previousVideo();
};

document.getElementById('shuffleBtn').onclick = () => {
    if (!isPlayerReady()) return;
    isShuffle = !isShuffle;
    player.setShuffle(isShuffle);
    updateUIState();
};

document.getElementById('loopBtn').onclick = () => {
    if (!isPlayerReady()) return;
    isLoop = !isLoop;
    player.setLoop(isLoop);
    updateUIState();
};

document.getElementById('vol').oninput = (e) => {
    if (!isPlayerReady()) return;
    player.setVolume(e.target.value);
    player.unMute();
};

document.getElementById('progress').onclick = (e) => {
    if (!isPlayerReady() || !player.getDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    player.seekTo(player.getDuration() * ((e.clientX - rect.left) / rect.width), true);
};


  function updateUIState() {
    document.getElementById('shuffleBtn').classList.toggle('active', isShuffle);
    document.getElementById('loopBtn').classList.toggle('active', isLoop);
  }

  function formatTime(s) {
    let m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    return m + ":" + (s < 10 ? '0' + s : s);
  }

  // Click inicial para ativar som (exigência dos browsers)
  // Força o início após o primeiro clique em qualquer lugar da página
document.body.addEventListener('click', () => {
    if (isPlayerReady()) {
        player.unMute();
        player.playVideo();
    }
}, { once: true });
