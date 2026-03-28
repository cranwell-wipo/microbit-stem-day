---
title: "Build a Morse Receiver 📻"
date: 2026-03-14
tags: [microbit, stem, kids]
aliases:
  - microbit-stem-day/receiver-guide
  - receiver-guide
---

# Build a Morse Receiver 📻

You're going to build a radio that shows Morse code on your screen — and lets you reply to the sender!

**You'll need:** your micro:bit, a USB cable, and a laptop open to **makecode.microbit.org**

---

## Step 1 — Open MakeCode

![[receiver-01-new-project.png]]

1. Go to **makecode.microbit.org**
2. Click **New Project**
3. Name it `morse-receiver`
4. Click **Create**

> [!tip]
> MakeCode is where you drag blocks to build your program — like Lego, but for code!

---

## Step 2 — Set the radio group

![[receiver-02-on-start.png]]

1. Find **Radio** in the left menu (it's pink 🩷)
2. Drag `radio set group [ 1 ]` into the **on start** block
3. Find **Basic** (blue) and drag `clear screen` below it

> [!tip]
> Group 1 is your team's radio channel — only micro:bits in group 1 can hear each other.

---

## Step 3 — Build the `plotMorse` function

![[receiver-03-plotmorse.png]]

1. Go to **Advanced → Functions** and click **Make a Function**
2. Name it `plotMorse` — click **Add a text parameter** and name it `pattern`
3. Inside the function, add `clear screen` (from **Basic**)
4. Add a `for` loop from **Loops** — `for [ i ] from 0 to (length of pattern − 1)`
   - For `length of`: go to **Advanced → Text**
5. Inside the loop, add an `if / else` block from **Logic**
6. For the **`if` condition**:
   - Go to **Advanced → Text** and pick the text `=` comparison block
   - Left side: pick `character [ ] of [ ]`, fill in `i` and `pattern`
   - Right side: type `"."`
7. In the **`if`**: `plot x [ i ] y [ 2 ]` (from **LED**)
8. In the **`else`**: add three `plot` blocks:
   - `plot x [ i ] y [ 1 ]`
   - `plot x [ i ] y [ 2 ]`
   - `plot x [ i ] y [ 3 ]`

> [!tip]
> A dot lights up **1 LED** (the middle one). A dash lights up **3** (top, middle, bottom) — so it looks taller on the screen!

---

## Step 4 — Listen for radio messages

![[receiver-04-radio-received.png]]

1. From **Radio**, drag `on radio received (receivedString)` onto the canvas
2. Add an `if` block from **Logic** inside it
3. For the **`if` condition**:
   - Go to **Logic → Boolean** and pick the `and` block
   - Left side: go to **Logic → Comparisons**, pick `≠`, then set `receivedString ≠ "ACK"`
   - Right side: go to **Logic → Comparisons**, pick `≠`, then set `receivedString ≠ "NACK"`
4. Inside the if: `set lastReceived to receivedString`, then `call plotMorse (lastReceived)`

> [!tip]
> We ignore ACK and NACK so they don't mess up the dots and dashes on your screen.

---

## Step 5 — Button A: send ✓

![[receiver-05-button-a.png]]

1. From **Input**, drag `on button [A] pressed`
2. Inside it, add:
   - `radio send string "ACK"` (from **Radio**)
   - `show icon [✓]` (from **Basic** — pick the tick)
   - `pause (ms) [800]` (from **Basic**)
   - `call plotMorse (lastReceived)` (from **Advanced → Functions**)

> [!tip]
> Press A when you've decoded the letter — it tells the sender "I got it! ✓"

---

## Step 6 — Button B: send ✗

![[receiver-06-button-b.png]]

1. From **Input**, drag `on button [B] pressed`
2. Inside it, add:
   - `radio send string "NACK"` (from **Radio**)
   - `show icon [✗]` (from **Basic** — pick the cross)
   - `pause (ms) [800]` (from **Basic**)
   - `call plotMorse (lastReceived)` (from **Advanced → Functions**)

> [!tip]
> Press B if you need the sender to repeat the letter.

---

## Step 7 — Flash it to your micro:bit! 🚀

![[receiver-07-download.png]]

1. Click **Download** at the bottom of the screen
2. Connect your micro:bit with the USB cable
3. Copy the `.hex` file onto the **MICROBIT** drive that appears
4. Wait for the yellow light to stop flashing — you're done!

> [!tip]
> When the yellow light stops, your program is running. Ask the instructor to send a letter!

---

## You're ready! 🎉

When a Morse letter arrives, dots and dashes appear on your screen.

| Button | What it does |
|--------|-------------|
| **A** | Send ✓ — "I got it!" |
| **B** | Send ✗ — "Please repeat!" |

---

*Finished early? Ask your instructor about the [[sender-guide|Sender Guide]] 🚀*
