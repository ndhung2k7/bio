// Chèn CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}
@property --angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0deg;
}
@keyframes spin {
  to { --angle: 360deg; }
}
#toast-prompt {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #111;
  color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 10px rgba(255,255,255,0.3);
  animation: fadeIn 0.5s ease-out;
  z-index: 9999;
}
#toast-prompt.hide {
  animation: fadeOut 0.5s ease-in;
}
#toast-prompt img {
  width: 32px;
  height: 32px;
}
#toast-prompt button {
  cursor: pointer;
  margin-left: 10px;
  background: none;
  border: 1px solid #fff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
#music-notify {
  --angle: 0deg;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  background: black;
  border-radius: 12px;
  pointer-events: none;
  opacity: 0;
  z-index: 9999;

  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: 
    linear-gradient(black, black),
    conic-gradient(from var(--angle), red, green, blue, red);
  animation: spin 4s linear infinite;
}
`;
document.head.appendChild(style);

// Tạo audio
const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
audio.loop = true;

// Tạo prompt xác nhận
const prompt = document.createElement("div");
prompt.id = "toast-prompt";
prompt.innerHTML = `
  <img src="https://i.imgur.com/aGMqekz.gif">
  <span>Bạn có muốn cho phép vừa nghe nhạc vừa lướt trang web không?</span>
  <button class="confirm-btn">Cho phép luôn</button>
  <button class="close-btn">Không, hẹn lại lần sau</button>
`;
document.body.appendChild(prompt);

// Tạo thông báo phát nhạc
const notify = document.createElement("div");
notify.id = "music-notify";
document.body.appendChild(notify);

// Hiện thông báo
function showNotify(songName = "Đang phát bài: SoundHelix-Song-1") {
  notify.textContent = songName;
  notify.style.opacity = 1;
  setTimeout(() => {
    notify.style.opacity = 0;
  }, 3000);
}

// Bắt sự kiện
prompt.querySelector(".confirm-btn").onclick = () => {
  audio.play();
  showNotify();
  prompt.classList.add("hide");
  setTimeout(() => prompt.remove(), 500);
};
prompt.querySelector(".close-btn").onclick = () => {
  prompt.classList.add("hide");
  setTimeout(() => prompt.remove(), 500);
};
