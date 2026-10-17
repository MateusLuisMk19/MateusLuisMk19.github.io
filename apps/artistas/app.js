"use strict";

/* =========================================================
   Supabase — autenticação, base de dados e imagens
   ========================================================= */
const SUPABASE_URL = "https://indqnkkwhnsumiwxhydz.supabase.co";
// Chave pública (publishable): o acesso aos dados é protegido por RLS
const SUPABASE_KEY = "sb_publishable_Up_9cfg-zPtbTkwCPT3aiw_5dX2y5n-";
const BUCKET = "images";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let session = null;

const ARTIST_FIELDS = {
  name: "name", realName: "real_name", genre: "genre", country: "country", contact: "contact", bio: "bio",
  spotify: "spotify", instagram: "instagram", youtube: "youtube", website: "website", photoPath: "photo_path",
};
const PROJECT_FIELDS = {
  artistId: "artist_id", title: "title", type: "type", releaseDate: "release_date", status: "status",
  label: "label", genre: "genre", upc: "upc", coverPath: "cover_path", tracks: "tracks",
};
const SETTINGS_FIELDS = {
  upcPrefix: "upc_prefix", upcStart: "upc_start", isrcCountry: "isrc_country", isrcRegistrant: "isrc_registrant", isrcStart: "isrc_start",
};

const imageUrl = (path) => (path ? sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl : "");

function fromRow(row, fields) {
  const obj = { id: row.id };
  for (const [k, col] of Object.entries(fields)) obj[k] = row[col] ?? "";
  return obj;
}
function toRow(obj, fields) {
  const row = {};
  for (const [k, col] of Object.entries(fields)) row[col] = obj[k] === "" ? null : obj[k];
  return row;
}
const artistFromRow = (r) => {
  const a = fromRow(r, ARTIST_FIELDS);
  a.photo = imageUrl(a.photoPath);
  return a;
};
const projectFromRow = (r) => {
  const p = fromRow(r, PROJECT_FIELDS);
  p.cover = imageUrl(p.coverPath);
  p.tracks = Array.isArray(p.tracks) ? p.tracks : [];
  return p;
};

async function uploadImage(blob) {
  const path = `${session.user.id}/${crypto.randomUUID()}.jpg`;
  const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
  if (error) throw error;
  return path;
}

async function removeImages(paths) {
  const list = paths.filter(Boolean);
  if (list.length) await sb.storage.from(BUCKET).remove(list);
}

function errMsg(err) {
  if (err?.code === "23505") return "Este UPC já está atribuído a outro projeto.";
  const map = {
    "Invalid login credentials": "Email ou palavra-passe incorretos.",
    "Email not confirmed": "Confirma primeiro o email que te enviámos.",
    "User already registered": "Já existe uma conta com este email.",
  };
  return map[err?.message] || err?.message || "Ocorreu um erro.";
}

/* =========================================================
   Estado e utilitários
   ========================================================= */
const DEFAULT_SETTINGS = { upcPrefix: "", upcStart: 1, isrcCountry: "PT", isrcRegistrant: "", isrcStart: 1 };
const TYPES = ["Single", "EP", "Álbum", "Compilação"];
const STATUSES = ["Rascunho", "Agendado", "Lançado"];

const state = {
  artists: [],
  projects: [],
  settings: { ...DEFAULT_SETTINGS },
  selected: "all",
  query: "",
  typeFilter: "",
};

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const initials = (name) =>
  String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const yearOf = (date) => (date ? date.slice(0, 4) : "");
const artistById = (id) => state.artists.find((a) => a.id === id);
const projectsOf = (artistId) => state.projects.filter((p) => p.artistId === artistId);
const sortProjects = (list) =>
  [...list].sort((a, b) => (b.releaseDate || "").localeCompare(a.releaseDate || "") || a.title.localeCompare(b.title));
const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "");

let toastTimer;
function toast(msg, kind = "") {
  const el = $("#toast");
  el.textContent = msg;
  el.className = `toast show ${kind}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(`Copiado: ${text}`, "ok");
  } catch {
    toast("Não foi possível copiar.", "error");
  }
}

function download(filename, content, type) {
  const url = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], { type }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Desativa o botão de submissão enquanto a operação corre
async function busy(form, fn) {
  const buttons = form.querySelectorAll("button[type=submit]");
  buttons.forEach((b) => (b.disabled = true));
  try {
    return await fn();
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}

// Redimensiona a imagem antes do envio para poupar espaço e largura de banda
function readImage(file, max) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) return reject(new Error("O ficheiro tem de ser uma imagem."));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Não foi possível processar a imagem."))), "image/jpeg", 0.88);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler a imagem."));
    };
    img.src = url;
  });
}

/* =========================================================
   UPC-A
   ========================================================= */
function upcCheckDigit(d11) {
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(d11[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10;
}

const isValidUpc = (code) => /^\d{12}$/.test(code) && upcCheckDigit(code.slice(0, 11)) === Number(code[11]);

function nextUpc(exclude = []) {
  const prefix = state.settings.upcPrefix;
  if (!/^\d{6,10}$/.test(prefix)) throw new Error("Define o prefixo GS1 (6 a 10 dígitos) nas Definições.");
  const refLen = 11 - prefix.length;
  let max = (Number(state.settings.upcStart) || 1) - 1;
  for (const code of [...state.projects.map((p) => p.upc), ...exclude]) {
    if (code && code.length === 12 && code.startsWith(prefix)) max = Math.max(max, Number(code.slice(prefix.length, 11)));
  }
  const ref = String(max + 1);
  if (ref.length > refLen) throw new Error("Não há mais referências disponíveis para este prefixo.");
  const d11 = prefix + ref.padStart(refLen, "0");
  return d11 + upcCheckDigit(d11);
}

const UPC_L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

function upcBarcodeSvg(code) {
  if (!isValidUpc(code)) return "";
  const invert = (p) => p.replace(/./g, (b) => (b === "1" ? "0" : "1"));
  let bits = "101";
  for (let i = 0; i < 6; i++) bits += UPC_L[code[i]];
  bits += "01010";
  for (let i = 6; i < 12; i++) bits += invert(UPC_L[code[i]]);
  bits += "101";

  const m = 2; // largura de um módulo
  const q = 11; // zona de silêncio (módulos)
  const h = 70;
  const top = 6;
  const isLong = (i) => i < 10 || (i >= 45 && i < 50) || i >= 85; // guardas + 1º e último dígito
  const width = (95 + q * 2) * m;
  const height = top + h + 22;

  let bars = "";
  for (let i = 0; i < 95; i++) {
    if (bits[i] === "1") bars += `<rect x="${(q + i) * m}" y="${top}" width="${m}" height="${isLong(i) ? h + 10 : h}"/>`;
  }
  const ty = top + h + 16;
  let text = `<text x="${(q - 2) * m}" y="${ty}" text-anchor="end">${code[0]}</text>`;
  for (let k = 0; k < 5; k++) text += `<text x="${(q + 10 + 7 * k + 3.5) * m}" y="${ty}" text-anchor="middle">${code[k + 1]}</text>`;
  for (let k = 0; k < 5; k++) text += `<text x="${(q + 50 + 7 * k + 3.5) * m}" y="${ty}" text-anchor="middle">${code[k + 6]}</text>`;
  text += `<text x="${(q + 97) * m}" y="${ty}" text-anchor="start">${code[11]}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">${bars}</g><g fill="#000" font-family="monospace" font-size="15">${text}</g></svg>`;
}

/* =========================================================
   ISRC — CC-XXX-AA-NNNNN (guardado sem hífens)
   ========================================================= */
const ISRC_RE = /^[A-Z]{2}[A-Z0-9]{3}\d{7}$/;
const normIsrc = (v) => String(v || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const fmtIsrc = (c) => (c && c.length === 12 ? `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5, 7)}-${c.slice(7)}` : c || "");
const allIsrcs = () => state.projects.flatMap((p) => p.tracks.map((t) => t.isrc)).filter(Boolean);

function nextIsrc(exclude = []) {
  const { isrcCountry, isrcRegistrant } = state.settings;
  if (!/^[A-Z]{2}$/.test(isrcCountry) || !/^[A-Z0-9]{3}$/.test(isrcRegistrant)) {
    throw new Error("Define o país e o código de registante ISRC nas Definições.");
  }
  const stem = isrcCountry + isrcRegistrant + String(new Date().getFullYear()).slice(-2);
  let max = (Number(state.settings.isrcStart) || 1) - 1;
  for (const code of [...allIsrcs(), ...exclude]) {
    if (code && code.startsWith(stem)) max = Math.max(max, Number(code.slice(7)));
  }
  if (max + 1 > 99999) throw new Error("Atingiste o limite de 99999 ISRC para este ano.");
  return stem + String(max + 1).padStart(5, "0");
}

/* =========================================================
   Render — barra lateral
   ========================================================= */
function avatarHtml(artist, cls = "") {
  return `<span class="avatar ${cls}">${artist.photo ? `<img src="${esc(artist.photo)}" alt="">` : esc(initials(artist.name))}</span>`;
}

function renderSidebar() {
  const q = state.query.toLowerCase();
  const artists = [...state.artists]
    .filter((a) => !q || a.name.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name));
  const total = state.projects.length;

  let html = `
    <button class="artist-item ${state.selected === "all" ? "active" : ""}" data-select="all">
      <span class="avatar all">★</span>
      <span class="info"><strong>Biblioteca completa</strong><small>${total} ${total === 1 ? "projeto" : "projetos"}</small></span>
    </button>
    <div class="sidebar-title">Artistas (${state.artists.length})</div>`;

  html += artists
    .map((a) => {
      const n = projectsOf(a.id).length;
      return `
      <button class="artist-item ${state.selected === a.id ? "active" : ""}" data-select="${a.id}">
        ${avatarHtml(a)}
        <span class="info"><strong>${esc(a.name)}</strong><small>${n} ${n === 1 ? "projeto" : "projetos"}</small></span>
      </button>`;
    })
    .join("");

  $("#artistList").innerHTML = html;
}

/* =========================================================
   Render — área principal
   ========================================================= */
function projectCard(p, showArtist) {
  const artist = artistById(p.artistId);
  const sub = [showArtist && artist ? artist.name : "", yearOf(p.releaseDate), `${p.tracks.length} ${p.tracks.length === 1 ? "faixa" : "faixas"}`]
    .filter(Boolean)
    .join(" · ");
  return `
    <article class="project-card" tabindex="0" data-open="${p.id}">
      <div class="cover">
        ${p.cover ? `<img src="${esc(p.cover)}" alt="Capa de ${esc(p.title)}" loading="lazy">` : esc(initials(p.title))}
        <span class="badge">${esc(p.type)}</span>
        <span class="badge status st-${esc(p.status)}">${esc(p.status)}</span>
      </div>
      <div class="meta">
        <h3 title="${esc(p.title)}">${esc(p.title)}</h3>
        <p>${esc(sub)}</p>
        <code>${p.upc ? `UPC ${esc(p.upc)}` : "sem UPC"}</code>
      </div>
    </article>`;
}

function typeChips(list) {
  const present = TYPES.filter((t) => list.some((p) => p.type === t));
  if (present.length < 2) return "";
  return `<div class="chips">
    <button class="chip ${state.typeFilter ? "" : "active"}" data-type="">Todos</button>
    ${present.map((t) => `<button class="chip ${state.typeFilter === t ? "active" : ""}" data-type="${t}">${t}</button>`).join("")}
  </div>`;
}

function gridHtml(list, showArtist, emptyMsg) {
  const filtered = state.typeFilter ? list.filter((p) => p.type === state.typeFilter) : list;
  if (!filtered.length) return `<div class="empty"><p>${emptyMsg}</p></div>`;
  return `<div class="project-grid">${sortProjects(filtered).map((p) => projectCard(p, showArtist)).join("")}</div>`;
}

function matchesQuery(p, q) {
  const artist = artistById(p.artistId);
  const hay = [p.title, p.upc, p.label, artist?.name, ...p.tracks.flatMap((t) => [t.title, t.feat, t.isrc, fmtIsrc(t.isrc)])]
    .join(" ")
    .toLowerCase();
  return hay.includes(q) || hay.includes(q.replace(/-/g, ""));
}

function renderMain() {
  const main = $("#main");

  if (!state.artists.length) {
    main.innerHTML = `
      <div class="empty">
        <h2>Ainda não há artistas</h2>
        <p>Cria o primeiro artista e começa a montar a biblioteca de lançamentos.<br>
        Antes de gerar códigos, configura o prefixo UPC e o registante ISRC em <strong>Definições</strong>.</p>
        <button class="btn primary" data-action="new-artist">+ Criar artista</button>
      </div>`;
    return;
  }

  const q = state.query.trim().toLowerCase();
  if (q) {
    const results = state.projects.filter((p) => matchesQuery(p, q));
    main.innerHTML = `
      <div class="section-head"><h2>Resultados para “${esc(state.query)}” (${results.length})</h2></div>
      ${gridHtml(results, true, "Nenhum projeto encontrado.")}`;
    return;
  }

  if (state.selected === "all") {
    const tracks = state.projects.reduce((n, p) => n + p.tracks.length, 0);
    main.innerHTML = `
      <div class="artist-header">
        <span class="avatar all">★</span>
        <div class="details">
          <h2>Biblioteca completa</h2>
          <div class="stats">
            <div><strong>${state.artists.length}</strong><span>artistas</span></div>
            <div><strong>${state.projects.length}</strong><span>projetos</span></div>
            <div><strong>${tracks}</strong><span>faixas</span></div>
            <div><strong>${state.projects.filter((p) => p.status === "Lançado").length}</strong><span>lançados</span></div>
          </div>
        </div>
      </div>
      <div class="section-head"><h2>Todos os projetos</h2>${typeChips(state.projects)}</div>
      ${gridHtml(state.projects, true, "Ainda não há projetos. Escolhe um artista e adiciona o primeiro.")}`;
    return;
  }

  const a = artistById(state.selected);
  if (!a) {
    state.selected = "all";
    return renderMain();
  }
  const list = projectsOf(a.id);
  const tracks = list.reduce((n, p) => n + p.tracks.length, 0);
  const links = [
    ["Spotify", a.spotify],
    ["Instagram", a.instagram],
    ["YouTube", a.youtube],
    ["Website", a.website],
  ]
    .filter(([, u]) => safeUrl(u))
    .map(([label, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${label}</a>`)
    .join("");
  const sub = [a.realName, a.genre, a.country, a.contact].filter(Boolean).map(esc).join(" · ");

  main.innerHTML = `
    <div class="artist-header">
      ${avatarHtml(a)}
      <div class="details">
        <h2>${esc(a.name)}</h2>
        ${sub ? `<p class="sub">${sub}</p>` : ""}
        ${a.bio ? `<p class="bio">${esc(a.bio)}</p>` : ""}
        ${links ? `<div class="links">${links}</div>` : ""}
        <div class="stats">
          <div><strong>${list.length}</strong><span>projetos</span></div>
          <div><strong>${tracks}</strong><span>faixas</span></div>
          <div><strong>${list.filter((p) => p.upc).length}</strong><span>com UPC</span></div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn primary" data-action="new-project">+ Projeto</button>
        <button class="btn ghost" data-action="edit-artist">Editar</button>
        <button class="btn danger" data-action="delete-artist">Eliminar</button>
      </div>
    </div>
    <div class="section-head"><h2>Discografia</h2>${typeChips(list)}</div>
    ${gridHtml(list, false, "Este artista ainda não tem projetos.")}`;
}

function render() {
  renderSidebar();
  renderMain();
}

/* =========================================================
   Artista — formulário
   ========================================================= */
let artistDraft = null;

function setPreview(el, src, fallback) {
  el.innerHTML = src ? `<img src="${esc(src)}" alt="">` : fallback;
}

function openArtistForm(artist) {
  artistDraft = artist ? { ...artist } : { id: null, photo: "", photoPath: "" };
  const f = $("#artistForm");
  f.reset();
  for (const k of ["name", "realName", "genre", "country", "contact", "bio", "spotify", "instagram", "youtube", "website"]) {
    f.elements[k].value = artistDraft[k] || "";
  }
  $("#artistFormTitle").textContent = artist ? "Editar artista" : "Novo artista";
  setPreview($("#artistPhotoPreview"), artistDraft.photo, "Foto");
  $("#artistDialog").showModal();
}

async function saveArtist(e) {
  e.preventDefault();
  const f = e.target.elements;
  const a = { ...artistDraft };
  for (const k of ["name", "realName", "genre", "country", "contact", "bio", "spotify", "instagram", "youtube", "website"]) {
    a[k] = f[k].value.trim();
  }
  if (!a.name) return toast("O nome artístico é obrigatório.", "error");
  const isNew = !a.id;
  a.id ||= crypto.randomUUID();

  await busy(e.target, async () => {
    const oldPath = artistDraft.photoPath;
    let newPath = null;
    try {
      if (a.photoBlob) newPath = a.photoPath = await uploadImage(a.photoBlob);
      const { data, error } = await sb.from("artists").upsert({ id: a.id, ...toRow(a, ARTIST_FIELDS) }).select().single();
      if (error) throw error;
      if (newPath && oldPath) removeImages([oldPath]);

      const saved = artistFromRow(data);
      state.artists = isNew ? [...state.artists, saved] : state.artists.map((x) => (x.id === saved.id ? saved : x));
      state.selected = saved.id;
      $("#artistDialog").close();
      render();
      toast(isNew ? "Artista criado." : "Artista atualizado.", "ok");
    } catch (err) {
      if (newPath) removeImages([newPath]);
      toast(errMsg(err), "error");
    }
  });
}

async function deleteArtist() {
  const a = artistById(state.selected);
  if (!a) return;
  const list = projectsOf(a.id);
  const msg = list.length
    ? `Eliminar "${a.name}" e os seus ${list.length} projetos? Esta ação não pode ser desfeita.`
    : `Eliminar "${a.name}"?`;
  if (!confirm(msg)) return;
  // Os projetos são apagados em cascata pela base de dados
  const { error } = await sb.from("artists").delete().eq("id", a.id);
  if (error) return toast(errMsg(error), "error");
  removeImages([a.photoPath, ...list.map((p) => p.coverPath)]);
  state.projects = state.projects.filter((p) => p.artistId !== a.id);
  state.artists = state.artists.filter((x) => x.id !== a.id);
  state.selected = "all";
  render();
  toast("Artista eliminado.");
}

/* =========================================================
   Projeto — formulário
   ========================================================= */
let draft = null;

const emptyTrack = () => ({ title: "", feat: "", duration: "", isrc: "" });

function fillSelect(sel, options, value) {
  sel.innerHTML = options.map(([v, label]) => `<option value="${esc(v)}">${esc(label)}</option>`).join("");
  sel.value = value;
}

function openProjectForm(project, artistId) {
  draft = project
    ? structuredClone(project)
    : { id: null, artistId, title: "", type: "Single", releaseDate: "", status: "Rascunho", label: "", genre: "", upc: "", cover: "", coverPath: "", tracks: [emptyTrack()] };
  if (!draft.tracks.length) draft.tracks.push(emptyTrack());

  const f = $("#projectForm");
  f.reset();
  const artists = [...state.artists].sort((a, b) => a.name.localeCompare(b.name));
  fillSelect(f.elements.artistId, artists.map((a) => [a.id, a.name]), draft.artistId);
  fillSelect(f.elements.type, TYPES.map((t) => [t, t]), draft.type);
  fillSelect(f.elements.status, STATUSES.map((s) => [s, s]), draft.status);
  for (const k of ["title", "releaseDate", "label", "genre", "upc"]) f.elements[k].value = draft[k] || "";
  if (!draft.genre && !project) f.elements.genre.value = artistById(artistId)?.genre || "";

  $("#projectFormTitle").textContent = project ? "Editar projeto" : "Novo projeto";
  setPreview($("#coverPreview"), draft.cover, "Capa<br><small>clicar ou arrastar</small>");
  updateUpcStatus();
  renderTracks();
  $("#projectDialog").showModal();
}

function updateUpcStatus() {
  const input = $("#projectForm").elements.upc;
  const code = input.value.replace(/\D/g, "");
  const status = $("#upcStatus");
  let msg = "";
  let cls = "hint";
  if (!code) {
    msg = "Opcional — gera um novo ou introduz um já atribuído.";
  } else if (code.length < 12) {
    msg = `${code.length}/12 dígitos`;
  } else if (!isValidUpc(code)) {
    msg = `Dígito de controlo inválido (deveria ser ${upcCheckDigit(code.slice(0, 11))}).`;
    cls += " bad";
  } else if (state.projects.some((p) => p.id !== draft.id && p.upc === code)) {
    msg = "Este UPC já pertence a outro projeto.";
    cls += " bad";
  } else {
    msg = "UPC válido.";
    cls += " ok";
  }
  status.textContent = msg;
  status.className = cls;
  $("#upcBarcode").innerHTML = upcBarcodeSvg(code);
}

function renderTracks() {
  const n = draft.tracks.length;
  $("#trackList").innerHTML = draft.tracks
    .map(
      (t, i) => `
    <div class="track-row" data-i="${i}">
      <span class="track-n">${i + 1}</span>
      <input data-k="title" placeholder="Título da faixa" value="${esc(t.title)}" aria-label="Título da faixa ${i + 1}">
      <input data-k="feat" placeholder="Participações (feat.)" value="${esc(t.feat)}" aria-label="Participações">
      <input data-k="duration" class="dur" placeholder="3:45" value="${esc(t.duration)}" aria-label="Duração">
      <div class="code-input">
        <input data-k="isrc" class="mono" placeholder="ISRC" maxlength="15" value="${esc(fmtIsrc(t.isrc))}" aria-label="ISRC">
        <button type="button" class="btn small" data-action="gen-isrc" data-i="${i}">Gerar</button>
      </div>
      <div class="track-tools">
        <button type="button" class="icon-btn" data-action="track-up" data-i="${i}" title="Subir" ${i === 0 ? "disabled" : ""}>↑</button>
        <button type="button" class="icon-btn" data-action="track-down" data-i="${i}" title="Descer" ${i === n - 1 ? "disabled" : ""}>↓</button>
        <button type="button" class="icon-btn" data-action="track-del" data-i="${i}" title="Remover">✕</button>
      </div>
    </div>`
    )
    .join("");
}

function syncTracks() {
  document.querySelectorAll("#trackList .track-row").forEach((row) => {
    const t = draft.tracks[row.dataset.i];
    row.querySelectorAll("[data-k]").forEach((inp) => {
      t[inp.dataset.k] = inp.dataset.k === "isrc" ? normIsrc(inp.value) : inp.value.trim();
    });
  });
}

function genIsrcFor(indexes) {
  syncTracks();
  try {
    for (const i of indexes) {
      const others = draft.tracks.filter((_, j) => j !== i).map((t) => t.isrc);
      draft.tracks[i].isrc = nextIsrc(others);
    }
    renderTracks();
    if (indexes.length) toast(indexes.length === 1 ? `ISRC gerado: ${fmtIsrc(draft.tracks[indexes[0]].isrc)}` : `${indexes.length} ISRC gerados.`, "ok");
    else toast("Todas as faixas já têm ISRC.");
  } catch (err) {
    toast(err.message, "error");
  }
}

async function saveProject(e) {
  e.preventDefault();
  syncTracks();
  const f = e.target.elements;
  const p = { ...draft };
  for (const k of ["artistId", "title", "type", "releaseDate", "status", "label", "genre"]) p[k] = f[k].value.trim();
  p.upc = f.upc.value.replace(/\D/g, "");
  p.tracks = draft.tracks
    .filter((t) => t.title || t.isrc || t.feat || t.duration)
    .map(({ title, feat, duration, isrc }) => ({ title, feat, duration, isrc }));

  if (!p.title) return toast("O título é obrigatório.", "error");
  if (!artistById(p.artistId)) return toast("Escolhe um artista.", "error");
  if (p.upc && !isValidUpc(p.upc)) return toast("UPC inválido — verifica o dígito de controlo.", "error");
  const upcOwner = state.projects.find((o) => o.id !== p.id && o.upc && o.upc === p.upc);
  if (upcOwner) return toast(`Este UPC já está atribuído a "${upcOwner.title}".`, "error");

  const seen = new Set();
  for (const [i, t] of p.tracks.entries()) {
    if (!t.title) return toast(`A faixa ${i + 1} precisa de título.`, "error");
    if (!t.isrc) continue;
    if (!ISRC_RE.test(t.isrc)) return toast(`ISRC inválido na faixa ${i + 1}: ${t.isrc}`, "error");
    if (seen.has(t.isrc)) return toast(`ISRC repetido neste projeto: ${fmtIsrc(t.isrc)}`, "error");
    seen.add(t.isrc);
    // A mesma gravação pode sair em vários lançamentos (ex.: single e álbum) com o mesmo ISRC
    for (const o of state.projects) {
      if (o.id === p.id) continue;
      const same = o.tracks.find((x) => x.isrc === t.isrc);
      if (same && same.title.toLowerCase() !== t.title.toLowerCase()) {
        const ok = confirm(`O ISRC ${fmtIsrc(t.isrc)} já pertence a "${same.title}" em "${o.title}".\nUm ISRC identifica uma única gravação. Continuar mesmo assim?`);
        if (!ok) return;
      }
    }
  }

  const isNew = !p.id;
  p.id ||= crypto.randomUUID();

  await busy(e.target, async () => {
    const oldPath = draft.coverPath;
    let newPath = null;
    try {
      if (p.coverBlob) newPath = p.coverPath = await uploadImage(p.coverBlob);
      const { data, error } = await sb.from("projects").upsert({ id: p.id, ...toRow(p, PROJECT_FIELDS) }).select().single();
      if (error) throw error;
      if (newPath && oldPath) removeImages([oldPath]);

      const saved = projectFromRow(data);
      state.projects = isNew ? [...state.projects, saved] : state.projects.map((x) => (x.id === saved.id ? saved : x));
      state.selected = saved.artistId;
      $("#projectDialog").close();
      render();
      toast(isNew ? "Projeto adicionado à biblioteca." : "Projeto atualizado.", "ok");
    } catch (err) {
      if (newPath) removeImages([newPath]);
      toast(errMsg(err), "error");
    }
  });
}

/* =========================================================
   Projeto — detalhe
   ========================================================= */
function codeLine(value, display = value) {
  return `<span class="code-line"><code>${esc(display)}</code><button class="icon-btn" data-copy="${esc(display)}" title="Copiar">⧉</button></span>`;
}

function openProjectView(id) {
  const p = state.projects.find((x) => x.id === id);
  if (!p) return;
  const artist = artistById(p.artistId);
  const date = p.releaseDate ? new Date(p.releaseDate + "T00:00").toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }) : "—";

  $("#viewBody").innerHTML = `
    <div class="view">
      <div>
        <div class="cover">${p.cover ? `<img src="${esc(p.cover)}" alt="Capa de ${esc(p.title)}">` : esc(initials(p.title))}</div>
        ${p.cover ? `<button class="btn small ghost" style="margin-top:8px" data-action="download-cover" data-id="${p.id}">Descarregar capa</button>` : ""}
      </div>
      <div>
        <span class="badge status st-${esc(p.status)}">${esc(p.status)}</span>
        <h2 style="margin-top:8px">${esc(p.title)}</h2>
        <p class="sub">${esc(artist?.name || "—")} · ${esc(p.type)}</p>
        <dl class="facts">
          <dt>Lançamento</dt><dd>${esc(date)}</dd>
          <dt>Editora</dt><dd>${esc(p.label || "—")}</dd>
          <dt>Género</dt><dd>${esc(p.genre || "—")}</dd>
          <dt>UPC</dt><dd>${p.upc ? codeLine(p.upc) : "—"}</dd>
        </dl>
        ${p.upc ? `<div class="barcode-box">${upcBarcodeSvg(p.upc)}</div>
          <button class="btn small ghost" style="margin-top:6px" data-action="download-barcode" data-id="${p.id}">Descarregar código de barras (SVG)</button>` : ""}
      </div>
    </div>
    ${
      p.tracks.length
        ? `<table class="tracks">
        <thead><tr><th>#</th><th>Faixa</th><th>Duração</th><th>ISRC</th></tr></thead>
        <tbody>${p.tracks
          .map(
            (t, i) => `<tr>
            <td class="n">${i + 1}</td>
            <td>${esc(t.title)}${t.feat ? ` <small>feat. ${esc(t.feat)}</small>` : ""}</td>
            <td>${esc(t.duration || "—")}</td>
            <td>${t.isrc ? codeLine(t.isrc, fmtIsrc(t.isrc)) : "—"}</td>
          </tr>`
          )
          .join("")}</tbody>
      </table>`
        : `<p class="hint">Sem faixas registadas.</p>`
    }
    <div class="dialog-actions">
      <button class="btn danger" data-action="delete-project" data-id="${p.id}">Eliminar</button>
      <span class="spacer"></span>
      <button class="btn ghost" data-close>Fechar</button>
      <button class="btn primary" data-action="edit-project" data-id="${p.id}">Editar</button>
    </div>`;
  const dlg = $("#viewDialog");
  if (!dlg.open) dlg.showModal();
}

async function deleteProject(id) {
  const p = state.projects.find((x) => x.id === id);
  if (!p || !confirm(`Eliminar o projeto "${p.title}"?`)) return;
  const { error } = await sb.from("projects").delete().eq("id", id);
  if (error) return toast(errMsg(error), "error");
  removeImages([p.coverPath]);
  state.projects = state.projects.filter((x) => x.id !== id);
  $("#viewDialog").close();
  render();
  toast("Projeto eliminado.");
}

async function downloadCover(p) {
  try {
    const res = await fetch(p.cover);
    if (!res.ok) throw new Error();
    download(`${p.title.replace(/[\\/:*?"<>|]/g, "")}.jpg`, await res.blob());
  } catch {
    toast("Não foi possível descarregar a capa.", "error");
  }
}

/* =========================================================
   Definições
   ========================================================= */
function openSettings() {
  const f = $("#settingsForm");
  for (const k of Object.keys(SETTINGS_FIELDS)) f.elements[k].value = state.settings[k] ?? "";
  updateSettingsPreview();
  $("#settingsDialog").showModal();
}

function readSettingsForm() {
  const f = $("#settingsForm").elements;
  return {
    upcPrefix: f.upcPrefix.value.replace(/\D/g, ""),
    upcStart: Math.max(1, parseInt(f.upcStart.value, 10) || 1),
    isrcCountry: f.isrcCountry.value.toUpperCase().replace(/[^A-Z]/g, ""),
    isrcRegistrant: f.isrcRegistrant.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
    isrcStart: Math.min(99999, Math.max(1, parseInt(f.isrcStart.value, 10) || 1)),
  };
}

function updateSettingsPreview() {
  const saved = state.settings;
  state.settings = readSettingsForm();
  const preview = (fn) => {
    try {
      return fn();
    } catch (err) {
      return err.message;
    }
  };
  $("#upcNextPreview").textContent = preview(() => nextUpc());
  $("#isrcNextPreview").textContent = preview(() => fmtIsrc(nextIsrc()));
  state.settings = saved;
}

async function saveSettings(e) {
  e.preventDefault();
  const s = readSettingsForm();
  if (s.upcPrefix && !/^\d{6,10}$/.test(s.upcPrefix)) return toast("O prefixo GS1 deve ter entre 6 e 10 dígitos.", "error");
  if (s.isrcCountry && s.isrcCountry.length !== 2) return toast("O país ISRC tem 2 letras (ex.: PT).", "error");
  if (s.isrcRegistrant && s.isrcRegistrant.length !== 3) return toast("O código de registante tem 3 caracteres.", "error");
  await busy(e.target, async () => {
    const { error } = await sb.from("settings").upsert({ user_id: session.user.id, ...toRow(s, SETTINGS_FIELDS) });
    if (error) return toast(errMsg(error), "error");
    state.settings = s;
    $("#settingsDialog").close();
    toast("Definições guardadas.", "ok");
  });
}

/* =========================================================
   Exportação CSV (para distribuidoras / Excel)
   ========================================================= */
function exportCsv() {
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = [["Artista", "Projeto", "Tipo", "Estado", "Data", "Editora", "Género", "UPC", "Nº", "Faixa", "Participações", "Duração", "ISRC"]];
  for (const p of sortProjects(state.projects)) {
    const artist = artistById(p.artistId)?.name || "";
    const base = [artist, p.title, p.type, p.status, p.releaseDate, p.label, p.genre, p.upc];
    if (!p.tracks.length) rows.push([...base, "", "", "", "", ""]);
    p.tracks.forEach((t, i) => rows.push([...base, i + 1, t.title, t.feat, t.duration, fmtIsrc(t.isrc)]));
  }
  // ";" + BOM para abrir corretamente no Excel em português
  download(`catalogo-${new Date().toISOString().slice(0, 10)}.csv`, "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n"), "text/csv;charset=utf-8");
}

/* =========================================================
   Autenticação
   ========================================================= */
async function handleAuth(e) {
  e.preventDefault();
  const form = e.target;
  const mode = e.submitter?.dataset.mode || "login";
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  const msg = $("#authMsg");
  msg.className = "hint";
  msg.textContent = "";

  await busy(form, async () => {
    try {
      if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + location.pathname } });
        if (error) throw error;
        if (!data.session) {
          msg.className = "hint ok";
          msg.textContent = "Conta criada. Confirma o email que te enviámos e depois entra.";
        }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      msg.className = "hint bad";
      msg.textContent = errMsg(err);
    }
  });
}

function showApp(loggedIn) {
  $("#authScreen").hidden = loggedIn;
  $("#appShell").hidden = !loggedIn;
  document.querySelectorAll(".app-only").forEach((el) => (el.hidden = !loggedIn));
  $("#userInfo").textContent = loggedIn ? `Sessão: ${session.user.email}` : "";
}

async function loadAll() {
  const [artists, projects, settings] = await Promise.all([
    sb.from("artists").select("*"),
    sb.from("projects").select("*"),
    sb.from("settings").select("*").maybeSingle(),
  ]);
  for (const res of [artists, projects, settings]) if (res.error) throw res.error;
  state.artists = artists.data.map(artistFromRow);
  state.projects = projects.data.map(projectFromRow);
  state.settings = settings.data ? fromRow(settings.data, SETTINGS_FIELDS) : { ...DEFAULT_SETTINGS };
}

async function onSessionChange() {
  showApp(!!session);
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  Object.assign(state, { artists: [], projects: [], settings: { ...DEFAULT_SETTINGS }, selected: "all", query: "", typeFilter: "" });
  $("#search").value = "";
  if (!session) return;
  $("#artistList").innerHTML = "";
  $("#main").innerHTML = `<div class="empty"><p>A carregar o catálogo…</p></div>`;
  try {
    await loadAll();
    render();
  } catch (err) {
    $("#main").innerHTML = `<div class="empty"><p>Não foi possível carregar os dados.<br>${esc(errMsg(err))}</p></div>`;
  }
}

/* =========================================================
   Eventos
   ========================================================= */
function bindImageInput(label, max, onImage) {
  const input = label.querySelector("input[type=file]");
  const handle = async (file) => {
    try {
      onImage(await readImage(file, max));
    } catch (err) {
      toast(err.message, "error");
    }
  };
  input.addEventListener("change", () => {
    if (input.files[0]) handle(input.files[0]);
    input.value = "";
  });
  label.addEventListener("dragover", (e) => {
    e.preventDefault();
    label.classList.add("drag");
  });
  label.addEventListener("dragleave", () => label.classList.remove("drag"));
  label.addEventListener("drop", (e) => {
    e.preventDefault();
    label.classList.remove("drag");
    if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]);
  });
}

function bindEvents() {
  $("#authForm").addEventListener("submit", handleAuth);
  $("#btnLogout").addEventListener("click", () => sb.auth.signOut());
  $("#btnNewArtist").addEventListener("click", () => openArtistForm(null));
  $("#btnSettings").addEventListener("click", openSettings);

  let searchTimer;
  $("#search").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = e.target.value;
      render();
    }, 150);
  });

  $("#artistForm").addEventListener("submit", saveArtist);
  $("#projectForm").addEventListener("submit", saveProject);
  $("#settingsForm").addEventListener("submit", saveSettings);
  $("#settingsForm").addEventListener("input", updateSettingsPreview);
  $("#projectForm").elements.upc.addEventListener("input", updateUpcStatus);

  bindImageInput($("#artistDialog .photo-drop"), 500, (blob) => {
    artistDraft.photoBlob = blob;
    artistDraft.photo = URL.createObjectURL(blob);
    setPreview($("#artistPhotoPreview"), artistDraft.photo, "Foto");
  });
  bindImageInput($("#projectDialog .photo-drop"), 1000, (blob) => {
    draft.coverBlob = blob;
    draft.cover = URL.createObjectURL(blob);
    setPreview($("#coverPreview"), draft.cover, "");
  });

  // Abrir cartões com o teclado
  document.addEventListener("keydown", (e) => {
    const card = e.target.closest?.("[data-open]");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openProjectView(card.dataset.open);
    }
  });

  document.addEventListener("click", (e) => {
    const t = e.target;

    if (t.closest("[data-close]")) return t.closest("dialog").close();

    const sel = t.closest("[data-select]");
    if (sel) {
      state.selected = sel.dataset.select;
      state.typeFilter = "";
      if (state.query) {
        state.query = "";
        $("#search").value = "";
      }
      render();
      $("#main").scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }

    const chip = t.closest("[data-type]");
    if (chip) {
      state.typeFilter = chip.dataset.type;
      return renderMain();
    }

    const card = t.closest("[data-open]");
    if (card) return openProjectView(card.dataset.open);

    const copyBtn = t.closest("[data-copy]");
    if (copyBtn) return copyText(copyBtn.dataset.copy);

    const btn = t.closest("[data-action]");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const p = state.projects.find((x) => x.id === btn.dataset.id);

    switch (btn.dataset.action) {
      case "new-artist":
        return openArtistForm(null);
      case "edit-artist":
        return openArtistForm(artistById(state.selected));
      case "delete-artist":
        return deleteArtist();
      case "new-project":
        return openProjectForm(null, state.selected);
      case "edit-project":
        $("#viewDialog").close();
        return openProjectForm(p);
      case "delete-project":
        return deleteProject(btn.dataset.id);
      case "gen-upc":
        try {
          const code = nextUpc();
          $("#projectForm").elements.upc.value = code;
          updateUpcStatus();
          toast(`UPC gerado: ${code}`, "ok");
        } catch (err) {
          toast(err.message, "error");
        }
        return;
      case "gen-isrc":
        return genIsrcFor([i]);
      case "gen-isrc-all":
        syncTracks();
        return genIsrcFor(draft.tracks.map((tr, j) => (tr.title && !tr.isrc ? j : -1)).filter((j) => j >= 0));
      case "add-track":
        syncTracks();
        draft.tracks.push(emptyTrack());
        renderTracks();
        return $(`#trackList .track-row:last-child input`).focus();
      case "track-del":
        syncTracks();
        draft.tracks.splice(i, 1);
        if (!draft.tracks.length) draft.tracks.push(emptyTrack());
        return renderTracks();
      case "track-up":
      case "track-down": {
        syncTracks();
        const j = btn.dataset.action === "track-up" ? i - 1 : i + 1;
        [draft.tracks[i], draft.tracks[j]] = [draft.tracks[j], draft.tracks[i]];
        return renderTracks();
      }
      case "download-barcode":
        return download(`UPC-${p.upc}.svg`, upcBarcodeSvg(p.upc), "image/svg+xml");
      case "download-cover":
        return downloadCover(p);
      case "export-csv":
        return exportCsv();
    }
  });

  // Fechar diálogos ao clicar fora
  document.querySelectorAll("dialog").forEach((dlg) =>
    dlg.addEventListener("mousedown", (e) => {
      if (e.target !== dlg) return;
      const r = dlg.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) dlg.close();
    })
  );
}

/* =========================================================
   Arranque
   ========================================================= */
bindEvents();

let authReady = false;
sb.auth.onAuthStateChange((_event, s) => {
  const userChanged = s?.user?.id !== session?.user?.id;
  session = s;
  if (authReady && !userChanged) return; // ex.: renovação do token
  authReady = true;
  // Fora do callback: chamadas ao Supabase dentro dele podem bloquear
  setTimeout(onSessionChange, 0);
});
