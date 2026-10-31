// Năm ở footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Gợn sóng khi bấm nút liên kết
document.querySelectorAll(".link-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Hạt tròn bay lên nền
const particles = document.getElementById("particles");
if (particles) {
  const colors = ["#ff5fa2", "#b57bff", "#5ee7ff", "#ffffff"];
  const count = window.innerWidth < 600 ? 25 : 45;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 2 + Math.random() * 4;
    p.style.width = p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--c", colors[i % colors.length]);
    p.style.setProperty("--o", (0.5 + Math.random() * 0.5).toFixed(2));
    p.style.setProperty("--x", (Math.random() * 60 - 30) + "px");
    p.style.setProperty("--d", (8 + Math.random() * 10) + "s");
    p.style.setProperty("--delay", (-Math.random() * 15) + "s");
    particles.appendChild(p);
  }
}

// Bấm hoặc chạm avatar: avatar sáng lên, lửa chạy từ đáy lên hai bên theo viền
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap) {
  let fireTimer = null;

  avatarWrap.addEventListener("click", () => {
    // Xóa lửa cũ và reset trạng thái sáng để có thể bấm liên tục
    avatarWrap.querySelectorAll(".fire").forEach((f) => f.remove());
    avatarWrap.classList.remove("lit");
    void avatarWrap.offsetWidth; // ép trình duyệt tính lại để animation chạy lại
    avatarWrap.classList.add("lit");

    const fire = document.createElement("div");
    fire.className = "fire";

    const n = 14; // số ngọn lửa mỗi bên
    // Bên phải: từ đáy (180°) lên đỉnh (0°)
    // Bên trái: từ đáy (180°) lên đỉnh (360°)
    for (let i = 0; i <= n; i++) {
      const step = 180 / n;
      const delay = (i / n) * 0.6;
      const right = document.createElement("span");
      right.style.setProperty("--a", 180 - i * step + "deg");
      right.style.setProperty("--w", (14 + Math.random() * 6) + "px");
      right.style.setProperty("--h", (70 + Math.random() * 25) + "px");
      right.style.setProperty("--delay", delay + "s");
      fire.appendChild(right);

      const left = document.createElement("span");
      left.style.setProperty("--a", 180 + i * step + "deg");
      left.style.setProperty("--w", (14 + Math.random() * 6) + "px");
      left.style.setProperty("--h", (70 + Math.random() * 25) + "px");
      left.style.setProperty("--delay", delay + "s");
      fire.appendChild(left);
    }

    avatarWrap.appendChild(fire);

    clearTimeout(fireTimer);
    fireTimer = setTimeout(() => {
      fire.remove();
      avatarWrap.classList.remove("lit");
    }, 2000);
  });
}
