/* =========================================================
   maideparte. — logică
   Datele sunt păstrate local, în browser (localStorage).
   ========================================================= */

"use strict";

/* ---------- Ilustrații (SVG desenat de mână, 120 × 120) ---------- */
const ILUSTRATII = {
  paine: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#f2b366" d="M18 70c-6-24 16-40 42-40s48 16 42 40l-4 22H22z"/>
    <path class="il" d="M40 48l-6 14M58 44l-5 16M76 46l-5 15M92 52l-5 12"/>
    <path class="il" style="fill:#e09a4a" d="M22 92h76v6H22z"/></svg>`,
  fructe: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#ff5a36" d="M60 42c-10-8-34-6-36 20-2 24 16 42 26 42 5 0 7-3 10-3s5 3 10 3c10 0 28-18 26-42-2-26-26-28-36-20z"/>
    <path class="il" d="M60 42c0-10 2-16 8-22"/>
    <path class="il" style="fill:#3ddc97" d="M66 30c6-10 18-12 24-8-4 8-14 12-24 8z"/>
    <path class="il" style="stroke:#fff" d="M38 60c0-6 4-10 8-11"/></svg>`,
  lactate: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#fff" d="M38 40l10-16h24l10 16v62H38z"/>
    <path class="il" style="fill:#fff" d="M48 24h24v-8H48z"/>
    <path class="il" style="fill:#79b2ff" d="M38 58h44v26H38z"/>
    <path class="il" d="M38 40h44"/>
    <circle class="il" style="fill:#fff" cx="60" cy="71" r="7"/></svg>`,
  gatit: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" d="M44 20c-4 6 4 10 0 16M60 16c-4 6 4 10 0 16M76 20c-4 6 4 10 0 16"/>
    <path class="il" style="fill:#c9a7ff" d="M22 52h76v30c0 10-8 18-18 18H40c-10 0-18-8-18-18z"/>
    <path class="il" style="fill:#ffc93c" d="M18 46h84v8H18z"/>
    <path class="il" d="M12 64h10M98 64h10"/>
    <path class="il" style="fill:#161616" d="M54 40h12v6H54z"/></svg>`,
  haine: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#3ddc97" d="M44 20l-26 14 8 22 10-4v50h48V52l10 4 8-22-26-14c-2 8-8 12-16 12s-14-4-16-12z"/>
    <path class="il" d="M60 32v70"/>
    <circle class="il" style="fill:#161616" cx="66" cy="50" r="1.5"/><circle class="il" style="fill:#161616" cx="66" cy="66" r="1.5"/><circle class="il" style="fill:#161616" cx="66" cy="82" r="1.5"/>
    <path class="il" style="fill:#ffc93c" d="M44 70h10v12H44z"/></svg>`,
  carti: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#ff5a36" d="M22 82h76v16H22z"/>
    <path class="il" style="fill:#79b2ff" d="M28 64h66v18H28z"/>
    <path class="il" style="fill:#ffc93c" d="M34 44l58-6 2 18-58 6z"/>
    <path class="il" d="M30 90h50M36 73h44"/>
    <path class="il" style="fill:#fff" d="M84 18l8 4-24 40-6 2 0-6z"/></svg>`,
  jucarii: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <circle class="il" style="fill:#ffc93c" cx="44" cy="68" r="28"/>
    <path class="il" d="M18 60c16 6 36 6 52 0M24 86c12-8 28-10 44-6"/>
    <path class="il" style="fill:#ffa9c6" d="M72 50l30-4 4 30-30 4z"/>
    <path class="il" style="fill:#fff" d="M80 58h6v6h-6zM90 70h6v6h-6z"/></svg>`,
  casa: `<svg viewBox="0 0 120 120" aria-hidden="true">
    <path class="il" style="fill:#ffa9c6" d="M34 46h44l6 50H28z"/>
    <path class="il" d="M78 56c14 0 16 22 0 24"/>
    <path class="il" d="M40 46c0-12 8-18 16-18s16 6 16 18"/>
    <path class="il" style="fill:#161616" d="M52 24h8v6h-8z"/>
    <path class="il" style="fill:#fff" d="M24 96h68v6H24z"/>
    <path class="il" d="M40 66h20"/></svg>`,
};

const CATEGORII = {
  paine: { nume: "Pâine & patiserie", tip: "aliment", fundal: "fundal-galben" },
  fructe: { nume: "Fructe & legume", tip: "aliment", fundal: "fundal-rosu" },
  lactate: { nume: "Lactate & ouă", tip: "aliment", fundal: "fundal-cer" },
  gatit: { nume: "Mâncare gătită", tip: "aliment", fundal: "fundal-lila" },
  haine: { nume: "Haine", tip: "obiect", fundal: "fundal-menta" },
  carti: { nume: "Cărți & rechizite", tip: "obiect", fundal: "fundal-galben" },
  jucarii: { nume: "Jucării", tip: "obiect", fundal: "fundal-roz" },
  casa: { nume: "Pentru casă", tip: "obiect", fundal: "fundal-lila" },
};

const TIP_DONATOR = { persoana: "Persoană", magazin: "Magazin", restaurant: "Restaurant" };

const ICON = {
  loc: '<path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  ceas: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  cutie: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  om: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>',
  stea: '<path d="M12 3.5 14.4 9l5.6.5-4.3 3.7 1.3 5.6L12 15.9l-5 2.9 1.3-5.6L4 9.5 9.6 9z"/>',
};
const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;

/* ---------- Date inițiale ---------- */
const ZI = 864e5;
const ORA = 36e5;

function ziua(n) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const acum = Date.now();
const anunturiInitiale = [
  { id: 1, tip: "aliment", categorie: "paine", titlu: "10 pâini de casă", descriere: "Pâine albă și integrală coaptă azi-dimineață. Ce nu s-a vândut până seara dăm mai departe, în loc să o aruncăm.", donator: "Brutăria Spic", tipDonator: "magazin", zona: "Floreasca", cantitate: "10 bucăți", kg: 5, expira: ziua(1), ridicare: "Azi, 19:00–21:00", creat: acum - 2 * ORA },
  { id: 2, tip: "aliment", categorie: "fructe", titlu: "O ladă de mere ionatan", descriere: "Mere din livada părinților. Unele au mici pete, dar sunt perfecte pentru compot sau plăcintă.", donator: "Ioana M.", tipDonator: "persoana", zona: "Drumul Taberei", cantitate: "o ladă", kg: 8, expira: ziua(6), ridicare: "Mâine, 16:00–19:00", creat: acum - 20 * ORA },
  { id: 3, tip: "aliment", categorie: "lactate", titlu: "Iaurturi și brânză proaspătă", descriere: "Produse sigilate, păstrate la frigider. Termenul e aproape, așa că trebuie ridicate repede.", donator: "Magazinul de cartier nr. 7", tipDonator: "magazin", zona: "Titan", cantitate: "12 iaurturi, 2 brânzeturi", kg: 3, expira: ziua(2), ridicare: "Azi, 17:00–19:00", creat: acum - 5 * ORA },
  { id: 4, tip: "aliment", categorie: "gatit", titlu: "Porții de ciorbă și pilaf", descriere: "Mâncare gătită azi, răcită corect și păstrată la frigider. Aduceți-vă caserole sau borcane.", donator: "Bistro La Colț", tipDonator: "restaurant", zona: "Universitate", cantitate: "12 porții", kg: 6, expira: ziua(0), ridicare: "Azi, 19:00–21:00", creat: acum - ORA },
  { id: 5, tip: "aliment", categorie: "fructe", titlu: "Legume din grădină", descriere: "Dovlecei, ardei și roșii din grădina bunicii. Prea multe pentru o singură familie.", donator: "Maria P.", tipDonator: "persoana", zona: "Berceni", cantitate: "o sacoșă mare", kg: 6, expira: ziua(5), ridicare: "Oricând, cu un mesaj înainte", creat: acum - 30 * ORA },
  { id: 6, tip: "aliment", categorie: "paine", titlu: "Croissante și covrigi", descriere: "Produse de patiserie de azi, rămase la închidere.", donator: "Patiseria Dulce Colț", tipDonator: "magazin", zona: "Militari", cantitate: "20 bucăți", kg: 2, expira: ziua(1), ridicare: "Azi, 19:00–21:00", creat: acum - 3 * ORA },
  { id: 7, tip: "obiect", categorie: "haine", titlu: "Geacă de iarnă, 8–10 ani", descriere: "Geacă groasă, cu glugă, purtată o singură iarnă. Spălată și fără defecte.", donator: "Andrei S.", tipDonator: "persoana", zona: "Militari", cantitate: "1 bucată", kg: 1, stare: "Foarte bună", ridicare: "Mâine, 09:00–12:00", creat: acum - 26 * ORA },
  { id: 8, tip: "obiect", categorie: "carti", titlu: "Manuale clasa a V-a", descriere: "Set complet de manuale: română, matematică, engleză, istorie. Câteva au notițe cu creionul.", donator: "Familia Radu", tipDonator: "persoana", zona: "Colentina", cantitate: "7 manuale", kg: 3, stare: "Bună, cu urme de folosire", ridicare: "Oricând, cu un mesaj înainte", creat: acum - 50 * ORA },
  { id: 9, tip: "obiect", categorie: "jucarii", titlu: "Piese de construcție și puzzle-uri", descriere: "O cutie mare de piese de construcție și 4 puzzle-uri complete, verificate piesă cu piesă.", donator: "Elena D.", tipDonator: "persoana", zona: "Floreasca", cantitate: "o cutie + 4 puzzle-uri", kg: 4, stare: "Foarte bună", ridicare: "Mâine, 16:00–19:00", creat: acum - 8 * ORA },
  { id: 10, tip: "obiect", categorie: "casa", titlu: "Fierbător și set de oale", descriere: "Fierbător funcțional și trei oale de inox. Ne-am mutat și avem în dublu.", donator: "Cristi V.", tipDonator: "persoana", zona: "Titan", cantitate: "4 obiecte", kg: 5, stare: "Foarte bună", ridicare: "Azi, 17:00–19:00", creat: acum - 40 * ORA },
  { id: 11, tip: "obiect", categorie: "carti", titlu: "Caiete și pixuri noi", descriere: "Rechizite noi, încă în ambalaj: 20 de caiete și o cutie de pixuri. Perfecte pentru un elev.", donator: "Papetăria Linia", tipDonator: "magazin", zona: "Universitate", cantitate: "20 caiete, 30 pixuri", kg: 2, stare: "Ca nou", ridicare: "Mâine, 09:00–12:00", creat: acum - 12 * ORA },
  { id: 12, tip: "obiect", categorie: "haine", titlu: "Pulovere pentru adulți (M și L)", descriere: "Cinci pulovere călduroase, spălate și împăturite. Potrivite pentru iarnă.", donator: "Laura T.", tipDonator: "persoana", zona: "Berceni", cantitate: "5 bucăți", kg: 2, stare: "Foarte bună", ridicare: "Azi, 19:00–21:00", creat: acum - 60 * ORA },
];

const PUNCTE_COLECTARE = [
  { nume: "Biblioteca de cartier „Lumina”", adresa: "Str. Ion Câmpineanu nr. 10, Universitate", zile: [1, 2, 3, 4, 5], de: 10, pana: 18, accepta: ["carti", "jucarii"] },
  { nume: "Centrul comunitar Militari", adresa: "Bd. Iuliu Maniu nr. 70", zile: [1, 2, 3, 4, 5, 6], de: 9, pana: 20, accepta: ["haine", "casa", "jucarii"] },
  { nume: "Cantina socială Sf. Maria", adresa: "Str. Lizeanu nr. 5, Obor", zile: [0, 1, 2, 3, 4, 5, 6], de: 8, pana: 16, accepta: ["paine", "fructe", "lactate", "gatit"] },
  { nume: "Asociația „Vecini buni” Titan", adresa: "Aleea Barajul Uzului nr. 3", zile: [2, 4, 6], de: 17, pana: 20, accepta: ["haine", "carti", "fructe"] },
];

/* ---------- Stocare ---------- */
const PREFIX = "maideparte_v1_";

function incarca(cheie, implicit) {
  try {
    const v = localStorage.getItem(PREFIX + cheie);
    return v ? JSON.parse(v) : implicit;
  } catch {
    return implicit;
  }
}

function salveaza(cheie, valoare) {
  try { localStorage.setItem(PREFIX + cheie, JSON.stringify(valoare)); } catch { /* indisponibil */ }
}

const stare = {
  anunturi: incarca("anunturi", anunturiInitiale),
  punga: incarca("punga", []),
  rezervari: incarca("rezervari", []),
  salvat: incarca("salvat", { kg: 0, obiecte: 0 }),
  filtre: { tip: "toate", categorie: "toate", termen: "", sortare: "expira", disponibile: true },
};

function salveazaTot() {
  ["anunturi", "punga", "rezervari", "salvat"].forEach((k) => salveaza(k, stare[k]));
}

/* ---------- Utilitare ---------- */
const $ = (id) => document.getElementById(id);

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML;
}

function zileRamase(iso) {
  const azi = new Date(); azi.setHours(12, 0, 0, 0);
  const tinta = new Date(iso + "T12:00:00");
  return Math.round((tinta - azi) / ZI);
}

const expirat = (a) => a.tip === "aliment" && zileRamase(a.expira) < 0;

function stickerExpirare(a) {
  if (a.tip !== "aliment") return `<span class="sticker sticker-alb">${escapeHtml(a.stare)}</span>`;
  const z = zileRamase(a.expira);
  if (z <= 0) return '<span class="sticker sticker-rosu">expiră azi!</span>';
  if (z === 1) return '<span class="sticker sticker-rosu">expiră mâine</span>';
  if (z <= 3) return `<span class="sticker sticker-galben">încă ${z} zile</span>`;
  return `<span class="sticker sticker-menta">încă ${z} zile</span>`;
}

function formatKg(kg) {
  return Number.isInteger(kg) ? String(kg) : kg.toFixed(1).replace(".", ",");
}

function notifica(mesaj) {
  const t = $("toast");
  t.textContent = mesaj;
  t.classList.add("vizibil");
  clearTimeout(notifica.timer);
  notifica.timer = setTimeout(() => t.classList.remove("vizibil"), 3000);
}

const gaseste = (id) => stare.anunturi.find((a) => a.id === id);

/* ---------- Bandă cu noutăți ---------- */
function randeazaBanda() {
  const mesaje = stare.anunturi
    .slice()
    .sort((a, b) => b.creat - a.creat)
    .slice(0, 8)
    .map((a) => `${a.donator} dă mai departe: ${a.titlu.toLowerCase()} · ${a.zona}`);
  mesaje.push("Totul e gratuit. Nimic nu se vinde.", "Ai ceva în plus? Apasă „Donează”.");
  const html = mesaje.map((m) => `<span>${escapeHtml(m)}</span>`).join("");
  $("banda-pista").innerHTML = html + html; // dublat pentru o rulare continuă
}

/* ---------- Colaj din prezentare ---------- */
document.querySelectorAll("[data-ilustratie]").forEach((el) => {
  el.innerHTML = ILUSTRATII[el.dataset.ilustratie];
});

/* ---------- Cifre ---------- */
function calculeazaCifre() {
  return {
    kg: 1240 + Math.round(stare.salvat.kg),
    obiecte: 386 + stare.salvat.obiecte,
    active: stare.anunturi.filter((a) => !a.rezervat && !expirat(a)).length,
    donatori: 57 + new Set(stare.anunturi.map((a) => a.donator)).size,
  };
}

function animeaza(el, tinta) {
  const start = performance.now();
  const de = Number(el.dataset.valoare || 0);
  el.dataset.valoare = tinta;
  const pas = (t) => {
    const p = Math.min(1, (t - start) / 900);
    const v = Math.round(de + (tinta - de) * (1 - Math.pow(1 - p, 3)));
    el.textContent = v.toLocaleString("ro-RO");
    if (p < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

function randeazaCifre() {
  const c = calculeazaCifre();
  animeaza($("cifra-kg"), c.kg);
  animeaza($("cifra-obiecte"), c.obiecte);
  animeaza($("cifra-active"), c.active);
  animeaza($("cifra-donatori"), c.donatori);
}

/* ---------- Filtre ---------- */
function randeazaCategorii() {
  const lista = Object.entries(CATEGORII).filter(([, c]) => stare.filtre.tip === "toate" || c.tip === stare.filtre.tip);
  const disponibile = (cat) => stare.anunturi.filter((a) => a.categorie === cat && !a.rezervat && !expirat(a)).length;
  $("categorii").innerHTML =
    `<button type="button" class="categorie toate ${stare.filtre.categorie === "toate" ? "activ" : ""}" data-cat="toate">Toate categoriile</button>` +
    lista.map(([cheie, c]) => `
      <button type="button" class="categorie ${stare.filtre.categorie === cheie ? "activ" : ""}" data-cat="${cheie}">
        <span class="cat-icon ${c.fundal}">${ILUSTRATII[cheie]}</span>${c.nume} <b>${disponibile(cheie)}</b>
      </button>`).join("");
}

function anunturiVizibile() {
  const { tip, categorie, termen, sortare, disponibile } = stare.filtre;
  const t = termen.trim().toLowerCase();
  const lista = stare.anunturi.filter((a) => {
    if (expirat(a)) return false;
    if (tip !== "toate" && a.tip !== tip) return false;
    if (categorie !== "toate" && a.categorie !== categorie) return false;
    if (disponibile && a.rezervat) return false;
    if (!t) return true;
    return [a.titlu, a.descriere, a.zona, a.donator, CATEGORII[a.categorie].nume].some((x) => x.toLowerCase().includes(t));
  });
  const termenDe = (a) => (a.tip === "aliment" ? zileRamase(a.expira) : 999);
  const comparatori = {
    expira: (a, b) => termenDe(a) - termenDe(b) || b.creat - a.creat,
    noi: (a, b) => b.creat - a.creat,
    cantitate: (a, b) => b.kg - a.kg,
  };
  return lista.sort((a, b) => (a.rezervat - b.rezervat) || comparatori[sortare](a, b));
}

/* ---------- Carduri ---------- */
function cardHtml(a, index = 0, previzualizare = false) {
  const inPunga = stare.punga.includes(a.id);
  const cat = CATEGORII[a.categorie];
  const nou = Date.now() - a.creat < 6 * ORA;
  let buton;
  if (previzualizare) buton = '<button type="button" class="btn btn-galben" disabled>Adaugă în pungă</button>';
  else if (a.rezervat) buton = '<button type="button" class="btn btn-alb" disabled>Rezervat deja</button>';
  else if (inPunga) buton = `<button type="button" class="btn in-punga" data-act="scoate">✓ În pungă</button>`;
  else buton = `<button type="button" class="btn btn-galben" data-act="adauga">Adaugă în pungă</button>`;

  return `
    <article class="anunt ${a.rezervat ? "rezervat" : ""} ${nou ? "nou" : ""}" data-id="${a.id}" style="animation-delay:${Math.min(index, 10) * 50}ms">
      <div class="anunt-imagine ${cat.fundal}" data-act="detalii">
        ${ILUSTRATII[a.categorie]}
        <div class="anunt-stickere">${stickerExpirare(a)}<span class="sticker sticker-negru">${TIP_DONATOR[a.tipDonator]}</span></div>
      </div>
      <div class="anunt-corp">
        <div class="anunt-meta">${cat.nume}</div>
        <h3 data-act="detalii">${escapeHtml(a.titlu)}</h3>
        <div class="anunt-donator">${icon("loc")}${escapeHtml(a.zona)} · ${escapeHtml(a.donator)}</div>
        <div class="anunt-info">
          <div><b>Cantitate</b>${escapeHtml(a.cantitate)}</div>
          <div><b>Ridicare</b>${escapeHtml(a.ridicare.replace(", cu un mesaj înainte", ""))}</div>
        </div>
        ${buton}
      </div>
    </article>`;
}

function randeazaGrila() {
  const vizibile = anunturiVizibile();
  $("grila").innerHTML = vizibile.map((a, i) => cardHtml(a, i)).join("");
  $("gol").classList.toggle("hidden", vizibile.length > 0);
  const totalDisp = stare.anunturi.filter((a) => !a.rezervat && !expirat(a)).length;
  $("rezultate").textContent = `${vizibile.length} ${vizibile.length === 1 ? "anunț" : "anunțuri"} afișate · ${totalDisp} disponibile în total`;
}

/* ---------- Punga ---------- */
const MAX_PUNGA = 6;

function adaugaInPunga(id) {
  const a = gaseste(id);
  if (!a || a.rezervat || stare.punga.includes(id)) return;
  if (stare.punga.length >= MAX_PUNGA) return notifica(`Poți avea cel mult ${MAX_PUNGA} lucruri în pungă. Lasă și pentru alții!`);
  stare.punga.push(id);
  salveazaTot();
  actualizeazaPunga(true);
  randeazaGrila();
  if (idDetalii === id) randeazaDetalii(id);
  notifica(`„${a.titlu}” e în pungă.`);
}

function scoateDinPunga(id) {
  stare.punga = stare.punga.filter((x) => x !== id);
  salveazaTot();
  actualizeazaPunga();
  randeazaGrila();
  if (idDetalii === id) randeazaDetalii(id);
}

function actualizeazaPunga(tresare = false) {
  const n = stare.punga.length;
  $("numar-punga").textContent = n;
  $("tab-numar-punga").textContent = n;
  $("tab-numar-rez").textContent = stare.rezervari.filter((r) => !r.ridicat).length;
  if (tresare) {
    const b = $("numar-punga");
    b.classList.remove("tresare");
    void b.offsetWidth;
    b.classList.add("tresare");
  }
  if ($("sertar").classList.contains("deschis")) randeazaSertar();
}

let tabSertar = "punga";

function articolHtml(a, cuX = true) {
  const cat = CATEGORII[a.categorie];
  return `
    <div class="articol" data-id="${a.id}">
      <span class="articol-mini ${cat.fundal}">${ILUSTRATII[a.categorie]}</span>
      <div class="articol-text"><strong>${escapeHtml(a.titlu)}</strong><span>${escapeHtml(a.zona)} · ${escapeHtml(a.ridicare)}</span></div>
      ${cuX ? '<button type="button" class="btn-x" data-act="scoate" aria-label="Scoate din pungă"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' : ""}
    </div>`;
}

function qrHtml(cod) {
  // un model care seamănă cu un cod QR, generat din textul codului
  let h = 7;
  for (const ch of cod) h = (h * 131 + ch.charCodeAt(0)) >>> 0;
  const inColt = (r, c) => (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
  const langaColt = (r, c) => (r === 3 && (c < 4 || c > 4)) || (c === 3 && r < 4) || (c === 5 && r < 4) || (r === 5 && c < 4) || (c === 3 && r > 4);
  let celule = "";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let plin;
      if (inColt(r, c)) plin = true;
      else if (langaColt(r, c)) plin = false;
      else {
        h = (h * 1103515245 + 12345) >>> 0;
        plin = ((h >>> 16) & 1) === 1;
      }
      celule += `<i class="${plin ? "p" : ""}"></i>`;
    }
  }
  return `<div class="qr" aria-hidden="true">${celule}</div>`;
}

function randeazaSertar() {
  document.querySelectorAll(".sertar-tab button").forEach((b) => b.classList.toggle("activ", b.dataset.tab === tabSertar));
  const corp = $("sertar-corp");

  if (tabSertar === "punga") {
    const articole = stare.punga.map(gaseste).filter(Boolean);
    if (!articole.length) {
      corp.innerHTML = `
        <div class="sertar-gol">
          <svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <strong>Punga e goală</strong>
          <span>Apasă „Adaugă în pungă” pe orice anunț ca să-l rezervi.</span>
        </div>`;
      return;
    }
    corp.innerHTML = articole.map((a) => articolHtml(a)).join("") + `
      <form class="sertar-formular" id="form-rezervare">
        <label class="camp"><span>Numele tău</span><input name="nume" required maxlength="40" placeholder="Ex: Ana"></label>
        <label class="camp"><span>Când vii să ridici?</span>
          <select name="ora">
            <option>Azi, 17:00–19:00</option>
            <option>Azi, 19:00–21:00</option>
            <option>Mâine, 09:00–12:00</option>
            <option>Mâine, 16:00–19:00</option>
          </select>
        </label>
        <button type="submit" class="btn btn-rosu btn-mare">Rezervă ${articole.length} ${articole.length === 1 ? "lucru" : "lucruri"}</button>
      </form>`;
    return;
  }

  if (!stare.rezervari.length) {
    corp.innerHTML = `
      <div class="sertar-gol">
        <svg viewBox="0 0 24 24"><path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z"/></svg>
        <strong>Nicio rezervare încă</strong>
        <span>După ce rezervi, aici primești codul de ridicare.</span>
      </div>`;
    return;
  }

  corp.innerHTML = stare.rezervari.map((r) => `
    <div class="bilet ${r.ridicat ? "ridicat" : ""}" data-rez="${r.id}">
      <div class="bilet-sus">
        <div>
          <span class="bilet-eticheta">${r.ridicat ? "Ridicat · mulțumim!" : "Cod de ridicare"}</span>
          <div class="bilet-cod">${r.cod}</div>
          <span class="bilet-ora">${escapeHtml(r.ora)} · ${escapeHtml(r.nume)}</span>
        </div>
        ${qrHtml(r.cod)}
      </div>
      <ul>${r.articole.map((id) => {
        const a = gaseste(id);
        return a ? `<li>${escapeHtml(a.titlu)}<span>${escapeHtml(a.zona)}</span></li>` : "";
      }).join("")}</ul>
      ${r.ridicat ? "" : `<div class="bilet-actiuni">
        <button type="button" class="btn btn-menta btn-mic" data-act="ridicat">Am ridicat</button>
        <button type="button" class="btn btn-alb btn-mic" data-act="anuleaza">Anulează</button>
      </div>`}
    </div>`).join("");
}

function genereazaCod() {
  const litere = "ABCDEFGHJKLMNPRSTUVZ";
  return `MD-${litere[Math.floor(Math.random() * litere.length)]}${Math.floor(1000 + Math.random() * 9000)}`;
}

function rezerva(nume, ora) {
  const ids = stare.punga.filter((id) => {
    const a = gaseste(id);
    return a && !a.rezervat;
  });
  if (!ids.length) return;
  ids.forEach((id) => { gaseste(id).rezervat = true; });
  const rez = { id: Date.now(), cod: genereazaCod(), nume, ora, articole: ids, ts: Date.now(), ridicat: false };
  stare.rezervari.unshift(rez);
  stare.punga = [];
  salveazaTot();
  tabSertar = "rezervari";
  actualizeazaPunga();
  randeazaTot();
  notifica(`Rezervat! Codul tău de ridicare este ${rez.cod}.`);
}

function marcheazaRidicat(idRez) {
  const r = stare.rezervari.find((x) => x.id === idRez);
  if (!r || r.ridicat) return;
  r.ridicat = true;
  r.articole.map(gaseste).filter(Boolean).forEach((a) => {
    if (a.tip === "aliment") stare.salvat.kg += a.kg;
    else stare.salvat.obiecte += 1;
  });
  salveazaTot();
  actualizeazaPunga();
  randeazaTot();
  notifica("Super! Ai dat lucrurilor o a doua viață.");
}

function anuleazaRezervare(idRez) {
  const r = stare.rezervari.find((x) => x.id === idRez);
  if (!r) return;
  r.articole.map(gaseste).filter(Boolean).forEach((a) => { a.rezervat = false; });
  stare.rezervari = stare.rezervari.filter((x) => x.id !== idRez);
  salveazaTot();
  actualizeazaPunga();
  randeazaTot();
  notifica("Rezervarea a fost anulată. Lucrurile sunt din nou disponibile.");
}

function deschideSertar(tab = "punga") {
  tabSertar = tab;
  randeazaSertar();
  const u = $("umbra-sertar");
  u.hidden = false;
  requestAnimationFrame(() => u.classList.add("vizibil"));
  $("sertar").classList.add("deschis");
  $("sertar").setAttribute("aria-hidden", "false");
  $("inchide-punga").focus();
}

function inchideSertar() {
  $("umbra-sertar").classList.remove("vizibil");
  $("sertar").classList.remove("deschis");
  $("sertar").setAttribute("aria-hidden", "true");
  setTimeout(() => { $("umbra-sertar").hidden = true; }, 250);
}

$("deschide-punga").addEventListener("click", () => deschideSertar("punga"));
$("inchide-punga").addEventListener("click", inchideSertar);
$("umbra-sertar").addEventListener("click", inchideSertar);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("sertar").classList.contains("deschis")) inchideSertar();
});

document.querySelector(".sertar-tab").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  tabSertar = b.dataset.tab;
  randeazaSertar();
});

$("sertar-corp").addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  if (t.dataset.act === "scoate") scoateDinPunga(Number(t.closest(".articol").dataset.id));
  const bilet = t.closest(".bilet");
  if (bilet && t.dataset.act === "ridicat") marcheazaRidicat(Number(bilet.dataset.rez));
  if (bilet && t.dataset.act === "anuleaza") anuleazaRezervare(Number(bilet.dataset.rez));
});

$("sertar-corp").addEventListener("submit", (e) => {
  if (e.target.id !== "form-rezervare") return;
  e.preventDefault();
  const d = new FormData(e.target);
  const nume = String(d.get("nume") || "").trim();
  if (!nume) return notifica("Scrie-ți numele, ca donatorul să știe cine vine.");
  rezerva(nume, d.get("ora"));
});

/* ---------- Detalii ---------- */
let idDetalii = null;

function randeazaDetalii(id) {
  const a = gaseste(id);
  if (!a) return;
  idDetalii = id;
  const cat = CATEGORII[a.categorie];
  const inPunga = stare.punga.includes(id);
  let buton;
  if (a.rezervat) buton = '<button type="button" class="btn btn-alb" disabled>Rezervat deja</button>';
  else if (inPunga) buton = '<button type="button" class="btn btn-menta" data-act="scoate">✓ În pungă — scoate</button>';
  else buton = '<button type="button" class="btn btn-rosu" data-act="adauga">Adaugă în pungă</button>';

  $("detalii-continut").innerHTML = `
    <div class="detalii">
      <div class="detalii-imagine ${cat.fundal}">
        ${ILUSTRATII[a.categorie]}
        <div class="anunt-stickere">${stickerExpirare(a)}</div>
        <button type="button" class="btn-x" data-act="inchide" aria-label="Închide"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="detalii-corp">
        <div class="anunt-meta">${cat.nume}</div>
        <h2>${escapeHtml(a.titlu)}</h2>
        <p>${escapeHtml(a.descriere)}</p>
        <div class="detalii-grila">
          <div class="detaliu">${icon("cutie")}<div><b>Cantitate</b>${escapeHtml(a.cantitate)} (≈ ${formatKg(a.kg)} kg)</div></div>
          <div class="detaliu">${icon(a.tip === "aliment" ? "calendar" : "stea")}<div><b>${a.tip === "aliment" ? "Bun până la" : "Stare"}</b>${a.tip === "aliment" ? new Date(a.expira + "T12:00:00").toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" }) : escapeHtml(a.stare)}</div></div>
          <div class="detaliu">${icon("ceas")}<div><b>Ridicare</b>${escapeHtml(a.ridicare)}</div></div>
          <div class="detaliu">${icon("om")}<div><b>Donator</b>${escapeHtml(a.donator)} · ${TIP_DONATOR[a.tipDonator]}, ${escapeHtml(a.zona)}</div></div>
        </div>
      </div>
      <div class="detalii-jos">
        <button type="button" class="btn btn-alb" data-act="inchide">Închide</button>
        ${buton}
      </div>
    </div>`;
}

function deschideDetalii(id) {
  randeazaDetalii(id);
  if (!$("modal-detalii").open) $("modal-detalii").showModal();
}

$("modal-detalii").addEventListener("close", () => { idDetalii = null; });
$("modal-detalii").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) return $("modal-detalii").close();
  const t = e.target.closest("[data-act]");
  if (!t || idDetalii == null) return;
  if (t.dataset.act === "inchide") $("modal-detalii").close();
  if (t.dataset.act === "adauga") adaugaInPunga(idDetalii);
  if (t.dataset.act === "scoate") scoateDinPunga(idDetalii);
});

/* ---------- Evenimente: grilă și filtre ---------- */
$("grila").addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  const card = e.target.closest(".anunt");
  if (!t || !card) return;
  const id = Number(card.dataset.id);
  if (t.dataset.act === "adauga") adaugaInPunga(id);
  else if (t.dataset.act === "scoate") scoateDinPunga(id);
  else if (t.dataset.act === "detalii") deschideDetalii(id);
});

document.querySelector(".comutator-tip").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  stare.filtre.tip = b.dataset.tip;
  if (stare.filtre.categorie !== "toate" && b.dataset.tip !== "toate" && CATEGORII[stare.filtre.categorie].tip !== b.dataset.tip) {
    stare.filtre.categorie = "toate";
  }
  document.querySelectorAll(".comutator-tip button").forEach((x) => x.classList.toggle("activ", x === b));
  randeazaCategorii();
  randeazaGrila();
});

$("categorii").addEventListener("click", (e) => {
  const b = e.target.closest(".categorie");
  if (!b) return;
  stare.filtre.categorie = b.dataset.cat;
  randeazaCategorii();
  randeazaGrila();
});

let intarziere;
$("cautare").addEventListener("input", (e) => {
  clearTimeout(intarziere);
  intarziere = setTimeout(() => { stare.filtre.termen = e.target.value; randeazaGrila(); }, 150);
});

$("sortare").addEventListener("change", (e) => { stare.filtre.sortare = e.target.value; randeazaGrila(); });
$("doar-disponibile").addEventListener("change", (e) => { stare.filtre.disponibile = e.target.checked; randeazaGrila(); });

$("reseteaza").addEventListener("click", () => {
  stare.filtre = { tip: "toate", categorie: "toate", termen: "", sortare: stare.filtre.sortare, disponibile: true };
  $("cautare").value = "";
  $("doar-disponibile").checked = true;
  document.querySelectorAll(".comutator-tip button").forEach((x) => x.classList.toggle("activ", x.dataset.tip === "toate"));
  randeazaCategorii();
  randeazaGrila();
});

/* ---------- Donație în 3 pași ---------- */
const formDonatie = $("form-donatie");
const modalDonatie = $("modal-donatie");
let pasCurent = 1;

function tipAles() {
  return formDonatie.querySelector("input[name=tip]:checked").value;
}

function randeazaAlegeriCategorie() {
  const tip = tipAles();
  const lista = Object.entries(CATEGORII).filter(([, c]) => c.tip === tip);
  $("alegere-categorie").innerHTML = lista.map(([cheie, c], i) => `
    <label><input type="radio" name="categorie" value="${cheie}" ${i === 0 ? "checked" : ""}><span>${ILUSTRATII[cheie]}${c.nume}</span></label>`).join("");
  formDonatie.querySelector(".doar-aliment").hidden = tip !== "aliment";
  formDonatie.querySelector(".doar-obiect").hidden = tip !== "obiect";
}

function arataPas(n) {
  pasCurent = n;
  formDonatie.querySelectorAll(".wizard-pas").forEach((p) => { p.hidden = Number(p.dataset.pas) !== n; });
  $("pasi-wizard").querySelectorAll("li").forEach((li, i) => {
    li.classList.toggle("activ", i + 1 === n);
    li.classList.toggle("gata", i + 1 < n);
  });
  $("inapoi").hidden = n === 1;
  $("inainte").hidden = n === 3;
  $("publica").hidden = n !== 3;
  $("eroare-pas").textContent = "";
  if (n === 3) randeazaPrevizualizare();
}

function valoriDonatie() {
  const d = new FormData(formDonatie);
  const tip = d.get("tip");
  return {
    id: Date.now(),
    tip,
    categorie: d.get("categorie"),
    titlu: String(d.get("titlu") || "").trim(),
    descriere: String(d.get("descriere") || "").trim(),
    cantitate: String(d.get("cantitate") || "").trim(),
    kg: Math.max(0.1, Number(d.get("kg")) || 1),
    expira: tip === "aliment" ? d.get("expira") : undefined,
    stare: tip === "obiect" ? d.get("stare") : undefined,
    donator: String(d.get("donator") || "").trim(),
    tipDonator: d.get("tipDonator"),
    zona: String(d.get("zona") || "").trim(),
    ridicare: d.get("ridicare"),
    creat: Date.now(),
  };
}

function valideazaPas(n) {
  const v = valoriDonatie();
  if (n === 1 && !v.categorie) return "Alege o categorie.";
  if (n === 2) {
    if (!v.titlu) return "Scrie un titlu scurt pentru anunț.";
    if (!v.descriere) return "Adaugă o descriere, cât de scurtă.";
    if (!v.cantitate) return "Spune ce cantitate dai (ex: 6 bucăți).";
    if (v.tip === "aliment") {
      if (!v.expira) return "Pentru alimente, spune până când sunt bune de consumat.";
      if (zileRamase(v.expira) < 0) return "Data a trecut deja. Nu putem publica alimente expirate.";
    }
  }
  if (n === 3) {
    if (!v.donator) return "Scrie numele tău sau al locului.";
    if (!v.zona) return "Spune în ce zonă se ridică.";
  }
  return "";
}

function randeazaPrevizualizare() {
  const v = valoriDonatie();
  const anunt = {
    ...v,
    titlu: v.titlu || "Titlul anunțului",
    donator: v.donator || "Numele tău",
    zona: v.zona || "Zona",
    cantitate: v.cantitate || "—",
  };
  $("previzualizare-anunt").innerHTML = cardHtml(anunt, 0, true);
}

document.querySelectorAll("[data-doneaza]").forEach((b) => b.addEventListener("click", () => {
  formDonatie.reset();
  formDonatie.querySelector("input[name=expira]").min = ziua(0);
  formDonatie.querySelector("input[name=expira]").value = ziua(1);
  randeazaAlegeriCategorie();
  arataPas(1);
  modalDonatie.showModal();
}));

formDonatie.addEventListener("change", (e) => {
  if (e.target.name === "tip") randeazaAlegeriCategorie();
});
formDonatie.addEventListener("input", () => { if (pasCurent === 3) randeazaPrevizualizare(); });

$("inainte").addEventListener("click", () => {
  const eroare = valideazaPas(pasCurent);
  if (eroare) { $("eroare-pas").textContent = eroare; return; }
  arataPas(pasCurent + 1);
});

$("inapoi").addEventListener("click", () => arataPas(pasCurent - 1));

modalDonatie.addEventListener("click", (e) => {
  if (e.target === modalDonatie || e.target.closest("[data-inchide]")) modalDonatie.close();
});

formDonatie.addEventListener("submit", (e) => {
  e.preventDefault();
  for (const n of [1, 2, 3]) {
    const eroare = valideazaPas(n);
    if (eroare) {
      arataPas(n);
      $("eroare-pas").textContent = eroare;
      return;
    }
  }
  const anunt = valoriDonatie();
  stare.anunturi.unshift(anunt);
  salveazaTot();
  modalDonatie.close();
  $("reseteaza").click();
  randeazaTot();
  $("anunturi").scrollIntoView({ behavior: "smooth" });
  notifica("Anunțul e publicat. Mulțumim că dai mai departe!");
});

/* ---------- Calculator de impact ---------- */
function actualizeazaCursor(el) {
  const p = ((el.value - el.min) / (el.max - el.min)) * 100;
  el.style.setProperty("--p", `${p}%`);
}

function calculeazaImpact() {
  const familii = Number($("familii").value);
  const kg = Number($("kg-luna").value);
  $("val-familii").textContent = familii;
  $("val-kg").textContent = kg;
  const anual = familii * kg * 12;
  $("rez-kg").textContent = anual.toLocaleString("ro-RO");
  $("rez-mese").textContent = Math.round(anual / 0.5).toLocaleString("ro-RO");
  $("rez-co2").textContent = Math.round(anual * 2.5).toLocaleString("ro-RO");
  actualizeazaCursor($("familii"));
  actualizeazaCursor($("kg-luna"));
}

$("familii").addEventListener("input", calculeazaImpact);
$("kg-luna").addEventListener("input", calculeazaImpact);

/* ---------- Puncte de colectare ---------- */
function randeazaPuncte() {
  const acum = new Date();
  const zi = acum.getDay();
  const ora = acum.getHours() + acum.getMinutes() / 60;
  const ZILE = ["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."];

  $("puncte-grila").innerHTML = PUNCTE_COLECTARE.map((p) => {
    const deschis = p.zile.includes(zi) && ora >= p.de && ora < p.pana;
    const zileText = p.zile.length === 7 ? "zilnic" : p.zile.map((z) => ZILE[z]).join(", ");
    return `
      <article class="punct-card">
        <span class="sticker stare-program ${deschis ? "deschis" : "inchis"}">${deschis ? `Deschis acum · până la ${p.pana}:00` : "Închis acum"}</span>
        <h3>${escapeHtml(p.nume)}</h3>
        <div class="detaliu">${icon("loc")}<span>${escapeHtml(p.adresa)}</span></div>
        <div class="detaliu">${icon("ceas")}<span>${zileText}, ${p.de}:00–${p.pana}:00</span></div>
        <div class="accepta">${p.accepta.map((c) => `<span class="sticker ${CATEGORII[c].fundal}">${CATEGORII[c].nume}</span>`).join("")}</div>
      </article>`;
  }).join("");
}

/* ---------- Quiz ---------- */
const INTREBARI = [
  {
    text: "Ce înseamnă „A se consuma de preferință înainte de” pe o etichetă?",
    variante: [
      "Produsul devine periculos imediat după această dată",
      "După dată poate pierde din gust sau textură, dar adesea e încă bun dacă a fost păstrat corect",
      "Este data la care a fost fabricat produsul",
    ],
    corect: 1,
  },
  {
    text: "Dar „A se consuma înainte de” (data limită)?",
    variante: [
      "După această dată produsul nu mai trebuie consumat",
      "E doar o recomandare pentru gust",
      "Îl mai poți consuma liniștit încă o lună",
    ],
    corect: 0,
  },
  {
    text: "Ce aliment NU e bine să donezi?",
    variante: [
      "Pâine coaptă azi",
      "Conserve sigilate, în termen",
      "Mâncare gătită lăsată ore întregi la căldură, nu la frigider",
    ],
    corect: 2,
  },
  {
    text: "Cum pregătești hainele pe care vrei să le dai mai departe?",
    variante: [
      "Le speli și verifici să fie întregi, fără pete mari",
      "Le dai exact cum sunt, chiar și pătate",
      "Le pui la gunoiul menajer, poate le găsește cineva",
    ],
    corect: 0,
  },
  {
    text: "Care e cel mai simplu obicei care reduce risipa de mâncare acasă?",
    variante: [
      "Să cumperi cât mai mult, când e ofertă",
      "Să faci o listă de cumpărături și să verifici ce ai deja în frigider",
      "Să arunci tot ce a rămas de ieri",
    ],
    corect: 1,
  },
];

const quiz = { index: 0, scor: 0, raspuns: false };
const butonStart = $("start");
const butonUrmator = $("urmatoarea");
const butonReia = $("reia");
const zonaScor = $("scor");
const zonaIntrebare = $("intrebare");
const zonaRaspunsuri = $("raspunsuri");
const zonaMesaj = $("mesaj");

function actualizeazaProgresQuiz() {
  const total = INTREBARI.length;
  $("progres-quiz").textContent = `Întrebarea ${Math.min(quiz.index + 1, total)} / ${total}`;
  $("bara-quiz").style.width = `${(quiz.index / total) * 100}%`;
  zonaScor.textContent = "Scor: " + quiz.scor;
}

function afiseazaIntrebare() {
  const intrebare = INTREBARI[quiz.index];
  quiz.raspuns = false;
  zonaIntrebare.textContent = intrebare.text;
  zonaMesaj.textContent = "";
  zonaMesaj.className = "";
  zonaRaspunsuri.innerHTML = "";
  butonUrmator.hidden = true;
  intrebare.variante.forEach((varianta, i) => {
    const buton = document.createElement("button");
    buton.type = "button";
    buton.innerHTML = `<span class="litera">${"ABC"[i]}</span>`;
    buton.append(varianta);
    buton.addEventListener("click", () => verifica(i));
    zonaRaspunsuri.appendChild(buton);
  });
  actualizeazaProgresQuiz();
}

function verifica(alegere) {
  if (quiz.raspuns) return; // la o întrebare se poate răspunde o singură dată
  quiz.raspuns = true;
  const intrebare = INTREBARI[quiz.index];
  const butoane = zonaRaspunsuri.querySelectorAll("button");
  butoane.forEach((b) => { b.disabled = true; });
  butoane[intrebare.corect].classList.add("corect");
  if (alegere === intrebare.corect) {
    quiz.scor += 10;
    zonaMesaj.textContent = "Corect! +10 puncte";
    zonaMesaj.className = "bine";
  } else {
    butoane[alegere].classList.add("gresit");
    zonaMesaj.textContent = "Nu chiar. Răspunsul corect era: " + intrebare.variante[intrebare.corect];
    zonaMesaj.className = "rau";
  }
  zonaScor.textContent = "Scor: " + quiz.scor;
  butonUrmator.textContent = quiz.index === INTREBARI.length - 1 ? "Vezi rezultatul" : "Următoarea întrebare";
  butonUrmator.hidden = false;
}

function afiseazaFinal() {
  const maxim = INTREBARI.length * 10;
  let verdict = "Mai e loc de învățat. Citește întrebările de mai jos și încearcă din nou!";
  if (quiz.scor === maxim) verdict = "Perfect! Ești campion anti-risipă.";
  else if (quiz.scor >= maxim * 0.6) verdict = "Bine de tot! Mai ai câteva detalii de prins.";
  $("progres-quiz").textContent = "Gata!";
  $("bara-quiz").style.width = "100%";
  zonaIntrebare.textContent = "";
  zonaRaspunsuri.innerHTML = `<div class="quiz-final"><strong>${quiz.scor}/${maxim}</strong>puncte</div>`;
  zonaMesaj.textContent = verdict;
  zonaMesaj.className = quiz.scor >= maxim * 0.6 ? "bine" : "";
  butonUrmator.hidden = true;
  butonReia.hidden = false;
}

function pornesteQuiz() {
  butonStart.hidden = true;
  butonReia.hidden = true;
  quiz.index = 0;
  quiz.scor = 0;
  afiseazaIntrebare();
}

butonStart.addEventListener("click", pornesteQuiz);
butonReia.addEventListener("click", pornesteQuiz);
butonUrmator.addEventListener("click", () => {
  quiz.index += 1;
  if (quiz.index < INTREBARI.length) afiseazaIntrebare();
  else afiseazaFinal();
});

/* ---------- Pornire ---------- */
function randeazaTot() {
  randeazaBanda();
  randeazaCategorii();
  randeazaGrila();
  randeazaCifre();
  actualizeazaPunga();
  if (idDetalii != null) randeazaDetalii(idDetalii);
}

randeazaTot();
randeazaPuncte();
calculeazaImpact();
