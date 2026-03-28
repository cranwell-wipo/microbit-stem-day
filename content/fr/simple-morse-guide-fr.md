---
title: "Morse Chat 💬📡"
date: 2026-03-28
tags: [microbit, stem, kids]
aliases:
  - microbit-stem-day/simple-morse-guide-fr
  - simple-morse-guide-fr
---

# Morse Chat 💬📡

Envoie des points et des tirets à tes amis par radio avec le micro:bit — comme un vrai télégraphe Morse !

---

## 🎮 Construis-le dans MakeCode

Clique sur le lien ci-dessous pour ouvrir le **tutoriel guidé officiel** — suis les étapes et construis le programme bloc par bloc !

> **👉 [Ouvrir le tutoriel Morse Chat sur MakeCode (français)](https://makecode.microbit.org/projects/v2-morse-chat?lang=fr)**

---

## Comment ça fonctionne

| Action | Ce que ça fait |
|--------|----------------|
| **Toucher** le logo doré | Envoyer un **point** (bip court) |
| **Appui long** sur le logo | Envoyer un **tiret** (bip long) |

Quand tu **reçois** d'un autre micro:bit :
- Un **point** = une LED au centre, son court
- Un **tiret** = trois LED en ligne, son plus long
- L'écran s'efface après chaque symbole

> [!tip] Décode avec ta carte Morse !
> Utilise la carte de l'alphabet Morse imprimée sur ta table pour faire correspondre les points et tirets aux lettres. C'est toi le décodeur !

---

## Référence rapide — Alphabet Morse

| Lettre | Morse | Lettre | Morse |
|--------|-------|--------|-------|
| A | · — | N | — · |
| B | — · · · | O | — — — |
| C | — · — · | P | · — — · |
| D | — · · | Q | — — · — |
| E | · | R | · — · |
| F | · · — · | S | · · · |
| G | — — · | T | — |
| H | · · · · | U | · · — |
| I | · · | V | · · · — |
| J | · — — — | W | · — — |
| K | — · — | X | — · · — |
| L | · — · · | Y | — · — — |
| M | — — | Z | — — · · |

> [!success] SOS = `· · ·` `— — —` `· · ·`

---

## 🧩 Exercice : Décode le Morse !

Utilise le tableau pour décoder ces messages :

| # | Message en Morse | Indice |
|---|------------------|--------|
| 1 | `· · ·` `— — —` `· · ·` | 3 lettres — un message très célèbre ! |
| 2 | `· · · ·` `·` `· — · ·` `· — · ·` `— — —` | 5 lettres — un mot de bienvenue |
| 3 | `— ·` `— — —` `— ·` | 3 lettres — l'opposé de « oui » |
| 4 | `— — —` `· · —` `· ·` | 3 lettres — c'est vous ! |

---

## Tu veux un défi ? 🚀

Quand tu maîtrises Morse Chat, essaie les programmes avancés :
- [[receiver-guide-fr|📻 Récepteur Morse]] — affiche la lettre décodée automatiquement
- [[sender-guide-fr|📡 Émetteur Morse]] — émetteur complet avec tableau Morse

---

*Construit lors de la Journée STEM — Mars 2026* 🎉
