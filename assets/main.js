// Năm ở footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Đếm ngày đã làm server (đổi ngày này thành ngày bạn muốn, định dạng YYYY-MM-DD)
const startDate = new Date("2024-01-01");
const daysEl = document.getElementById("days");
if (daysEl) {
  const days = Math.floor((Date.now() - startDate) / 86400000);
  daysEl.textContent = `Đã đồng hành cùng server được ${days} ngày`;
}

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

// Hạt nền bay lên
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

// Vệt hạt theo con trỏ (chỉ trên máy tính)
const trail = document.getElementById("trail");
const canFine = matchMedia("(pointer: fine)").matches;
if (trail && canFine) {
  let last = 0;
  document.addEventListener("pointermove", (e) => {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;
    const dot = document.createElement("span");
    dot.className = "trail-dot";
    const size = 4 + Math.random() * 4;
    dot.style.width = dot.style.height = size + "px";
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    dot.style.setProperty("--c", ["#ff5fa2", "#5ee7ff", "#b57bff"][Math.floor(Math.random() * 3)]);
    trail.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  });
}

// Nghiêng 3D khung theo chuột (chỉ trên máy tính)
const card = document.querySelector(".card-wrap");
if (card && canFine) {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
}

// Bấm hoặc chạm avatar: avatar sáng lên, lửa chạy từ đáy lên hai bên viền đến đỉnh
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap) {
  let fireTimer = null;
  const RING_RADIUS = 82; // bán kính đường lửa quanh viền (px)
  const steps = 22;       // số điểm lửa mỗi bên
  const stepAngle = 180 / steps;

  avatarWrap.addEventListener("click", () => {
    avatarWrap.querySelectorAll(".fire").forEach((f) => f.remove());
    avatarWrap.classList.remove("lit");
    void avatarWrap.offsetWidth; // ép trình duyệt chạy lại animation
    avatarWrap.classList.add("lit");

    const fire = document.createElement("div");
    fire.className = "fire";

    for (let i = 0; i <= steps; i++) {
      const delay = (i / steps) * 0.9;
      [
        { angle: 180 - i * stepAngle, rot: -90 }, // bên phải: đáy lên đỉnh
        { angle: 180 + i * stepAngle, rot: 90 },  // bên trái: đáy lên đỉnh
      ].forEach(({ angle, rot }) => {
        const s = document.createElement("span");
        s.style.setProperty(
          "--base",
          `rotate(${angle}deg) translateY(${-RING_RADIUS}px) rotate(${rot}deg)`
        );
        s.style.setProperty("--w", (10 + Math.random() * 6) + "px");
        s.style.setProperty("--h", (40 + Math.random() * 22) + "px");
        s.style.setProperty("--delay", delay + "s");
        fire.appendChild(s);
      });
    }

    avatarWrap.appendChild(fire);

    clearTimeout(fireTimer);
    fireTimer = setTimeout(() => {
      fire.remove();
      avatarWrap.classList.remove("lit");
    }, 2000);
  });
}
