// Données de contenu de la PWA. Source de vérité : dossier /content.
// Embarquées en JS (pas de fetch) pour marcher aussi bien en hébergé qu'en local.

const ROUTINE = {
  titre: "Routine du jour",
  soustitre: "15-20 min · tout au métronome",
  guitare: "Électro-acoustique (Strat pour le bloc Bends)",
  tonalite: "Ré mineur",
  blocs: [
    {
      id: "echauffement",
      titre: "Échauffement / coordination",
      duree: "4 min",
      guitare: "Électro-acoustique",
      but: "Synchroniser main gauche et main droite sur le clic. Ton chantier n°1. Propreté avant vitesse : une note = un clic.",
      tab: [
        "e|-------------------5-6-7-8-|",
        "B|-------------5-6-7-8-------|",
        "G|-------5-6-7-8-------------|",
        "D|-5-6-7-8-------------------|",
        "A|--------------------------|",
        "E|--------------------------|"
      ],
      tempoDepart: 60,
      unite: "bpm (noires)",
      palier: "3 A/R propres → +5 bpm. Objectif 90 bpm.",
      focus: "Alternate picking strict bas-haut-bas-haut. Chaque note pile sur le clic."
    },
    {
      id: "picking",
      titre: "Alternate picking chiffré",
      duree: "3 min",
      guitare: "Électro-acoustique",
      but: "Donner de la vitesse propre à la main droite, et surtout mesurer la progression.",
      tab: [
        "Une seule corde (ré à vide ou case 5), bas-haut en continu.",
        "A) Croches (2 notes/clic) : départ 70 bpm.",
        "B) Doubles-croches quand A carré à 90 : redescends à 60 bpm."
      ],
      tempoDepart: 70,
      unite: "bpm (croches)",
      palier: "Note ton meilleur tempo propre du jour (ton chrono perso).",
      focus: "Régularité absolue du bas-haut. Poignet souple, pas l'avant-bras."
    },
    {
      id: "pentatonique",
      titre: "Pentatonique de ré mineur",
      duree: "4 min",
      guitare: "Électro-acoustique",
      but: "Fluidité et mise en place sur la gamme du morceau. Position 1, case 10.",
      tab: [
        "e|-------------------10-13-|",
        "B|----------------10-13----|",
        "G|-------------10-12--------|",
        "D|--------10-12------------|",
        "A|---10-12----------------|",
        "E|10-13-------------------|"
      ],
      tempoDepart: 70,
      unite: "bpm (croches)",
      palier: "3 A/R propres → +5 bpm. Objectif 110 bpm.",
      focus: "Montée + descente, alternate. Chaque note calée, pas de bouillie sur les changements de corde."
    },
    {
      id: "bends",
      titre: "Bends & vibrato",
      duree: "4 min",
      guitare: "STRATOCASTER",
      but: "Chantiers n°2 (justesse des bends) et n°3 (vibrato, à créer). Cordes souples = jouable propre.",
      tab: [
        "Bend d'un ton avec référence :",
        "G|--14--------12b--  (14 = LA cible, puis bende la 12 pour l'atteindre)",
        "",
        "Vibrato rythmé (ton avantage batteur) :",
        "G|--12~~~~~~  (petits bends réguliers, 1 A/R par clic à 60 bpm)"
      ],
      tempoDepart: 60,
      unite: "bpm",
      palier: "La justesse d'abord, la vitesse jamais. Un bend faux s'entend à 10 m.",
      focus: "Joue la note cible, puis bende jusqu'à retrouver exactement la même hauteur."
    },
    {
      id: "morceau",
      titre: "Bout de morceau",
      duree: "3-4 min",
      guitare: "Stratocaster",
      but: "Finir par du concret : la step en cours de I Need You Tonight, au tempo lent, au métronome.",
      tab: [
        "Joue uniquement l'étape en cours du morceau (onglet Morceau).",
        "Propre et en place, pas tout le morceau. C'est la récompense de la séance."
      ],
      tempoDepart: 60,
      unite: "bpm",
      palier: "Ancre la boucle : je progresse vers un vrai morceau.",
      focus: "Qualité et placement, pas quantité."
    }
  ]
};

const MORCEAU = {
  id: "i-need-you-tonight",
  titre: "I Need You Tonight",
  artiste: "ZZ Top",
  album: "Eliminator (1983)",
  tonalite: "Ré mineur · slow blues 12 mesures",
  guitare: "Stratocaster",
  note: "On ne photocopie pas le solo improvisé de Gibbons. On vise un blues en ré mineur convaincant. Licks à caler à l'oreille sur le disque, on affine au fil des sessions.",
  etapes: [
    {
      id: 1,
      titre: "Le socle : la note de ré et le groove",
      tempo: "50-60 bpm",
      description: "Avant les notes, le placement. Joue juste la fondamentale ré en noires, pile sur le clic, en boucle. Objectif : scotché au tempo, comme au drum.",
      tab: ["E|--10--10--10--10--|"],
      valideQuand: "12 mesures d'affilée parfaitement en place, sans accélérer."
    },
    {
      id: 2,
      titre: "Le motif d'intro / riff en penta",
      tempo: "60 bpm",
      description: "Motif court et bluesy en position 1 (case 10). Le 12b est ton bend money de la routine, tout se recoupe. À ajuster à l'oreille sur le disque.",
      tab: [
        "e|-------------------------|",
        "G|--12b----12--10----------|",
        "D|--------------12--10-----|"
      ],
      valideQuand: "Motif propre et en place à 60 bpm, bend juste."
    },
    {
      id: 3,
      titre: "L'accompagnement : la grille d'accords",
      tempo: "60 bpm",
      description: "Les trois accords en jeu sobre (une frappe par temps ou arpège lent). Pose l'accord net, laisse sonner. Enchainement de base : Dm ... G ... C ... Dm.",
      tab: [
        "Dm        G         C",
        "xx0231    320003    x32010"
      ],
      valideQuand: "Tu poses les 3 accords proprement et tu changes sans casser le tempo lent."
    },
    {
      id: 4,
      titre: "Un chorus de solo simplifié",
      tempo: "60 bpm",
      description: "Un tour de 12 mesures d'impro simple en penta de ré mineur, avec tes bends et ton vibrato. 3-4 notes bien placées valent mieux que des rafales.",
      tab: [
        "e|-------------------------------|",
        "B|--13b~~~----13--10-------------|",
        "G|-----------------12b~~~--------|"
      ],
      valideQuand: "Un chorus de 12 mesures en place, bends justes et au moins un vibrato tenu."
    },
    {
      id: 5,
      titre: "Le morceau complet à tempo",
      tempo: "tempo du disque",
      description: "Enchainer intro → grille → un chorus de solo → sortie, en place, au tempo lent, sur toute une boucle. C'est le 100%.",
      tab: ["Enchainement complet, une boucle entière sans t'arrêter."],
      valideQuand: "Un tour complet convaincant et en place, sans t'arrêter."
    }
  ]
};
