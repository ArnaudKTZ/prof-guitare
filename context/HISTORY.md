# Historique — Prof de guitare perso

> Journal chronologique des sessions et décisions. Le plus récent en haut.

---

## 2026-07-02 (après-midi) — Phase 0 : évaluation

### Bilan de niveau (questionnaire)
- Profil : **lead player orienté riffs/pentatonique**, pas gratteur d'accords.
- Atouts : pentatonique mineure sur plusieurs positions, sens du tempo (batteur).
- Chantiers priorisés : (1) coordination mains/métronome, (2) justesse des bends, (3) vibrato (inexistant),
  (4) alternate picking non chiffré, (5) accords/changements (temps mort net, secondaire).

### Décisions calées
- **Pratique :** 15-20 min/jour, quotidien. Routine compacte, tout au métronome.
- **Guitare quotidienne :** électro-acoustique. Morceau + bends/vibrato sur la Strat.
- **Morceau n°1 :** ZZ Top — I Need You Tonight (slow blues, *Eliminator* 1983). Choisi par Arnaud,
  validé : tempo lent idéal pour installer coordination + bends justes, grille de blues carrée parfaite
  pour roder le moteur chanson. Ne pas viser le photocopiage du solo improvisé de Gibbons ; découpage
  prévu : riff/intro → thème → grille d'accompagnement → chorus de solo simplifié → groove complet.

### Suite
- Phase 1 : MVP PWA (routine du jour + I Need You Tonight décomposé + validation des steps + métronome).

### Phase 1 réalisée dans la foulée (MVP PWA)
- Contenu écrit à la main : `content/routine-quotidienne.md` (routine 5 blocs chiffrée) et
  `content/morceaux/i-need-you-tonight.md` (5 étapes validables). Tonalité alignée : ré mineur.
- PWA construite dans `app/` : `index.html`, `style.css`, `app.js`, `data.js` (contenu embarqué),
  `manifest.webmanifest`, `sw.js` (offline cache-first), `icon.svg`.
- 3 vues : Aujourd'hui (routine + validation blocs + streak), Morceau (5 étapes + barre de progression),
  Métro (Web Audio, accent tous les 4 temps, presets 50-110). Progression en localStorage.
- Serveur de dev : `node app/server.js` (port 8123), config preview dans `.claude/launch.json`.
  Note : python http.server bloqué par le sandbox, d'où le mini serveur Node.
- Vérifié visuellement dans le preview : les 3 vues et la validation fonctionnent.

### Itérations post-MVP (même jour)
- Bande son par exo : bouton « Écouter » qui joue les notes de la tab en Web Audio (synthé, hauteur +
  rythme, bends en glissando, accords en arpège). Service worker passé en network-first (cache v2).
- Retour d'Arnaud : routine de départ trop simple. → Routine v2 : chaque bloc devient une échelle de
  NIVEAUX (paliers, navigation ◀▶, niveau mémorisé en localStorage). 3-4 niveaux par bloc, séquences
  plus longues. Nouveau bloc SHUFFLE blues (feel ternaire → riff boogie → grille 12 mesures) pour enfin
  exploiter l'atout batteur. 6 blocs au total. Audio par niveau.
- Prochain réglage possible : ajouter des niveaux 4-5 sur les blocs où il plafonne, selon son retour.

### Mise en ligne (GitHub Pages)
- Repo GitHub public créé : https://github.com/ArnaudKTZ/prof-guitare (compte ArnaudKTZ).
- URL de l'appli : **https://arnaudktz.github.io/prof-guitare/** (https, installable iPhone).
- Méthode de déploiement : **branche `gh-pages`** servie à la racine par Pages (build classique).
  La branche est alimentée depuis le sous-dossier `app/` de `main` via :
  `git subtree push --prefix app origin gh-pages`.
  Donc pour publier une mise à jour : commit sur main, puis rejouer ce subtree push.
- Écarté : le déploiement par GitHub Actions (workflow supprimé) car `actions/deploy-pages`
  restait en timeout (blocage au provisioning du 1er site Pages du compte). La méthode branche est
  plus fiable. `docs/` n'a pas pu servir (déjà pris par PLAN.md).
- Premier build Pages long (provisioning initial du sous-domaine github.io, 10-20 min).

---

## 2026-07-02

### Création du projet
- Projet lancé : un prof de guitare perso pour se remettre à la guitare.
- Profil capté : Arnaud est batteur (fort en rythme/timing), a déjà pris des cours, connaît les
  pentatoniques mineures. Matériel : acoustique, électro-acoustique, Strat. Styles : rock, hard rock,
  blues rock (ZZ Top).
- Concept validé : hybride coach + page. Deux moteurs (exercices quotidiens progressifs +
  décomposition de morceaux en étapes validables jusqu'à 100%), suivi dans une PWA iPhone.
- Dossier scaffoldé sur le bureau (~/Desktop/prof-guitare) : CLAUDE.md, context/, docs/PLAN.md, git init.
- Prochaine étape : ouvrir une session Claude Code dans ce dossier et attaquer la Phase 0 (évaluation
  du niveau réel + choix du premier morceau).
