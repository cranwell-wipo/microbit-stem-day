---
title: micro:bit STEM Day — Guide des enfants
date: 2026-03-14
status: Active
tags:
  - microbit
  - stem
  - kids
  - guide
---

# 🤖 Construis une radio Morse avec le micro:bit

**Bienvenue à la Journée STEM de l'OMPI !** Aujourd'hui tu vas construire un vrai système de communication radio — comme ceux utilisés par les marins et les explorateurs il y a plus de 100 ans. Tu vas envoyer des messages secrets en points et tirets, et tes amis les décoderont !

---

## C'est quoi le code Morse ?

Le code Morse transforme chaque lettre de l'alphabet en une suite de **points** (signaux courts) et de **tirets** (signaux longs).

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
| M | — — | Z | — · · — |

> [!tip] Essaie !
> Comment on écrit **SOS** en Morse ?
> Réponse : `· · ·` `— — —` `· · ·`

---

## Ce que tu vas construire

> [!abstract] Deux programmes
> **Programme 1 — Le Récepteur** *(tout le monde commence par ça)*
> Ton micro:bit écoute les messages Morse par radio, affiche les points et tirets sur l'écran LED, et te laisse envoyer une réponse ✓ ou ✗.
>
> **Programme 2 — L'Émetteur** *(pour les plus grands ou les plus avancé·e·s)*
> Ton micro:bit te laisse taper des points et des tirets avec les boutons, puis envoie le code Morse par radio à tous les récepteurs.

---

## Ce qu'il te faut

- Un **BBC micro:bit v2** (celui avec le bouton logo doré en haut)
- Un **ordinateur** avec un navigateur ouvert sur : **makecode.microbit.org**
- Un **câble USB** pour connecter ton micro:bit à l'ordinateur

---

## Partie 1 — Le Récepteur

*Tout le monde commence par ça. C'est plus simple et ça marche tout de suite.*

### Comment ça fonctionne

- Quand quelqu'un envoie une lettre Morse par radio, ton micro:bit l'affiche sur l'écran LED en points et tirets
- **Bouton A** → tu as compris ! Envoie ✓ à l'expéditeur
- **Bouton B** → tu veux qu'il répète ! Envoie ✗ à l'expéditeur

### Ce que tu vois sur l'écran

Les symboles apparaissent **de gauche à droite**, une colonne par symbole. Un **point** est une seule LED au milieu de sa colonne. Un **tiret** c'est trois LED en hauteur dans sa colonne — il paraît donc plus grand et plus épais.

```
        col 0   col 1   col 2
        (point) (tiret) (point)

rangée 0:  .       .       .
rangée 1:  .       X       .
rangée 2:  X       X       X
rangée 3:  .       X       .
rangée 4:  .       .       .
```

Ce motif représente la lettre **R** (`· — ·`) — tu vois que la colonne 1 est plus haute que les colonnes 0 et 2 !

---

### Étape par étape : Construire le Récepteur dans MakeCode

**1. Ouvrir MakeCode**

Va sur **makecode.microbit.org** et clique sur **Nouveau Projet**. Nomme-le `morse-receiver`.

---

**2. Configurer le groupe radio**

> [!note] C'est quoi un groupe radio ?
> Tous les micro:bits dans le même groupe peuvent s'entendre — comme être sur le même canal de talkie-walkie. On utilise le **groupe 1** aujourd'hui.

Trouve la catégorie **Radio** (rose). Fais glisser :

```
au démarrage
  définir le groupe radio [ 1 ]
  effacer l'écran
```

---

**3. Créer la fonction `plotMorse`**

Cette fonction lit un code Morse (comme `".-"`) et le dessine sur l'écran LED.

Va dans **Avancé → Fonctions** et clique sur **Créer une fonction**. Nomme-la `plotMorse`. Clique sur **Ajouter un paramètre texte** et nomme-le `pattern`.

À l'intérieur de la fonction :

```
définir plotMorse (pattern)
  effacer l'écran
  pour [i] de 0 à (longueur de [pattern]) - 1
    si caractère [i] de [pattern] = "."   ← (Logique → Comparaisons)
      allumer x [i] y [2]
    sinon
      allumer x [i] y [1]
      allumer x [i] y [2]
      allumer x [i] y [3]
```

> [!warning] Où trouver le bloc `=` ?
> Le bloc de comparaison `=` se trouve dans **Logique → Comparaisons** (pas directement dans Logique !). Clique sur **Logique** puis sur **Comparaisons** pour le voir.

---

**4. Écouter les messages radio**

Depuis **Radio**, fais glisser `quand une donnée est reçue par radio (receivedString)`.

À l'intérieur :

```
quand une donnée est reçue par radio (receivedString)
  si [receivedString] ≠ "ACK"  ET  [receivedString] ≠ "NACK"
    définir [lastReceived] à [receivedString]
    appeler plotMorse (lastReceived)
```

> [!warning] Où trouver `≠` et `ET` ?
> - Le bloc `≠` se trouve dans **Logique → Comparaisons**
> - Le bloc `ET` se trouve dans **Logique → Booléens**

> [!note] Pourquoi ignorer ACK et NACK ?
> L'émetteur écoute lui aussi la radio (pour savoir si tu as reçu le message). On les filtre pour ne pas perturber l'affichage.

---

**5. Bouton A — envoyer ✓**

```
lorsque le bouton [A] est pressé
  envoyer la chaîne "ACK" par radio
  montrer l'icône [✓]
  pause 800 ms
  appeler plotMorse (lastReceived)
```

---

**6. Bouton B — envoyer ✗**

```
lorsque le bouton [B] est pressé
  envoyer la chaîne "NACK" par radio
  montrer l'icône [✗]
  pause 800 ms
  appeler plotMorse (lastReceived)
```

---

**7. Téléverser sur ton micro:bit !**

Clique sur **Télécharger** (en bas à gauche). Connecte ton micro:bit avec le câble USB. Copie le fichier `.hex` téléchargé sur le lecteur **MICROBIT** qui apparaît sur ton ordinateur.

Le voyant jaune au dos va clignoter pendant la copie. Quand il s'arrête, ton programme est en marche !

---

**8. Teste-le !**

Demande à l'instructeur d'envoyer une lettre Morse. Des points et des tirets devraient apparaître sur ton écran LED !

- Appuie sur **A** quand tu as décodé la lettre
- Appuie sur **B** si tu as besoin qu'on te la renvoie

---

## Partie 2 — L'Émetteur

*Pour les plus grand·e·s ou les plus avancé·e·s : et toute personne qui a fini le récepteur tôt !*

### Comment ça fonctionne

- **Bouton A** → tape un **point** (bip court, une LED s'allume)
- **Bouton B** → tape un **tiret** (bip plus long, trois LED s'allument)
- **Logo** (le logo doré en haut) → **envoyer** la lettre ! Affiche la lettre décodée pendant 1 seconde, puis la transmet
- **Secouer** → **annuler** et recommencer à zéro
- Quand les récepteurs envoient **✓** (ACK) → l'émetteur affiche ✓
- Quand les récepteurs envoient **✗** (NACK) → l'émetteur affiche ✗ et **renvoie automatiquement** la dernière lettre

### Étape par étape : Construire l'Émetteur dans MakeCode

**1. Ouvrir MakeCode**

Va sur **makecode.microbit.org** et clique sur **Nouveau Projet**. Nomme-le `morse-sender`.

---

**2. Configurer les variables**

Au début du `au démarrage`, crée trois variables :
- `buffer` = `""` *(les points et tirets que tu construis)*
- `length` = `0` *(combien de symboles tu as tapés)*
- `lastSent` = `""` *(la dernière lettre envoyée, en cas de NACK)*

Puis ajoute :
```
définir le groupe radio [ 1 ]
effacer l'écran
```

---

**3. Configurer le tableau Morse**

> [!warning] C'est la partie la plus difficile — demande de l'aide si besoin !

Tu as besoin de **deux listes** qui se correspondent :
- `morsePatterns` = les codes points-tirets de chaque lettre
- `morseLetters` = les vraies lettres de A à Z

```
définir [morsePatterns] à [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]

définir [morseLetters] à ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

---

**4. Créer la fonction `decodeMorse`**

Cette fonction prend un code comme `".-"` et renvoie la lettre `"A"`.

```
définir decodeMorse (pattern) → renvoie texte
  définir [idx] à trouver l'index de [pattern] dans [morsePatterns]
  si [idx] ≥ 0   ← (Logique → Comparaisons)
    retourner l'élément [idx] de [morseLetters]
  retourner "?"
```

> [!warning] Où trouver `≥` ?
> Le bloc `≥` se trouve dans **Logique → Comparaisons**. Clique sur **Logique** puis sur **Comparaisons** dans le menu.

---

**5. Ajouter la fonction `plotMorse`** *(identique au récepteur !)*

Copie exactement la même fonction que tu as construite pour le récepteur. N'oublie pas : le bloc `=` vient de **Logique → Comparaisons**.

> [!success] C'est la réutilisation du code !
> Les deux programmes partagent la même fonction `plotMorse` — c'est ce que les programmeurs appellent la **réutilisation du code**. On le construit une fois, on l'utilise partout !

---

**6. Bouton A — taper un point**

```
lorsque le bouton [A] est pressé
  si [length] < 4   ← (Logique → Comparaisons)
    jouer la note [La 4] pendant [1/8 temps]
    définir [buffer] à [buffer] joindre "."
    modifier [length] de 1
    appeler plotMorse (buffer)
```

---

**7. Bouton B — taper un tiret**

```
lorsque le bouton [B] est pressé
  si [length] < 4   ← (Logique → Comparaisons)
    jouer la note [La 4] pendant [1/4 temps]
    définir [buffer] à [buffer] joindre "-"
    modifier [length] de 1
    appeler plotMorse (buffer)
```

*Le même que le bouton A mais le bip dure plus longtemps — comme un vrai télégraphe !*

---

**8. Logo — envoyer la lettre**

```
lorsque le logo est pressé
  si (longueur de [buffer]) > 0   ← (Logique → Comparaisons)
    définir [letter] à appeler decodeMorse (buffer)
    afficher la chaîne [letter]
    définir [lastSent] à [buffer]
    envoyer la chaîne [buffer] par radio
    définir [buffer] à ""
    définir [length] à 0
    effacer l'écran
```

---

**9. Secouer — annuler**

```
lorsque secoué
  jouer la note [Do grave] pendant [1/4 temps]
  définir [buffer] à ""
  définir [length] à 0
  effacer l'écran
```

---

**10. Écouter ACK / NACK**

```
quand une donnée est reçue par radio (receivedString)
  si [receivedString] = "ACK"   ← (Logique → Comparaisons)
    montrer l'icône [✓]
    définir [lastSent] à ""
    pause 800 ms
    effacer l'écran
  sinon si [receivedString] = "NACK"   ← (Logique → Comparaisons)
    montrer l'icône [✗]
    pause 800 ms
    si (longueur de [lastSent]) > 0   ← (Logique → Comparaisons)
      envoyer la chaîne [lastSent] par radio
      appeler plotMorse (lastSent)
```

---

**11. Téléverser sur ton micro:bit !**

Pareil qu'avant — clique sur **Télécharger**, puis copie le fichier `.hex` sur le lecteur **MICROBIT**.

---

## On joue ! 🎮

### Manche 1 — Échauffement : une lettre

L'émetteur tape une seule lettre. Tout le monde la décode et appuie sur A (✓) quand il l'a. Le premier à appuyer sur A gagne !

### Manche 2 — Pendu Morse

L'émetteur transmet les lettres une par une. Les récepteurs les décodent et les écrivent. La première équipe à crier le bon mot complet gagne la manche !

### Manche 3 — Chasse au trésor *(si on a de la place)*

Des messages Morse de l'émetteur révèlent des indices cachés dans la salle. Les équipes décodent chaque message, trouvent l'endroit de l'indice, et font la course pour terminer la chaîne !

### Manche 4 — Décodeur le plus rapide *(manche énergie)*

L'instructeur envoie le même mot de 3 lettres à tous les groupes en même temps. Le premier groupe à ACK correctement et à crier le mot décodé gagne !

---

## Guide de longueur des messages

| Manche | Longueur | Exemples |
|--------|----------|---------|
| Échauffement | 1 lettre | `H`, `I`, `E` |
| Principale | 3 lettres | `SOS`, `OUI`, `HI` |
| Défi | Mot court | `HELLO`, `OMPI` |

---

## Conseils & Astuces

> [!tip] Pour les plus jeunes (6–7 ans)
> - Concentre-toi sur le **récepteur** — c'est satisfaisant de voir apparaître les points et tirets instantanément
> - Utilise la carte de l'alphabet Morse imprimée sur ta table pour décoder les lettres
> - Tu n'as pas besoin de connaître le code par cœur — c'est pour ça qu'il y a la carte !

> [!tip] Pour les plus grand·e·s (8–10 ans)
> - Défie-toi d'**envoyer** un mot entier
> - Essaie de mémoriser quelques lettres courtes : **E** = `·`, **T** = `—`, **SOS** = `···———···`
> - Peux-tu décoder une lettre avant de regarder la carte ?

> [!warning] Les sons nécessitent le micro:bit v2
> Les bips (points et tirets) ne fonctionnent que sur le **micro:bit v2** — il a un haut-parleur intégré. Les appareils v1 fonctionneront quand même mais seront silencieux.

---

## Pour aller plus loin 🚀

Fini tôt ? Voici quelques idées :

- **Personnalise ton émetteur** : change les tonalités des points/tirets
- **Ajoute une animation de démarrage** : fais faire un motif sympa aux LED quand le micro:bit s'allume
- **Ajoute un compteur** : compte combien de lettres tu as envoyées avec succès
- **Explore microbit.org** : essaie un cœur qui bat, un animal animé ou un jeu simple
- **Étends le tableau Morse** : peux-tu ajouter les chiffres (0–9) au tableau ?

---

## Référence rapide

### Commandes du récepteur

| Action | Ce qui se passe |
|--------|-----------------|
| Recevoir une lettre Morse | Points/tirets apparaissent à l'écran |
| Appuyer sur **A** | Envoyer ✓ (Je l'ai !) |
| Appuyer sur **B** | Envoyer ✗ (Répète s'il te plaît !) |

### Commandes de l'émetteur

| Action | Ce qui se passe |
|--------|-----------------|
| Appuyer sur **A** | Taper un point `·` (bip court) |
| Appuyer sur **B** | Taper un tiret `—` (bip long) |
| Toucher le **logo** | Envoyer la lettre |
| **Secouer** | Annuler et recommencer |
| Recevoir ✓ | Flash coche, prêt·e |
| Recevoir ✗ | Flash croix, renvoi automatique |

---

*Construit lors de la Journée STEM de l'OMPI — Mars 2026* 🎉
