# PLAN — Construction du prof de guitare perso

> Le plan de build, en phases. On avance MVP d'abord (prouver que la boucle est fun),
> puis on enrichit. Même philosophie que le projet bourse : commencer simple, prouver la
> valeur, ajouter ensuite.

---

## Le concept en une phrase

Un prof perso qui me donne des exercices quotidiens progressifs ET qui décompose un morceau choisi
en étapes validables jusqu'à 100%, le tout suivi dans une PWA iPhone, en exploitant mon atout de
batteur (rythme, métronome, groove).

---

## Les deux moteurs

### Moteur technique (exercices quotidiens)
- Routine du jour = échauffement + technique + rythme/oreille, adaptée au niveau.
- Progression : chaque bloc a des paliers (ex : pentatonique mineure position 1 à 60 bpm → 120 bpm).
- Doit exploiter le métronome à fond (mon point fort).

### Moteur chanson (décomposition en étapes)
- Je choisis un morceau. Le système le découpe en étapes progressives jouables :
  intro/riff → couplet → refrain → pont/solo → morceau complet à tempo.
- Chaque étape : tablature + objectif + tempo cible. Je valide quand je la tiens.
- Barre de progression par morceau jusqu'à 100%. Ludique, comme un jeu à niveaux.

### Suivi (PWA)
- Routine du jour affichée, morceaux en cours avec barres de progression, validation des steps.
- Métronome intégré, diagrammes d'accords et de gammes.
- Données en JSON / localStorage. Installable sur iPhone (écran d'accueil).

---

## Phases

### Phase 0 — Évaluation (1re session de travail)
- Faire un point précis sur le niveau réel : accords ouverts, barrés, changements, alternate picking,
  bends/vibrato, vitesse au métronome sur la pentatonique.
- Choisir le premier morceau cible (un blues rock accessible pour roder le moteur chanson).
- Fixer le temps de pratique réaliste.

### Phase 1 — MVP PWA (la boucle fun)
- Une page unique (HTML/JS, installable iPhone) qui gère : profil, routine du jour, 1 morceau
  décomposé en étapes, validation des steps, barres de progression.
- Contenu de départ écrit à la main (routine + 1 morceau) pour prouver que la boucle donne envie.
- Métronome basique intégré.

### Phase 2 — Décomposition assistée par Claude
- Je choisis n'importe quel morceau, Claude génère les étapes progressives (tablature + tempos).
- Générateur de routine quotidienne adaptée à ma progression enregistrée.

### Phase 3 — Enrichissement ludique
- Streaks, historique de pratique, adaptation automatique de la difficulté.
- Diagrammes d'accords/gammes interactifs, bibliothèque de morceaux en cours.
- Option rappel quotidien (notification ou email, comme le projet bourse).

---

## Principe directeur

Comme pour la bourse : rien de gadget. Chaque brique doit servir la vraie boucle (pratiquer
régulièrement et progresser de façon mesurable et fun). On valide la Phase 1 avant d'ajouter le reste.
