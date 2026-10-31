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

// Sao chổi bay nền
const particles = document.getElementById("particles");
if (particles) {
  const colors = ["#ff5fa2", "#b57bff", "#5ee7ff", "#ffe27a"];
  const count = window.innerWidth < 600 ? 14 : 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.setProperty("--w", (6 + Math.random() * 14) + "px");
    p.style.setProperty("--h", (90 + Math.random() * 120) + "px");
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--c", colors[i % colors.length]);
    p.style.setProperty("--o", (0.6 + Math.random() * 0.4).toFixed(2));
    p.style.setProperty("--x", (Math.random() * 160 - 80) + "px");
    p.style.setProperty("--a", (Math.random() * 30 - 15) + "deg");
    p.style.setProperty("--d", (7 + Math.random() * 8) + "s");
    p.style.setProperty("--delay", (-Math.random() * 15) + "s");
    particles.appendChild(p);
  }
}

// Bấm avatar: ngọn lửa bùng lên từ dưới
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap) {
  avatarWrap.addEventListener("click", () => {
    const fire = document.createElement("div");
    fire.className = "fire";
    const tongues = 22;
    for (let i = 0; i < tongues; i++) {
      const s = document.createElement("span");
      s.style.setProperty("--w", (24 + Math.random() * 26) + "px");
      s.style.setProperty("--h", (90 + Math.random() * 110) + "px");
      s.style.left = Math.random() * 100 + "%";
      s.style.setProperty("--dx", (Math.random() * 40 - 20) + "px");
      s.style.setProperty("--delay", (Math.random() * 0.35) + "s");
      fire.appendChild(s);
    }
    avatarWrap.appendChild(fire);
    setTimeout(() => fire.remove(), 2000);
  });
}
