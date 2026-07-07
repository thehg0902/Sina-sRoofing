// Home page behavior: alternating two-clip hero video.
(function () {
  var videoA = document.querySelector('[data-hero-video-a]');
  var videoB = document.querySelector('[data-hero-video-b]');
  if (!videoA || !videoB) return;

  function safePlay(video) {
    var p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () { /* autoplay blocked - poster stands as the hero */ });
    }
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    videoA.removeAttribute('autoplay');
    videoA.pause();
    videoB.pause();
    return;
  }

  var active = videoA;
  var standby = videoB;
  var handoffInProgress = false;
  var FADE_MS = 400;
  var FADE_START_BEFORE_END = 0.4; // seconds

  function crossfade() {
    if (handoffInProgress) return;
    handoffInProgress = true;
    standby.currentTime = 0;
    safePlay(standby);
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / FADE_MS, 1);
      active.style.opacity = String(1 - t);
      standby.style.opacity = String(t);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        active.pause();
        active.currentTime = 0;
        var finishedActive = active;
        var finishedStandby = standby;
        active = finishedStandby;
        standby = finishedActive;
        handoffInProgress = false;
      }
    }
    requestAnimationFrame(step);
  }

  function onTimeUpdate(e) {
    var video = e.target;
    if (video !== active || handoffInProgress || !video.duration) return;
    if (video.duration - video.currentTime <= FADE_START_BEFORE_END) crossfade();
  }

  function onEnded(e) {
    if (e.target !== active || handoffInProgress) return;
    crossfade();
  }

  videoA.addEventListener('timeupdate', onTimeUpdate);
  videoB.addEventListener('timeupdate', onTimeUpdate);
  videoA.addEventListener('ended', onEnded);
  videoB.addEventListener('ended', onEnded);

  videoA.style.opacity = '1';
  videoB.style.opacity = '0';
  safePlay(videoA);
})();
