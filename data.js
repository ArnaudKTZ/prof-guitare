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
  soustitre: "Zéro à guitar hero, façon vraie méthode : 10 niveaux, 4 piliers (rythmique/accords/gammes/solos), 3 paliers par module. De quoi tenir plusieurs années, dans l'ordre.",
  note: "Tu n'es pas débutant complet : le niveau 1 sera rapide pour toi, valide-le vite. La vraie substance commence au niveau 3 (blues/barrés) et monte jusqu'au niveau 10.",
  modules: [
    // Niveau 1 — Zéro absolu
    {
      id: "n1r", ceinture: "Niveau 1 · Zéro absolu", categorie: "Rythmique", titre: "Tenue & pulsation",
      but: "Tenir l'instrument, poser la main droite, sentir un tempo stable avant toute note.",
      niveaux: [
        { nom: "Cordes étouffées, coups vers le bas", but: "Mute toutes les cordes de la main gauche, gratte Bas-Bas-Bas-Bas au clic.", tab: ["Un aller de médiator = un clic, régulier."], tempoDepart: 60, unite: "bpm", focus: "Le mouvement part du poignet, pas du coude.", palier: "16 temps sans décrochage." },
        { nom: "Ajout du coup vers le haut", but: "Motif Bas-Haut en continu, toujours étouffé.", tab: ["Bas-Haut-Bas-Haut, croches régulières."], tempoDepart: 65, unite: "bpm", focus: "Le haut-coup doit être aussi net que le bas-coup.", palier: "Motif fluide 16 mesures sans ralentir." },
        { nom: "Premier accord tenu", but: "Pose Em et gratte Bas-Haut dessus, sans étouffer exprès.", tab: ["Em : 022000, gratte Bas-Haut en boucle."], tempoDepart: 65, unite: "bpm", focus: "L'accord doit sonner clair sur chaque coup, pas juste le premier.", palier: "8 mesures propres → niveau suivant." }
      ]
    },
    {
      id: "n1a", ceinture: "Niveau 1 · Zéro absolu", categorie: "Accords", titre: "Em, Am : tes deux premiers accords",
      but: "Poser deux accords ouverts proprement et basculer de l'un à l'autre.",
      niveaux: [
        { nom: "Em seul", but: "Pose Em, vérifie que les 6 cordes sonnent.", tab: ["Em : 022000"], tempoDepart: 50, unite: "bpm (accords/4 temps)", focus: "Doigts cambrés, bout des doigts seulement.", palier: "Em sonne clair à chaque fois, sans buzz." },
        { nom: "Am seul", but: "Pose Am, vérifie que la corde de mi grave n'est pas jouée.", tab: ["Am : x02210"], tempoDepart: 50, unite: "bpm", focus: "Le pouce reste derrière le manche, pas au-dessus.", palier: "Am sonne clair à chaque fois." },
        { nom: "Em ↔ Am", but: "Alterne les deux accords, 4 temps chacun.", tab: ["Em (4 temps) → Am (4 temps) → répète."], tempoDepart: 50, unite: "bpm", focus: "Anticipe le changement pendant le dernier temps de l'accord précédent.", palier: "10 changements sans temps mort.",
          audio: { bpm: 70, notes: [{c:[[6,0],[5,2],[4,2],[3,0],[2,0],[1,0]],d:3},{r:1,d:1},{c:[[5,0],[4,2],[3,2],[2,1],[1,0]],d:3},{r:1,d:1}] } }
      ]
    },
    {
      id: "n1g", ceinture: "Niveau 1 · Zéro absolu", categorie: "Gammes", titre: "Repérage du manche",
      but: "Mémoriser le nom des notes sur les 2 cordes graves, la base de tout repérage.",
      niveaux: [
        { nom: "Corde de mi grave", but: "Nomme chaque note en la jouant.", tab: ["E|-0--1--3--5--7--8--10--12-|", "Mi-Fa-Sol-La-Si-Do-Ré-Mi(8ve)"], tempoDepart: 50, unite: "bpm", focus: "Repère surtout 0, 5 et 12 : les ancres.", palier: "Tu nommes sans hésiter.",
          audio: { bpm: 70, notes: [{s:6,f:0},{s:6,f:1},{s:6,f:3},{s:6,f:5},{s:6,f:7},{s:6,f:8},{s:6,f:10},{s:6,f:12}] } },
        { nom: "Corde de la", but: "Même exercice sur la 2e corde grave.", tab: ["A|-0--2--3--5--7--9--10--12-|", "La-Si-Do-Ré-Mi-Fa#-Sol-La(8ve)"], tempoDepart: 50, unite: "bpm", focus: "La case 5 de la corde de mi grave = la case 0 de la corde de la (même note).", palier: "Tu relies les deux cordes de tête." },
        { nom: "Les octaves", but: "Trouve la même note sur 2 cordes différentes (forme d'octave).", tab: ["Corde 6 case X = corde 4 case X+2 (saute une corde).", "Exemple : Mi grave (6/0) = Mi (4/2)."], tempoDepart: 50, unite: "bpm", focus: "C'est la forme d'octave la plus utilisée en rock.", palier: "5 octaves différentes sans compter sur tes doigts." }
      ]
    },
    {
      id: "n1s", ceinture: "Niveau 1 · Zéro absolu", categorie: "Solos", titre: "Premières mélodies",
      but: "Contrôler le médiator et la main gauche sur des mélodies simples, une corde.",
      niveaux: [
        { nom: "Une note, un clic", but: "Joue 4 notes différentes sur la corde aiguë, une par clic.", tab: ["e|-0-2-4-5-|"], tempoDepart: 60, unite: "bpm", focus: "Médiator qui alterne bas-haut même sur une seule corde.", palier: "Propre et régulier 8 fois de suite." },
        { nom: "Frère Jacques simplifié", but: "Ta première vraie mélodie reconnaissable.", tab: ["e|-0-0-2-2-4-4-2-|-0-0-2-2-4-4-2-|-4-4-5-5-4-4-2-|-4-4-5-5-4-4-2-|"], tempoDepart: 70, unite: "bpm (croches)", focus: "Un doigt par case (1=case2, 2=case4).", palier: "La mélodie sans note ratée.",
          audio: { bpm: 90, notes: [{s:1,f:0},{s:1,f:0},{s:1,f:2},{s:1,f:2},{s:1,f:4},{s:1,f:4},{s:1,f:2,d:1},{s:1,f:0},{s:1,f:0},{s:1,f:2},{s:1,f:2},{s:1,f:4},{s:1,f:4},{s:1,f:2,d:1}] } },
        { nom: "Deux cordes", but: "Étends la mélodie sur la corde de si, change de corde sans casser le tempo.", tab: ["B|-----1-3-|", "e|-0-2-----|"], tempoDepart: 70, unite: "bpm", focus: "Le passage d'une corde à l'autre doit être fluide, anticipe avec l'œil.", palier: "Aucune corde parasite qui sonne." }
      ]
    },
    // Niveau 2 — Bases solides
    {
      id: "n2r", ceinture: "Niveau 2 · Bases solides", categorie: "Rythmique", titre: "Strumming patterns",
      but: "Les motifs de gratte qui débloquent 80% des chansons rock/pop.",
      niveaux: [
        { nom: "D DU UDU", but: "Le motif le plus utilisé en rock/pop.", tab: ["Compte: 1 + 2 + 3 + 4 +", "Gratte: D . D U . . U D U"], tempoDepart: 65, unite: "bpm", focus: "Les coups Haut frôlent juste les 3 cordes aiguës.", palier: "8 mesures fluides sans à-coup." },
        { nom: "Changer d'accord dans le motif", but: "Garde le motif D DU UDU en changeant d'accord à chaque mesure.", tab: ["Em → Am → Em → Am, motif D DU UDU sur chacun."], tempoDepart: 65, unite: "bpm", focus: "Le changement d'accord se fait pendant le dernier 'U', pas après.", palier: "4 accords enchaînés sans blanc." },
        { nom: "Coups étouffés (chuck)", but: "Ajoute un coup étouffé (main qui coupe les cordes) dans le motif.", tab: ["D . D X . . U D U   (X = coup étouffé, percussif)"], tempoDepart: 70, unite: "bpm", focus: "Le X est un vrai coup, pas un silence.", palier: "Le motif groove avec le X marqué." }
      ]
    },
    {
      id: "n2a", ceinture: "Niveau 2 · Bases solides", categorie: "Accords", titre: "Enchaînements rapides & mineurs",
      but: "Élargir le vocabulaire d'accords et gagner en vitesse de changement.",
      niveaux: [
        { nom: "C et G", but: "Deux accords majeurs classiques, en boucle.", tab: ["C:x32010  G:320003"], tempoDepart: 50, unite: "bpm", focus: "Prépare les doigts en l'air avant de les poser tous ensemble.", palier: "10 changements C↔G propres." },
        { nom: "D, A, E", but: "Trois accords de plus, la boîte à outils s'agrandit.", tab: ["D:xx0232  A:x02220  E:022100"], tempoDepart: 50, unite: "bpm", focus: "E et A partagent une forme proche : repère la ressemblance.", palier: "Les 5 accords (C G D A E) sonnent tous propres." },
        { nom: "Boucle des 5 en rythme", but: "Enchaîne C→G→D→A→E→C avec le motif D DU UDU.", tab: ["Un accord par mesure, motif complet dessus."], tempoDepart: 60, unite: "bpm", focus: "Ne ralentis pas sur les changements difficiles (E→C).", palier: "Boucle complète à tempo sans blanc.",
          audio: { bpm: 80, notes: [{c:[[5,3],[4,2],[3,0],[2,1],[1,0]],d:2},{c:[[6,3],[5,2],[4,0],[3,0],[2,0],[1,3]],d:2},{c:[[4,0],[3,2],[2,3],[1,2]],d:2},{c:[[5,0],[4,2],[3,2],[2,2],[1,0]],d:2},{c:[[6,0],[5,2],[4,2],[3,1],[2,0],[1,0]],d:2}] } }
      ]
    },
    {
      id: "n2g", ceinture: "Niveau 2 · Bases solides", categorie: "Gammes", titre: "Pentatonique mineure, position 1",
      but: "La gamme la plus utile du rock/blues (déjà connue, à consolider).",
      niveaux: [
        { nom: "Montée simple", but: "Joue la gamme en montant, une note à la fois.", tab: ["e|-----------------5-8-|", "B|--------------5-8----|", "G|-----------5-7-------|", "D|--------5-7-----------|", "A|----5-7-----------------|", "E|5-8-----------------------|"], tempoDepart: 70, unite: "bpm (croches)", focus: "Chaque note égale en volume, pas d'accent involontaire.", palier: "Montée propre à 90 bpm.",
          audio: { bpm: 90, notes: [{s:6,f:5},{s:6,f:8},{s:5,f:5},{s:5,f:7},{s:4,f:5},{s:4,f:7},{s:3,f:5},{s:3,f:7},{s:2,f:5},{s:2,f:8},{s:1,f:5},{s:1,f:8,d:1}] } },
        { nom: "Aller-retour rythmé", but: "Monte puis redescends sans t'arrêter en haut.", tab: ["Même gamme, montée + descente enchaînées."], tempoDepart: 80, unite: "bpm (croches)", focus: "Le point de retournement (case 8) ne doit pas casser le tempo.", palier: "Aller-retour à 100 bpm sans accroc." },
        { nom: "Avec bends légers", but: "Ajoute un bend d'un ton sur la note la plus aiguë de chaque corde.", tab: ["Bend sur les notes case 7 (selon la corde)."], tempoDepart: 70, unite: "bpm", focus: "Le bend tombe juste avant de redescendre.", palier: "La gamme avec bends sonne juste, pas approximative." }
      ]
    },
    {
      id: "n2s", ceinture: "Niveau 2 · Bases solides", categorie: "Solos", titre: "Riffs simples 2 cordes",
      but: "Passer de la gamme isolée au vrai riff musical.",
      niveaux: [
        { nom: "Riff call & response", but: "Motif question-réponse sur 2 cordes.", tab: ["E|-5-------5-7-5-------|", "A|----5-7---------7-5-|"], tempoDepart: 70, unite: "bpm", focus: "Laisse sonner chaque note, coupe les parasites avec les doigts inactifs.", palier: "Riff propre à 100 bpm.",
          audio: { bpm: 90, notes: [{s:6,f:5},{s:5,f:5},{s:5,f:7},{s:6,f:5},{s:6,f:7},{s:6,f:5,d:1},{s:5,f:7},{s:5,f:5,d:1}] } },
        { nom: "Riff avec hammer-on", but: "Ajoute un hammer-on (frappé sans médiator) dans le riff.", tab: ["E|-5h7-------5h7-5-------|"], tempoDepart: 65, unite: "bpm", focus: "Le doigt frappe fort et net, la note doit sonner aussi fort qu'au médiator.", palier: "Le hammer sonne aussi fort que les notes piquées." },
        { nom: "Ton propre riff", but: "Improvise 4 mesures avec les notes de la position 1.", tab: ["Libre, position 5, reste dans la gamme."], tempoDepart: 70, unite: "bpm", focus: "Répète une idée avant d'en changer, comme une phrase de batterie.", palier: "4 mesures que tu peux rejouer pareil deux fois." }
      ]
    },
    // Niveau 3 — Premier blues/rock
    {
      id: "n3r", ceinture: "Niveau 3 · Premier blues/rock", categorie: "Rythmique", titre: "Shuffle & palm mute",
      but: "Le groove ternaire du blues/rock, la signature ZZ Top.",
      niveaux: [
        { nom: "Shuffle lent, corde à vide", but: "Feel ternaire (ta-ta-TA) sur la corde de mi grave.", tab: ["E|--5-5-.5-5-.5-5-.5-5-.-|  (feel ternaire)"], tempoDepart: 60, unite: "bpm", focus: "Compte le triolet à voix haute avant de jouer.", palier: "Le shuffle groove sans être mécanique." },
        { nom: "Palm mute rock", but: "Étouffe avec le tranchant de la paume, joue des croches droites.", tab: ["E|--5-5-5-5-5-5-5-5-|  (paume posée en permanence)"], tempoDepart: 70, unite: "bpm", focus: "La paume reste posée même quand tu changes de corde.", palier: "Son sourd et régulier." },
        { nom: "Shuffle + palm mute combinés", but: "Le riff type boogie/blues rock, ternaire ET étouffé.", tab: ["E|--5-5-.5-5-.7-7-.7-7-.-|  (ternaire + palm mute)"], tempoDepart: 75, unite: "bpm", focus: "Ton point fort de batteur : le feel avant la vitesse.", palier: "Le riff groove, prêt pour un vrai morceau ZZ Top." }
      ]
    },
    {
      id: "n3a", ceinture: "Niveau 3 · Premier blues/rock", categorie: "Accords", titre: "Power chords mobiles",
      but: "L'accord à 2 doigts qui domine tout le rock.",
      niveaux: [
        { nom: "La forme de base", but: "Racine + quinte sur 2 cordes, apprends la forme.", tab: ["E|-3-|  A|-3-|  (Sol5, 2 doigts : index+annulaire)"], tempoDepart: 50, unite: "bpm", focus: "Les deux notes doivent sonner exactement en même temps.", palier: "Le power chord sonne net, sans buzz." },
        { nom: "Déplacer la forme", but: "La même forme partout sur le manche, sans réfléchir aux notes.", tab: ["E|-3-3-3-3-5-5-5-5-|  A|-3-3-3-3-5-5-5-5-|"], tempoDepart: 60, unite: "bpm", focus: "Le poignet guide le déplacement, pas les doigts qui se réorganisent.", palier: "5 déplacements rapides et propres." },
        { nom: "Palm mute + power chords", but: "Combine étouffement et power chords, le son rock par excellence.", tab: ["Riff type rock : E5-E5-G5-A5, tout étouffé à la paume."], tempoDepart: 70, unite: "bpm", focus: "Garde le palm mute même en bougeant vite sur le manche.", palier: "Le riff sonne serré et propre à 90 bpm." }
      ]
    },
    {
      id: "n3g", ceinture: "Niveau 3 · Premier blues/rock", categorie: "Gammes", titre: "Pentatonique, position 2",
      but: "La deuxième case de la gamme et son lien avec la première.",
      niveaux: [
        { nom: "Position 2 seule", but: "Apprends la 2e position (case 8), en la mineur.", tab: ["e|-----------------8-10-|", "B|-------------8-10-----|", "G|---------7-9----------|", "D|-----7-9-----------------|", "A|-7-8-----------------------|", "E|-8-------------------------|"], tempoDepart: 70, unite: "bpm (croches)", focus: "C'est une forme nouvelle, ne la mélange pas encore avec la position 1.", palier: "Montée-descente propre en position 2.",
          audio: { bpm: 90, notes: [{s:6,f:8},{s:5,f:7},{s:5,f:8},{s:4,f:7},{s:4,f:9},{s:3,f:7},{s:3,f:9},{s:2,f:8},{s:2,f:10},{s:1,f:8},{s:1,f:10,d:1}] } },
        { nom: "Le pont position 1 ↔ 2", but: "Relie les deux positions par la note commune (case 8, corde de mi grave).", tab: ["Monte en position 1 jusqu'à case 8, puis continue en position 2."], tempoDepart: 70, unite: "bpm", focus: "Le glissement doit être fluide, pas un saut hésitant.", palier: "Tu enchaînes 1→2→1 sans réfléchir à 100 bpm." },
        { nom: "Improviser sur 4 mesures", but: "Utilise les deux positions librement sur une grille simple (Am).", tab: ["Grille : Am x4 mesures, improvise avec pos 1 et 2."], tempoDepart: 70, unite: "bpm", focus: "Reste dans le rythme, pense phrases courtes.", palier: "4 mesures d'improvisation qui restent musicales." }
      ]
    },
    {
      id: "n3s", ceinture: "Niveau 3 · Premier blues/rock", categorie: "Solos", titre: "Bends & vibrato",
      but: "Les deux techniques qui donnent le son 'expressif' de la guitare électrique.",
      niveaux: [
        { nom: "Bend d'un ton", but: "Pousse la corde pour atteindre exactement la note du dessus.", tab: ["G|--7b(9)--|  (case 7 poussée jusqu'à sonner comme la case 9)"], tempoDepart: 55, unite: "bpm", focus: "Vérifie à l'oreille avant de chercher la vitesse.", palier: "Le bend tombe pile juste, à chaque fois." },
        { nom: "Vibrato contrôlé", but: "Fais osciller la note tenue, ni trop vite ni trop lent.", tab: ["G|--7~~~~--|  (vibrato sur la note tenue)"], tempoDepart: 55, unite: "bpm", focus: "Le vibrato part du poignet, pas juste des doigts.", palier: "Vibrato régulier qui ne dérape pas de hauteur." },
        { nom: "Bend + vibrato enchaînés", but: "Combine les deux dans une phrase courte, la base du solo blues.", tab: ["G|--7b(9)~~~----5--|"], tempoDepart: 55, unite: "bpm", focus: "Le vibrato arrive juste après le bend, sans blanc.", palier: "La phrase sonne expressive, pas juste techniquement correcte." }
      ]
    },
    // Niveau 4 — Barrés & indépendance
    {
      id: "n4r", ceinture: "Niveau 4 · Barrés & indépendance", categorie: "Rythmique", titre: "Muting avancé & accents",
      but: "Contrôler le silence autant que le son.",
      niveaux: [
        { nom: "Contre-temps marqués", but: "Accentue le 'et' après chaque temps.", tab: ["Pattern : . X . X X . X .  (X=accentué)"], tempoDepart: 70, unite: "bpm", focus: "Sens où tombe le contre-temps sans le compter, comme derrière un kit.", palier: "Le groove tient sans regarder le métronome." },
        { nom: "Ghost notes", but: "Ajoute des coups très étouffés (presque inaudibles) entre les accents.", tab: ["Les ghost notes remplissent l'espace sans se faire remarquer."], tempoDepart: 75, unite: "bpm", focus: "Le contraste entre ghost note et coup accentué doit être net.", palier: "Le rythme sonne plein, pas mécanique." },
        { nom: "Groove funky simple", but: "Combine accents et ghost notes dans un motif funk basique.", tab: ["16e croches, accents sur 1 et le 'a' du 2."], tempoDepart: 80, unite: "bpm", focus: "La régularité du poignet permet le groove, pas la vitesse brute.", palier: "Le groove funky tient 8 mesures sans se déliter." }
      ]
    },
    {
      id: "n4a", ceinture: "Niveau 4 · Barrés & indépendance", categorie: "Accords", titre: "Barré F & B",
      but: "Le premier vrai accord barré, la porte vers tout le manche.",
      niveaux: [
        { nom: "Forme Mi barrée (F)", but: "Index à plat case 1, forme de Mi majeur décalée.", tab: ["F : index barré case 1, forme de E majeur."], tempoDepart: 50, unite: "bpm", focus: "Le tranchant de l'index, pas le plat. Pousse avec le pouce derrière le manche.", palier: "F sonne sans bourdon." },
        { nom: "Forme La barrée (B)", but: "Même logique, forme de La majeur décalée.", tab: ["B : barré case 2, forme de A majeur."], tempoDepart: 50, unite: "bpm", focus: "Cette forme est plus dure : les doigts 2-3-4 sont serrés sur 3 cordes.", palier: "B sonne clair, les 3 doigts serrés ne s'étouffent pas." },
        { nom: "Enchaîner les barrés", but: "Passe de F à B et retour, puis ajoute un accord ouvert.", tab: ["F → B → Em → F, un accord par mesure."], tempoDepart: 55, unite: "bpm", focus: "La main ne doit pas se crisper entre les changements.", palier: "L'enchaînement complet sans relâcher le barré trop tôt." }
      ]
    },
    {
      id: "n4g", ceinture: "Niveau 4 · Barrés & indépendance", categorie: "Gammes", titre: "Pentatonique, position 3",
      but: "Troisième pièce du puzzle, vers la maîtrise du manche entier.",
      niveaux: [
        { nom: "Position 3 seule", but: "Nouvelle forme, case 10-12 en la mineur.", tab: ["e|-------------------10-12-|", "B|------------------10-12-|", "G|--------------9-12-------|", "D|-----------10-12-----------|", "A|--------10-12-----------------|", "E|----10-12-----------------------|"], tempoDepart: 70, unite: "bpm", focus: "Compare mentalement avec les positions 1 et 2 déjà connues.", palier: "Montée-descente propre en position 3." },
        { nom: "Connexion 1-2-3", but: "Enchaîne les trois premières positions sans t'arrêter.", tab: ["Monte en position 1, glisse en 2, glisse en 3, redescends tout."], tempoDepart: 70, unite: "bpm", focus: "Chaque transition a un point de repère (note commune).", palier: "L'enchaînement complet aller-retour à 90 bpm." },
        { nom: "Improviser sur 3 positions", but: "Utilise librement les 3 positions sur une grille de 8 mesures.", tab: ["Grille : Am(4) Dm(4), improvise avec pos 1/2/3."], tempoDepart: 70, unite: "bpm", focus: "Ne reste pas bloqué dans une seule position par facilité.", palier: "8 mesures qui utilisent vraiment les 3 zones du manche." }
      ]
    },
    {
      id: "n4s", ceinture: "Niveau 4 · Barrés & indépendance", categorie: "Solos", titre: "Hammer/pull & legato",
      but: "Lier les notes entre elles sans les piquer toutes au médiator.",
      niveaux: [
        { nom: "Hammer-on seul", but: "Frappe la 2e note avec un doigt, sans la piquer.", tab: ["E|-5h7-5h7-5h7-5h7-|"], tempoDepart: 60, unite: "bpm", focus: "Le doigt frappe fort, perpendiculaire à la touche.", palier: "Le hammer sonne aussi fort que la note piquée." },
        { nom: "Pull-off seul", but: "Retire le doigt en tirant légèrement pour faire sonner la note du dessous.", tab: ["E|-7p5-7p5-7p5-7p5-|"], tempoDepart: 60, unite: "bpm", focus: "Le tirer est vers le bas (ou le haut selon la corde), pas juste soulever.", palier: "Le pull-off sonne aussi fort que le hammer." },
        { nom: "Combo legato rapide", but: "Enchaîne hammer et pull dans une phrase fluide.", tab: ["E|-5h7p5-5h7p5-|  en boucle, de plus en plus vite."], tempoDepart: 65, unite: "bpm", focus: "Le volume doit rester constant du début à la fin de la phrase.", palier: "La phrase reste audible et régulière même en accélérant." }
      ]
    },
    // Niveau 5 — Ouverture harmonique
    {
      id: "n5r", ceinture: "Niveau 5 · Ouverture harmonique", categorie: "Rythmique", titre: "Syncopes & feel",
      but: "Jouer en décalé du temps fort, la base du groove avancé.",
      niveaux: [
        { nom: "Anticipation d'un demi-temps", but: "Joue l'accord juste avant le temps fort au lieu de pile dessus.", tab: ["Au lieu de jouer sur '1', joue sur le '+' juste avant."], tempoDepart: 70, unite: "bpm", focus: "Ça doit rester musical, pas juste 'en retard' par erreur.", palier: "L'anticipation sonne intentionnelle." },
        { nom: "Break rythmique", but: "Coupe complètement le son pendant un temps, puis relance pile en place.", tab: ["3 mesures de motif, 1 temps de silence total, relance."], tempoDepart: 70, unite: "bpm", focus: "Le silence doit être total (mute les cordes).", palier: "Le break est net et la relance tombe exactement en place." },
        { nom: "Syncope + accord qui change", but: "Combine syncope et changement d'accord dans le même geste.", tab: ["Change d'accord juste avant le temps fort, en rythme syncopé."], tempoDepart: 75, unite: "bpm", focus: "La même anticipation, mais avec la main gauche en plus.", palier: "Le groove syncopé tient avec les changements d'accords." }
      ]
    },
    {
      id: "n5a", ceinture: "Niveau 5 · Ouverture harmonique", categorie: "Accords", titre: "CAGED, les 3 premières formes",
      but: "Comprendre que le même accord existe à plusieurs endroits du manche.",
      niveaux: [
        { nom: "Forme C", but: "Do majeur en position ouverte, la forme de référence.", tab: ["C : x32010"], tempoDepart: 55, unite: "bpm", focus: "Mémorise la FORME, pas juste les cases.", palier: "Tu reconnais la forme C les yeux fermés." },
        { nom: "Forme A", but: "Le même Do majeur, joué avec la forme d'un accord de La plus haut sur le manche.", tab: ["C (forme A) : barré case 3, forme de A majeur."], tempoDepart: 55, unite: "bpm", focus: "Compare au A ouvert que tu connais déjà.", palier: "Tu retrouves Do majeur en forme A sans chercher." },
        { nom: "Forme G", but: "Encore le même Do majeur, avec la forme d'un accord de Sol.", tab: ["C (forme G) : plus haut sur le manche, forme de G majeur décalée."], tempoDepart: 55, unite: "bpm", focus: "3 endroits, 1 seul accord : le manche comme une boucle.", palier: "Tu joues Do majeur aux 3 endroits (C, A, G) à la suite." }
      ]
    },
    {
      id: "n5g", ceinture: "Niveau 5 · Ouverture harmonique", categorie: "Gammes", titre: "Pentatonique, positions 4 & 5",
      but: "Terminer le tour du manche avec les deux dernières positions.",
      niveaux: [
        { nom: "Position 4", but: "Nouvelle forme, entre les positions 3 et 5.", tab: ["Position 4, la mineur pentatonique (autour de la case 12-15)."], tempoDepart: 70, unite: "bpm", focus: "C'est la position la moins intuitive : prends ton temps.", palier: "Montée-descente propre en position 4." },
        { nom: "Position 5", but: "La dernière pièce du puzzle, qui rejoint la position 1 une octave plus haut.", tab: ["Position 5, la mineur pentatonique (autour de la case 15-17)."], tempoDepart: 70, unite: "bpm", focus: "La position 5 ressemble à la position 1, une octave au-dessus.", palier: "Montée-descente propre en position 5." },
        { nom: "Les 5 positions reliées, lentement", but: "Enchaîne les 5 positions sur tout le manche, sans redescendre.", tab: ["Du case 0 au case 17 environ, tout enchaîné."], tempoDepart: 60, unite: "bpm (lent, priorité à la justesse)", focus: "Le manche entier devient un seul terrain de jeu.", palier: "Le trajet complet sans note fausse, même lentement." }
      ]
    },
    {
      id: "n5s", ceinture: "Niveau 5 · Ouverture harmonique", categorie: "Solos", titre: "Slides & bends combinés",
      but: "Ajouter le glissé au vocabulaire expressif déjà acquis.",
      niveaux: [
        { nom: "Slide simple", but: "Glisse d'une case à l'autre en gardant la pression.", tab: ["E|--3/5--|  (glisse du 3 au 5, une seule attaque)"], tempoDepart: 60, unite: "bpm", focus: "Une seule attaque au médiator, le glissé fait le reste.", palier: "Le slide arrive pile sur la case cible." },
        { nom: "Slide + bend", but: "Glisse puis enchaîne un bend sur la note d'arrivée.", tab: ["E|--3/5b(7)--|"], tempoDepart: 55, unite: "bpm", focus: "Le bend doit être aussi juste qu'un bend isolé.", palier: "Le combo sonne fluide, pas 'deux gestes séparés'." },
        { nom: "Phrase mixte complète", but: "Une phrase de 4 mesures avec bend, vibrato, slide et hammer/pull.", tab: ["Combine toutes les techniques apprises, position 5, la mineur."], tempoDepart: 60, unite: "bpm", focus: "La technique sert la musique, chaque effet a une raison d'être là.", palier: "La phrase raconte quelque chose, pas juste une démo." }
      ]
    },
    // Niveau 6 — Rock avancé
    {
      id: "n6r", ceinture: "Niveau 6 · Rock avancé", categorie: "Rythmique", titre: "Rythmes composés",
      but: "Sortir du 4/4 permanent, sentir d'autres subdivisions.",
      niveaux: [
        { nom: "6/8 de base", but: "Compte et joue en 6/8 (deux groupes de 3).", tab: ["1-2-3-4-5-6, accent sur 1 et 4."], tempoDepart: 70, unite: "bpm", focus: "Le 6/8 groove différemment du 3/4 même si ça se ressemble sur le papier.", palier: "Le 6/8 tient tout seul, sans compter à voix haute." },
        { nom: "7/8, la mesure impaire", but: "Une mesure à 7 temps, découpée 4+3 ou 3+4.", tab: ["1-2-3-4 / 1-2-3, enchaîné en boucle."], tempoDepart: 65, unite: "bpm", focus: "Découpe mentalement en petits groupes plutôt que de compter jusqu'à 7.", palier: "La boucle en 7/8 groove, elle ne 'boite' plus." },
        { nom: "Changement de mesure en direct", but: "Passe de 4/4 à 6/8 au milieu d'un motif, sans s'arrêter.", tab: ["4 mesures en 4/4, puis 2 mesures en 6/8, retour en 4/4."], tempoDepart: 70, unite: "bpm", focus: "Prépare mentalement le changement une mesure à l'avance.", palier: "La transition est fluide, invisible sauf pour toi." }
      ]
    },
    {
      id: "n6a", ceinture: "Niveau 6 · Rock avancé", categorie: "Accords", titre: "CAGED complet + accords étendus",
      but: "Terminer le système CAGED et enrichir le vocabulaire harmonique.",
      niveaux: [
        { nom: "Formes E et D", but: "Les deux dernières formes du système CAGED.", tab: ["Do majeur en forme E (barré) et forme D (plus aiguë sur le manche)."], tempoDepart: 55, unite: "bpm", focus: "Tu as maintenant les 5 formes CAGED pour un seul accord.", palier: "Tu joues Do majeur aux 5 endroits, dans l'ordre C-A-G-E-D." },
        { nom: "Accords sus2 / sus4", but: "Des accords 'suspendus', très utilisés en intro rock.", tab: ["Dsus4 : xx0233   Dsus2 : xx0230", "Alterne Dsus4 → D → Dsus2 → D."], tempoDepart: 60, unite: "bpm", focus: "Le sus4 crée une tension qui 'veut' résoudre vers l'accord normal.", palier: "L'enchaînement sonne comme une vraie intro de chanson." },
        { nom: "7e et maj7", but: "Colore tes accords majeurs avec une 7e.", tab: ["G7 : 320001   Cmaj7 : x32000"], tempoDepart: 55, unite: "bpm", focus: "La 7e ajoute de la couleur sans changer la fonction de l'accord.", palier: "Tu entends et reproduis la différence de couleur." }
      ]
    },
    {
      id: "n6g", ceinture: "Niveau 6 · Rock avancé", categorie: "Gammes", titre: "Gamme majeure & relative mineure",
      but: "Sortir de la pentatonique pour la première fois : la gamme à 7 notes.",
      niveaux: [
        { nom: "Gamme majeure, position 1", but: "La gamme de Do majeur, en position ouverte/case 0-3.", tab: ["Do majeur : Do-Ré-Mi-Fa-Sol-La-Si-Do, position ouverte."], tempoDepart: 60, unite: "bpm (croches)", focus: "7 notes au lieu de 5 : écoute bien chaque intervalle.", palier: "Montée-descente propre sans hésitation." },
        { nom: "Relative mineure (La mineur naturel)", but: "La même gamme, en partant de La : le lien avec ta pentatonique.", tab: ["La mineur naturel = les mêmes notes que Do majeur, en partant de La."], tempoDepart: 60, unite: "bpm", focus: "Ta pentatonique est un sous-ensemble de ces 7 notes.", palier: "Tu identifies les 2 notes ajoutées par rapport à la pentatonique." },
        { nom: "Comparer penta et majeure sur un riff", but: "Joue le même riff avec la pentatonique, puis avec les notes en plus.", tab: ["Même position (case 5, la mineur), ajoute case 6 et case 9 quand ça sonne bien."], tempoDepart: 65, unite: "bpm", focus: "Les notes 'en plus' sont plus délicates, utilise-les avec parcimonie.", palier: "Tu identifies à l'oreille quand une note 'en plus' sonne juste." }
      ]
    },
    {
      id: "n6s", ceinture: "Niveau 6 · Rock avancé", categorie: "Solos", titre: "Sweep picking, les bases",
      but: "La technique qui permet de jouer des arpèges très rapidement.",
      niveaux: [
        { nom: "Arpège 3 cordes", but: "Un seul mouvement de médiator qui 'balaie' 3 cordes.", tab: ["E|-------------5-|", "A|----------5----|", "D|-------7-------|", "(Am, balayé bas puis haut)"], tempoDepart: 50, unite: "bpm (très lent)", focus: "Le médiator ne fait qu'un seul geste continu, pas 3 coups séparés.", palier: "Les 3 notes sonnent distinctes, pas comme un accord grattouillé." },
        { nom: "Arpège 4 cordes", but: "Étends le balayage à une corde de plus.", tab: ["Ajoute la corde de sol au motif précédent."], tempoDepart: 45, unite: "bpm (très lent)", focus: "Chaque doigt se lève juste avant que le médiator arrive à la corde suivante.", palier: "4 notes distinctes, toujours très lentement mais propre." },
        { nom: "Enchaîner deux arpèges", but: "Passe d'un arpège à un autre (Am → Dm par exemple).", tab: ["Arpège Am puis arpège Dm, même forme décalée."], tempoDepart: 50, unite: "bpm", focus: "La propreté avant la vitesse, toujours.", palier: "Les 2 arpèges enchaînés sans note étouffée par erreur." }
      ]
    },
    // Niveau 7 — Modes & improvisation
    {
      id: "n7r", ceinture: "Niveau 7 · Modes & improvisation", categorie: "Rythmique", titre: "Rythmiques funk & reggae",
      but: "Sortir du rock pur, élargir ta palette rythmique.",
      niveaux: [
        { nom: "Skank reggae", but: "Le coup sec et étouffé sur les contre-temps, signature du reggae.", tab: ["Silence sur les temps forts, coup sec étouffé sur chaque contre-temps."], tempoDepart: 70, unite: "bpm", focus: "Le geste est très court et sec, presque une percussion.", palier: "Le skank groove tout seul, régulier." },
        { nom: "Funk 16e étouffé", but: "Motif funk avec toutes les croches jouées mais la plupart étouffées.", tab: ["16 coups par mesure, seuls certains sonnent clairement (accents)."], tempoDepart: 80, unite: "bpm", focus: "La main droite ne s'arrête jamais, c'est la main gauche qui gère.", palier: "Le motif funk tient sans que le bras droit se crispe." },
        { nom: "Groove hybride", but: "Mélange reggae et funk dans un même motif de 4 mesures.", tab: ["2 mesures de skank, 2 mesures de funk 16e."], tempoDepart: 75, unite: "bpm", focus: "Change de feel sans changer de tempo.", palier: "La transition entre les deux feels est nette et intentionnelle." }
      ]
    },
    {
      id: "n7a", ceinture: "Niveau 7 · Modes & improvisation", categorie: "Accords", titre: "Accords jazz simplifiés",
      but: "Colorer ta palette harmonique au-delà du rock, utile pour le blues aussi.",
      niveaux: [
        { nom: "7e de dominante partout", but: "Joue une grille simple entièrement en accords 7.", tab: ["A7 : x02020   D7 : xx0212   E7 : 020100"], tempoDepart: 55, unite: "bpm", focus: "C'est LA couleur du blues : familiarise-toi avec le son.", palier: "La grille en 7e sonne 'bluesy' à l'oreille." },
        { nom: "9e simplifiée", but: "Un accord encore plus coloré, très utilisé en funk/rock.", tab: ["E9 : approximatif, écoute le son, compare avec E7."], tempoDepart: 55, unite: "bpm", focus: "Compare avec le E7 : la 9e ajoute encore plus de couleur.", palier: "Tu entends la différence 7 vs 9 sans regarder tes doigts." },
        { nom: "Accords glissés (approach chords)", but: "Glisse vers un accord depuis une case en dessous, technique très bluesy.", tab: ["Approche E7 depuis un accord une case plus bas, glisse rapide juste avant."], tempoDepart: 55, unite: "bpm", focus: "Le glissé est très court, presque une décoration.", palier: "L'approche sonne comme un vrai musicien de blues." }
      ]
    },
    {
      id: "n7g", ceinture: "Niveau 7 · Modes & improvisation", categorie: "Gammes", titre: "Modes du blues/rock",
      but: "Comprendre les couleurs modales qui font le son 'rock' au-delà de la pentatonique.",
      niveaux: [
        { nom: "Mode dorien", but: "La gamme mineure 'jazzy', très utilisée en rock progressif.", tab: ["Dorien = mineur naturel avec la 6e majeure. Position case 5, la dorien."], tempoDepart: 65, unite: "bpm", focus: "La 6e majeure donne la couleur dorien, cherche-la à l'oreille.", palier: "Tu reconnais le son dorien face au mineur naturel." },
        { nom: "Mode mixolydien", but: "La gamme majeure avec une 7e mineure, LE son du rock/blues.", tab: ["Mixolydien = majeur avec 7e mineure. Position case 5, la mixolydien."], tempoDepart: 65, unite: "bpm", focus: "C'est le mode le plus utilisé dans le rock : Hendrix, ZZ Top.", palier: "Tu reconnais et reproduis le son mixolydien sur un riff." },
        { nom: "Mélanger penta + couleur modale", but: "Pars de ta pentatonique habituelle et ajoute une ou deux notes modales.", tab: ["Pentatonique position 5 + note dorien ou mixolydien ajoutée avec parcimonie."], tempoDepart: 70, unite: "bpm", focus: "Une ou deux notes suffisent à changer complètement la couleur.", palier: "Ton improvisation a une couleur reconnaissable." }
      ]
    },
    {
      id: "n7s", ceinture: "Niveau 7 · Modes & improvisation", categorie: "Solos", titre: "Tapping, les bases",
      but: "La technique popularisée par Van Halen : taper les notes avec la main droite.",
      niveaux: [
        { nom: "Tapping 1 doigt", but: "Frappe une note avec l'index ou le majeur de la main droite.", tab: ["E|--5--12t--5--|  (t = tap avec la main droite, case 12)"], tempoDepart: 60, unite: "bpm", focus: "Le doigt tape perpendiculaire à la touche, comme un hammer-on mais avec l'autre main.", palier: "Le tap sonne aussi fort que les notes de la main gauche." },
        { nom: "Tap + pull-off", but: "Enchaîne le tap avec un pull-off vers une note de la main gauche.", tab: ["E|--12t-8-5--|  (tap 12, pull vers 8, pull vers 5)"], tempoDepart: 55, unite: "bpm", focus: "Le pull-off après le tap doit être aussi net qu'un pull-off normal.", palier: "L'enchaînement tap-pull-pull sonne fluide, pas saccadé." },
        { nom: "Riff tapping complet", but: "Un vrai petit riff utilisant le tapping, à la Van Halen.", tab: ["E|--5h8p5--12t-8p5--|  en boucle, de plus en plus vite."], tempoDepart: 60, unite: "bpm", focus: "C'est un exercice technique avant tout, la propreté prime.", palier: "Le riff est reconnaissable et régulier, même lentement." }
      ]
    },
    // Niveau 8 — Vitesse & précision
    {
      id: "n8r", ceinture: "Niveau 8 · Vitesse & précision", categorie: "Rythmique", titre: "Métronome extrême",
      but: "Repousser tes limites de vitesse en rythmique, sans perdre la précision.",
      niveaux: [
        { nom: "Alternate picking 16e", but: "Croches doubles en continu sur une corde, alternat strict bas-haut.", tab: ["E|-5-5-5-5-5-5-5-5- (en doubles-croches)"], tempoDepart: 80, unite: "bpm (doubles-croches)", focus: "Le poignet reste souple même à haute vitesse.", palier: "Propre et régulier, +5 bpm à chaque séance tant que c'est net." },
        { nom: "Économie de mouvement", but: "Réduis l'amplitude du médiator au minimum pour gagner en vitesse.", tab: ["Même exercice, mais médiator qui bouge à peine au-dessus de la corde."], tempoDepart: 90, unite: "bpm (doubles-croches)", focus: "Moins de mouvement = plus de vitesse possible.", palier: "Tu sens une vitesse plus élevée devenir accessible, sans forcer." },
        { nom: "Endurance", but: "Tiens le motif rapide sur une durée longue sans ralentir ni te fatiguer.", tab: ["Le même motif en boucle pendant 2 minutes complètes."], tempoDepart: 85, unite: "bpm (doubles-croches)", focus: "Respire, détends les épaules, l'endurance vient du relâchement.", palier: "2 minutes sans ralentissement perceptible." }
      ]
    },
    {
      id: "n8a", ceinture: "Niveau 8 · Vitesse & précision", categorie: "Accords", titre: "Accords mobiles rapides",
      but: "Utiliser le système CAGED en situation réelle, à vitesse de jeu.",
      niveaux: [
        { nom: "Enchaînement CAGED rapide", but: "Passe d'une forme CAGED à l'autre pour un même accord, rapidement.", tab: ["Do majeur : C→A→G→E→D, un changement par mesure, tempo qui monte."], tempoDepart: 70, unite: "bpm", focus: "La vitesse vient de la familiarité avec les formes.", palier: "Les 5 formes enchaînées à 100 bpm sans hésitation visible." },
        { nom: "Walking bass + accord", but: "Alterne une note de basse en mouvement et un accord plaqué, façon comping.", tab: ["Basse qui descend chromatiquement, accord plaqué entre chaque note de basse."], tempoDepart: 70, unite: "bpm", focus: "La basse doit rester audible et régulière même avec les accords.", palier: "Le motif walking bass + accord groove tout seul." },
        { nom: "Comping style jazz-blues", but: "Accompagne une grille blues avec des accords courts et rythmés.", tab: ["Grille blues 12 mesures, accords 7e joués en rythme syncopé et court."], tempoDepart: 75, unite: "bpm", focus: "Le silence entre les accords fait autant partie du groove.", palier: "12 mesures de comping qui groovent." }
      ]
    },
    {
      id: "n8g", ceinture: "Niveau 8 · Vitesse & précision", categorie: "Gammes", titre: "Séquences & patterns",
      but: "Les motifs répétitifs qui construisent des solos impressionnants.",
      niveaux: [
        { nom: "Séquences par 3", but: "Joue la gamme par groupes de 3 notes qui se chevauchent.", tab: ["Pentatonique position 1, groupes de 3 : 1-2-3, 2-3-4, 3-4-5, etc."], tempoDepart: 70, unite: "bpm", focus: "Chaque groupe de 3 doit sonner comme une petite unité.", palier: "La séquence par 3 sur toute la gamme, propre et régulière." },
        { nom: "Séquences par 4", but: "Même principe avec des groupes de 4 notes.", tab: ["Pentatonique position 1, groupes de 4 qui se chevauchent."], tempoDepart: 65, unite: "bpm", focus: "Les groupes de 4 sont plus difficiles à caler rythmiquement.", palier: "La séquence par 4 sur toute la gamme, propre et régulière." },
        { nom: "Patterns en boucle rapide", but: "Prends un pattern de séquence et boucle-le à vitesse croissante.", tab: ["Un pattern de 4-6 notes, répété en boucle, +5 bpm à chaque réussite."], tempoDepart: 80, unite: "bpm", focus: "Ce genre de motif 'sonne technique' facilement.", palier: "Le pattern tient à haute vitesse sans se dégrader." }
      ]
    },
    {
      id: "n8s", ceinture: "Niveau 8 · Vitesse & précision", categorie: "Solos", titre: "Legato extrême & string skipping",
      but: "Pousser encore plus loin la fluidité et la précision du jeu de solo.",
      niveaux: [
        { nom: "Legato rapide", but: "Enchaîne hammer/pull sur toute une position, le plus fluide possible.", tab: ["Position 1 pentatonique, tout en hammer/pull, une seule attaque au médiator par corde."], tempoDepart: 70, unite: "bpm", focus: "Le volume ne doit jamais faiblir, même sur la 4e ou 5e note liée.", palier: "Toute la position jouée en legato, volume constant." },
        { nom: "String skipping", but: "Saute une corde au lieu de jouer les cordes voisines.", tab: ["E|-5-----5-|", "D|----5----|", "(saute la corde de la, joue mi-ré-mi)"], tempoDepart: 60, unite: "bpm", focus: "La main droite doit anticiper le saut.", palier: "Le saut de corde est précis, sans toucher la corde évitée." },
        { nom: "Combo complet", but: "Mélange legato et string skipping dans une phrase de solo avancée.", tab: ["Position 1, legato sur 2 notes puis saut de corde, répété en montant."], tempoDepart: 65, unite: "bpm", focus: "Le niveau technique le plus exigeant du parcours jusqu'ici.", palier: "La phrase complète, propre, même à tempo modéré." }
      ]
    },
    // Niveau 9 — Style & identité
    {
      id: "n9r", ceinture: "Niveau 9 · Style & identité", categorie: "Rythmique", titre: "Ton groove signature",
      but: "Transformer ton bagage de batteur en signature de guitariste.",
      niveaux: [
        { nom: "Transcrire un groove existant", but: "Prends un groove de batterie que tu aimes et transpose-le en pattern de guitare.", tab: ["Écoute un groove ZZ Top ou similaire, identifie le placement des accents, reproduis-le."], tempoDepart: 70, unite: "bpm", focus: "Ton oreille de batteur est ton meilleur outil ici.", palier: "Le groove transposé est reconnaissable et groove vraiment." },
        { nom: "L'adapter à un accord", but: "Applique ce groove sur un accord ou une progression simple.", tab: ["Le même pattern rythmique, appliqué sur Am → G → D → Am."], tempoDepart: 70, unite: "bpm", focus: "Le pattern doit rester reconnaissable même avec les changements.", palier: "L'accord et le groove cohabitent sans se gêner." },
        { nom: "L'intégrer à un morceau", but: "Utilise ce groove comme base rythmique d'une chanson.", tab: ["Applique le pattern sur une grille complète de couplet/refrain."], tempoDepart: 75, unite: "bpm", focus: "C'est ta signature : un motif qu'on reconnaît comme 'toi'.", palier: "Tu peux jouer ce groove de mémoire, sur n'importe quel accord." }
      ]
    },
    {
      id: "n9a", ceinture: "Niveau 9 · Style & identité", categorie: "Accords", titre: "Réharmonisation simple",
      but: "Sortir des accords de base pour enrichir une progression existante.",
      niveaux: [
        { nom: "Substituer un accord", but: "Remplace un accord par un accord relatif ou une couleur différente.", tab: ["Am → remplace parfois par Am7 ou C (relatif majeur) pour varier."], tempoDepart: 60, unite: "bpm", focus: "Écoute si la substitution garde le sens musical de la phrase.", palier: "Tu identifies à l'oreille quelle substitution 'marche'." },
        { nom: "Enrichir une grille", but: "Prends une grille simple (I-IV-V) et ajoute des couleurs (7e, 9e, sus).", tab: ["Grille Am-Dm-E, ajoute Am7-Dm7-E7 ou des sus4 de passage."], tempoDepart: 60, unite: "bpm", focus: "N'enrichis pas TOUS les accords, un ou deux suffisent.", palier: "La grille enrichie sonne plus riche sans perdre son identité." },
        { nom: "Jouer une grille jazz-blues", but: "Une vraie grille de blues avec substitutions typiques.", tab: ["Grille blues classique enrichie de quelques accords de passage jazz."], tempoDepart: 60, unite: "bpm", focus: "Un monde harmonique plus complexe : une substitution à la fois.", palier: "Tu joues la grille enrichie de bout en bout sans te perdre." }
      ]
    },
    {
      id: "n9g", ceinture: "Niveau 9 · Style & identité", categorie: "Gammes", titre: "Phrasé avancé",
      but: "Passer de 'jouer les bonnes notes' à 'raconter quelque chose'.",
      niveaux: [
        { nom: "Target notes", but: "Vise une note précise de l'accord sur le temps fort, improvise autour.", tab: ["Sur Am, vise la note La ou Do sur chaque temps fort, improvise entre."], tempoDepart: 65, unite: "bpm", focus: "La note cible ancre la phrase, le reste est liberté.", palier: "Tu tombes sur la target note à chaque fois." },
        { nom: "Chromatismes", but: "Ajoute une note chromatique juste avant une target note, pour la tension.", tab: ["Approche la target note par la case juste en dessous ou au-dessus, très brièvement."], tempoDepart: 60, unite: "bpm", focus: "Le chromatisme doit être bref, presque un 'glissement'.", palier: "Le chromatisme ajoute de la tension sans sonner comme une erreur." },
        { nom: "Phrasé call & response avancé", but: "Construis une improvisation en questions-réponses sur plusieurs mesures.", tab: ["4 mesures de 'question' (en suspens), 4 mesures de 'réponse' (qui résout)."], tempoDepart: 65, unite: "bpm", focus: "Pense comme un dialogue, pas un flot continu de notes.", palier: "L'improvisation raconte une histoire, début-tension-résolution." }
      ]
    },
    {
      id: "n9s", ceinture: "Niveau 9 · Style & identité", categorie: "Solos", titre: "Composer ton propre solo",
      but: "Passer de l'improvisation libre à une composition structurée et répétable.",
      niveaux: [
        { nom: "Motif de base", but: "Trouve un motif de 2-4 notes qui te plaît, mémorise-le exactement.", tab: ["Improvise jusqu'à trouver une phrase accrocheuse, note-la (ou enregistre-toi)."], tempoDepart: 65, unite: "bpm", focus: "Cherche ce qui sonne bien et que tu peux rejouer pareil.", palier: "Tu rejoues le motif identique 3 fois de suite." },
        { nom: "Développer le motif", but: "Varie le motif de base : transpose-le, inverse-le, étends-le.", tab: ["Le même motif, joué une octave plus haut, puis avec le rythme inversé."], tempoDepart: 65, unite: "bpm", focus: "Le développement doit rester reconnaissable.", palier: "3 variations du motif, toutes maîtrisées." },
        { nom: "Solo complet sur grille", but: "Assemble motif, développement et improvisation libre sur une grille de 12-16 mesures.", tab: ["Structure : motif → développement → improvisation → retour au motif."], tempoDepart: 70, unite: "bpm", focus: "Un bon solo a une forme, comme une chanson en miniature.", palier: "Le solo complet, dans l'ordre, sans notes." }
      ]
    },
    // Niveau 10 — Guitar Hero / Scène
    {
      id: "n10r", ceinture: "Niveau 10 · Guitar Hero", categorie: "Rythmique", titre: "Jouer en place sans filet",
      but: "La rythmique doit tenir même sans métronome et même face à un imprévu.",
      niveaux: [
        { nom: "Sans clic", but: "Joue un groove complet en coupant le métronome après les 4 premières mesures.", tab: ["Lance le clic, coupe-le, continue le même tempo de mémoire."], tempoDepart: 70, unite: "bpm", focus: "Ton oreille de batteur est ton métronome interne.", palier: "Tu retombes pile sur le tempo de départ après 16 mesures sans clic." },
        { nom: "Tempo rubato", but: "Accélère et ralentis intentionnellement, puis reviens exactement au tempo de départ.", tab: ["Ralentis progressivement sur 4 mesures, puis raccélère pour revenir pile au tempo initial."], tempoDepart: 70, unite: "bpm", focus: "Le rubato doit être un choix musical clair, pas une dérive.", palier: "Tu reviens exactement au tempo de départ, vérifié au métronome." },
        { nom: "Feel live", but: "Joue un morceau complet en imaginant que tu es sur scène.", tab: ["N'importe quel morceau déjà travaillé, joué 'pour de vrai', debout si possible."], tempoDepart: 70, unite: "bpm", focus: "L'énergie scénique change le jeu : plus d'engagement physique.", palier: "Tu te sens prêt à jouer ça devant quelqu'un." }
      ]
    },
    {
      id: "n10a", ceinture: "Niveau 10 · Guitar Hero", categorie: "Accords", titre: "Improviser un accompagnement complet",
      but: "Accompagner un morceau du début à la fin sans partition.",
      niveaux: [
        { nom: "Intro", but: "Improvise une intro de 4-8 mesures sur les accords d'un morceau que tu connais.", tab: ["Utilise arpèges, accords, et un peu de mélodie sur les accords de ton morceau."], tempoDepart: 65, unite: "bpm", focus: "Une intro annonce l'ambiance du morceau : reste sobre et clair.", palier: "L'intro donne envie d'entendre la suite." },
        { nom: "Couplet/refrain", but: "Accompagne un couplet et un refrain avec des rythmiques différentes.", tab: ["Rythmique plus sobre au couplet, plus pleine au refrain."], tempoDepart: 70, unite: "bpm", focus: "Le contraste couplet/refrain, c'est ce qui fait respirer une chanson.", palier: "On entend clairement la différence, même sans mélodie chantée." },
        { nom: "Solo backing", but: "Improvise une rythmique de fond qui laisse de la place à un solo.", tab: ["Rythmique plus discrète, plus d'espace, pour laisser respirer une improvisation."], tempoDepart: 70, unite: "bpm", focus: "Le rôle d'accompagnateur, c'est de servir la musique.", palier: "Tu peux accompagner un morceau complet, intro à fin, sans partition." }
      ]
    },
    {
      id: "n10g", ceinture: "Niveau 10 · Guitar Hero", categorie: "Gammes", titre: "Maîtrise totale du manche",
      but: "Le manche entier devient un seul espace de jeu fluide.",
      niveaux: [
        { nom: "Improviser dans toutes les positions", but: "Improvise librement en utilisant les 5 positions pentatoniques sans réfléchir.", tab: ["Improvisation libre sur Am, tout le manche, aucune limite de position."], tempoDepart: 70, unite: "bpm", focus: "Si tu dois réfléchir 'je suis en position 3', continue à pratiquer.", palier: "Tu improvises sans jamais penser consciemment à la position." },
        { nom: "Changer de position à la volée", but: "Dans une même phrase, change de position pour aller chercher une note plus haute ou plus basse.", tab: ["Une phrase qui commence en position 1 et se termine en position 4, sans coupure."], tempoDepart: 65, unite: "bpm", focus: "Le changement de position doit servir la phrase musicale.", palier: "Le changement de position est invisible à l'oreille." },
        { nom: "Jouer par oreille", but: "Trouve à l'oreille les notes d'une mélodie que tu connais, sans tab.", tab: ["Choisis une mélodie simple que tu connais par cœur, trouve-la note par note."], tempoDepart: 0, unite: "", focus: "L'oreille avant les doigts, les doigts suivent l'oreille.", palier: "Tu retrouves une mélodie complète à l'oreille, du début à la fin." }
      ]
    },
    {
      id: "n10s", ceinture: "Niveau 10 · Guitar Hero", categorie: "Solos", titre: "Ton solo signature",
      but: "Le point d'orgue du parcours : un solo qui est vraiment le tien.",
      niveaux: [
        { nom: "Composer", but: "Écris un solo complet sur un morceau qui te tient à cœur.", tab: ["Utilise toutes les techniques du parcours : bends, legato, sweep, phrasé, groove de batteur."], tempoDepart: 70, unite: "bpm", focus: "Un bon solo a une identité claire, pas un catalogue de techniques.", palier: "Le solo est écrit, structuré, du début à la fin." },
        { nom: "Enregistrer", but: "Enregistre-toi en train de le jouer, écoute-toi avec un regard critique.", tab: ["Enregistre 3 prises, écoute chacune, note ce qui marche et ce qui ne marche pas."], tempoDepart: 70, unite: "bpm", focus: "S'entendre objectivement est inconfortable mais c'est le vrai retour.", palier: "Tu as une prise dont tu es fier." },
        { nom: "Jouer devant quelqu'un", but: "Le vrai test : jouer ton solo devant au moins une personne.", tab: ["N'importe qui : un proche, un ami musicien. L'important, c'est le public réel."], tempoDepart: 70, unite: "bpm", focus: "Le trac fait partie du jeu : c'est en le vivant qu'on apprend à jouer avec.", palier: "Tu l'as fait. Bienvenue chez les guitar heroes, pour de vrai cette fois." }
      ]
    }
  ]
};
