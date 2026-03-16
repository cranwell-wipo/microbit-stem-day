---
title: "Construis un émetteur Morse 📡"
date: 2026-03-14
tags: [microbit, stem, kids]
---

# Construis un émetteur Morse 📡

Tu as terminé le récepteur — maintenant il est temps de passer au niveau supérieur ! 🚀
Tu vas construire l'émetteur : tape des points et des tirets, et envoie du code Morse par radio à tout le monde.

**Ce qu'il te faut :** ton micro:bit, un câble USB et un ordinateur ouvert sur **makecode.microbit.org**

---

## Étape 1 — Ouvrir MakeCode

1. Va sur **makecode.microbit.org**
2. Clique sur **Nouveau Projet**
3. Nomme-le `morse-sender`
4. Clique sur **Créer**

> [!tip]
> C'est un tout nouveau programme — séparé de ton récepteur !

---

## Étape 2 — Configurer tes variables

![[sender-01-variables-fr.png]]

1. Depuis **Variables**, clique sur **Créer une variable** et crée trois variables :
   - `buffer` — stocke les points et tirets que tu tapes
   - `length` — compte combien de symboles tu as ajoutés
   - `lastSent` — se souvient de la dernière lettre envoyée
2. Fais glisser `définir buffer à ""`, `définir length à 0`, `définir lastSent à ""` dans le bloc **au démarrage**
3. Depuis **Radio**, fais glisser `définir le groupe radio [ 1 ]` dans **au démarrage**
4. Depuis **De base**, fais glisser `effacer l'écran` dans **au démarrage**

> [!tip]
> Les variables sont comme des boîtes qui mémorisent des choses pendant l'exécution de ton programme.

---

> [!info]- Le tableau Morse est déjà dans ton modèle — clique ici seulement si tu es curieux·se
>
> Le modèle que tu as reçu contient déjà les tableaux `morsePatterns` et `morseLetters`. Tu n'as pas besoin de les construire !
>
> ![[sender-02-morse-lists-fr.png]]
>
> Les deux tableaux contiennent les 26 lettres dans l'ordre — la position 0 correspond à `".-"` / `"A"`, la position 1 à `"-..."` / `"B"`, etc. Ils correspondent toujours pour que le décodeur puisse retrouver n'importe quelle lettre.

---

## Étape 3 — Construire la fonction `plotMorse`

![[sender-03-plotmorse-fr.png]]

C'est la **même fonction** que dans ton récepteur — construis-la de façon identique :

1. Va dans **Avancé → Fonctions**, clique sur **Créer une fonction**, nomme-la `plotMorse`
2. Clique sur **Ajouter un paramètre texte** et nomme-le `pattern`
3. À l'intérieur : ajoute `effacer l'écran` (depuis **De base**)
4. Ajoute une boucle `pour` depuis **Boucles** — `pour [ i ] de 0 à (longueur de pattern − 1)`
   - Pour `longueur de` : va dans **Avancé → Texte**
5. À l'intérieur de la boucle, ajoute un bloc `si / sinon` depuis **Logique**
6. Pour la **condition du `si`** :
   - Va dans **Avancé → Texte** et prends le bloc de comparaison de texte `=`
   - À gauche : prends `caractère [ ] de [ ]`, mets `i` et `pattern`
   - À droite : tape `"."`
7. Dans le **`si`** : `allumer x [ i ] y [ 2 ]` (depuis **LED**)
8. Dans le **`sinon`** : `allumer x [ i ] y [ 1 ]`, `allumer x [ i ] y [ 2 ]`, `allumer x [ i ] y [ 3 ]`

> [!tip]
> Les programmeurs construisent une fonction une fois et l'utilisent partout — c'est exactement ce que tu fais !

---

## Étape 4 — Construire la fonction `decodeMorse`

![[sender-04-decodemorse-fr.png]]

1. Va dans **Avancé → Fonctions**, clique sur **Créer une fonction**, nomme-la `decodeMorse`
2. Clique sur **Ajouter un paramètre texte** et nomme-le `pattern`, puis configure le **type de retour** sur **Texte**
3. À l'intérieur, depuis **Avancé → Tableaux**, ajoute `définir idx à trouver l'index de [ pattern ] dans [ morsePatterns ]`
4. Ajoute un bloc `si` depuis **Logique** :
   - Va dans **Logique → Comparaisons** et prends `≥`, configure : `idx ≥ 0`
   - À l'intérieur du `si` : `retourner` — depuis **Avancé → Tableaux**, prends `obtenir la valeur à [ idx ] de [ morseLetters ]`
5. En dessous du `si` : `retourner "?"`

> [!tip]
> Cette fonction cherche ton code de points-tirets dans la liste et te dit quelle lettre correspond !

---

## Étape 5 — Bouton A : taper un point

![[sender-05-button-a-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque le bouton [ A ] est pressé`
2. Depuis **Logique**, ajoute un bloc `si`
   - Va dans **Logique → Comparaisons**, prends `<`, et configure : `length < 4`
3. À l'intérieur du `si`, ajoute :
   - `jouer la note [ La 4 ] pendant [ 1/8 temps ]` (depuis **Musique**)
   - `définir buffer à (buffer joindre ".")` — depuis **Variables** pour `buffer`, et **Avancé → Texte** pour `joindre`
   - `modifier length de 1` (depuis **Variables**)
   - `appeler plotMorse (buffer)` (depuis **Avancé → Fonctions**)

> [!tip]
> Le bip court ressemble à un vrai point de télégraphe — et une LED s'allume sur l'écran !

---

## Étape 6 — Bouton B : taper un tiret

![[sender-06-button-b-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque le bouton [ B ] est pressé`
2. Depuis **Logique**, ajoute un bloc `si`
   - Va dans **Logique → Comparaisons**, prends `<`, et configure : `length < 4`
3. À l'intérieur du `si`, ajoute :
   - `jouer la note [ La 4 ] pendant [ 1/4 temps ]` (depuis **Musique** — plus long que A !)
   - `définir buffer à (buffer joindre "-")` — depuis **Variables** + **Avancé → Texte**
   - `modifier length de 1` (depuis **Variables**)
   - `appeler plotMorse (buffer)` (depuis **Avancé → Fonctions**)

> [!tip]
> Le bip plus long ressemble à un tiret — comme un vrai télégraphe !

---

## Étape 7 — Logo : envoyer la lettre

![[sender-07-logo-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque le logo est pressé`
2. Depuis **Logique**, ajoute un bloc `si`
   - Va dans **Logique → Comparaisons**, prends `>`, et configure : `(longueur de buffer) > 0`
   - Pour `longueur de` : va dans **Avancé → Texte**
3. À l'intérieur du `si`, ajoute :
   - `définir letter à appeler decodeMorse (buffer)` (depuis **Variables** + **Avancé → Fonctions**)
   - `afficher la chaîne [ letter ]` (depuis **De base**)
   - `définir lastSent à buffer`
   - `envoyer la chaîne [ buffer ]` par radio (depuis **Radio**)
   - `définir buffer à ""`
   - `définir length à 0`
   - `effacer l'écran`

> [!tip]
> Le logo affiche brièvement la lettre que tu as envoyée — puis la transmet à tous les récepteurs !

---

## Étape 8 — Secouer : annuler

![[sender-08-shake-fr.png]]

1. Depuis **Entrée**, fais glisser `lorsque secoué`
2. À l'intérieur, ajoute :
   - `jouer la note [ Do grave ] pendant [ 1/4 temps ]` (depuis **Musique**)
   - `définir buffer à ""`
   - `définir length à 0`
   - `effacer l'écran`

> [!tip]
> Secoue pour effacer et recommencer ta lettre.

---

## Étape 9 — Écouter les réponses

![[sender-09-radio-received-fr.png]]

1. Depuis **Radio**, fais glisser `quand une donnée est reçue par radio (receivedString)`
2. Depuis **Logique**, ajoute un bloc `si / sinon si`
3. Pour le **premier `si`** :
   - Va dans **Logique → Comparaisons**, prends `=`, et configure : `receivedString = "ACK"`
   - À l'intérieur : `montrer l'icône [✓]`, `définir lastSent à ""`, `pause (ms) [ 800 ]`, `effacer l'écran`
4. Pour le **`sinon si`** :
   - Va dans **Logique → Comparaisons**, prends `=`, et configure : `receivedString = "NACK"`
   - À l'intérieur : `montrer l'icône [✗]`, `pause (ms) [ 800 ]`
   - Ajoute un autre `si` — va dans **Logique → Comparaisons**, prends `>`, configure : `(longueur de lastSent) > 0`
   - À l'intérieur : `envoyer la chaîne [ lastSent ]` par radio, puis `appeler plotMorse (lastSent)`

> [!tip]
> Si tu reçois un ✗, ton micro:bit renvoie automatiquement la lettre — pas besoin de la retaper !

---

## Étape 10 — Téléverser sur ton micro:bit ! 🚀

1. Clique sur **Télécharger** en bas de l'écran
2. Connecte ton micro:bit avec le câble USB
3. Copie le fichier `.hex` sur le lecteur **MICROBIT** qui apparaît
4. Attends que le voyant jaune s'arrête de clignoter — tu es prêt·e à transmettre !

> [!tip]
> Essaie d'envoyer la lettre E en premier — c'est juste un point : appuie une fois sur A, puis touche le logo !

---

## Tu es prêt·e ! 🎉

| Action | Ce que ça fait |
|--------|----------------|
| Appuyer sur **A** | Taper un point `·` (bip court) |
| Appuyer sur **B** | Taper un tiret `—` (bip long) |
| Toucher le **logo** | Envoyer la lettre |
| **Secouer** | Annuler et recommencer |
| Recevoir ✓ | Flash coche — ils l'ont eu ! |
| Recevoir ✗ | Flash croix — renvoi automatique |

---

*[[receiver-guide-fr|← Retour au Guide du Récepteur]]*
