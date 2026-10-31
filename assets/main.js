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

// Bấm hoặc chạm avatar: ngọn lửa bừng lên bao quanh
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap) {
  avatarWrap.addEventListener("click", () => {
    const fire = document.createElement("div");
    fire.className = "fire";
    const tongues = 28;
    for (let i = 0; i < tongues; i++) {
      const s = document.createElement("span");
      const angle = (360 / tongues) * i + (Math.random() * 10 - 5);
      s.style.setProperty("--a", angle + "deg");
      s.style.setProperty("--w", (14 + Math.random() * 12) + "px");
      s.style.setProperty("--h", (50 + Math.random() * 40) + "px");
      s.style.setProperty("--r", (70 + Math.random() * 40) + "px");
      s.style.setProperty("--delay", (Math.random() * 0.25) + "s");
      fire.appendChild(s);
    }
    avatarWrap.appendChild(fire);
    setTimeout(() => fire.remove(), 2000);
  });
}
