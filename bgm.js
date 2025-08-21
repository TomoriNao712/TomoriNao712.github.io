const bgm = document.getElementById("bgm");
const btn = document.getElementById("playBtn");

// 第一次点击页面：取消静音 & 播放
document.addEventListener("click", function () {
  bgm.muted = false;
  bgm.play();
}, { once: true });

// 按钮：播放/暂停切换
btn.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    btn.textContent = "⏸";
  } else {
    bgm.pause();
    btn.textContent = "🎵";
  }
});
