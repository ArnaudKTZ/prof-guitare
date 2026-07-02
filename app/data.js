// Données de contenu de la PWA. Source de vérité : dossier /content.
// Embarquées en JS (pas de fetch) pour marcher aussi bien en hébergé qu'en local.
//
// Chaque bloc de routine a plusieurs NIVEAUX (paliers), du plus simple au plus dur.
// On monte de niveau quand on tient le précédent. Les niveaux suivants sont déjà là
// pour aller plus loin dans une même journée.
//
// Format note audio : {s:corde(6=mi grave..1=mi aigu), f:case, d:durée en temps,
//   bend:case cible (glissando), r:silence, c:[[s,f]...] accord}. Durée par défaut 0.5.

const ROUTINE = {
  titre: "Routine du jour",
  soustitre: "15-20 min de base, plus si tu veux. Monte les niveaux.",
  guitare: "Électro-acoustique (Strat pour Bends)",
  tonalite: "Ré mineur",
  blocs: [
    {
      id: "echauffement",
      titre: "Échauffement / coordination",
      duree: "4-5 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Araignée 1-2-3-4",
          but: "Synchroniser main gauche et main droite sur le clic. Une note = un clic, propre.",
          tab: [
            "E|-1-2-3-4---------------------------------|",
            "A|---------1-2-3-4-------------------------|",
            "D|-----------------1-2-3-4-----------------|",
            "G|-------------------------1-2-3-4---------|",
            "B|---------------------------------1-2-3-4-|",
            "e|--- puis redescends de mi aigu vers mi grave ---"
          ],
          tempoDepart: 60, unite: "bpm (croches)",
          palier: "3 A/R propres → +5 bpm. Objectif 100 bpm avant de passer au niveau 2.",
          focus: "Alternate picking strict bas-haut. Un doigt par case, ne décolle pas les doigts posés.",
          audio: { bpm: 90, notes: [
            {s:6,f:1},{s:6,f:2},{s:6,f:3},{s:6,f:4},{s:5,f:1},{s:5,f:2},{s:5,f:3},{s:5,f:4},
            {s:4,f:1},{s:4,f:2},{s:4,f:3},{s:4,f:4},{s:3,f:1},{s:3,f:2},{s:3,f:3},{s:3,f:4},
            {s:2,f:1},{s:2,f:2},{s:2,f:3},{s:2,f:4},{s:1,f:1},{s:1,f:2},{s:1,f:3},{s:1,f:4}
          ]}
        },
        {
          nom: "Permutations de doigts (1-3-2-4)",
          but: "Casser l'automatisme du 1-2-3-4. Les doigts 3 et 4 (annulaire, auriculaire) prennent le contrôle.",
          tab: [
            "Sur chaque corde, joue 1-3-2-4 puis passe à la corde suivante.",
            "E|-1-3-2-4-|  A|-1-3-2-4-|  D|-1-3-2-4-| ...",
            "Variantes à enchaîner : 1-4-2-3, 2-4-1-3, 4-2-3-1."
          ],
          tempoDepart: 55, unite: "bpm (croches)",
          palier: "Chaque variante propre à 80 bpm → niveau 3.",
          focus: "Aucune note qui frise, aucun doigt qui claque. Lenteur = propreté.",
          audio: { bpm: 80, notes: [
            {s:6,f:1},{s:6,f:3},{s:6,f:2},{s:6,f:4},{s:5,f:1},{s:5,f:3},{s:5,f:2},{s:5,f:4},
            {s:4,f:1},{s:4,f:3},{s:4,f:2},{s:4,f:4},{s:3,f:1},{s:3,f:3},{s:3,f:2},{s:3,f:4},
            {s:2,f:1},{s:2,f:3},{s:2,f:2},{s:2,f:4},{s:1,f:1},{s:1,f:3},{s:1,f:2},{s:1,f:4}
          ]}
        },
        {
          nom: "Diagonale + extension",
          but: "Coordination sur tout le manche, la main gauche se déplace en montant.",
          tab: [
            "Monte d'une case à chaque corde (fenêtre qui glisse) :",
            "E|-1-2-3-4-|  A|-2-3-4-5-|  D|-3-4-5-6-|",
            "G|-4-5-6-7-|  B|-5-6-7-8-|  e|-6-7-8-9-|",
            "Puis redescends en diagonale."
          ],
          tempoDepart: 55, unite: "bpm (croches)",
          palier: "Propre à 85 bpm = ton échauffement est solide, garde-le à ce niveau.",
          focus: "Le pouce derrière le manche suit le déplacement. Économie de mouvement.",
          audio: { bpm: 85, notes: [
            {s:6,f:1},{s:6,f:2},{s:6,f:3},{s:6,f:4},{s:5,f:2},{s:5,f:3},{s:5,f:4},{s:5,f:5},
            {s:4,f:3},{s:4,f:4},{s:4,f:5},{s:4,f:6},{s:3,f:4},{s:3,f:5},{s:3,f:6},{s:3,f:7},
            {s:2,f:5},{s:2,f:6},{s:2,f:7},{s:2,f:8},{s:1,f:6},{s:1,f:7},{s:1,f:8},{s:1,f:9}
          ]}
        }
      ]
    },
    {
      id: "picking",
      titre: "Alternate picking chiffré",
      duree: "3-4 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Croches puis doubles-croches",
          but: "Vitesse propre de la main droite, et mesurer la progression.",
          tab: [
            "Une corde (ré à vide ou case 5), bas-haut en continu.",
            "A) Croches (2/clic) : départ 70 bpm.",
            "B) Doubles-croches (4/clic) : quand A carré à 100, redescends à 60."
          ],
          tempoDepart: 70, unite: "bpm",
          palier: "Doubles-croches propres à 80 bpm → niveau 2.",
          focus: "Poignet souple, pas l'avant-bras. Note ton meilleur tempo propre du jour.",
          audio: { bpm: 80, notes: [
            {s:4,f:0,d:0.5},{s:4,f:0,d:0.5},{s:4,f:0,d:0.5},{s:4,f:0,d:0.5},
            {s:4,f:0,d:0.25},{s:4,f:0,d:0.25},{s:4,f:0,d:0.25},{s:4,f:0,d:0.25},
            {s:4,f:0,d:0.25},{s:4,f:0,d:0.25},{s:4,f:0,d:0.25},{s:4,f:0,d:0.25}
          ]}
        },
        {
          nom: "Accents déplacés (feel batteur)",
          but: "Ton atout : déplacer l'accent dans un flot de doubles-croches régulier.",
          tab: [
            "Doubles-croches non-stop sur une corde. Accentue :",
            "- la 1re de chaque groupe de 4 (>...>...)",
            "- puis la 2e, puis la 3e, puis la 4e.",
            "La main droite ne s'arrête jamais, seul l'accent bouge."
          ],
          tempoDepart: 60, unite: "bpm (doubles-croches)",
          palier: "Les 4 placements d'accent nets à 75 bpm → niveau 3.",
          focus: "Le métronome sur les temps, toi tu déplaces le poids. Pur travail de groove.",
          audio: { bpm: 75, notes: [
            {s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},
            {s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},
            {s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},
            {s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25},{s:4,f:5,d:0.25}
          ]}
        },
        {
          nom: "Inside / outside sur 2 cordes",
          but: "Traverser deux cordes proprement, le vrai test de l'alternate picking.",
          tab: [
            "Inside picking :  D|-5-----5-----|  G|----5-----5--|",
            "Outside picking : D|----5-----5--|  G|-5-----5-----|",
            "Alterne strictement bas-haut sans casser le mouvement."
          ],
          tempoDepart: 60, unite: "bpm (croches)",
          palier: "Inside et outside propres à 90 bpm = main droite solide.",
          focus: "C'est le passage de corde qui coince, pas la vitesse. Ralentis si ça accroche.",
          audio: { bpm: 85, notes: [
            {s:4,f:5},{s:3,f:5},{s:4,f:5},{s:3,f:5},{s:3,f:5},{s:4,f:5},{s:3,f:5},{s:4,f:5}
          ]}
        }
      ]
    },
    {
      id: "pentatonique",
      titre: "Pentatonique de ré mineur",
      duree: "4-5 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Position 1 (case 10)",
          but: "Fluidité et mise en place sur la gamme du morceau.",
          tab: [
            "e|-------------------10-13-|",
            "B|----------------10-13----|",
            "G|-------------10-12--------|",
            "D|--------10-12------------|",
            "A|---10-12----------------|",
            "E|10-13-------------------|"
          ],
          tempoDepart: 70, unite: "bpm (croches)",
          palier: "Montée + descente propres à 110 bpm → niveau 2.",
          focus: "Chaque note calée, pas de bouillie sur les changements de corde.",
          audio: { bpm: 80, notes: [
            {s:6,f:10},{s:6,f:13},{s:5,f:10},{s:5,f:12},{s:4,f:10},{s:4,f:12},
            {s:3,f:10},{s:3,f:12},{s:2,f:10},{s:2,f:13},{s:1,f:10},{s:1,f:13},
            {s:1,f:10},{s:2,f:13},{s:2,f:10},{s:3,f:12},{s:3,f:10},{s:4,f:12},
            {s:4,f:10},{s:5,f:12},{s:5,f:10},{s:6,f:13},{s:6,f:10}
          ]}
        },
        {
          nom: "Séquences par 3",
          but: "Le classique qui muscle la gamme : 1-2-3, 2-3-4, 3-4-5... au lieu de monter tout droit.",
          tab: [
            "Dans la position 1, joue par groupes de 3 notes qui avancent d'un cran :",
            "note1-2-3, note2-3-4, note3-4-5, etc. sur toute la box.",
            "Puis en descendant."
          ],
          tempoDepart: 65, unite: "bpm (croches)",
          palier: "Séquence fluide à 95 bpm → niveau 3.",
          focus: "Ne t'emmêle pas les pinceaux : c'est un exo de cerveau autant que de doigts.",
          audio: { bpm: 80, notes: [
            {s:6,f:10},{s:6,f:13},{s:5,f:10}, {s:6,f:13},{s:5,f:10},{s:5,f:12},
            {s:5,f:10},{s:5,f:12},{s:4,f:10}, {s:5,f:12},{s:4,f:10},{s:4,f:12},
            {s:4,f:10},{s:4,f:12},{s:3,f:10}, {s:4,f:12},{s:3,f:10},{s:3,f:12},
            {s:3,f:10},{s:3,f:12},{s:2,f:10}, {s:3,f:12},{s:2,f:10},{s:2,f:13}
          ]}
        },
        {
          nom: "Toute la penta sur une corde",
          but: "Jeu horizontal : la même gamme le long du manche, pas juste en box.",
          tab: [
            "Ré mineur pentatonique sur la corde de mi aigu :",
            "e|-10-13-15-17-20-22-|  (ré fa sol la do ré)",
            "Monte et redescends. Pareil sur la corde de si, puis de sol."
          ],
          tempoDepart: 60, unite: "bpm (croches)",
          palier: "Propre et juste sur 3 cordes différentes → niveau 4.",
          focus: "Les slides relient les notes. Repère le ré (10 et 22), c'est ta maison.",
          audio: { bpm: 80, notes: [
            {s:1,f:10},{s:1,f:13},{s:1,f:15},{s:1,f:17},{s:1,f:20},{s:1,f:22},
            {s:1,f:20},{s:1,f:17},{s:1,f:15},{s:1,f:13},{s:1,f:10}
          ]}
        },
        {
          nom: "Triolets (feel batteur)",
          but: "La même box, mais en triolets. Ton oreille de batteur va adorer le déphasage 3-contre-4.",
          tab: [
            "Position 1, montée en triolets (3 notes par temps).",
            "Le métronome bat les noires, toi tu remplis en 3.",
            "Accentue la 1re note de chaque triolet."
          ],
          tempoDepart: 55, unite: "bpm (triolets)",
          palier: "Triolets carrés à 80 bpm = ta penta est prête pour l'impro.",
          focus: "Le point fort du batteur : sentir le 3 sans se caler sur le 4. Régale-toi.",
          audio: { bpm: 70, notes: [
            {s:6,f:10,d:0.34},{s:6,f:13,d:0.33},{s:5,f:10,d:0.33},
            {s:5,f:12,d:0.34},{s:4,f:10,d:0.33},{s:4,f:12,d:0.33},
            {s:3,f:10,d:0.34},{s:3,f:12,d:0.33},{s:2,f:10,d:0.33},
            {s:2,f:13,d:0.34},{s:1,f:10,d:0.33},{s:1,f:13,d:0.33}
          ]}
        }
      ]
    },
    {
      id: "bends",
      titre: "Bends & vibrato",
      duree: "4-5 min",
      guitare: "STRATOCASTER",
      niveaux: [
        {
          nom: "Bend d'un ton + référence",
          but: "Chantier n°2 : tomber juste. On joue la note cible, puis on bende jusqu'à elle.",
          tab: [
            "G|--14-------12b--   (14 = cible LA, bende la 12 pour l'atteindre)",
            "B|--15-------13b--   (15 = cible, bende la 13)",
            "Vérifie à chaque fois : même hauteur exactement."
          ],
          tempoDepart: 60, unite: "bpm",
          palier: "10 bends justes d'affilée sur les deux cordes → niveau 2.",
          focus: "Pousse avec le poignet, pas juste le doigt. Plusieurs doigts derrière pour la force.",
          audio: { bpm: 60, notes: [
            {s:3,f:14,d:1},{r:true,d:0.4},{s:3,f:12,bend:14,d:1.6},{r:true,d:0.4},
            {s:2,f:15,d:1},{r:true,d:0.4},{s:2,f:13,bend:15,d:1.6}
          ]}
        },
        {
          nom: "Demi-ton, ton et demi, release",
          but: "Contrôler la hauteur du bend, et le redescendre en gardant la justesse (release).",
          tab: [
            "Demi-ton :   G|--12b(1/2)--  (monte d'une case)",
            "Ton et demi : G|--12b(1.5)--  (monte de 3 cases, dur !)",
            "Release : bende, puis redescends lentement pile sur la note de départ."
          ],
          tempoDepart: 55, unite: "bpm",
          palier: "Demi-ton, ton, ton et demi justes à l'oreille → niveau 3.",
          focus: "L'oreille commande, pas le doigt. Chante la note cible avant de bender.",
          audio: { bpm: 55, notes: [
            {s:3,f:12,bend:13,d:1.4},{r:true,d:0.4},{s:3,f:12,bend:14,d:1.4},{r:true,d:0.4},
            {s:3,f:12,bend:15,d:1.6}
          ]}
        },
        {
          nom: "Pré-bend & release",
          but: "Bender AVANT de jouer, puis relâcher : la note apparaît en descendant. Effet très blues.",
          tab: [
            "Pré-bende la case 12 (sans jouer) jusqu'à la hauteur de 14,",
            "PUIS joue, PUIS relâche lentement vers la vraie 12.",
            "G|--(12→14 pré-bendé) joue, release vers 12--"
          ],
          tempoDepart: 55, unite: "bpm",
          palier: "Le release sonne juste et régulier → niveau 4.",
          focus: "Tout est dans la descente contrôlée. Ne lâche pas d'un coup.",
          audio: { bpm: 55, notes: [
            {s:3,f:14,bend:12,d:2.4},{r:true,d:0.5},{s:2,f:15,bend:13,d:2.4}
          ]}
        },
        {
          nom: "Vibrato & vibrato sur bend",
          but: "Chantier n°3 : le vibrato, ce qui fait sonner pro une note tenue.",
          tab: [
            "Vibrato : tiens la case 12 (sol) et fais de petits bends réguliers,",
            "1 aller-retour par clic à 60 bpm, comme un bend rythmé.",
            "Niveau ultime : bende d'un ton, PUIS ajoute le vibrato sur la note bendée."
          ],
          tempoDepart: 60, unite: "bpm (1 oscillation/clic)",
          palier: "Vibrato régulier et volontaire = tu as une vraie voix sur la guitare.",
          focus: "Régularité avant vitesse. C'est un vibrato de batteur : métronomique.",
          audio: { bpm: 60, notes: [
            {s:3,f:12,bend:14,d:3}
          ]}
        }
      ]
    },
    {
      id: "shuffle",
      titre: "Shuffle blues (mise en place)",
      duree: "3-5 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Le feel ternaire à vide",
          but: "Ton terrain de batteur. Installer le bounce shuffle (long-court) avant les notes.",
          tab: [
            "Joue la corde de ré à vide en shuffle : LONG-court, LONG-court.",
            "D|-D..d-D..d-D..d-D..d-|   (le 'D' sur le temps, le 'd' juste avant le suivant)",
            "Palm mute léger, main droite qui balance."
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "Le bounce est naturel et scotché au clic → niveau 2.",
          focus: "Ne joue pas droit : c'est du ternaire. Tu connais ça mieux que personne.",
          audio: { bpm: 70, notes: [
            {s:4,f:0,d:0.67},{s:4,f:0,d:0.33},{s:4,f:0,d:0.67},{s:4,f:0,d:0.33},
            {s:4,f:0,d:0.67},{s:4,f:0,d:0.33},{s:4,f:0,d:0.67},{s:4,f:0,d:0.33}
          ]}
        },
        {
          nom: "Riff boogie (style ZZ Top)",
          but: "Le riff de shuffle classique : basse qui marche, root - 5te - 6te.",
          tab: [
            "Sur la corde de la, root ré (case 5) :",
            "A|-5-5-7-7-9-9-7-7-|  en shuffle (chaque paire = long-court)",
            "C'est LA mécanique du blues rock. Palm mute."
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "Riff propre et en place à 90 bpm → niveau 3.",
          focus: "La main droite garde le shuffle même quand la gauche bouge.",
          audio: { bpm: 75, notes: [
            {s:5,f:5,d:0.67},{s:5,f:5,d:0.33},{s:5,f:7,d:0.67},{s:5,f:7,d:0.33},
            {s:5,f:9,d:0.67},{s:5,f:9,d:0.33},{s:5,f:7,d:0.67},{s:5,f:7,d:0.33}
          ]}
        },
        {
          nom: "Grille 12 mesures (I-IV-V)",
          but: "Le boogie déplacé sur les 3 accords du blues : ré, sol, la. La vraie structure.",
          tab: [
            "Même riff boogie, transposé :",
            "I  (ré) : root corde la case 5",
            "IV (sol): root corde mi grave case 3",
            "V  (la) : root corde mi grave case 5",
            "Enchaîne la grille : D D D D / G G D D / A G D A"
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "12 mesures enchaînées sans casser le shuffle = tu accompagnes un blues.",
          focus: "Anticipe le changement d'accord d'un temps. Reste dans le groove.",
          audio: { bpm: 75, notes: [
            {s:5,f:5,d:0.67},{s:5,f:5,d:0.33},{s:5,f:7,d:0.67},{s:5,f:7,d:0.33},
            {s:6,f:3,d:0.67},{s:6,f:3,d:0.33},{s:6,f:5,d:0.67},{s:6,f:5,d:0.33},
            {s:6,f:5,d:0.67},{s:6,f:5,d:0.33},{s:6,f:7,d:0.67},{s:6,f:7,d:0.33},
            {s:5,f:5,d:0.67},{s:5,f:5,d:0.33},{s:5,f:7,d:0.67},{s:5,f:7,d:0.33}
          ]}
        }
      ]
    },
    {
      id: "morceau",
      titre: "Bout de morceau",
      duree: "3-5 min",
      guitare: "Stratocaster",
      niveaux: [
        {
          nom: "L'étape en cours",
          but: "Finir par du concret : l'étape de I Need You Tonight que tu travailles (onglet Morceau).",
          tab: [
            "Joue uniquement l'étape en cours du morceau, au tempo lent, au métronome.",
            "Propre et en place, pas tout le morceau. C'est la récompense de la séance.",
            "L'aperçu ci-dessous = le riff d'intro (étape 2)."
          ],
          tempoDepart: 60, unite: "bpm",
          palier: "Quand une étape passe à 100%, tu joues la suivante ici.",
          focus: "Qualité et placement. Ancre la boucle : tu progresses vers un vrai morceau.",
          audio: { bpm: 60, notes: [
            {s:3,f:12,bend:14,d:1},{s:3,f:12,d:0.5},{s:3,f:10,d:0.5},{s:4,f:12,d:0.5},{s:4,f:10,d:1}
          ]}
        }
      ]
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

// Bandes son des étapes du morceau (notes synthétisées depuis les cases).
const AUDIO_ETAPE = {
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
};
