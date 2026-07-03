// Prof de guitare — logique PWA. Données dans data.js, progression en localStorage.

const LS = {
  get(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

const todayKey = () => new Date().toISOString().slice(0, 10); // AAAA-MM-JJ

// Extrait un tempo numérique d'un texte ("50-60 bpm" -> 50, "tempo du disque" -> 60 par défaut).
const tempoNum = (txt) => { const m = String(txt).match(/\d+/); return m ? parseInt(m[0], 10) : 60; };

// ---------- Bande son (notes synthétisées depuis les cases des tabs) ----------
// Format note : {s:corde(6=mi grave..1=mi aigu), f:case, d:durée en temps, bend:case cible,
//   r:silence, c:[[s,f]...] accord}. Séquences définies dans data.js (niveaux + AUDIO_ETAPE).
const AudioPlayer = (() => {
  const OPEN = { 6: 40, 5: 45, 4: 50, 3: 55, 2: 59, 1: 64 }; // MIDI cordes à vide
  let ctx = null, nodes = [], timer = null, current = null;
  const freq = (s, f) => 440 * Math.pow(2, ((OPEN[s] + f) - 69) / 12);

  function pluck(f0, f1, start, dur) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(f0, start);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, start + dur * 0.5);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.26, start + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur + 0.25);
    o.connect(g); g.connect(ctx.destination);
    o.start(start); o.stop(start + dur + 0.3);
    nodes.push(o);
  }

  function stop() {
    if (timer) { clearTimeout(timer); timer = null; }
    nodes.forEach(n => { try { n.stop(); } catch (e) {} });
    nodes = [];
    if (current) { current.classList.remove('joue'); current.textContent = current.dataset.label; current = null; }
  }

  function play(seq, btn) {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    stop();
    current = btn; btn.dataset.label = btn.textContent; btn.textContent = '⏸ Stop'; btn.classList.add('joue');
    const beat = 60 / (seq.bpm || 70);
    let t = ctx.currentTime + 0.06;
    seq.notes.forEach(n => {
      const d = (n.d || 0.5) * beat;
      if (n.r) { t += d; return; }
      if (n.c) { n.c.forEach((p, i) => pluck(freq(p[0], p[1]), null, t + i * 0.03, d)); }
      else { pluck(freq(n.s, n.f), n.bend ? freq(n.s, n.bend) : null, t, d); }
      t += d;
    });
    timer = setTimeout(stop, (t - ctx.currentTime + 0.4) * 1000);
  }

  return { stop, toggle(seq, btn) { current === btn ? stop() : play(seq, btn); } };
})();

// ---------- Navigation ----------
document.querySelectorAll('#tabs button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#tabs button').forEach(x => x.classList.remove('actif'));
    document.querySelectorAll('.vue').forEach(x => x.classList.remove('actif'));
    b.classList.add('actif');
    document.getElementById('vue-' + b.dataset.vue).classList.add('actif');
    if (typeof AudioPlayer !== 'undefined') AudioPlayer.stop();
    if (b.dataset.vue === 'partition') ouvrirPartition();
  });
});

// Date du jour
const dOpt = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('date-jour').textContent =
  new Date().toLocaleDateString('fr-FR', dOpt);

// ---------- Vue Aujourd'hui (routine) ----------
const trouveBloc = id => [...ROUTINE.blocs, ...(ROUTINE.bonus || [])].find(b => b.id === id);

function carteBloc(b, faits) {
  const fait = faits.includes(b.id);
  const strat = b.guitare.toUpperCase().includes('STRAT');
  const nb = b.niveaux.length;
  const lvl = Math.max(0, Math.min(LS.get('niveau-' + b.id, 0), nb - 1));
  const n = b.niveaux[lvl];
  const navNiv = nb > 1 ? `
      <div class="niveau-nav">
        <button class="niv-btn" data-niv-prev="${b.id}" ${lvl === 0 ? 'disabled' : ''}>◀</button>
        <span class="niv-label">Niveau ${lvl + 1}/${nb} · ${n.nom}</span>
        <button class="niv-btn" data-niv-next="${b.id}" ${lvl === nb - 1 ? 'disabled' : ''}>▶</button>
      </div>` : `<div class="niveau-nav"><span class="niv-label">${n.nom}</span></div>`;
  return `
    <div class="carte">
      <h3>${b.titre} ${fait ? '✅' : ''}</h3>
      <div>
        <span class="pill duree">${b.duree}</span>
        <span class="pill ${strat ? 'strat' : 'duree'}">${b.guitare}</span>
      </div>
      ${navNiv}
      <p class="but">${n.but}</p>
      <div class="label">Tablature</div>
      <pre class="tab">${n.tab.join('\n')}</pre>
      <div class="info-ligne"><span class="k">Départ</span><span class="v"><span class="tempo-badge">${n.tempoDepart} ${n.unite}</span></span></div>
      <div class="info-ligne"><span class="k">Focus</span><span class="v">${n.focus}</span></div>
      <div class="info-ligne"><span class="k">Palier</span><span class="v">${n.palier}</span></div>
      <div class="actions-exo">
        ${n.audio ? `<button class="btn ecouter" data-audio-bloc="${b.id}">▶ Écouter</button>` : ''}
        <button class="btn metro-exo" data-metro="${n.tempoDepart}">🥁 Métro ${n.tempoDepart}</button>
      </div>
      <button class="btn ${fait ? 'annuler' : 'valider'}" data-bloc="${b.id}">
        ${fait ? 'Annuler' : 'Bloc fait ✓'}
      </button>
    </div>`;
}

function renderRoutine() {
  AudioPlayer.stop();
  const faits = LS.get('routine-faits-' + todayKey(), []);
  const streak = LS.get('streak', { n: 0, dernier: '' });
  const seance = LS.get('seance', 'court'); // 'court' (15-20 min) | 'long' (30 min)
  const el = document.getElementById('vue-aujourdhui');

  const bonus = ROUTINE.bonus || [];
  const actifs = seance === 'long' ? [...ROUTINE.blocs, ...bonus] : ROUTINE.blocs;
  const total = actifs.length;
  const done = actifs.filter(b => faits.includes(b.id)).length;

  let html = `
    <div class="carte">
      <h3>${ROUTINE.titre}</h3>
      <div class="meta">${ROUTINE.soustitre} · ${ROUTINE.tonalite}</div>
      <div class="seance-choix">
        <button class="seance-btn ${seance === 'court' ? 'actif' : ''}" data-seance="court">15-20 min</button>
        <button class="seance-btn ${seance === 'long' ? 'actif' : ''}" data-seance="long">30 min · exos en +</button>
      </div>
      <div class="barre"><span style="width:${Math.round(done/total*100)}%"></span></div>
      <div class="pct">${done}/${total} blocs</div>
      ${streak.n > 0 ? `<div class="streak">🔥 ${streak.n} jour${streak.n>1?'s':''} d'affilée</div>` : ''}
    </div>`;

  ROUTINE.blocs.forEach(b => { html += carteBloc(b, faits); });

  if (seance === 'long' && bonus.length) {
    html += `<div class="section-titre">Pour aller plus loin 🚀</div>`;
    bonus.forEach(b => { html += carteBloc(b, faits); });
  }
  el.innerHTML = html;

  el.querySelectorAll('button[data-seance]').forEach(btn => {
    btn.addEventListener('click', () => { LS.set('seance', btn.dataset.seance); renderRoutine(); });
  });
  el.querySelectorAll('button[data-bloc]').forEach(btn => {
    btn.addEventListener('click', () => toggleBloc(btn.dataset.bloc));
  });
  el.querySelectorAll('button[data-niv-prev]').forEach(btn => {
    btn.addEventListener('click', () => changerNiveau(btn.dataset.nivPrev, -1));
  });
  el.querySelectorAll('button[data-niv-next]').forEach(btn => {
    btn.addEventListener('click', () => changerNiveau(btn.dataset.nivNext, 1));
  });
  el.querySelectorAll('button[data-audio-bloc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const b = trouveBloc(btn.dataset.audioBloc);
      const lvl = Math.max(0, Math.min(LS.get('niveau-' + b.id, 0), b.niveaux.length - 1));
      AudioPlayer.toggle(b.niveaux[lvl].audio, btn);
    });
  });
  el.querySelectorAll('button[data-metro]').forEach(btn => {
    btn.addEventListener('click', () => toggleMetroExo(parseInt(btn.dataset.metro, 10)));
  });
}

function changerNiveau(id, delta) {
  const b = trouveBloc(id);
  const lvl = Math.max(0, Math.min(LS.get('niveau-' + id, 0) + delta, b.niveaux.length - 1));
  LS.set('niveau-' + id, lvl);
  renderRoutine();
}

function toggleBloc(id) {
  const k = 'routine-faits-' + todayKey();
  let faits = LS.get(k, []);
  const ajout = !faits.includes(id);
  faits = ajout ? [...faits, id] : faits.filter(x => x !== id);
  LS.set(k, faits);
  if (ajout) {
    // acquis persistant (débloque les étapes du morceau, ne se perd jamais)
    const acquis = LS.get('routine-acquis', []);
    if (!acquis.includes(id)) LS.set('routine-acquis', [...acquis, id]);
  }
  // Streak = séance de base complète (les bonus 30 min sont du rab, pas obligatoires).
  if (ROUTINE.blocs.every(b => faits.includes(b.id))) majStreak();
  renderRoutine();
  renderMorceau(); // le déblocage du morceau peut avoir changé
}

function majStreak() {
  const streak = LS.get('streak', { n: 0, dernier: '' });
  const auj = todayKey();
  if (streak.dernier === auj) return;
  const hier = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  streak.n = (streak.dernier === hier) ? streak.n + 1 : 1;
  streak.dernier = auj;
  LS.set('streak', streak);
}

// ---------- Vue Morceau ----------
function renderMorceau() {
  AudioPlayer.stop();
  const valides = LS.get('morceau-' + MORCEAU.id, []);
  const el = document.getElementById('vue-morceau');
  const total = MORCEAU.etapes.length;
  const pct = Math.round(valides.length / total * 100);

  let html = `
    <div class="carte">
      <h3>${MORCEAU.titre}</h3>
      <div class="meta">${MORCEAU.artiste} · ${MORCEAU.album}</div>
      <div><span class="pill strat">${MORCEAU.guitare}</span><span class="pill duree">${MORCEAU.tonalite}</span></div>
      <div class="barre"><span style="width:${pct}%"></span></div>
      <div class="pct">${pct}%</div>
      <p class="astuce">${MORCEAU.note}</p>
      <p class="astuce">🎮 Mode parcours : chaque étape se débloque quand tu as fait les exos qui la préparent (dans l'onglet Aujourd'hui) et validé l'étape précédente. Faire tous les exos = pouvoir jouer le morceau en entier.</p>
    </div>`;

  const acquis = LS.get('routine-acquis', []);
  const blocName = id => (ROUTINE.blocs.find(b => b.id === id) || {}).titre || id;

  MORCEAU.etapes.forEach((e, idx) => {
    const fait = valides.includes(e.id);
    const prevOk = e.id === 1 || valides.includes(MORCEAU.etapes[idx - 1].id);
    const missing = (e.prereqs || []).filter(p => !acquis.includes(p));
    const unlocked = prevOk && missing.length === 0;

    if (!unlocked && !fait) {
      html += `
        <div class="carte verrouille">
          <div class="etape"><div class="tete"><div class="num">🔒</div><h4>${e.titre}</h4></div></div>
          <div class="lock-panel">
            <p class="lock-titre">Étape verrouillée</p>
            ${!prevOk ? `<p class="lock-item">→ Valide d'abord l'étape ${e.id - 1}.</p>` : ''}
            ${missing.length ? `<p class="lock-item">→ Fais ces exos (au moins une fois) dans l'onglet Aujourd'hui :</p>
              <ul class="lock-list">${missing.map(m => `<li>${blocName(m)}</li>`).join('')}</ul>` : ''}
          </div>
        </div>`;
      return;
    }

    const nb = (e.niveaux || []).length;
    let lvl = Math.max(0, Math.min(LS.get('niveau-etape-' + e.id, 0), nb - 1));
    const cur = nb ? e.niveaux[lvl] : { nom: e.tempo, tempo: tempoNum(e.tempo) };
    const navTempo = nb > 1 ? `
        <div class="niveau-nav">
          <button class="niv-btn" data-tniv-prev="${e.id}" ${lvl === 0 ? 'disabled' : ''}>◀</button>
          <span class="niv-label">Tempo : ${cur.nom} · ${cur.tempo} bpm</span>
          <button class="niv-btn" data-tniv-next="${e.id}" ${lvl === nb - 1 ? 'disabled' : ''}>▶</button>
        </div>` : '';
    html += `
      <div class="carte">
        <div class="etape ${fait ? 'faite' : ''}">
          <div class="tete">
            <div class="num">${fait ? '✓' : e.id}</div>
            <h4>${e.titre}</h4>
          </div>
        </div>
        ${navTempo}
        <p class="but">${e.description}</p>
        <div class="label">Tablature</div>
        <pre class="tab">${e.tab.join('\n')}</pre>
        <p class="astuce"><strong>Validée quand :</strong> ${e.valideQuand}</p>
        <div class="actions-exo">
          ${AUDIO_ETAPE[e.id] ? `<button class="btn ecouter" data-audio-etape="${e.id}">▶ Écouter</button>` : ''}
          <button class="btn metro-exo" data-metro="${cur.tempo}">🥁 Métro ${cur.tempo}</button>
        </div>
        <button class="btn ${fait ? 'annuler' : 'valider'}" data-etape="${e.id}">
          ${fait ? 'Annuler la validation' : 'Valider cette étape ✓'}
        </button>
      </div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('button[data-etape]').forEach(btn => {
    btn.addEventListener('click', () => toggleEtape(parseInt(btn.dataset.etape, 10)));
  });
  el.querySelectorAll('button[data-audio-etape]').forEach(btn => {
    btn.addEventListener('click', () => AudioPlayer.toggle(AUDIO_ETAPE[btn.dataset.audioEtape], btn));
  });
  el.querySelectorAll('button[data-metro]').forEach(btn => {
    btn.addEventListener('click', () => toggleMetroExo(parseInt(btn.dataset.metro, 10)));
  });
  el.querySelectorAll('button[data-tniv-prev]').forEach(btn => {
    btn.addEventListener('click', () => changerNiveauEtape(parseInt(btn.dataset.tnivPrev, 10), -1));
  });
  el.querySelectorAll('button[data-tniv-next]').forEach(btn => {
    btn.addEventListener('click', () => changerNiveauEtape(parseInt(btn.dataset.tnivNext, 10), 1));
  });
}

function changerNiveauEtape(id, delta) {
  const e = MORCEAU.etapes.find(x => x.id === id);
  const lvl = Math.max(0, Math.min(LS.get('niveau-etape-' + id, 0) + delta, e.niveaux.length - 1));
  LS.set('niveau-etape-' + id, lvl);
  renderMorceau();
}

function toggleEtape(id) {
  const k = 'morceau-' + MORCEAU.id;
  let v = LS.get(k, []);
  v = v.includes(id) ? v.filter(x => x !== id) : [...v, id];
  LS.set(k, v);
  renderMorceau();
}

// ---------- Vue Métronome ----------
const Metro = (() => {
  let ctx = null, timer = null, bpm = LS.get('metro-bpm', 60), running = false, beat = 0;
  const battues = 4;

  function clic(accent) {
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = accent ? 1600 : 1000;
    g.gain.setValueAtTime(accent ? 0.5 : 0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.05);
  }

  function tick() {
    const accent = (beat % battues) === 0;
    clic(accent);
    document.querySelectorAll('.pulse, .pulse-mini').forEach(p => {
      p.classList.add('bat'); setTimeout(() => p.classList.remove('bat'), 70);
    });
    beat++;
  }

  function start() {
    if (running) return;
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    running = true; beat = 0; tick();
    timer = setInterval(tick, 60000 / bpm);
    maj();
  }
  function stop() { running = false; clearInterval(timer); timer = null; maj(); }
  function setBpm(v) {
    bpm = Math.max(30, Math.min(240, v));
    LS.set('metro-bpm', bpm);
    if (running) { clearInterval(timer); timer = setInterval(tick, 60000 / bpm); }
    maj();
  }
  function startAt(v) { setBpm(v); if (!running) start(); }
  function maj() {
    const a = document.querySelector('#metro .bpm-affiche');
    const r = document.querySelector('#metro input[type=range]');
    const p = document.querySelector('#metro .btn.play, #metro .btn.stop');
    if (a) a.textContent = bpm;
    if (r) r.value = bpm;
    if (p) { p.textContent = running ? 'Stop' : 'Démarrer'; p.className = 'btn ' + (running ? 'stop' : 'play'); }
    // barre permanente
    const mb = document.getElementById('mini-bpm');
    const mp = document.getElementById('mini-play');
    if (mb) mb.textContent = bpm;
    if (mp) { mp.textContent = running ? '⏸' : '▶'; mp.classList.toggle('on', running); }
    // boutons "Métro X" sur chaque exo/étape : deviennent "Stop" quand c'est eux qui jouent
    document.querySelectorAll('button.metro-exo[data-metro]').forEach(btn => {
      const t = parseInt(btn.dataset.metro, 10);
      const actif = running && bpm === t;
      btn.textContent = actif ? `⏸ Stop ${t}` : `🥁 Métro ${t}`;
      btn.classList.toggle('joue', actif);
    });
  }
  return { start, stop, setBpm, startAt, get bpm() { return bpm; }, get running() { return running; },
           toggle() { running ? stop() : start(); } };
})();

// Bouton "Métro X" d'un exo : stoppe s'il est déjà celui qui joue, sinon (re)lance à ce tempo.
function toggleMetroExo(tempo) {
  if (Metro.running && Metro.bpm === tempo) Metro.stop();
  else Metro.startAt(tempo);
}

function renderMetro() {
  const el = document.getElementById('vue-metronome');
  el.innerHTML = `
    <div class="carte" id="metro">
      <div class="bpm-affiche">${Metro.bpm}</div>
      <div class="bpm-unit">BPM · accent tous les 4 temps</div>
      <div class="pulse"></div>
      <div class="bpm-ctrl">
        <button id="moins">−</button>
        <input type="range" min="30" max="240" value="${Metro.bpm}" />
        <button id="plus">+</button>
      </div>
      <button class="btn ${Metro.running ? 'stop' : 'play'}">${Metro.running ? 'Stop' : 'Démarrer'}</button>
      <div class="presets">
        <button data-bpm="50">50</button>
        <button data-bpm="60">60</button>
        <button data-bpm="70">70</button>
        <button data-bpm="90">90</button>
        <button data-bpm="110">110</button>
      </div>
      <p class="astuce">Batteur = ton point fort. Vise le clic exactement, ni devant ni derrière. On monte le tempo seulement quand c'est propre.</p>
    </div>`;

  el.querySelector('.btn.play, .btn.stop').addEventListener('click', () => Metro.toggle());
  el.querySelector('#moins').addEventListener('click', () => Metro.setBpm(Metro.bpm - 1));
  el.querySelector('#plus').addEventListener('click', () => Metro.setBpm(Metro.bpm + 1));
  el.querySelector('input[type=range]').addEventListener('input', e => Metro.setBpm(parseInt(e.target.value, 10)));
  el.querySelectorAll('.presets button').forEach(b =>
    b.addEventListener('click', () => Metro.setBpm(parseInt(b.dataset.bpm, 10))));
}

// ---------- Barre métronome permanente ----------
document.getElementById('mini-play').addEventListener('click', () => Metro.toggle());
document.getElementById('mini-moins').addEventListener('click', () => Metro.setBpm(Metro.bpm - 5));
document.getElementById('mini-plus').addEventListener('click', () => Metro.setBpm(Metro.bpm + 5));

// ---------- Vue Partition (import Guitar Pro local, via alphaTab) ----------
// La partition reste sur l'appareil (localStorage), jamais publiée sur le serveur.
const ALPHATAB_VER = '1.8.3';
const ALPHATAB_BASE = `https://cdn.jsdelivr.net/npm/@coderline/alphatab@${ALPHATAB_VER}/dist/`;
let alphaApi = null, alphaLoading = null, partitionChargee = false, enLecture = false, sectionActive = null;

function partitionStatus(msg) {
  const el = document.getElementById('partition-status');
  if (el) el.textContent = msg || '';
}

function bytesVersB64(bytes) {
  let bin = ''; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(bin);
}
function b64VersBytes(b64) {
  const bin = atob(b64); const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function chargeAlphaLib() {
  if (window.alphaTab) return Promise.resolve();
  if (alphaLoading) return alphaLoading;
  alphaLoading = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = ALPHATAB_BASE + 'alphaTab.min.js';
    s.onload = () => res();
    s.onerror = () => rej(new Error('alphaTab n\'a pas pu se charger (connexion internet ?)'));
    document.head.appendChild(s);
  });
  return alphaLoading;
}

async function initAlpha() {
  if (alphaApi) return alphaApi;
  await chargeAlphaLib();
  alphaApi = new alphaTab.AlphaTabApi(document.getElementById('alphatab'), {
    core: { fontDirectory: ALPHATAB_BASE + 'font/' },
    display: { scale: 0.8, staveProfile: alphaTab.StaveProfile.Tab },
    player: {
      enablePlayer: true,
      enableCursor: true,
      enableAnimatedBeatCursor: true,
      soundFont: ALPHATAB_BASE + 'soundfont/sonivox.sf2',
      scrollElement: document.getElementById('alphatab-viewport')
    }
  });
  alphaApi.renderStarted.on(() => partitionStatus('Rendu de la partition...'));
  alphaApi.renderFinished.on(() => partitionStatus(''));
  alphaApi.scoreLoaded.on(score => { remplirPistes(score); afficherPlan(); });
  alphaApi.playerStateChanged.on(e => {
    enLecture = e.state === 1;
    const b = document.getElementById('pt-play');
    if (b) b.textContent = e.state === 1 ? '⏸ Pause' : '▶ Lecture';
  });
  return alphaApi;
}

function remplirPistes(score) {
  const sel = document.getElementById('pt-piste');
  if (!sel || !score) return;
  sel.innerHTML = '';
  score.tracks.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = t.name || ('Piste ' + (i + 1));
    sel.appendChild(o);
  });
  let def = score.tracks.findIndex(t => /git/i.test(t.name || ''));
  if (def < 0) def = 0;
  sel.value = def;
  alphaApi.renderTracks(score.tracks);
  construireMixer(score);
}

// Mixer multi-pistes : mute/solo/volume par piste, pour isoler ou couper un instrument à l'écoute.
function construireMixer(score) {
  const cont = document.getElementById('pt-mixer');
  if (!cont || !score) return;
  cont.innerHTML = score.tracks.map((t, i) => `
    <div class="mixer-row">
      <span class="mixer-nom">${t.name || ('Piste ' + (i + 1))}</span>
      <button class="mixer-btn" data-mute="${i}" title="Couper cette piste">🔇</button>
      <button class="mixer-btn" data-solo="${i}" title="N'entendre que cette piste">🎯</button>
      <input type="range" class="mixer-vol" data-vol="${i}" min="0" max="16" value="16">
    </div>`).join('');
  cont.querySelectorAll('[data-mute]').forEach(b => b.addEventListener('click', () => {
    const i = parseInt(b.dataset.mute, 10);
    const actif = !b.classList.contains('actif');
    b.classList.toggle('actif', actif);
    alphaApi.changeTrackMute([score.tracks[i]], actif);
  }));
  cont.querySelectorAll('[data-solo]').forEach(b => b.addEventListener('click', () => {
    const i = parseInt(b.dataset.solo, 10);
    const actif = !b.classList.contains('actif');
    b.classList.toggle('actif', actif);
    alphaApi.changeTrackSolo([score.tracks[i]], actif);
  }));
  cont.querySelectorAll('[data-vol]').forEach(s => s.addEventListener('input', e => {
    const i = parseInt(s.dataset.vol, 10);
    alphaApi.changeTrackVolume([score.tracks[i]], parseInt(e.target.value, 10) / 16);
  }));
}

function brancherControlesPartition() {
  if (brancherControlesPartition.fait) return;
  brancherControlesPartition.fait = true;
  document.getElementById('pt-play').addEventListener('click', () => alphaApi && alphaApi.playPause());
  document.getElementById('pt-stop').addEventListener('click', () => { sectionActive = null; if (alphaApi) alphaApi.stop(); });
  document.getElementById('pt-piste').addEventListener('change', () => afficherPlan());
  document.getElementById('pt-notation').addEventListener('change', e => {
    if (!alphaApi) return;
    alphaApi.settings.display.staveProfile = e.target.checked ? alphaTab.StaveProfile.ScoreTab : alphaTab.StaveProfile.Tab;
    alphaApi.updateSettings();
    alphaApi.render();
  });
  document.getElementById('pt-vitesse').addEventListener('input', e => {
    const v = parseInt(e.target.value, 10);
    document.getElementById('pt-vitesse-val').textContent = v + '%';
    if (alphaApi) alphaApi.playbackSpeed = v / 100;
  });
  document.getElementById('pt-metro').addEventListener('change', e => { if (alphaApi) alphaApi.metronomeVolume = e.target.checked ? 1 : 0; });
  document.getElementById('pt-loop').addEventListener('change', e => { if (alphaApi) alphaApi.isLooping = e.target.checked; });
}

async function importPartition(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    partitionStatus('Lecture du fichier...');
    const bytes = new Uint8Array(await file.arrayBuffer());
    LS.set('partition-nom', file.name);
    try { LS.set('partition-b64', bytesVersB64(bytes)); }
    catch (_) { partitionStatus('(Fichier trop lourd pour être mémorisé, mais affiché pour cette session.)'); }
    const nomEl = document.getElementById('pt-nom');
    if (nomEl) { nomEl.textContent = file.name; document.getElementById('pt-nom-ligne').style.display = 'block'; }
    document.getElementById('pt-controls').style.display = 'block';
    partitionChargee = true;
    await initAlpha();
    brancherControlesPartition();
    alphaApi.load(bytes);
  } catch (err) {
    partitionStatus('Erreur : ' + err.message);
  }
}

function ouvrirPartition() {
  if (partitionChargee) return;
  const b64 = LS.get('partition-b64', null);
  if (!b64) return;
  partitionChargee = true;
  document.getElementById('pt-controls').style.display = 'block';
  partitionStatus('Chargement de ta partition...');
  initAlpha()
    .then(() => { brancherControlesPartition(); alphaApi.load(b64VersBytes(b64)); })
    .catch(e => { partitionStatus('Erreur : ' + e.message); partitionChargee = false; });
}

// Extrait les accords joués (nom + diagramme case par case) dans un intervalle de mesures.
function accordsDansIntervalle(bars, from, to) {
  const map = new Map();
  for (let j = from; j <= to; j++) {
    (bars[j].voices || []).forEach(v => (v.beats || []).forEach(b => {
      if (b.hasChord) {
        const c = b.chord;
        if (c && c.name && !map.has(c.name)) map.set(c.name, c);
      }
    }));
  }
  return [...map.values()].map(c => ({ nom: c.name, dia: (c.strings || []).map(f => f < 0 ? 'x' : f).join('-') }));
}

// Décode le bitmask "fins alternatives" (1ère fin, 2ème fin...) d'une mesure GP en liste lisible.
function finsAlternatives(mask) {
  const out = [];
  for (let b = 1; b <= 8; b++) if (mask & (1 << (b - 1))) out.push(b);
  return out.join('/');
}

// Génère un plan d'entraînement à partir de la partition analysée (métadonnées seulement).
// Le prof : découpe adaptatif (solos plus fins), techniques détectées, coaching par section,
// repères de section du fichier (Intro/Couplet/Refrain...), tempo réel par mesure, capo, accords.
function genererPlan(trackIndex) {
  if (!alphaApi || !alphaApi.score) return { tempo: 100, tempoLabel: '100', sections: [], capo: 0 };
  const score = alphaApi.score;
  const staff = score.tracks[trackIndex].staves[0];
  const bars = staff.bars;
  const masterBars = score.masterBars;
  const capo = staff.capo || 0;
  const tempo = score.tempo || 100;
  const N = bars.length;

  // Repères de section (marqueurs du fichier) et tempo réel, mesure par mesure.
  let curSection = null, curTempo = tempo;
  const sectionAt = [], tempoAt = [];
  for (let i = 0; i < N; i++) {
    const mb = masterBars[i];
    if (mb) {
      if (mb.section && (mb.section.text || mb.section.marker)) curSection = mb.section.text || mb.section.marker;
      if (mb.tempoAutomations && mb.tempoAutomations.length) curTempo = mb.tempoAutomations[0].value;
    }
    sectionAt.push(curSection);
    tempoAt.push(curTempo);
  }

  const bstat = bars.map(bar => {
    let notes = 0, bends = 0, slides = 0, hammers = 0, vib = 0, chords = 0, palm = 0, maxDur = 0, trip = false, fmin = 99, fmax = 0;
    (bar.voices || []).forEach(v => (v.beats || []).forEach(b => {
      if (b.isPalmMute) palm++;
      if (b.tupletNumerator > 1) trip = true;
      if (b.duration > maxDur) maxDur = b.duration;
      const ns = b.notes || [];
      if (ns.length > 1) chords++;
      ns.forEach(n => {
        notes++;
        if (n.bendType) bends++;
        if (n.slideInType || n.slideOutType) slides++;
        if (n.isHammerPullOrigin) hammers++;
        if (n.vibrato) vib++;
        if (typeof n.fret === 'number') { fmin = Math.min(fmin, n.fret); fmax = Math.max(fmax, n.fret); }
      });
    }));
    return { notes, bends, slides, hammers, vib, chords, palm, maxDur, trip, fmin, fmax };
  });
  const dur = i => bstat[i];
  const hard = i => dur(i).bends > 0 || dur(i).maxDur >= 16 || dur(i).notes >= 6;
  const sections = [];
  let i = 0;
  while (i < N) {
    const size = hard(i) ? 2 : 4;
    const from = i, to = Math.min(i + size - 1, N - 1);
    const a = { notes: 0, bends: 0, slides: 0, hammers: 0, vib: 0, chords: 0, palm: 0, maxDur: 0, trip: false, fmin: 99, fmax: 0 };
    for (let j = from; j <= to; j++) {
      const s = bstat[j];
      a.notes += s.notes; a.bends += s.bends; a.slides += s.slides; a.hammers += s.hammers; a.vib += s.vib;
      a.chords += s.chords; a.palm += s.palm; a.maxDur = Math.max(a.maxDur, s.maxDur); a.trip = a.trip || s.trip;
      a.fmin = Math.min(a.fmin, s.fmin); a.fmax = Math.max(a.fmax, s.fmax);
    }
    i = to + 1;
    if (a.notes === 0) continue;
    const dens = a.notes / (to - from + 1);
    let type = 'Riff';
    if (a.bends >= 1 && dens >= 4) type = 'Solo / lead';
    else if (a.chords > 0 && dens < 4) type = 'Rythmique';
    else if (dens >= 6) type = 'Solo / lead';
    const tempoCible = tempoAt[from];
    const base = type === 'Solo / lead' ? 0.4 : 0.5;
    const tempos = [Math.round(tempoCible * base), Math.round(tempoCible * 0.7), tempoCible];
    const tags = [];
    if (a.bends) tags.push(a.bends + ' bend' + (a.bends > 1 ? 's' : ''));
    if (a.vib) tags.push('vibrato');
    if (a.slides) tags.push('slide' + (a.slides > 1 ? 's' : ''));
    if (a.hammers) tags.push('hammer/pull');
    if (a.chords) tags.push('accords');
    if (a.palm) tags.push('palm mute');
    if (a.maxDur >= 16) tags.push('doubles-croches');
    if (a.trip) tags.push('triolets');
    let repeats = 0, altEnd = 0;
    for (let j = from; j <= to; j++) {
      const mb = masterBars[j];
      if (!mb) continue;
      if (mb.repeatCount > repeats) repeats = mb.repeatCount;
      if (mb.alternateEndings) altEnd |= mb.alternateEndings;
    }
    if (repeats > 0) tags.push('⟲ reprise x' + (repeats + 1));
    if (altEnd) { const fins = finsAlternatives(altEnd); tags.push(fins + (fins.includes('/') ? 'e fins' : 'e fin')); }
    const prereqs = [];
    if (a.bends || a.vib) prereqs.push('Bends & vibrato');
    if (a.hammers || a.slides) prereqs.push('Legato');
    if (a.maxDur >= 16 || dens >= 6) prereqs.push('Alternate picking');
    if (type === 'Solo / lead') prereqs.push('Pentatonique la mineur');
    if (a.chords) prereqs.push('Accords & changements');
    if (a.palm) prereqs.push('Shuffle blues');
    const coaching = coachingSection(type, a, tempos, [...new Set(prereqs)], tempoCible);
    const accords = accordsDansIntervalle(bars, from, to);
    sections.push({ from, to, type, tempos, tags, coaching, section: sectionAt[from], accords });
  }
  const tempoUniques = [...new Set(tempoAt)];
  const tempoLabel = tempoUniques.length > 1 ? `${Math.min(...tempoUniques)}-${Math.max(...tempoUniques)}` : String(tempo);
  return { tempo, tempoLabel, sections, capo };
}

function coachingSection(type, a, tempos, prereqs, tempo) {
  const pos = (a.fmin <= a.fmax && a.fmax > 0) ? `Cases ${a.fmin}-${a.fmax}. ` : '';
  let quoi = '';
  if (a.bends) quoi += `${a.bends} bend${a.bends > 1 ? 's' : ''} à faire tomber juste. `;
  if (a.maxDur >= 16) quoi += 'Passage rapide (doubles-croches). ';
  if (a.slides) quoi += 'Des slides pour lier les notes. ';
  if (a.chords) quoi += 'Des accords à poser nets. ';
  if (a.palm) quoi += 'Palm mute (la paume étouffe). ';
  let methode;
  if (type === 'Solo / lead')
    methode = `Boucle à ${tempos[0]} bpm : repère d'abord les notes sans le rythme, puis cale-les au clic. Les bends justes AVANT la vitesse. +5 bpm quand c'est propre, jusqu'à ${tempo}.`;
  else if (type === 'Rythmique')
    methode = `Pose les accords nets, anticipe les changements d'un temps. Une frappe par temps à ${tempos[0]} bpm, puis le motif rythmique, puis monte.`;
  else
    methode = `Mémorise le motif lentement à ${tempos[0]} bpm, mains synchronisées au clic, puis accélère par paliers jusqu'à ${tempo}.`;
  const prep = prereqs.length ? ` Échauffe-toi avec : ${prereqs.join(', ')}.` : '';
  return pos + quoi + methode + prep;
}

function planKey() {
  const nom = LS.get('partition-nom', 'x');
  const ti = document.getElementById('pt-piste') ? document.getElementById('pt-piste').value : 0;
  return 'plan-' + nom + '-' + ti;
}

function afficherPlan() {
  const cont = document.getElementById('plan-morceau');
  if (!cont) return;
  const ti = parseInt(document.getElementById('pt-piste').value || 0, 10);
  const { tempoLabel, sections, capo } = genererPlan(ti);
  if (!sections.length) { cont.innerHTML = ''; return; }
  const faits = LS.get(planKey(), []);
  const pct = Math.round(faits.length / sections.length * 100);
  let html = `
    <div class="carte">
      <h3>Plan d'entraînement de ce morceau 🎯</h3>
      <p class="astuce">Ton prof a analysé la partition et l'a découpée en ${sections.length} exos (les solos plus finement). Chaque section : ce qu'elle contient, comment l'attaquer, et un bouton pour la jouer en boucle lente. Objectif final : ${tempoLabel} bpm. Fais-les dans l'ordre, valide au fur et à mesure, de A à Z.</p>
      ${capo ? `<p class="astuce">🎸 Capo détecté : case ${capo}. Les numéros de case affichés dans la tab ne correspondent pas aux notes réellement entendues.</p>` : ''}
      <div class="barre"><span style="width:${pct}%"></span></div>
      <div class="pct">${faits.length}/${sections.length} sections</div>
      <button class="btn ghost" id="plan-stop">⏹ Arrêter la boucle</button>
    </div>`;
  sections.forEach((s, idx) => {
    const fait = faits.includes(idx);
    const emoji = s.type === 'Solo / lead' ? '🔥' : (s.type === 'Rythmique' ? '🎸' : '🎵');
    const titre = s.section
      ? `${s.section} <span class="mesures-sub">(mesures ${s.from + 1}-${s.to + 1})</span>`
      : `Mesures ${s.from + 1}-${s.to + 1}`;
    html += `
      <div class="carte plan-section ${fait ? 'faite' : ''}">
        <div class="tete"><div class="num">${fait ? '✓' : idx + 1}</div>
          <h4>${emoji} ${titre} · ${s.type}</h4></div>
        ${s.tags.length ? `<div style="margin:6px 0;">${s.tags.map(t => `<span class="pill duree">${t}</span> `).join('')}</div>` : ''}
        ${s.accords.length ? `<div class="accords-section">${s.accords.map(c => `<span class="accord-chip">${c.nom}<small>${c.dia}</small></span>`).join('')}</div>` : ''}
        <p class="astuce">${s.coaching}</p>
        <div class="info-ligne"><span class="k">Tempos</span><span class="v">${s.tempos.map((t, ti) => `<button type="button" class="tempo-badge${ti === 0 ? ' actif' : ''}" data-idx="${idx}" data-ti="${ti}" style="margin-left:4px">${t}</button>`).join('')}</span></div>
        <div class="actions-exo">
          <button class="btn ${fait ? 'annuler' : 'valider'}" data-plan="${idx}">${fait ? 'Annuler' : 'Validée ✓'}</button>
        </div>
      </div>`;
  });
  cont.innerHTML = html;

  document.getElementById('plan-stop').addEventListener('click', () => { sectionActive = null; arreterBoucle(); });
  cont.querySelectorAll('button.tempo-badge').forEach(b => b.addEventListener('click', () => {
    const idx = parseInt(b.dataset.idx, 10), ti = parseInt(b.dataset.ti, 10);
    b.parentElement.querySelectorAll('.tempo-badge').forEach(x => x.classList.remove('actif'));
    b.classList.add('actif');
    choisirTempoSection(sections[idx], idx, sections[idx].tempos[ti]);
  }));
  cont.querySelectorAll('button[data-plan]').forEach(b =>
    b.addEventListener('click', () => { togglePlanSection(parseInt(b.dataset.plan, 10), sections.length); }));
}

function togglePlanSection(idx, total) {
  const k = planKey();
  let f = LS.get(k, []);
  f = f.includes(idx) ? f.filter(x => x !== idx) : [...f, idx];
  LS.set(k, f);
  afficherPlan();
}

// Sélection d'un des 3 tempos d'une section : change la vitesse de lecture à la volée si la
// section est déjà en cours de boucle, sinon lance la boucle directement à ce tempo.
function choisirTempoSection(s, idx, tempoVal) {
  if (!alphaApi || !alphaApi.tickCache) return;
  if (sectionActive !== idx) {
    const tc = alphaApi.tickCache;
    const range = new alphaTab.synth.PlaybackRange();
    range.startTick = tc.masterBars[s.from].start;
    range.endTick = tc.masterBars[s.to].end;
    alphaApi.playbackRange = range;
    alphaApi.isLooping = true;
    const loopCb = document.getElementById('pt-loop'); if (loopCb) loopCb.checked = true;
    sectionActive = idx;
  }
  const pct = Math.min(100, Math.max(25, Math.round(tempoVal / (alphaApi.score.tempo || 100) * 100)));
  alphaApi.playbackSpeed = pct / 100;
  const slider = document.getElementById('pt-vitesse');
  if (slider) { slider.value = pct; document.getElementById('pt-vitesse-val').textContent = pct + '%'; }
  if (!enLecture) alphaApi.playPause();
}

function arreterBoucle() {
  if (!alphaApi) return;
  alphaApi.stop();
  alphaApi.isLooping = false;
  alphaApi.playbackRange = null;
  const loopCb = document.getElementById('pt-loop'); if (loopCb) loopCb.checked = false;
}

function renderPartition() {
  const el = document.getElementById('vue-partition');
  const nom = LS.get('partition-nom', null);
  el.innerHTML = `
    <div class="carte">
      <h3>Ma partition</h3>
      <p class="astuce">Importe ton fichier Guitar Pro (.gp, .gpx, .gp5...). Il reste sur ton appareil, rien n'est publié en ligne. Tu peux lire, ralentir, et choisir la piste (Git 1 = la guitare principale).</p>
      <label class="btn valider" style="display:block;text-align:center;cursor:pointer;">
        ${nom ? 'Remplacer la partition' : 'Importer une partition'}
        <input id="pt-fichier" type="file" accept=".gp,.gpx,.gp3,.gp4,.gp5,.gpif,.xml,.musicxml" style="display:none">
      </label>
      <p class="astuce" id="pt-nom-ligne" style="display:${nom ? 'block' : 'none'};">Fichier : <b id="pt-nom">${nom || ''}</b></p>
      <div id="pt-controls" style="display:none;margin-top:10px;">
        <div class="actions-exo">
          <button class="btn ecouter" id="pt-play">▶ Lecture</button>
          <button class="btn metro-exo" id="pt-stop">⏹ Stop</button>
        </div>
        <div class="info-ligne"><span class="k">Piste analysée</span><span class="v"><select id="pt-piste"></select></span></div>
        <div class="info-ligne"><span class="k">Vitesse</span><span class="v"><b id="pt-vitesse-val">100%</b></span></div>
        <input type="range" id="pt-vitesse" min="25" max="100" step="5" value="100" style="width:100%;">
        <label class="astuce" style="display:block;margin-top:8px;"><input type="checkbox" id="pt-metro"> Métronome pendant la lecture</label>
        <label class="astuce" style="display:block;"><input type="checkbox" id="pt-loop"> Boucler la sélection</label>
        <label class="astuce" style="display:block;"><input type="checkbox" id="pt-notation"> Notation standard + tab</label>
        <div id="pt-mixer" class="mixer"></div>
      </div>
    </div>
    <div id="alphatab-viewport"><div id="alphatab"></div></div>
    <div id="partition-status" class="astuce" style="text-align:center;"></div>
    <div id="plan-morceau"></div>`;
  document.getElementById('pt-fichier').addEventListener('change', importPartition);
}

function ajusterHauteurNav() {
  const nav = document.getElementById('tabs');
  if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
}
window.addEventListener('resize', ajusterHauteurNav);
window.addEventListener('orientationchange', ajusterHauteurNav);

// ---------- Init ----------
renderRoutine();
renderMorceau();
renderPartition();
renderMetro();
ajusterHauteurNav();
document.getElementById('mini-bpm').textContent = Metro.bpm;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
