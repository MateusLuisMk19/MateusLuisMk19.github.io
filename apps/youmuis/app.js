/* const PLAYLISTS_ID = [
    { name: "Ale", id: 'PLaF8FbChcxg6wfsLJqVkrD19oqKdvmv7I' },
    { name: "8D", id: 'PL4Nzei3ISixLfnoCCW-0i60CSUvdIkYPJ' }
  ]; */
  
  const PLAYLIST_ID = 'PLaF8FbChcxg6wfsLJqVkrD19oqKdvmv7I';
  const PLAYLISTS_ID = [
    {title:"Papillon", name:'papion',id:'PLaF8FbChcxg6wfsLJqVkrD19oqKdvmv7I'},
    {title:"8D musics",name:'8dmusic',id:'PL4Nzei3ISixLfnoCCW-0i60CSUvdIkYPJ'},
    {title:"To run musics",name:'fast',id:'PLWgr15WyLScLye42da0Her6f9-6zvZ5Ns'}
  ];
  let player, isShuffle = true, isLoop = true;

  const select = document.getElementById('playlistSelect');

  PLAYLISTS_ID.forEach(pl => {
      let opt = document.createElement('option');
      opt.value = pl.id;
      opt.innerText = pl.title;
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

  // Carregar API YouTube
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '100%', width: '100%',
      playerVars: {
        listType: 'playlist', list: PLAYLISTS_ID[2].id,
        autoplay: 1, controls: 0, disablekb: 1, rel: 0, mute: 1
      },
      events: {
        'onReady': (e) => {
          player.setShuffle(isShuffle);
          player.setLoop(isLoop);
          updateUIState();
          startUpdateTimer();
        },
        'onStateChange': onPlayerStateChange
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

  // Controlos
  document.getElementById('playPauseBtn').onclick = () => {
    player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo();
  };
  document.getElementById('nextBtn').onclick = () => player.nextVideo();
  document.getElementById('prevBtn').onclick = () => player.previousVideo();
  
  document.getElementById('shuffleBtn').onclick = () => {
    isShuffle = !isShuffle;
    player.setShuffle(isShuffle);
    updateUIState();
  };

  document.getElementById('loopBtn').onclick = () => {
    isLoop = !isLoop;
    player.setLoop(isLoop);
    updateUIState();
  };

  document.getElementById('vol').oninput = (e) => {
    player.setVolume(e.target.value);
    player.unMute();
  };

  document.getElementById('progress').onclick = (e) => {
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
  document.body.addEventListener('click', () => {
    if(player) { player.unMute(); player.playVideo(); }
  }, {once: true});
