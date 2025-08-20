document.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  const btn = document.getElementById('audioBtn');
  btn.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play();
      btn.textContent = '暂停音乐';
    } else {
      bgm.pause();
      btn.textContent = '播放音乐';
    }
  });
});
