// Stage Map — site script (puro JS, sem dependencias)

document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupStageDemo();
  setupBackgroundCanvas();
});

/* ---------- menu mobile ---------- */
function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

/* ---------- mini "palco" animado no hero ---------- */
function setupStageDemo() {
  const stage = document.getElementById("stageDemo");
  if (!stage) return;

  const colours = ["#E85D75", "#F2A65A", "#F7D060", "#A0D468", "#48C9B0",
                    "#5DADE2", "#AFA9EC", "#C39BD3", "#EC7063", "#45B39D"];

  const points = colours.map((colour) => ({
    el: document.createElement("div"),
    colour,
    x: 10 + Math.random() * 80,
    y: 15 + Math.random() * 70,
    vx: (Math.random() - 0.5) * 0.06,
    vy: (Math.random() - 0.5) * 0.06,
  }));

  points.forEach((p) => {
    p.el.className = "stage-dot";
    p.el.style.background = p.colour;
    p.el.style.color = p.colour;
    stage.appendChild(p.el);
  });

  function tick() {
    points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 6 || p.x > 94) p.vx *= -1;
      if (p.y < 10 || p.y > 90) p.vy *= -1;
      p.el.style.left = p.x + "%";
      p.el.style.top = p.y + "%";
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------- fundo com pontos a flutuar (estilo Hub) ---------- */
function setupBackgroundCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  let width, height, dots;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.documentElement.scrollHeight;
  }

  function makeDots() {
    const count = Math.max(18, Math.floor((width * height) / 90000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: 0.05 + Math.random() * 0.18,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = width;
      if (d.x > width) d.x = 0;
      if (d.y < 0) d.y = height;
      if (d.y > height) d.y = 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(175,169,236,${d.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    makeDots();
  });

  resize();
  makeDots();
  draw();
}
