// Năm ở footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Đếm ngày đã làm server (đổi ngày này thành ngày bạn muốn)
const startDate = new Date("2024-01-01");
const daysEl = document.getElementById("days");
if (daysEl) {
  const days = Math.floor((Date.now() - startDate) / 86400000);
  daysEl.textContent = `Đã đồng hành cùng server được ${days} ngày`;
}

// Gõ chữ cho dòng chức danh
const typedEl = document.getElementById("typed");
if (typedEl) {
  const text = "Artist & Coder & Lập trình viên Game";
  let i = 0;
  const type = () => {
    typedEl.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(type, 70);
  };
  setTimeout(type, 600);
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

// Bấm hoặc chạm avatar: avatar sáng lên, lửa chạy từ đáy lên hai bên theo viền
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap) {
  let fireTimer = null;

  avatarWrap.addEventListener("click", () => {
    avatarWrap.querySelectorAll(".fire").forEach((f) => f.remove());
    avatarWrap.classList.remove("lit");
    void avatarWrap.offsetWidth;
    avatarWrap.classList.add("lit");

    const fire = document.createElement("div");
    fire.className = "fire";

    const n = 14;
    const step = 180 / n;
    for (let i = 0; i <= n; i++) {
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
