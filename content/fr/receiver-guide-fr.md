---
title: "Construis un récepteur Morse 📻"
date: 2026-03-14
tags: [microbit, stem, kids]
aliases:
  - microbit-stem-day/receiver-guide-fr
  - receiver-guide-fr
---

# Construis un récepteur Morse 📻

Tu vas construire une radio qui affiche du code Morse sur ton écran — et te permet de répondre à l'expéditeur !

**Ce qu'il te faut :** ton micro:bit, un câble USB et un ordinateur ouvert sur **makecode.microbit.org**

---

## Étape 1 — Ouvrir MakeCode

![[receiver-01-new-project-fr.png]]

1. Va sur **makecode.microbit.org**
2. Clique sur **Nouveau Projet**
3. Nomme-le `morse-receiver`
4. Clique sur **Créer**

> [!tip]
> MakeCode, c'est là où tu fais glisser des blocs pour construire ton programme — comme des Lego, mais pour le code !

---

## Étape 2 — Configurer le groupe radio

![[receiver-02-on-start-fr.png]]

1. Trouve **Radio** dans le menu à gauche (c'est en rose 🩷)
2. Fais glisser `définir le groupe radio [ 1 ]` dans le bloc **au démarrage**
3. Trouve **De base** (bleu) et fais glisser `effacer l'écran` en dessous

> [!tip]
> Le groupe 1 est le canal radio de ton équipe — seuls les micro:bits du groupe 1 peuvent s'entendre.

---

## Étape 3 — Construire la fonction `plotMorse`

![[receiver-03-plotmorse-fr.png]]

1. Va dans **Avancé → Fonctions** et clique sur **Créer une fonction**
2. Nomme-la `plotMorse` — clique sur **Ajouter un paramètre texte** et nomme-le `pattern`
3. À l'intérieur de la fonction, ajoute `effacer l'écran` (depuis **De base**)
4. Ajoute une boucle `pour` depuis **Boucles** — `pour [ i ] de 0 à (longueur de pattern − 1)`
   - Pour `longueur de` : va dans **Avancé → Texte**
5. À l'intérieur de la boucle, ajoute un bloc `si / sinon` depuis **Logique**
6. Pour la **condition du `si`** :
   - Va dans **Avancé → Texte** et prends le bloc de comparaison de texte `=`
   - À gauche : prends `caractère [ ] de [ ]`, mets `i` et `pattern`
   - À droite : tape `"."`
7. Dans le **`si`** : `allumer x [ i ] y [ 2 ]` (depuis **LED**)
8. Dans le **`sinon`** : ajoute trois blocs `allumer` :
   - `allumer x [ i ] y [ 1 ]`
   - `allumer x [ i ] y [ 2 ]`
   - `allumer x [ i ] y [ 3 ]`

> [!tip]
> Un point allume **1 LED** (la LED du milieu). Un tiret en allume **3** (haut, milieu, bas) — il est donc plus grand sur l'écran !

---

## Étape 4 — Écouter les messages radio

![[receiver-04-radio-received-fr.png]]

1. Depuis **Radio**, fais glisser `quand une donnée est reçue par radio (receivedString)` sur la surface de travail
2. À l'intérieur, ajoute un bloc `si` depuis **Logique**
3. Pour la **condition du `si`** :
   - Va dans **Logique → Booléens** et prends un bloc `et`
   - À gauche du `et` : va dans **Logique → Comparaisons**, prends `≠`, puis mets `receivedString ≠ "ACK"`
   - À droite du `et` : va dans **Logique → Comparaisons**, prends `≠`, puis mets `receivedString ≠ "NACK"`
4. À l'intérieur du `si` : `définir lastReceived à receivedString`, puis `appeler plotMorse (lastReceived)`

> [!tip]
> On ignore ACK et NACK pour qu'ils ne perturbent pas les points et tirets sur ton écran.

---

## Étape 5 — Bouton A : envoyer ✓

![[receiver-05-button-a-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque le bouton [ A ] est pressé`
2. À l'intérieur, ajoute :
   - `envoyer la chaîne "ACK"` par radio (depuis **Radio**)
   - `montrer l'icône [✓]` (depuis **De base** — choisis la coche)
   - `pause (ms) [ 800 ]` (depuis **De base**)
   - `appeler plotMorse (lastReceived)` (depuis **Avancé → Fonctions**)

> [!tip]
> Appuie sur A quand tu as décodé la lettre — ça dit à l'expéditeur « Je l'ai ! ✓ »

---

## Étape 6 — Bouton B : envoyer ✗

![[receiver-06-button-b-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque le bouton [ B ] est pressé`
2. À l'intérieur, ajoute :
   - `envoyer la chaîne "NACK"` par radio (depuis **Radio**)
   - `montrer l'icône [✗]` (depuis **De base** — choisis la croix)
   - `pause (ms) [ 800 ]` (depuis **De base**)
   - `appeler plotMorse (lastReceived)` (depuis **Avancé → Fonctions**)

> [!tip]
> Appuie sur B si tu as besoin que l'expéditeur répète la lettre.

---

## Étape 7 — Téléverser sur ton micro:bit ! 🚀

![[receiver-07-download-fr.png]]

1. Clique sur **Télécharger** en bas de l'écran
2. Connecte ton micro:bit avec le câble USB
3. Copie le fichier `.hex` sur le lecteur **MICROBIT** qui apparaît
4. Attends que le voyant jaune s'arrête de clignoter — c'est terminé !

> [!tip]
> Quand le voyant jaune s'arrête, ton programme est en marche. Demande à l'instructeur d'envoyer une lettre !

---

## Tu es prêt·e ! 🎉

Quand une lettre Morse arrive, des points et des tirets apparaissent sur ton écran.

| Bouton | Ce que ça fait |
|--------|----------------|
| **A** | Envoyer ✓ — « Je l'ai ! » |
| **B** | Envoyer ✗ — « Répète s'il te plaît ! » |

---

*Tu as fini tôt ? Demande à ton instructeur le [[sender-guide-fr|Guide de l'Émetteur]] 🚀*
