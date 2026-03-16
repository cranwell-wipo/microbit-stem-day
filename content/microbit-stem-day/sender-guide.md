---
title: "Build a Morse Sender 📡"
date: 2026-03-14
tags: [microbit, stem, kids]
---

# Build a Morse Sender 📡

You finished the receiver — now it's time to level up! 🚀
You're going to build the transmitter: tap dots and dashes, and send Morse code over the radio to everyone else.

**You'll need:** your micro:bit, a USB cable, and a laptop open to **makecode.microbit.org**

---

## Step 1 — Open MakeCode

1. Go to **makecode.microbit.org**
2. Click **New Project**
3. Name it `morse-sender`
4. Click **Create**

> [!tip]
> This is a brand new program — separate from your receiver!

---

## Step 2 — Set up your variables

![[sender-01-variables.png]]

1. From **Variables**, click **Make a Variable** and create three variables:
   - `buffer` — stores the dots and dashes you tap
   - `length` — counts how many symbols you've added
   - `lastSent` — remembers the last letter you sent
2. Drag `set buffer to ""`, `set length to 0`, `set lastSent to ""` into **on start**
3. From **Radio**, drag `radio set group [ 1 ]` into **on start**
4. From **Basic**, drag `clear screen` into **on start**

> [!tip]
> Variables are like boxes that remember things while your program runs.

---

> [!info]- The Morse code table is already in your template — click here only if curious
>
> The template you received already has `morsePatterns` and `morseLetters` filled in. You don't need to build this yourself!
>
> ![[sender-02-morse-lists.png]]
>
> The two arrays contain all 26 letters in order — position 0 is `".-"` / `"A"`, position 1 is `"-..."` / `"B"`, and so on. They always match up so the decoder can find any letter.

---

## Step 3 — Build the `plotMorse` function

![[sender-03-plotmorse.png]]

This is the **same function** as in your receiver — build it identically:

1. Go to **Advanced → Functions**, click **Make a Function**, name it `plotMorse`
2. Add a **text** parameter called `pattern`
3. Inside: add `clear screen` (from **Basic**)
4. Add a `for` loop from **Loops** — `for [ i ] from 0 to (length of pattern − 1)`
   - For `length of`: go to **Advanced → Text**
5. Inside the loop, add an `if / else` block from **Logic**
6. For the **`if` condition**:
   - Go to **Advanced → Text** and pick the text `=` comparison block
   - Left side: pick `character [ ] of [ ]`, fill in `i` and `pattern`
   - Right side: type `"."`
7. In the **`if`**: `plot x [ i ] y [ 2 ]` (from **LED**)
8. In the **`else`**: `plot x [ i ] y [ 1 ]`, `plot x [ i ] y [ 2 ]`, `plot x [ i ] y [ 3 ]`

> [!tip]
> Programmers build a function once and use it everywhere — that's exactly what you're doing!

---

## Step 4 — Build the `decodeMorse` function

![[sender-04-decodemorse.png]]

1. Go to **Advanced → Functions**, click **Make a Function**, name it `decodeMorse`
2. Add a **text** parameter called `pattern`, then set **Return type** to **Text**
3. Inside, add `set idx to find index of [ pattern ] in [ morsePatterns ]` (from **Advanced → Arrays**)
4. Add an `if` block from **Logic**:
   - Go to **Logic → Comparisons**, pick `≥`, set `idx ≥ 0`
   - Inside the if: return `get value at [ idx ] of [ morseLetters ]` (from **Advanced → Arrays**)
5. Below the if, add: return `"?"`

> [!tip]
> This finds your dot-dash pattern in the list and tells you which letter it matches!

---

## Step 5 — Button A: tap a dot

![[sender-05-button-a.png]]

1. From **Input**, drag `on button [A] pressed`
2. Add an `if` block from **Logic**:
   - Go to **Logic → Comparisons**, pick `<`, set `length < 4`
3. Inside the if, add:
   - `play tone [ Middle A ] for [ 1/8 beat ]` (from **Music**)
   - `set buffer to (buffer join ".")` (from **Variables** + **Advanced → Text**)
   - `change length by 1` (from **Variables**)
   - `call plotMorse (buffer)` (from **Advanced → Functions**)

> [!tip]
> The short beep sounds like a real telegraph dot — and an LED lights up on screen!

---

## Step 6 — Button B: tap a dash

![[sender-06-button-b.png]]

1. From **Input**, drag `on button [B] pressed`
2. Add an `if` block from **Logic**:
   - Go to **Logic → Comparisons**, pick `<`, set `length < 4`
3. Inside the if, add:
   - `play tone [ Middle A ] for [ 1/4 beat ]` (from **Music** — longer than A!)
   - `set buffer to (buffer join "-")` (from **Variables** + **Advanced → Text**)
   - `change length by 1` (from **Variables**)
   - `call plotMorse (buffer)` (from **Advanced → Functions**)

> [!tip]
> The longer beep sounds like a dash — just like a real telegraph!

---

## Step 7 — Logo: send the letter

![[sender-07-logo.png]]

1. From **Input**, drag `on logo [pressed]`
2. Add an `if` block from **Logic**:
   - Go to **Logic → Comparisons**, pick `>`, set `(length of buffer) > 0`
   - For `length of`: go to **Advanced → Text**
3. Inside the if, add:
   - `set letter to call decodeMorse (buffer)` (from **Variables** + **Advanced → Functions**)
   - `show string [ letter ]` (from **Basic**)
   - `set lastSent to buffer`
   - `radio send string [ buffer ]` (from **Radio**)
   - `set buffer to ""`
   - `set length to 0`
   - `clear screen`

> [!tip]
> The logo briefly shows you which letter you sent — then transmits it to all receivers!

---

## Step 8 — Shake: cancel

![[sender-08-shake.png]]

1. From **Input**, drag `on shake`
2. Inside, add:
   - `play tone [ Low C ] for [ 1/4 beat ]` (from **Music**)
   - `set buffer to ""`
   - `set length to 0`
   - `clear screen`

> [!tip]
> Shake to wipe the slate clean and start your letter again.

---

## Step 9 — Listen for replies

![[sender-09-radio-received.png]]

1. From **Radio**, drag `on radio received (receivedString)`
2. Add an `if / else if` block from **Logic**
3. For the **first `if`**:
   - Go to **Logic → Comparisons**, pick `=`, set `receivedString = "ACK"`
   - Inside: `show icon [✓]`, `set lastSent to ""`, `pause (ms) [800]`, `clear screen`
4. For the **`else if`**:
   - Go to **Logic → Comparisons**, pick `=`, set `receivedString = "NACK"`
   - Inside: `show icon [✗]`, `pause (ms) [800]`
   - Add another `if`: go to **Logic → Comparisons**, pick `>`, set `(length of lastSent) > 0`
   - Inside: `radio send string [ lastSent ]`, then `call plotMorse (lastSent)`

> [!tip]
> If you get a ✗, your micro:bit automatically resends the letter — no need to tap it again!

---

## Step 10 — Flash it to your micro:bit! 🚀

1. Click **Download** at the bottom of the screen
2. Connect your micro:bit with the USB cable
3. Copy the `.hex` file onto the **MICROBIT** drive that appears
4. Wait for the yellow light to stop flashing — you're ready to transmit!

> [!tip]
> Try sending the letter E first — it's just one dot: press A once, then touch the logo!

---

## You're ready! 🎉

| Action | What happens |
|--------|-------------|
| Press **A** | Tap a dot `·` (short beep) |
| Press **B** | Tap a dash `—` (long beep) |
| Touch **logo** | Send the letter |
| **Shake** | Cancel and start over |
| Receive ✓ | Flash tick — they got it! |
| Receive ✗ | Flash cross — auto-resends |

---

*[[receiver-guide|← Back to Receiver Guide]]*
