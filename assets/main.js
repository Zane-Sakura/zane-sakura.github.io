// ===== Cài đặt chung =====
const prefersReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canFine = matchMedia("(pointer: fine)").matches;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

// Năm ở footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Đếm ngày đã làm server (đổi ngày này, định dạng YYYY-MM-DD)
const startDate = new Date("2024-01-01");
const daysEl = document.getElementById("days");
if (daysEl) {
  const days = Math.floor((Date.now() - startDate) / 86400000);
  daysEl.textContent = `Đã đồng hành cùng server được ${days} ngày`;
}

// Tạo đốm sáng mềm (sprite) để vẽ nhanh bằng drawImage
function makeSprite(color, size = 64) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.2, color);
  grad.addColorStop(0.6, color + "55");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

// ===== Canvas nền: hạt bay lên và đốm sáng theo chuột =====
const bg = document.getElementById("bg");
if (bg && !prefersReduce) {
  const ctx = bg.getContext("2d");
  const palette = ["#ff5fa2", "#b57bff", "#5ee7ff", "#ffe27a", "#ffffff"];
  const sprites = palette.map((c) => makeSprite(c));
  const motes = [];
  let W = 0, H = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    bg.width = W * DPR;
    bg.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function newMote(fromBottom) {
    return {
      kind: "mote",
      x: Math.random() * W,
      y: fromBottom ? H + 20 : Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.12 + Math.random() * 0.3),
      size: 6 + Math.random() * 12,
      alpha: 0.35 + Math.random() * 0.5,
      sprite: sprites[Math.floor(Math.random() * sprites.length)],
      phase: Math.random() * Math.PI * 2,
    };
  }

  const moteCount = Math.round(Math.min(W < 600 ? 40 : 70, (W * H) / 20000));
  for (let i = 0; i < moteCount; i++) motes.push(newMote(false));

  function spark(x, y) {
    motes.push({
      kind: "spark",
      x, y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.3,
      size: 6 + Math.random() * 6,
      life: 1,
      sprite: sprites[Math.floor(Math.random() * sprites.length)],
    });
  }

  if (canFine) {
    let lastSpark = 0;
    window.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - lastSpark < 30) return;
      lastSpark = now;
      spark(e.clientX, e.clientY);
    });
  }

  let last = performance.now();
  function frame(now) {
    const k = Math.min((now - last) / 16.67, 3);
    last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    for (let i = motes.length - 1; i >= 0; i--) {
      const m = motes[i];
      if (m.kind === "spark") {
        m.x += m.vx * k;
        m.y += m.vy * k;
        m.vy += 0.02 * k;
        m.life -= 0.025 * k;
        if (m.life <= 0) { motes.splice(i, 1); continue; }
        const s = m.size * (0.4 + m.life * 0.6);
        ctx.globalAlpha = m.life;
        ctx.drawImage(m.sprite, m.x - s / 2, m.y - s / 2, s, s);
      } else {
        m.x += (m.vx + Math.sin(now / 1200 + m.phase) * 0.15) * k;
        m.y += m.vy * k;
        if (m.y < -30) Object.assign(m, newMote(true));
        if (m.x < -30) m.x = W + 30;
        else if (m.x > W + 30) m.x = -30;
        const twinkle = 0.7 + 0.3 * Math.sin(now / 400 + m.phase);
        ctx.globalAlpha = m.alpha * twinkle;
        ctx.drawImage(m.sprite, m.x - m.size / 2, m.y - m.size / 2, m.size, m.size);
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ===== Gợn sóng khi bấm nút liên kết =====
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

// ===== Nghiêng 3D khung theo chuột (chỉ máy tính) =====
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

// ===== Avatar: hạt lấp lánh chạy theo đầu dải vầng sáng =====
const avatarWrap = document.querySelector(".avatar-wrap");
if (avatarWrap && !prefersReduce) {
  const orbitCanvas = document.createElement("canvas");
  orbitCanvas.width = 210 * DPR;
  orbitCanvas.height = 210 * DPR;
  orbitCanvas.style.cssText =
    "position:absolute;left:-30px;top:-30px;width:210px;height:210px;pointer-events:none;z-index:2;";
  avatarWrap.appendChild(orbitCanvas);

  const octx = orbitCanvas.getContext("2d");
  octx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const OC = 105;
  const OR = 80;
  const sparkSprite = makeSprite("#ffffff", 32);
  const sparks = [];
  const SPEED = (2 * Math.PI) / 5000; // một vòng mỗi 5 giây, khớp với CSS

  function drawSparks(now) {
    octx.clearRect(0, 0, 210, 210);
    octx.globalCompositeOperation = "lighter";
    const headAngle = (now * SPEED) % (2 * Math.PI);

    for (let k = 0; k < 2; k++) {
      sparks.push({
        a: headAngle - Math.random() * 0.25,
        r: OR + (Math.random() - 0.5) * 6,
        life: 1,
        size: 4 + Math.random() * 5,
      });
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.life -= 0.03;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      const x = OC + Math.cos(p.a) * p.r;
      const y = OC + Math.sin(p.a) * p.r;
      octx.globalAlpha = p.life;
      octx.drawImage(sparkSprite, x - p.size / 2, y - p.size / 2, p.size, p.size);
    }

    octx.globalAlpha = 1;
    octx.globalCompositeOperation = "source-over";
    requestAnimationFrame(drawSparks);
  }
  requestAnimationFrame(drawSparks);
}

// ===== Bấm avatar: lửa chạy từ đáy, hai bên viền, lên đỉnh =====
const fireCanvas = document.getElementById("fire");
if (avatarWrap && fireCanvas) {
  const fctx = fireCanvas.getContext("2d");
  const FS = 270;
  const C = FS / 2;
  const R = 82;
  const EMIT_MS = 1000;
  const LIFE_MS = 900;
  const GLOW_UP = 0.12;
  const GLOW_DOWN = 0.06;

  fireCanvas.width = FS * DPR;
  fireCanvas.height = FS * DPR;
  fctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  const flameSprites = ["#ffffff", "#ffe27a", "#ff8a3d", "#ff2d75"]
    .map((c) => makeSprite(c, 64));

  let flames = [];
  let burstStart = null;
  let running = false;
  let lastT = 0;
  let glow = 0;
  let glowTarget = 0;

  function setGlow(v) {
    glow = v;
    avatarWrap.style.setProperty("--glow", v.toFixed(3));
    avatarWrap.classList.toggle("lit", v > 0.01);
  }

  function emit(progress) {
    [1, -1].forEach((side) => {
      const a = Math.PI / 2 - side * progress * Math.PI;
      for (let j = 0; j < 3; j++) {
        const r = R + (Math.random() - 0.5) * 10;
        const outward = 0.25 + Math.random() * 0.6;
        flames.push({
          x: C + Math.cos(a) * r,
          y: C + Math.sin(a) * r,
          vx: Math.cos(a) * outward + (Math.random() - 0.5) * 0.3,
          vy: Math.sin(a) * outward - (0.5 + Math.random() * 0.6),
          size: 12 + Math.random() * 10,
          age: 0,
          life: LIFE_MS * (0.7 + Math.random() * 0.5),
        });
      }
    });
  }

  function loop(now) {
    const dt = Math.min(now - lastT, 50);
    lastT = now;
    const k = dt / 16.67;

    fctx.clearRect(0, 0, FS, FS);
    fctx.globalCompositeOperation = "lighter";

    if (burstStart !== null) {
      const elapsed = now - burstStart;
      if (elapsed < EMIT_MS) emit(elapsed / EMIT_MS);
      else burstStart = null;
    }

    for (let i = flames.length - 1; i >= 0; i--) {
      const f = flames[i];
      f.age += dt;
      if (f.age >= f.life) { flames.splice(i, 1); continue; }

      f.x += f.vx * k;
      f.y += f.vy * k;
      f.vy -= 0.02 * k;

      const t = f.age / f.life;
      const idx = Math.min(flameSprites.length - 1, Math.floor(t * flameSprites.length));
      const s = f.size * (1 + t * 0.8) * (1 - t * 0.5);
      fctx.globalAlpha = Math.min(1, (1 - t) * 1.6);
      fctx.drawImage(flameSprites[idx], f.x - s / 2, f.y - s / 2, s, s);
    }

    fctx.globalAlpha = 1;
    fctx.globalCompositeOperation = "source-over";

    glowTarget = burstStart !== null ? 1 : 0;
    const step = glowTarget > glow ? GLOW_UP : GLOW_DOWN;
    const next = glow + (glowTarget - glow) * step;
    setGlow(Math.abs(next - glowTarget) < 0.005 ? glowTarget : next);

    if (burstStart !== null || flames.length || glow > 0) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  // pointerdown hoạt động với chuột, cảm ứng và bút trên mọi thiết bị
  avatarWrap.addEventListener("pointerdown", () => {
    burstStart = performance.now();
    if (!running) {
      running = true;
      lastT = performance.now();
      requestAnimationFrame(loop);
    }
  });
}
