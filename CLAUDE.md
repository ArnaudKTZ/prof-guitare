# CLAUDE.md — Prof de guitare perso

Ce fichier est la fondation du projet. Il est chargé au début de chaque session Claude Code
ouverte dans ce dossier. C'est la source de vérité sur ce projet.

---

## Ce que c'est

Un prof de guitare personnalisé pour Arnaud, qui se remet à la guitare. Deux moteurs :

1. **Exercices quotidiens progressifs** : une routine du jour adaptée à son niveau (technique,
   gammes, rythme, oreille), qui monte en difficulté au fil du temps.
2. **Décomposition de morceaux en étapes** : Arnaud choisit une chanson, le système la découpe
   en étapes progressives (riff d'intro, couplet, refrain, solo, morceau complet). Chaque étape
   est validable, avec une barre de progression jusqu'à 100%. Ludique, comme un jeu.

Le tout suivi dans une petite app (PWA installable sur iPhone) : routine du jour, validation des
étapes, progression par morceau et globale, métronome, diagrammes d'accords et de gammes.

---

## Qui je suis (côté guitare)

- **Batteur à la base.** Excellent en rythme et en timing, c'est mon plus gros atout. Rare chez un
  guitariste, à exploiter à fond (groove, mise en place, jeu en place au métronome).
- **Pas débutant complet.** J'ai déjà pris des cours de guitare et je connais les gammes
  pentatoniques mineures. Je me situe plutôt en "reprise avec bases musicales solides" : il faut me
  faire progresser vite, pas me réapprendre à tenir un médiator.
- **Matériel :** une guitare acoustique, une électro-acoustique, une Stratocaster électrique.
- **Styles :** rock, hard rock, blues rock (ZZ Top et compagnie).
- **Ce que je veux :** progresser par étapes de façon ludique, avec un système où je valide les
  steps au fur et à mesure pour arriver à jouer un morceau en entier à 100%, plus des exercices
  généraux quotidiens pour m'améliorer. Un vrai prof perso qui me fait évoluer.

---

## Comment tu dois m'aider

- **Communique en français**, direct et efficace, pas de blabla, pas de flagornerie.
- **Sois honnête** sur mon niveau et mes progrès, même quand ce n'est pas flatteur.
- **N'utilise pas de tirets longs** (em dashes), préfère les virgules ou les points.
- **Pédagogie guitare concrète :** tablatures, diagrammes d'accords et de gammes, doigtés, conseils
  de main droite/gauche. Adapte toujours au niveau réel, pas au niveau théorique.
- **Exploite mon atout rythmique :** tout au métronome, travail du groove et de la mise en place.

---

## Architecture visée

Trois briques, dans l'esprit de ce qui marche déjà sur mon projet bourse (données en JSON, PWA
iPhone, contenu généré par Claude) :

1. **Moteur technique (exercices quotidiens)** : routine du jour générée/adaptée selon mon niveau et
   ma progression. Échauffement, technique (alternate picking, bends blues, patterns pentatoniques,
   changements d'accords), rythme et oreille.
2. **Moteur chanson (décomposition)** : je choisis un morceau, Claude le découpe en étapes
   progressives jouables, chacune avec sa tablature et son objectif. Je valide au fur et à mesure.
3. **PWA de suivi** : une page installable sur iPhone qui affiche la routine du jour, les morceaux
   en cours avec barre de progression, la validation des étapes, un métronome et les diagrammes.
   Données stockées en JSON / localStorage.

---

## Structure du workspace

```
.
├── CLAUDE.md            # Ce fichier, chargé à chaque session
├── context/
│   ├── CONTEXT.md       # Mon profil guitare, mes objectifs, mon matériel
│   ├── HISTORY.md       # Journal des sessions et décisions
│   └── ECHEANCES.md     # Tâches datées à venir (relues au démarrage)
└── docs/
    └── PLAN.md          # Le plan de construction du projet (phases)
```

---

## Pour démarrer une session

Au début de chaque session dans ce dossier : lis CLAUDE.md, context/CONTEXT.md, context/HISTORY.md
et context/ECHEANCES.md, résume où on en est, préviens-moi si une échéance est due, puis attends mes
instructions. Le plan de construction est dans docs/PLAN.md.
