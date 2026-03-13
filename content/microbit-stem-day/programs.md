---
title: micro:bit STEM Day — Programs
date: 2026-03-12
status: Active
tags:
  - microbit
  - stem
  - code
---

# micro:bit Morse Programs

Two programs, built block by block in **MakeCode** (makecode.microbit.org). Kids build each block step by step during the session — the JavaScript is provided at the end of each section as a facilitator reference only.

**Radio group:** hardcoded per group — change the number in `radio set group [ 1 ]` before sharing with each group.

---

## Display Convention (shared by both programs)

Morse symbols appear **left to right**, one column per symbol. Max 4 symbols (columns 0–3).

| Symbol | What lights up |
|--------|----------------|
| Dot `.` | 1 pixel — centre of column (row 2) |
| Dash `—` | 3 pixels — top/middle/bottom of column (rows 1, 2, 3) |

Example — `R` = `· — ·`:

```
        col 0   col 1   col 2
        (dot)   (dash)  (dot)

row 0:    .       .       .
row 1:    .       X       .
row 2:    X       X       X
row 3:    .       X       .
row 4:    .       .       .
```

Col 0 and col 2: **1 pixel each** (dot). Col 1: **3 pixels tall** (dash).

---

## Program 1 — Receiver

**Who builds it:** Everyone — this is the starting program for all children.

**What it does:**
- Shows received Morse dots/dashes on the LED screen (left to right)
- Button A → sends ✓ back (*I got it!*)
- Button B → sends ✗ back (*Please repeat!*)

---

### Step 1 — on start

From **Basic** (blue), drag **on start** onto the canvas (it may already be there).

Inside it, add two blocks:

- From **Radio** (pink): **radio set group [ 1 ]**
- From **Basic**: **clear screen**

```
┌─ on start ───────────────┐
│  radio set group [ 1 ]   │
│  clear screen            │
└──────────────────────────┘
```

---

### Step 2 — Create the variable `lastReceived`

From **Variables** (red), click **Make a Variable** and name it `lastReceived`.

From **Variables**, drag **set lastReceived to [ "" ]** and place it inside `on start`, below `clear screen`.

---

### Step 3 — Build the `plotMorse` function

> [!info] What is a function?
> A function is a named set of instructions you can call from anywhere. We'll reuse `plotMorse` in several places.

From **Advanced → Functions**, click **Make a Function**. Name it `plotMorse`.

Click **Add a parameter → Text** and name it `pattern`.

Inside the function, build this:

```
┌─ function plotMorse (pattern) ────────────────────────────┐
│  clear screen                                             │
│  for [ i ] from 0 to (length of [ pattern ] - 1)         │
│    if (character [ i ] of [ pattern ]) = "."              │
│      plot x [ i ] y [ 2 ]                                 │
│    else                                                   │
│      plot x [ i ] y [ 1 ]                                 │
│      plot x [ i ] y [ 2 ]                                 │
│      plot x [ i ] y [ 3 ]                                 │
└───────────────────────────────────────────────────────────┘
```

**Where to find each block:**
- `clear screen` → **Basic**
- `for [ i ] from 0 to` → **Loops**
- `length of` → **Text** (under Advanced)
- `character [ ] of` → **Text** (under Advanced)
- `plot x [ ] y [ ]` → **Led**
- The `if / else` → **Logic**
- `= "."` comparison → **Logic**

> [!tip] The dot vs dash rule
> A dot only lights column `i`, row `2` (one pixel). A dash lights column `i`, rows `1`, `2`, and `3` (three pixels tall). That's what makes dashes look longer than dots!

---

### Step 4 — on radio received

From **Radio**, drag **on radio received (receivedString)** onto the canvas.

Inside it, build:

```
┌─ on radio received (receivedString) ──────────────────────┐
│  if (receivedString ≠ "ACK") and (receivedString ≠ "NACK")│
│    set lastReceived to receivedString                      │
│    call plotMorse (lastReceived)                           │
└───────────────────────────────────────────────────────────┘
```

**Where to find each block:**
- `on radio received` → **Radio**
- `if` → **Logic**
- `≠` comparison and `and` → **Logic**
- `set lastReceived to` → **Variables**
- `call plotMorse` → **Advanced → Functions**

> [!note] Why filter out ACK and NACK?
> The sender also listens to the radio. If we don't filter, those replies would accidentally overwrite the Morse display.

---

### Step 5 — Button A (send ✓)

From **Input**, drag **on button [ A ] pressed**.

Inside it, build:

```
┌─ on button A pressed ─────────────────────────────┐
│  radio send string "ACK"                          │
│  show icon [ ✓ ]                                  │
│  pause (ms) [ 800 ]                               │
│  call plotMorse (lastReceived)                    │
└───────────────────────────────────────────────────┘
```

**Where to find each block:**
- `radio send string` → **Radio**
- `show icon` → **Basic** (pick the tick ✓)
- `pause (ms)` → **Basic**
- `call plotMorse` → **Advanced → Functions**

---

### Step 6 — Button B (send ✗)

From **Input**, drag **on button [ B ] pressed**.

Inside it, build the same as Button A but with `"NACK"` and the cross ✗ icon:

```
┌─ on button B pressed ─────────────────────────────┐
│  radio send string "NACK"                         │
│  show icon [ ✗ ]                                  │
│  pause (ms) [ 800 ]                               │
│  call plotMorse (lastReceived)                    │
└───────────────────────────────────────────────────┘
```

---

### Step 7 — Flash and test!

Click **Download** (bottom left of MakeCode). Connect your micro:bit. Copy the `.hex` file to the MICROBIT drive. When the yellow light stops flashing — you're done!

Ask the instructor to send a Morse letter. Dots and dashes should appear on your screen!

---

### JavaScript reference (facilitator)

> [!example]- Click to expand — Receiver JavaScript
> ```javascript
> let lastReceived = ""
> radio.setGroup(1)
> basic.clearScreen()
>
> function plotMorse(pattern: string) {
>     basic.clearScreen()
>     for (let i = 0; i < pattern.length; i++) {
>         if (pattern.charAt(i) == ".") {
>             led.plot(i, 2)
>         } else {
>             led.plot(i, 1)
>             led.plot(i, 2)
>             led.plot(i, 3)
>         }
>     }
> }
>
> radio.onReceivedString(function (receivedString) {
>     if (receivedString != "ACK" && receivedString != "NACK") {
>         lastReceived = receivedString
>         plotMorse(lastReceived)
>     }
> })
>
> input.onButtonPressed(Button.A, function () {
>     radio.sendString("ACK")
>     basic.showIcon(IconNames.Yes)
>     basic.pause(800)
>     plotMorse(lastReceived)
> })
>
> input.onButtonPressed(Button.B, function () {
>     radio.sendString("NACK")
>     basic.showIcon(IconNames.No)
>     basic.pause(800)
>     plotMorse(lastReceived)
> })
> ```

---

## Program 2 — Sender

**Who builds it:** Older / more advanced children (ages 9–10), and anyone who finishes the receiver early.

**What it does:**
- Button A → tap a **dot** (short beep, one LED column)
- Button B → tap a **dash** (longer beep, three LED column)
- Logo (gold touch pad at top) → **send** the letter — shows the decoded letter briefly, then transmits
- Shake → **cancel** and start over
- Receives ✓ from a receiver → flashes tick
- Receives ✗ from a receiver → flashes cross, then **auto-resends** the last letter

---

### Step 1 — on start

```
┌─ on start ──────────────────────┐
│  radio set group [ 1 ]          │
│  clear screen                   │
│  set buffer to ""               │
│  set length to 0                │
│  set lastSent to ""             │
└─────────────────────────────────┘
```

Create three variables: `buffer`, `length`, `lastSent` (from **Variables → Make a Variable**).

---

### Step 2 — Set up the Morse lookup lists

> [!warning] Trickiest step — do this together as a group!

Create two list variables: `morsePatterns` and `morseLetters`.

From **Variables**, make a variable called `morsePatterns`. Then from **Arrays** (under Advanced), use **set [ morsePatterns ] to array of** and add all 26 entries in order:

```
morsePatterns = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
                 "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
                 "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
                 "-.--", "--.."]
```

Do the same for `morseLetters`:

```
morseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
                "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
```

> [!tip] Why two lists?
> They match up — position 0 is `".-"` and `"A"`, position 1 is `"-..."` and `"B"`, and so on. To decode a pattern, we just find its position in the first list and look up the same position in the second list.

---

### Step 3 — Build `plotMorse`

Same function as the receiver — build it identically. `plot x [i] y [2]` for dot, `plot x [i] y [1/2/3]` for dash.

> [!success] This is code reuse!
> Programmers write a function once and use it in many places. `plotMorse` is exactly the same in both programs.

---

### Step 4 — Build `decodeMorse`

From **Advanced → Functions**, make a new function called `decodeMorse`. Add a **text** parameter called `pattern`.

```
┌─ function decodeMorse (pattern) ──────────────────────────┐
│  set idx to find index of [ pattern ] in [ morsePatterns ]│
│  if [ idx ] ≥ 0                                           │
│    return get value at [ idx ] of [ morseLetters ]        │
│  return "?"                                               │
└───────────────────────────────────────────────────────────┘
```

**Where to find each block:**
- `find index of [ ] in` → **Arrays** (under Advanced)
- `get value at [ ] of` → **Arrays** (under Advanced)
- `≥` comparison → **Logic**
- `return` → inside the function editor

---

### Step 5 — Button A (dot)

```
┌─ on button A pressed ─────────────────────────────┐
│  if [ length ] < 4                                │
│    play tone [ Middle A ] for [ 1 beat / 8 ]      │
│    set buffer to (buffer join ".")                │
│    change length by 1                             │
│    call plotMorse (buffer)                        │
└───────────────────────────────────────────────────┘
```

**Where to find each block:**
- `play tone` → **Music**
- `join` → **Text** (under Advanced)
- `change [ ] by 1` → **Variables**

> [!note] Why `length < 4`?
> The longest Morse letter uses 4 symbols (e.g. B = `—···`). We stop at 4 to keep everything on screen.

---

### Step 6 — Button B (dash)

Same as Button A, but the tone is longer:

```
┌─ on button B pressed ─────────────────────────────┐
│  if [ length ] < 4                                │
│    play tone [ Middle A ] for [ 1 beat / 4 ]      │
│    set buffer to (buffer join "-")                │
│    change length by 1                             │
│    call plotMorse (buffer)                        │
└───────────────────────────────────────────────────┘
```

*`1 beat / 8` = short beep (dot). `1 beat / 4` = longer beep (dash). Just like a real telegraph!*

---

### Step 7 — Logo (send the letter)

From **Input**, drag **on logo [ pressed ]**.

```
┌─ on logo pressed ──────────────────────────────────────┐
│  if (length of buffer) > 0                             │
│    set letter to call decodeMorse (buffer)             │
│    show string [ letter ]                              │
│    set lastSent to buffer                              │
│    radio send string [ buffer ]                        │
│    set buffer to ""                                    │
│    set length to 0                                     │
│    clear screen                                        │
└────────────────────────────────────────────────────────┘
```

> [!tip] What does the logo do?
> It reads what's in `buffer` (your dots and dashes), looks up the matching letter, briefly shows it on screen so you know what you sent, then transmits the pattern over radio to all receivers.

---

### Step 8 — Shake (cancel)

From **Input**, drag **on shake**.

```
┌─ on shake ────────────────────────────────────────┐
│  play tone [ Low C ] for [ 1 beat / 4 ]           │
│  set buffer to ""                                 │
│  set length to 0                                  │
│  clear screen                                     │
└───────────────────────────────────────────────────┘
```

---

### Step 9 — on radio received (ACK / NACK)

From **Radio**, drag **on radio received (receivedString)**.

```
┌─ on radio received (receivedString) ──────────────────────┐
│  if [ receivedString ] = "ACK"                            │
│    show icon [ ✓ ]                                        │
│    set lastSent to ""                                     │
│    pause (ms) [ 800 ]                                     │
│    clear screen                                           │
│  else if [ receivedString ] = "NACK"                      │
│    show icon [ ✗ ]                                        │
│    pause (ms) [ 800 ]                                     │
│    if (length of lastSent) > 0                            │
│      radio send string [ lastSent ]                       │
│      call plotMorse (lastSent)                            │
└───────────────────────────────────────────────────────────┘
```

> [!note] What happens on NACK?
> The sender shows ✗ for 800ms, then automatically resends the last letter and re-draws it on screen. The receivers will see the dots and dashes again.

---

### Step 10 — Flash and test!

Download and flash the same way as the receiver. You're ready to send!

---

### JavaScript reference (facilitator)

> [!example]- Click to expand — Sender JavaScript
> ```javascript
> let buffer = ""
> let length = 0
> let lastSent = ""
>
> let morsePatterns = [
>     ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
>     "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
>     "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
>     "-.--", "--.."
> ]
> let morseLetters = [
>     "A", "B", "C", "D", "E", "F", "G", "H",
>     "I", "J", "K", "L", "M", "N", "O", "P",
>     "Q", "R", "S", "T", "U", "V", "W", "X",
>     "Y", "Z"
> ]
>
> radio.setGroup(1)
> basic.clearScreen()
>
> function decodeMorse(pattern: string): string {
>     let idx = morsePatterns.indexOf(pattern)
>     if (idx >= 0) return morseLetters[idx]
>     return "?"
> }
>
> function plotMorse(pattern: string) {
>     basic.clearScreen()
>     for (let i = 0; i < pattern.length; i++) {
>         if (pattern.charAt(i) == ".") {
>             led.plot(i, 2)
>         } else {
>             led.plot(i, 1)
>             led.plot(i, 2)
>             led.plot(i, 3)
>         }
>     }
> }
>
> input.onButtonPressed(Button.A, function () {
>     if (length < 4) {
>         music.playTone(440, 100)
>         buffer += "."
>         length += 1
>         plotMorse(buffer)
>     }
> })
>
> input.onButtonPressed(Button.B, function () {
>     if (length < 4) {
>         music.playTone(440, 300)
>         buffer += "-"
>         length += 1
>         plotMorse(buffer)
>     }
> })
>
> input.onLogoEvent(TouchButtonEvent.Pressed, function () {
>     if (buffer.length > 0) {
>         let letter = decodeMorse(buffer)
>         basic.showString(letter)
>         lastSent = buffer
>         radio.sendString(buffer)
>         buffer = ""
>         length = 0
>         basic.clearScreen()
>     }
> })
>
> input.onGesture(Gesture.Shake, function () {
>     music.playTone(220, 200)
>     buffer = ""
>     length = 0
>     basic.clearScreen()
> })
>
> radio.onReceivedString(function (receivedString) {
>     if (receivedString == "ACK") {
>         basic.showIcon(IconNames.Yes)
>         lastSent = ""
>         basic.pause(800)
>         basic.clearScreen()
>     } else if (receivedString == "NACK") {
>         basic.showIcon(IconNames.No)
>         basic.pause(800)
>         if (lastSent.length > 0) {
>             radio.sendString(lastSent)
>             plotMorse(lastSent)
>         }
>     }
> })
> ```

---

## Notes for facilitators

- Build `plotMorse` **together as a class** before splitting into receiver/sender — it's identical in both programs
- The **receiver** is the natural warm-up: fewer concepts, works quickly, immediately satisfying to test
- The **sender** builds on top — kids who finish the receiver early can move straight to it
- The **Morse lookup table** (two parallel lists + find index) is the hardest concept in the sender — worth a short group explanation before that step: *"the two lists are like two columns in a table — always the same length, always lined up"*
- All sounds require **micro:bit v2** (built-in speaker). v1 devices work but will be silent
