// Prof de guitare — logique PWA. Données dans data.js, progression en localStorage.

const LS = {
  get(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

const todayKey = () => new Date().toISOString().slice(0, 10); // AAAA-MM-JJ

// ---------- Bandes son (notes synthétisées depuis les cases des tabs) ----------
// Format note : {s:corde(6=mi grave..1=mi aigu), f:case, d:durée en temps, bend:case cible, r:silence, c:[[s,f]...] accord}
const AUDIO = {
  bloc: {
    echauffement: { bpm: 80, notes: [
      {s:4,f:5},{s:4,f:6},{s:4,f:7},{s:4,f:8},{s:3,f:5},{s:3,f:6},{s:3,f:7},{s:3,f:8},
      {s:2,f:5},{s:2,f:6},{s:2,f:7},{s:2,f:8},{s:1,f:5},{s:1,f:6},{s:1,f:7},{s:1,f:8}
    ]},
    picking: { bpm: 80, notes: [
      {s:4,f:0},{s:4,f:0},{s:4,f:0},{s:4,f:0},{s:4,f:0},{s:4,f:0},{s:4,f:0},{s:4,f:0}
    ]},
    pentatonique: { bpm: 80, notes: [
      {s:6,f:10},{s:6,f:13},{s:5,f:10},{s:5,f:12},{s:4,f:10},{s:4,f:12},
      {s:3,f:10},{s:3,f:12},{s:2,f:10},{s:2,f:13},{s:1,f:10},{s:1,f:13},
      {s:1,f:10},{s:2,f:13},{s:2,f:10},{s:3,f:12},{s:3,f:10},{s:4,f:12},
      {s:4,f:10},{s:5,f:12},{s:5,f:10},{s:6,f:13},{s:6,f:10}
    ]},
    bends: { bpm: 60, notes: [
      {s:3,f:14,d:1},{r:true,d:0.5},{s:3,f:12,bend:14,d:2}
    ]},
    morceau: { bpm: 60, notes: [
      {s:3,f:12,bend:14,d:1},{s:3,f:12,d:0.5},{s:3,f:10,d:0.5},{s:4,f:12,d:0.5},{s:4,f:10,d:1}
    ]}
  },
  etape: {
    1: { bpm: 55, notes: [{s:6,f:10,d:1},{s:6,f:10,d:1},{s:6,f:10,d:1},{s:6,f:10,d:1}] },
    2: { bpm: 60, notes: [
      {s:3,f:12,bend:14,d:1},{s:3,f:12,d:0.5},{s:3,f:10,d:0.5},{s:4,f:12,d:0.5},{s:4,f:10,d:1}
    ]},
    3: { bpm: 60, notes: [
      {c:[[4,0],[3,2],[2,3],[1,1]],d:2}, {c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:2},
      {c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:2}, {c:[[4,0],[3,2],[2,3],[1,1]],d:2}
    ]},
    4: { bpm: 60, notes: [
      {s:2,f:13,bend:15,d:1},{s:2,f:13,d:0.5},{s:2,f:10,d:0.5},{s:3,f:12,bend:14,d:2}
    ]},
    5: { bpm: 60, notes: [
      {s:3,f:12,bend:14,d:1},{s:3,f:12,d:0.5},{s:3,f:10,d:0.5},{s:4,f:12,d:0.5},{s:4,f:10,d:0.5},
      {c:[[4,0],[3,2],[2,3],[1,1]],d:2}
    ]}
  }
};

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
  });
});

// Date du jour
const dOpt = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('date-jour').textContent =
  new Date().toLocaleDateString('fr-FR', dOpt);

// ---------- Vue Aujourd'hui (routine) ----------
function renderRoutine() {
  AudioPlayer.stop();
  const faits = LS.get('routine-faits-' + todayKey(), []);
  const streak = LS.get('streak', { n: 0, dernier: '' });
  const el = document.getElementById('vue-aujourdhui');

  const total = ROUTINE.blocs.length;
  const done = faits.length;

  let html = `
    <div class="carte">
      <h3>${ROUTINE.titre}</h3>
      <div class="meta">${ROUTINE.soustitre} · ${ROUTINE.tonalite}</div>
      <div class="barre"><span style="width:${Math.round(done/total*100)}%"></span></div>
      <div class="pct">${done}/${total} blocs</div>
      ${streak.n > 0 ? `<div class="streak">🔥 ${streak.n} jour${streak.n>1?'s':''} d'affilée</div>` : ''}
    </div>`;

  ROUTINE.blocs.forEach(b => {
    const fait = faits.includes(b.id);
    const strat = b.guitare.toUpperCase().includes('STRAT');
    html += `
      <div class="carte">
        <h3>${b.titre} ${fait ? '✅' : ''}</h3>
        <div>
          <span class="pill duree">${b.duree}</span>
          <span class="pill ${strat ? 'strat' : 'duree'}">${b.guitare}</span>
        </div>
        <p class="but">${b.but}</p>
        <div class="label">Tablature</div>
        <pre class="tab">${b.tab.join('\n')}</pre>
        <div class="info-ligne"><span class="k">Départ</span><span class="v"><span class="tempo-badge">${b.tempoDepart} ${b.unite}</span></span></div>
        <div class="info-ligne"><span class="k">Focus</span><span class="v">${b.focus}</span></div>
        <div class="info-ligne"><span class="k">Palier</span><span class="v">${b.palier}</span></div>
        ${AUDIO.bloc[b.id] ? `<button class="btn ecouter" data-audio-bloc="${b.id}">▶ Écouter l'exo</button>` : ''}
        <button class="btn ${fait ? 'annuler' : 'valider'}" data-bloc="${b.id}">
          ${fait ? 'Annuler' : 'Bloc fait ✓'}
        </button>
      </div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('button[data-bloc]').forEach(btn => {
    btn.addEventListener('click', () => toggleBloc(btn.dataset.bloc));
  });
  el.querySelectorAll('button[data-audio-bloc]').forEach(btn => {
    btn.addEventListener('click', () => AudioPlayer.toggle(AUDIO.bloc[btn.dataset.audioBloc], btn));
  });
}

function toggleBloc(id) {
  const k = 'routine-faits-' + todayKey();
  let faits = LS.get(k, []);
  faits = faits.includes(id) ? faits.filter(x => x !== id) : [...faits, id];
  LS.set(k, faits);
  if (faits.length === ROUTINE.blocs.length) majStreak();
  renderRoutine();
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
    </div>`;

  MORCEAU.etapes.forEach(e => {
    const fait = valides.includes(e.id);
    html += `
      <div class="carte">
        <div class="etape ${fait ? 'faite' : ''}">
          <div class="tete">
            <div class="num">${fait ? '✓' : e.id}</div>
            <h4>${e.titre}</h4>
          </div>
        </div>
        <div class="info-ligne"><span class="k">Tempo</span><span class="v"><span class="tempo-badge">${e.tempo}</span></span></div>
        <p class="but">${e.description}</p>
        <div class="label">Tablature</div>
        <pre class="tab">${e.tab.join('\n')}</pre>
        <p class="astuce"><strong>Validée quand :</strong> ${e.valideQuand}</p>
        ${AUDIO.etape[e.id] ? `<button class="btn ecouter" data-audio-etape="${e.id}">▶ Écouter l'étape</button>` : ''}
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
    btn.addEventListener('click', () => AudioPlayer.toggle(AUDIO.etape[btn.dataset.audioEtape], btn));
  });
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
    const pulse = document.querySelector('.pulse');
    if (pulse) { pulse.classList.add('bat'); setTimeout(() => pulse.classList.remove('bat'), 70); }
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
  function maj() {
    const a = document.querySelector('#metro .bpm-affiche');
    const r = document.querySelector('#metro input[type=range]');
    const p = document.querySelector('#metro .btn.play, #metro .btn.stop');
    if (a) a.textContent = bpm;
    if (r) r.value = bpm;
    if (p) { p.textContent = running ? 'Stop' : 'Démarrer'; p.className = 'btn ' + (running ? 'stop' : 'play'); }
  }
  return { start, stop, setBpm, get bpm() { return bpm; }, get running() { return running; },
           toggle() { running ? stop() : start(); } };
})();

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

// ---------- Init ----------
renderRoutine();
renderMorceau();
renderMetro();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
