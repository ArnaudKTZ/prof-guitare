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
  tonalite: "La mineur",
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
      titre: "Pentatonique de la mineur",
      duree: "4-5 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Position 1 (case 5)",
          but: "Fluidité et mise en place sur la gamme du morceau (la mineur, case 5).",
          tab: [
            "e|-----------------5-8-|",
            "B|--------------5-8----|",
            "G|-----------5-7-------|",
            "D|--------5-7----------|",
            "A|----5-7-------------|",
            "E|5-8----------------|"
          ],
          tempoDepart: 70, unite: "bpm (croches)",
          palier: "Montée + descente propres à 110 bpm → niveau 2.",
          focus: "Chaque note calée, pas de bouillie sur les changements de corde.",
          audio: { bpm: 80, notes: [
            {s:6,f:5},{s:6,f:8},{s:5,f:5},{s:5,f:7},{s:4,f:5},{s:4,f:7},
            {s:3,f:5},{s:3,f:7},{s:2,f:5},{s:2,f:8},{s:1,f:5},{s:1,f:8},
            {s:1,f:5},{s:2,f:8},{s:2,f:5},{s:3,f:7},{s:3,f:5},{s:4,f:7},
            {s:4,f:5},{s:5,f:7},{s:5,f:5},{s:6,f:8},{s:6,f:5}
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
            {s:6,f:5},{s:6,f:8},{s:5,f:5}, {s:6,f:8},{s:5,f:5},{s:5,f:7},
            {s:5,f:5},{s:5,f:7},{s:4,f:5}, {s:5,f:7},{s:4,f:5},{s:4,f:7},
            {s:4,f:5},{s:4,f:7},{s:3,f:5}, {s:4,f:7},{s:3,f:5},{s:3,f:7},
            {s:3,f:5},{s:3,f:7},{s:2,f:5}, {s:3,f:7},{s:2,f:5},{s:2,f:8}
          ]}
        },
        {
          nom: "Toute la penta sur une corde",
          but: "Jeu horizontal : la même gamme le long du manche, pas juste en box.",
          tab: [
            "La mineur pentatonique sur la corde de mi aigu :",
            "e|-5-8-10-12-15-17-|  (la do ré mi sol la)",
            "Monte et redescends. Pareil sur la corde de si, puis de sol."
          ],
          tempoDepart: 60, unite: "bpm (croches)",
          palier: "Propre et juste sur 3 cordes différentes → niveau 4.",
          focus: "Les slides relient les notes. Repère le la (5 et 17), c'est ta maison.",
          audio: { bpm: 80, notes: [
            {s:1,f:5},{s:1,f:8},{s:1,f:10},{s:1,f:12},{s:1,f:15},{s:1,f:17},
            {s:1,f:15},{s:1,f:12},{s:1,f:10},{s:1,f:8},{s:1,f:5}
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
            {s:6,f:5,d:0.34},{s:6,f:8,d:0.33},{s:5,f:5,d:0.33},
            {s:5,f:7,d:0.34},{s:4,f:5,d:0.33},{s:4,f:7,d:0.33},
            {s:3,f:5,d:0.34},{s:3,f:7,d:0.33},{s:2,f:5,d:0.33},
            {s:2,f:8,d:0.34},{s:1,f:5,d:0.33},{s:1,f:8,d:0.33}
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
            "G|--9-------7b--   (9 = cible MI, bende la 7 pour l'atteindre)",
            "B|--10------8b--   (10 = cible, bende la 8)",
            "Vérifie à chaque fois : même hauteur exactement."
          ],
          tempoDepart: 60, unite: "bpm",
          palier: "10 bends justes d'affilée sur les deux cordes → niveau 2.",
          focus: "Pousse avec le poignet, pas juste le doigt. Plusieurs doigts derrière pour la force.",
          audio: { bpm: 60, notes: [
            {s:3,f:9,d:1},{r:true,d:0.4},{s:3,f:7,bend:9,d:1.6},{r:true,d:0.4},
            {s:2,f:10,d:1},{r:true,d:0.4},{s:2,f:8,bend:10,d:1.6}
          ]}
        },
        {
          nom: "Demi-ton, ton et demi, release",
          but: "Contrôler la hauteur du bend, et le redescendre en gardant la justesse (release).",
          tab: [
            "Demi-ton :   G|--7b(1/2)--  (monte d'une case)",
            "Ton et demi : G|--7b(1.5)--  (monte de 3 cases, dur !)",
            "Release : bende, puis redescends lentement pile sur la note de départ."
          ],
          tempoDepart: 55, unite: "bpm",
          palier: "Demi-ton, ton, ton et demi justes à l'oreille → niveau 3.",
          focus: "L'oreille commande, pas le doigt. Chante la note cible avant de bender.",
          audio: { bpm: 55, notes: [
            {s:3,f:7,bend:8,d:1.4},{r:true,d:0.4},{s:3,f:7,bend:9,d:1.4},{r:true,d:0.4},
            {s:3,f:7,bend:10,d:1.6}
          ]}
        },
        {
          nom: "Pré-bend & release",
          but: "Bender AVANT de jouer, puis relâcher : la note apparaît en descendant. Effet très blues.",
          tab: [
            "Pré-bende la case 7 (sans jouer) jusqu'à la hauteur de 9,",
            "PUIS joue, PUIS relâche lentement vers la vraie 7.",
            "G|--(7→9 pré-bendé) joue, release vers 7--"
          ],
          tempoDepart: 55, unite: "bpm",
          palier: "Le release sonne juste et régulier → niveau 4.",
          focus: "Tout est dans la descente contrôlée. Ne lâche pas d'un coup.",
          audio: { bpm: 55, notes: [
            {s:3,f:9,bend:7,d:2.4},{r:true,d:0.5},{s:2,f:10,bend:8,d:2.4}
          ]}
        },
        {
          nom: "Vibrato & vibrato sur bend",
          but: "Chantier n°3 : le vibrato, ce qui fait sonner pro une note tenue.",
          tab: [
            "Vibrato : tiens la case 7 (corde de sol) et fais de petits bends réguliers,",
            "1 aller-retour par clic à 60 bpm, comme un bend rythmé.",
            "Niveau ultime : bende d'un ton, PUIS ajoute le vibrato sur la note bendée."
          ],
          tempoDepart: 60, unite: "bpm (1 oscillation/clic)",
          palier: "Vibrato régulier et volontaire = tu as une vraie voix sur la guitare.",
          focus: "Régularité avant vitesse. C'est un vibrato de batteur : métronomique.",
          audio: { bpm: 60, notes: [
            {s:3,f:7,bend:9,d:3}
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
            "Joue la corde de la à vide en shuffle : LONG-court, LONG-court.",
            "A|-A..a-A..a-A..a-A..a-|   (le 'A' sur le temps, le 'a' juste avant le suivant)",
            "Palm mute léger, main droite qui balance."
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "Le bounce est naturel et scotché au clic → niveau 2.",
          focus: "Ne joue pas droit : c'est du ternaire. Tu connais ça mieux que personne.",
          audio: { bpm: 70, notes: [
            {s:5,f:0,d:0.67},{s:5,f:0,d:0.33},{s:5,f:0,d:0.67},{s:5,f:0,d:0.33},
            {s:5,f:0,d:0.67},{s:5,f:0,d:0.33},{s:5,f:0,d:0.67},{s:5,f:0,d:0.33}
          ]}
        },
        {
          nom: "Riff boogie (style ZZ Top)",
          but: "Le riff de shuffle classique : basse qui marche, root - 5te - 6te.",
          tab: [
            "Sur la corde de mi grave, root la (case 5) :",
            "E|-5-5-7-7-9-9-7-7-|  en shuffle (chaque paire = long-court)",
            "C'est LA mécanique du blues rock. Palm mute."
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "Riff propre et en place à 90 bpm → niveau 3.",
          focus: "La main droite garde le shuffle même quand la gauche bouge.",
          audio: { bpm: 75, notes: [
            {s:6,f:5,d:0.67},{s:6,f:5,d:0.33},{s:6,f:7,d:0.67},{s:6,f:7,d:0.33},
            {s:6,f:9,d:0.67},{s:6,f:9,d:0.33},{s:6,f:7,d:0.67},{s:6,f:7,d:0.33}
          ]}
        },
        {
          nom: "Grille 12 mesures (I-IV-V)",
          but: "Le boogie déplacé sur les 3 accords du blues en la : la, ré, mi. La vraie structure.",
          tab: [
            "Même riff boogie, transposé :",
            "I  (la) : root corde mi grave case 5",
            "IV (ré) : root corde la case 5",
            "V  (mi) : root corde la case 7",
            "Enchaîne la grille : A A A A / D D A A / E D A E"
          ],
          tempoDepart: 65, unite: "bpm (feel ternaire)",
          palier: "12 mesures enchaînées sans casser le shuffle = tu accompagnes un blues.",
          focus: "Anticipe le changement d'accord d'un temps. Reste dans le groove.",
          audio: { bpm: 75, notes: [
            {s:6,f:5,d:0.67},{s:6,f:5,d:0.33},{s:6,f:7,d:0.67},{s:6,f:7,d:0.33},
            {s:5,f:5,d:0.67},{s:5,f:5,d:0.33},{s:5,f:7,d:0.67},{s:5,f:7,d:0.33},
            {s:5,f:7,d:0.67},{s:5,f:7,d:0.33},{s:5,f:9,d:0.67},{s:5,f:9,d:0.33},
            {s:6,f:5,d:0.67},{s:6,f:5,d:0.33},{s:6,f:7,d:0.67},{s:6,f:7,d:0.33}
          ]}
        }
      ]
    },
    {
      id: "accords",
      titre: "Accords & changements",
      duree: "3-4 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Poser les accords",
          but: "Ton point faible, le premier mur vers le morceau. Poser Am, C, G net, sans friser.",
          tab: [
            "Am      C       G",
            "x02210  x32010  320003",
            "Pose, gratte lentement corde par corde, vérifie que tout sonne."
          ],
          tempoDepart: 60, unite: "à ton rythme",
          palier: "Les 3 accords sonnent nets → niveau 2.",
          focus: "Ongles courts, doigts arrondis sur la pointe, pour ne pas étouffer les cordes voisines.",
          audio: { bpm: 60, notes: [
            {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:2},
            {c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:2},
            {c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:2}
          ]}
        },
        {
          nom: "Changements à 2 accords",
          but: "Le vrai chantier : changer sans temps mort. Am vers G, puis C vers G.",
          tab: [
            "Am -> G -> Am -> G, une frappe par accord, au métronome.",
            "Le secret : les doigts quittent l'accord AVANT le temps, pas dessus."
          ],
          tempoDepart: 50, unite: "bpm (1 accord/temps)",
          palier: "Changement fluide à 70 bpm → niveau 3.",
          focus: "Repère les doigts communs entre 2 accords, ne les lève pas pour rien.",
          audio: { bpm: 60, notes: [
            {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:1},{c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:1},
            {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:1},{c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:1}
          ]}
        },
        {
          nom: "La grille du morceau",
          but: "Enchaîner les accords de I Need You Tonight : Am, G, D, C, E7. L'ordre exact est sur Songsterr.",
          tab: [
            "Am     G      D      C      E7",
            "x02210 320003 xx0232 x32010 020100",
            "Lis la suite des accords sur Songsterr, joue-la en place au clic."
          ],
          tempoDepart: 50, unite: "bpm",
          palier: "La grille tourne sans casser le tempo = tu accompagnes le morceau.",
          focus: "Le E7 (020100) est le plus facile, sers-t'en comme point d'ancrage.",
          audio: { bpm: 60, notes: [
            {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:1},{c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:1},
            {c:[[4,0],[3,2],[2,3],[1,2]],d:1},{c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:1},
            {c:[[6,0],[5,2],[4,0],[3,1],[2,0],[1,0]],d:2}
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
            {s:3,f:7,bend:9,d:1},{s:3,f:7,d:0.5},{s:3,f:5,d:0.5},{s:4,f:7,d:0.5},{s:4,f:5,d:1}
          ]}
        }
      ]
    }
  ],
  // Exos en plus, affichés seulement en séance 30 min ("Pour aller plus loin").
  bonus: [
    {
      id: "legato",
      titre: "Legato (hammer-on / pull-off)",
      duree: "3-4 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Marteau & tiré sur 2 notes",
          but: "Jouer sans repincer : la main gauche fait sonner la 2e note (hammer), puis la retire (pull-off).",
          tab: [
            "Hammer-on (h) puis pull-off (p) en penta position 1 :",
            "G|-5h7p5-5h7p5-|",
            "D|-5h7p5-5h7p5-|"
          ],
          tempoDepart: 60, unite: "bpm (croches)",
          palier: "Les deux notes sonnent fort et égales à 90 bpm → niveau 2.",
          focus: "La force vient du doigt qui frappe, pas du médiator. Économie de main droite.",
          audio: { bpm: 80, notes: [
            {s:3,f:5},{s:3,f:7},{s:3,f:5},{s:3,f:7},{s:4,f:5},{s:4,f:7},{s:4,f:5},{s:4,f:7}
          ]}
        },
        {
          nom: "Legato sur toute la box",
          but: "Enchaîner hammers et pull-offs sur la position 1 entière, un seul coup de médiator par corde.",
          tab: [
            "Monte en hammer, descends en pull-off, 1 attaque par corde :",
            "e|-5h8-|  B|-5h8-|  G|-5h7-| ... et retour en pull-off"
          ],
          tempoDepart: 55, unite: "bpm (croches)",
          palier: "Fluide et régulier à 85 bpm = ta main gauche gagne en autonomie.",
          focus: "C'est ce qui rend le jeu blues coulant. Pas de trou de son entre les notes.",
          audio: { bpm: 80, notes: [
            {s:6,f:5},{s:6,f:8},{s:5,f:5},{s:5,f:7},{s:4,f:5},{s:4,f:7},
            {s:3,f:5},{s:3,f:7},{s:2,f:5},{s:2,f:8},{s:1,f:5},{s:1,f:8}
          ]}
        }
      ]
    },
    {
      id: "oreille",
      titre: "Oreille (ton atout de musicien)",
      duree: "3-4 min",
      guitare: "Électro-acoustique",
      niveaux: [
        {
          nom: "Trouver la tonique",
          but: "Écouter le la (la maison du morceau), le chanter, puis le retrouver ailleurs sur le manche.",
          tab: [
            "Appuie sur Écouter : c'est un LA.",
            "1) Chante-le. 2) Trouve un autre la sur le manche (corde de la à vide,",
            "   case 5 mi grave, case 2 corde sol...). 3) Vérifie qu'ils sonnent pareil."
          ],
          tempoDepart: 60, unite: "à ton rythme",
          palier: "Tu retrouves le la sans chercher → niveau 2.",
          focus: "Batteur = grande oreille rythmique. On la transforme en oreille mélodique.",
          audio: { bpm: 50, notes: [
            {s:5,f:0,d:1.5},{r:true,d:1},{s:3,f:2,d:1.5}
          ]}
        },
        {
          nom: "Reconnaître tierce & quinte",
          but: "Les 3 notes qui font le son du blues : la tonique, la tierce mineure, la quinte.",
          tab: [
            "Écoute : LA (tonique) → DO (tierce mineure, le son 'triste') → MI (quinte, le son 'stable').",
            "Rejoue-les, puis essaie de les reconnaître les yeux fermés."
          ],
          tempoDepart: 60, unite: "à ton rythme",
          palier: "Tu distingues tierce et quinte à l'oreille = tu improviseras juste.",
          focus: "Chante chaque note avant de la jouer. L'oreille guide les doigts.",
          audio: { bpm: 55, notes: [
            {s:5,f:0,d:1},{s:5,f:3,d:1},{s:5,f:7,d:1.5}
          ]}
        }
      ]
    },
    {
      id: "impro",
      titre: "Impro blues (phrasé)",
      duree: "3-5 min",
      guitare: "Stratocaster",
      niveaux: [
        {
          nom: "Question / réponse",
          but: "Faire parler la guitare : une petite phrase (question), un silence, une phrase qui répond.",
          tab: [
            "Écoute la question (penta la mineur + bend), puis invente ta réponse dans le silence.",
            "3-4 notes bien placées suffisent. Le silence fait partie de la musique."
          ],
          tempoDepart: 65, unite: "bpm",
          palier: "Tes réponses tombent en place et sonnent bluesy → niveau 2.",
          focus: "Comme un dialogue de batterie : appel / réponse. Ton terrain.",
          audio: { bpm: 70, notes: [
            {s:3,f:7,bend:9,d:1},{s:3,f:5,d:0.5},{s:4,f:7,d:0.5},{r:true,d:2}
          ]}
        },
        {
          nom: "Un chorus libre",
          but: "12 mesures d'impro en penta la mineur, avec tes bends et ton vibrato, sur le métronome.",
          tab: [
            "Pose le métro, joue un tour complet en te baladant dans la penta.",
            "Vise le placement et le phrasé, pas la vitesse. Enregistre-toi si tu peux."
          ],
          tempoDepart: 60, unite: "bpm",
          palier: "Un chorus qui tient debout tout seul = tu es musicien, plus seulement exécutant.",
          focus: "Respire entre les phrases. Une note tenue avec vibrato vaut dix notes rapides.",
          audio: { bpm: 70, notes: [
            {s:2,f:8,bend:10,d:1},{s:2,f:5,d:0.5},{s:3,f:7,d:0.5},{s:3,f:5,d:1},
            {r:true,d:0.5},{s:1,f:5,d:0.5},{s:1,f:8,bend:10,d:1.5}
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
  tonalite: "La mineur · ~98 bpm · accordage standard",
  guitare: "Stratocaster",
  note: "Objectif : la version fidèle. L'appli est ton PLAN ; ta partition, c'est ton fichier Guitar Pro (I need you tonight.gpx) ou Songsterr. Je ne recopie pas la tablature. D'après ton fichier : tempo du disque ~98 bpm, accordage standard, arrangement à 4 guitares (la partie à suivre est Git 1). Les tabs ci-dessous sont des repères simplifiés de ma main pour démarrer chaque section ; les notes EXACTES (surtout le solo), tu les lis sur ta partition et tu les décomposes lentement.",
  etapes: [
    {
      id: 1,
      titre: "Le socle : la tonique la + le groove",
      tempo: "45-98 bpm",
      description: "Avant les notes, le placement. Joue juste la fondamentale la en noires, pile sur le clic, en boucle. Scotché au tempo, comme au drum. Tempo du disque : ~98 bpm.",
      tab: ["E|--5--5--5--5--|  (la = corde de mi grave, case 5)"],
      valideQuand: "12 mesures d'affilée parfaitement en place à 98 bpm, sans accélérer.",
      prereqs: ["echauffement", "shuffle"],
      niveaux: [{ nom: "Très lent", tempo: 45 }, { nom: "En place", tempo: 65 }, { nom: "À tempo", tempo: 98 }]
    },
    {
      id: 2,
      titre: "L'intro / le riff",
      tempo: "45-98 bpm",
      description: "La partie d'intro (Git 1). Notes exactes : ta partition Guitar Pro / Songsterr, à décomposer lentement. Ci-dessous, un repère simplifié en penta de la mineur (le 7b est ton bend money de la routine).",
      tab: [
        "e|-------------------------|",
        "G|--7b----7--5-------------|",
        "D|--------------7--5-------|"
      ],
      valideQuand: "La partie d'intro propre et en place, bend juste, calée sur Songsterr.",
      prereqs: ["pentatonique", "bends"],
      niveaux: [{ nom: "Découverte", tempo: 50 }, { nom: "Propre", tempo: 75 }, { nom: "À tempo", tempo: 98 }]
    },
    {
      id: 3,
      titre: "Les couplets : la grille d'accords",
      tempo: "50-98 bpm",
      description: "Les 3 couplets tournent sur les mêmes accords. Am, G, D, C, E7. Lis l'ordre exact et le rythme sur ta partition, joue-les sobrement, une frappe nette par temps.",
      tab: [
        "Am     G      D      C      E7",
        "x02210 320003 xx0232 x32010 020100"
      ],
      valideQuand: "Tu enchaînes la grille des couplets sans casser le tempo lent.",
      prereqs: ["accords", "echauffement"],
      niveaux: [{ nom: "Pose des accords", tempo: 55 }, { nom: "Enchaîné", tempo: 75 }, { nom: "À tempo", tempo: 98 }]
    },
    {
      id: 4,
      titre: "Le solo",
      tempo: "40-98 bpm",
      description: "La version fidèle : lis le solo mesure par mesure sur ta partition Guitar Pro (piste Git 1) et décompose-le très lentement, un bout à la fois. Repère ci-dessous : la penta de la mineur avec bends/vibrato, ton terrain pour l'apprivoiser avant de coller au disque.",
      tab: [
        "e|-------------------------------|",
        "B|--8b~~~----8--5----------------|",
        "G|-----------------7b~~~---------|"
      ],
      valideQuand: "Le solo (ou sa 1re phrase) en place, bends justes, calé sur Songsterr.",
      prereqs: ["pentatonique", "bends", "accords"],
      niveaux: [{ nom: "1re phrase, lent", tempo: 50 }, { nom: "Avec bends", tempo: 75 }, { nom: "À tempo", tempo: 98 }]
    },
    {
      id: 5,
      titre: "Le morceau complet",
      tempo: "jusqu'à ~98 bpm",
      description: "Enchaîner intro → 3 couplets → solo → fin, en lisant ta partition, en place, sur toute une boucle. C'est le 100%, la version fidèle au tempo du disque (~98 bpm).",
      tab: ["Enchaîne tout, une boucle entière sans t'arrêter, en suivant ta partition."],
      valideQuand: "Un tour complet convaincant et en place à ~98 bpm, fidèle à la partition.",
      prereqs: ["echauffement", "picking", "pentatonique", "bends", "shuffle", "accords", "morceau"],
      niveaux: [{ nom: "Au ralenti", tempo: 65 }, { nom: "Sans s'arrêter", tempo: 85 }, { nom: "Tempo disque", tempo: 98 }]
    }
  ]
};

// Bandes son des étapes du morceau (repères simplifiés en la mineur, synthétisés).
const AUDIO_ETAPE = {
  1: { bpm: 55, notes: [{s:6,f:5,d:1},{s:6,f:5,d:1},{s:6,f:5,d:1},{s:6,f:5,d:1}] },
  2: { bpm: 60, notes: [
    {s:3,f:7,bend:9,d:1},{s:3,f:7,d:0.5},{s:3,f:5,d:0.5},{s:4,f:7,d:0.5},{s:4,f:5,d:1}
  ]},
  3: { bpm: 60, notes: [
    {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:2}, {c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:2},
    {c:[[4,0],[3,2],[2,3],[1,2]],d:2}, {c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:2}
  ]},
  4: { bpm: 60, notes: [
    {s:2,f:8,bend:10,d:1},{s:2,f:8,d:0.5},{s:2,f:5,d:0.5},{s:3,f:7,bend:9,d:2}
  ]},
  5: { bpm: 60, notes: [
    {s:3,f:7,bend:9,d:1},{s:3,f:7,d:0.5},{s:3,f:5,d:0.5},{s:4,f:7,d:0.5},{s:4,f:5,d:0.5},
    {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:2}
  ]}
};

// ---------- Méthode complète (zéro → guitar hero) ----------
// Inspirée de la structure des méthodes de référence (JustinGuitar : progression par grades avec
// accords ouverts puis barrés puis blues ; Fender Play : niveaux mêlant technique et mise en pratique ;
// système CAGED et 5 positions de la pentatonique pour la partie gammes/solos).
// Parcours linéaire en 4 ceintures × 4 piliers (Rythmique, Accords, Gammes, Solos) = 16 modules.
// Débloqués un par un dans l'ordre, comme les étapes d'un morceau. Tonalité de référence : la mineur,
// cohérente avec le reste de l'appli (routine + morceau).
const CURSUS = {
  titre: "Méthode complète",
  soustitre: "Zéro à guitar hero : rythmique, accords, gammes, solos. Un seul parcours, dans l'ordre.",
  note: "Tu n'es pas débutant complet (tu as déjà les bases + la penta mineure) : les 4 premiers modules seront rapides pour toi, valide-les vite et avance. La valeur est plus loin, dans les ceintures orange et noire.",
  modules: [
    // Ceinture blanche — Les bases
    {
      id: "w1", ceinture: "Ceinture blanche · Les bases", categorie: "Rythmique",
      titre: "Tenue & première pulsation",
      but: "Tenir la guitare, poser la main droite, gratter un rythme simple et régulier.",
      tab: [
        "Cordes étouffées de la main gauche (mute), gratte en Bas-Bas-Bas-Bas au clic.",
        "Un aller de médiator = un clic. Régulier, pas d'à-coups."
      ],
      tempoDepart: 60, unite: "bpm (temps)",
      focus: "Le mouvement part du poignet, pas du coude. Regarde ton poignet, pas ta main gauche.",
      palier: "16 temps réguliers sans décrochage → passe au motif bas-haut (module suivant)."
    },
    {
      id: "w2", ceinture: "Ceinture blanche · Les bases", categorie: "Accords",
      titre: "Em et Am, tes deux premiers accords",
      but: "Poser proprement deux accords ouverts et basculer de l'un à l'autre.",
      tab: ["Em : 022000    Am : x02210", "Pose Em, gratte 4 temps, repose Am, gratte 4 temps. Recommence."],
      tempoDepart: 50, unite: "bpm (accords/4 temps)",
      focus: "Doigts bien cambrés, seul le bout du doigt touche la corde. Vérifie qu'aucune corde ne sonne étouffée.",
      palier: "10 changements Em↔Am sans temps mort → niveau suivant (C et G).",
      audio: { bpm: 70, notes: [
        {c:[[6,0],[5,2],[4,2],[3,0],[2,0],[1,0]],d:3}, {r:1,d:1},
        {c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:3}, {r:1,d:1}
      ]}
    },
    {
      id: "w3", ceinture: "Ceinture blanche · Les bases", categorie: "Gammes",
      titre: "Les notes de la corde de mi grave",
      but: "Mémoriser le nom des notes sur la corde la plus grave, la base de tout repérage sur le manche.",
      tab: ["E|-0--1--3--5--7--8--10--12-|", "Mi-Fa-Sol-La-Si-Do-Ré-Mi(octave). Dis le nom à voix haute en jouant."],
      tempoDepart: 50, unite: "bpm (une note/clic)",
      focus: "Repère surtout Mi (0), Fa (1), Sol (3), La (5), Mi octave (12) : les points de repère les plus utiles.",
      palier: "Tu nommes chaque note sans hésiter → fais pareil sur la corde de La (module suivant, en bonus mental).",
      audio: { bpm: 70, notes: [{s:6,f:0},{s:6,f:1},{s:6,f:3},{s:6,f:5},{s:6,f:7},{s:6,f:8},{s:6,f:10},{s:6,f:12}] }
    },
    {
      id: "w4", ceinture: "Ceinture blanche · Les bases", categorie: "Solos",
      titre: "Une mélodie sur une seule corde",
      but: "Contrôler le médiator et la main gauche sur une mélodie simple, une corde.",
      tab: [
        "e|-0-0-2-2-4-4-2-|-0-0-2-2-4-4-2-|-4-4-5-5-4-4-2-|-4-4-5-5-4-4-2-|",
        "(Frère Jacques simplifié, corde de mi aigu, cases 0/2/4/5)"
      ],
      tempoDepart: 70, unite: "bpm (croches)",
      focus: "Médiator qui alterne bas-haut même sur une seule corde. Un doigt par case.",
      palier: "La mélodie reconnaissable sans note ratée → tu es prêt pour la ceinture jaune.",
      audio: { bpm: 90, notes: [
        {s:1,f:0},{s:1,f:0},{s:1,f:2},{s:1,f:2},{s:1,f:4},{s:1,f:4},{s:1,f:2,d:1},
        {s:1,f:0},{s:1,f:0},{s:1,f:2},{s:1,f:2},{s:1,f:4},{s:1,f:4},{s:1,f:2,d:1}
      ]}
    },
    // Ceinture jaune — Grille d'accords et premier riff
    {
      id: "y1", ceinture: "Ceinture jaune · Rythmique & accords", categorie: "Rythmique",
      titre: "Motif D DU UDU",
      but: "Le motif de strumming le plus utilisé en rock/pop : Bas . Bas-Haut . . Haut-Bas-Haut.",
      tab: ["Compte : 1  +  2  +  3  +  4  +", "Gratte :  D  .  D  U  .  .  U  D  U", "Sur un accord tenu (Em), en boucle."],
      tempoDepart: 65, unite: "bpm",
      focus: "Les coups Haut (U) frôlent juste les 3 cordes aiguës, pas toutes les cordes.",
      palier: "Motif fluide sans à-coups pendant 8 mesures → niveau suivant (changer d'accord dedans)."
    },
    {
      id: "y2", ceinture: "Ceinture jaune · Rythmique & accords", categorie: "Accords",
      titre: "C, G, D, A, E : le kit complet",
      but: "Les 5 accords ouverts qui débloquent 80% des chansons rock/pop.",
      tab: ["C:x32010  G:320003  D:xx0232  A:x02220  E:022100", "Enchaîne C→G→D→A→E→C en boucle, un accord par mesure."],
      tempoDepart: 50, unite: "bpm (accords/mesure)",
      focus: "Prépare tes doigts en l'air pendant le dernier temps de l'accord précédent, ne pose pas un doigt à la fois.",
      palier: "Boucle complète sans blanc → niveau suivant (2 accords par mesure).",
      audio: { bpm: 80, notes: [
        {c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:2}, {c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:2},
        {c:[[4,0],[3,2],[2,3],[1,2]],d:2}, {c:[[5,0],[4,2],[3,2],[2,2],[1,0]],d:2},
        {c:[[6,0],[5,2],[4,2],[3,1],[2,0],[1,0]],d:2}
      ]}
    },
    {
      id: "y3", ceinture: "Ceinture jaune · Rythmique & accords", categorie: "Gammes",
      titre: "Pentatonique mineure, position 1",
      but: "La gamme la plus utile du rock/blues, en la mineur, position 5e case (celle que tu connais déjà).",
      tab: [
        "e|-----------------5-8-|", "B|--------------5-8----|", "G|-----------5-7-------|",
        "D|--------5-7-----------|", "A|----5-7-----------------|", "E|5-8-----------------------|"
      ],
      tempoDepart: 70, unite: "bpm (croches)",
      focus: "Monte puis redescends, chaque note égale en volume. Tu la connais déjà : valide vite si c'est acquis.",
      palier: "Montée-descente propre à 100 bpm sans accroc.",
      audio: { bpm: 90, notes: [
        {s:6,f:5},{s:6,f:8},{s:5,f:5},{s:5,f:7},{s:4,f:5},{s:4,f:7},{s:3,f:5},{s:3,f:7},
        {s:2,f:5},{s:2,f:8},{s:1,f:5},{s:1,f:8,d:1}
      ]}
    },
    {
      id: "y4", ceinture: "Ceinture jaune · Rythmique & accords", categorie: "Solos",
      titre: "Ton premier riff penta",
      but: "Un motif call & response sur 2 cordes, en la mineur pentatonique.",
      tab: ["E|-5-------5-7-5-------|", "A|----5-7---------7-5-|", "(La mineur pentatonique, position 5)"],
      tempoDepart: 70, unite: "bpm",
      focus: "Laisse sonner chaque note, coupe les bruits parasites des cordes voisines avec les doigts qui ne jouent pas.",
      palier: "Le riff propre en boucle à 100 bpm → tu es prêt pour la ceinture orange.",
      audio: { bpm: 90, notes: [
        {s:6,f:5},{s:5,f:5},{s:5,f:7},{s:6,f:5},{s:6,f:7},{s:6,f:5,d:1},
        {s:5,f:7},{s:5,f:5,d:1}
      ]}
    },
    // Ceinture orange — Blues, barrés, phrasé
    {
      id: "o1", ceinture: "Ceinture orange · Blues & barrés", categorie: "Rythmique",
      titre: "Palm mute & feel shuffle",
      but: "Le groove ternaire du blues/rock (ZZ Top et compagnie), avec la paume qui étouffe.",
      tab: ["Étouffe les cordes avec le tranchant de la paume, joue en croches ternaires sur mi grave.", "E|--5-5-.5-5-.5-5-.5-5-.-|  (feel : ta-ta-TA, ta-ta-TA)"],
      tempoDepart: 70, unite: "bpm",
      focus: "Ton point fort de batteur : le FEEL avant la vitesse. Compte le triolet à voix haute.",
      palier: "Le shuffle groove, pas mécanique → tu es prêt pour les riffs type ZZ Top."
    },
    {
      id: "o2", ceinture: "Ceinture orange · Blues & barrés", categorie: "Accords",
      titre: "Power chords + le barré F",
      but: "Les power chords mobiles (2 doigts) et ton premier vrai accord barré.",
      tab: [
        "Power chord (5) : racine + quinte, 2 doigts, mobile sur tout le manche.",
        "E|-3-3-3-3-5-5-5-5-|  A|-3-3-3-3-5-5-5-5-|  (Sol5 puis La5, même forme qui monte)",
        "Puis le barré F : index à plat case 1, forme de Mi majeur décalée."
      ],
      tempoDepart: 60, unite: "bpm (accords/mesure)",
      focus: "Barré : le tranchant de l'index, pas le plat. Pousse avec le pouce derrière le manche, pas avec la force du poignet.",
      palier: "Power chords propres partout sur le manche + F qui sonne sans bourdon → barrés mobiles (ceinture noire)."
    },
    {
      id: "o3", ceinture: "Ceinture orange · Blues & barrés", categorie: "Gammes",
      titre: "Pentatonique position 2 + le pont 1↔2",
      but: "La deuxième case de la pentatonique et le lien fluide avec la première.",
      tab: [
        "Position 2 (case 8, la mineur) :",
        "e|-----------------8-10-|", "B|-------------8-10-----|", "G|---------7-9----------|",
        "D|-----7-9-----------------|", "A|-7-8-----------------------|", "E|-8-------------------------|",
        "Relie-la à la position 1 (case 5) par la note commune case 8 corde de mi grave."
      ],
      tempoDepart: 70, unite: "bpm (croches)",
      focus: "Le glissement d'une position à l'autre doit être fluide, pas un saut hésitant.",
      palier: "Tu enchaînes position 1 → 2 → 1 sans réfléchir à 100 bpm.",
      audio: { bpm: 90, notes: [
        {s:6,f:8},{s:5,f:7},{s:5,f:8},{s:4,f:7},{s:4,f:9},{s:3,f:7},{s:3,f:9},
        {s:2,f:8},{s:2,f:10},{s:1,f:8},{s:1,f:10,d:1}
      ]}
    },
    {
      id: "o4", ceinture: "Ceinture orange · Blues & barrés", categorie: "Solos",
      titre: "Bends, hammer/pull, ta première vraie phrase",
      but: "Combiner bend, vibrato et legato dans une phrase bluesy complète.",
      tab: ["G|--7b~~~----7h9p7----5--|  (bend d'un ton, vibrato, hammer/pull)", "Phrase en la mineur pentatonique, position 5."],
      tempoDepart: 55, unite: "bpm",
      focus: "Le bend tombe EXACTEMENT sur la note cible : vérifie à l'oreille avant de chercher la vitesse.",
      palier: "La phrase avec bend juste et vibrato contrôlé à 90 bpm.",
      audio: { bpm: 60, notes: [{s:3,f:7,bend:9,d:1.5},{s:3,f:7,d:0.5},{s:3,f:9,d:0.5},{s:3,f:7,d:0.5},{s:4,f:5,d:1.5}] }
    },
    // Ceinture noire — Guitar Hero
    {
      id: "n1", ceinture: "Ceinture noire · Guitar Hero", categorie: "Rythmique",
      titre: "Syncopes & polyrythmie",
      but: "Jouer en décalé du temps fort, exploiter ton oreille de batteur.",
      tab: ["Accentue le contre-temps (le \"and\" après chaque temps), coupe net avec la paume.", "Pattern :  .  X  .  X  X  .  X  .   (X = coup accentué, . = étouffé/silence)"],
      tempoDepart: 80, unite: "bpm",
      focus: "C'est ton terrain : sens où tombe la syncope sans la compter, comme derrière un kit.",
      palier: "Le groove syncopé tient tout seul, même sans regarder le métronome."
    },
    {
      id: "n2", ceinture: "Ceinture noire · Guitar Hero", categorie: "Accords",
      titre: "CAGED : un accord, 5 formes",
      but: "Comprendre le système CAGED : le même accord existe à 5 endroits du manche.",
      tab: ["Do majeur en forme C (ouverte), puis en forme A, G, E, D plus haut sur le manche.", "Même accord, 5 endroits différents : c'est le système CAGED."],
      tempoDepart: 60, unite: "bpm (accords/mesure)",
      focus: "Reconnais la forme \"sous tes doigts\" avant de la jouer, ne cherche pas les cases au hasard.",
      palier: "Tu retrouves Do majeur aux 5 endroits du manche sans hésiter."
    },
    {
      id: "n3", ceinture: "Ceinture noire · Guitar Hero", categorie: "Gammes",
      titre: "Les 5 positions reliées + la couleur majeure",
      but: "Le manche entier devient un seul terrain de jeu : les 5 positions de la penta enchaînées.",
      tab: [
        "Enchaîne les 5 positions de la pentatonique mineure sur tout le manche, sans redescendre.",
        "Puis ajoute les 2 notes de la gamme majeure relative pour un son plus \"rock\" (couleur mixolydienne)."
      ],
      tempoDepart: 70, unite: "bpm (croches)",
      focus: "Le manche entier devient un seul terrain de jeu, pas 5 cases isolées.",
      palier: "Tu montes du case 0 au case 15 en pentatonique sans t'arrêter, aller-retour."
    },
    {
      id: "n4", ceinture: "Ceinture noire · Guitar Hero", categorie: "Solos",
      titre: "Improvisation libre sur grille 12 mesures",
      but: "Le boss final : improviser une vraie phrase musicale sur une grille de blues.",
      tab: ["Grille blues en la : Am(4) Dm(2) Am(2) E7(1) Dm(1) Am(2)", "Improvise avec la pentatonique + bends + vibrato + ton groove de batteur."],
      tempoDepart: 70, unite: "bpm",
      focus: "Pense en phrases courtes avec des silences, pas un flot continu de notes. Réponds à ce que tu viens de jouer.",
      palier: "3 chorus de 12 mesures qui tiennent debout, avec au moins une phrase que tu es fier de rejouer. Bienvenue chez les guitar heroes."
    }
  ]
};
