// Prof de guitare — logique PWA. Données dans data.js, progression en localStorage.

const LS = {
  get(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

const todayKey = () => new Date().toISOString().slice(0, 10); // AAAA-MM-JJ

// ---------- Navigation ----------
document.querySelectorAll('#tabs button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#tabs button').forEach(x => x.classList.remove('actif'));
    document.querySelectorAll('.vue').forEach(x => x.classList.remove('actif'));
    b.classList.add('actif');
    document.getElementById('vue-' + b.dataset.vue).classList.add('actif');
  });
});

// Date du jour
const dOpt = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('date-jour').textContent =
  new Date().toLocaleDateString('fr-FR', dOpt);

// ---------- Vue Aujourd'hui (routine) ----------
function renderRoutine() {
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
        <button class="btn ${fait ? 'annuler' : 'valider'}" data-bloc="${b.id}">
          ${fait ? 'Annuler' : 'Bloc fait ✓'}
        </button>
      </div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('button[data-bloc]').forEach(btn => {
    btn.addEventListener('click', () => toggleBloc(btn.dataset.bloc));
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
        <button class="btn ${fait ? 'annuler' : 'valider'}" data-etape="${e.id}">
          ${fait ? 'Annuler la validation' : 'Valider cette étape ✓'}
        </button>
      </div>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('button[data-etape]').forEach(btn => {
    btn.addEventListener('click', () => toggleEtape(parseInt(btn.dataset.etape, 10)));
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
