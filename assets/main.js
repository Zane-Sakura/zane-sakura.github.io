// Năm ở footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hiệu ứng gợn sóng khi bấm nút liên kết
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

// Tạo các hạt chạy quanh viền avatar
const orbit = document.getElementById("orbit");
if (orbit) {
  const orbitColors = ["#ff5fa2", "#b57bff", "#5ee7ff", "#ffffff"];
  const dots = 10;
  for (let i = 0; i < dots; i++) {
    const dot = document.createElement("span");
    dot.className = "orbit-dot";
    dot.style.setProperty("--c", orbitColors[i % orbitColors.length]);
    dot.style.setProperty("--r", "92px");
    dot.style.setProperty("--t", (4 + Math.random() * 2) + "s");
    dot.style.setProperty("--delay", (-(i / dots) * 5) + "s");
    orbit.appendChild(dot);
  }
}

// Tạo các hạt bay nền
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
