---
title: micro:bit STEM Day — Kids Guide
date: 2026-03-12
status: Active
tags:
  - microbit
  - stem
  - kids
aliases:
  - microbit-stem-day/kids-guide
  - kids-guide
  - guide
---

# 🤖 Build a Morse Code Radio with micro:bit

**Welcome to STEM Day!** Today you're going to build a real radio communication system — just like the ones used by sailors and explorers over 100 years ago. You'll send secret messages using dots and dashes, and your friends will decode them!

---

## What is Morse Code?

Morse code turns each letter of the alphabet into a pattern of **dots** (short signals) and **dashes** (long signals).

| Letter | Morse | Letter | Morse |
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

> [!tip] Try it!
> How do you spell **SOS** in Morse?
> Answer: `· · ·` `— — —` `· · ·`

---

## What You'll Build

> [!abstract] Four programs
> **Warm-up — Marco Polo** *(everyone builds this together)*
> Your micro:bit sends and receives messages over radio. Press A to call "Marco", press B to reply "Polo"!
>
> **Simple Morse Transceiver** *(everyone builds this — main afternoon activity)*
> One program that makes your micro:bit both a sender and a receiver! Press A for dot, B for dash, A+B for end of letter, shake for end of word. You decode with your Morse card. See the [[simple-morse-guide|Simple Morse Guide]].
>
> **Advanced Receiver** *(optional, for kids who want more)*
> Your micro:bit listens for Morse messages over radio, shows the dots and dashes on the LED screen, and lets you send a ✓ or ✗ reply.
>
> **Advanced Sender** *(optional, for older/more advanced kids)*
> Your micro:bit lets you tap dots and dashes with the buttons, then sends the Morse pattern over radio to all the receivers.

---

## What You Need

- A **BBC micro:bit v2** (the one with the shiny logo button at the top)
- A **laptop** with a browser open to: **makecode.microbit.org**
- A **USB cable** to connect your micro:bit to the laptop

---

## Warm-up — Marco Polo

*Everyone builds this together. It's the simplest radio program — only 4 blocks!*

### How it works

- Press **Button A** → sends "Marco" to all micro:bits in your group
- Press **Button B** → sends "Polo" to all micro:bits in your group
- When you receive a message, it scrolls across your LED screen

### Step-by-step: Build Marco Polo in MakeCode

**1. Open MakeCode**

Go to **makecode.microbit.org** and click **New Project**. Name it `marco-polo`.

---

**2. Set the radio group**

> [!note] What is a radio group?
> All micro:bits in the same group can hear each other — like being on the same walkie-talkie channel.

Find the **Radio** category (pink). Drag in:

```
on start
  radio set group [ 1 ]
```

---

**3. Button A — send "Marco"**

From **Input**, drag **on button [ A ] pressed**. Inside it, from **Radio**, add:

```
on button [A] pressed
  radio send string "Marco"
```

---

**4. Button B — send "Polo"**

From **Input**, drag **on button [ B ] pressed**. Inside it:

```
on button [B] pressed
  radio send string "Polo"
```

---

**5. Show received messages**

From **Radio**, drag **on radio received (receivedString)**. Inside it, from **Basic**, add **show string** and drag the `receivedString` variable into it:

```
on radio received (receivedString)
  show string [ receivedString ]
```

---

**6. Flash and test!**

Click **Download**, connect your micro:bit, copy the `.hex` file. Now press **A** — does "Marco" appear on your friend's screen? Try pressing **B** to reply "Polo"!

---

**7. Bonus: add sounds!**

From **Music**, add `play tone` blocks to your buttons:
- Button A: `play tone [ Low C ] for [ 1 beat ]`
- Button B: `play tone [ Middle C ] for [ 1 beat ]`

Now each call and response has its own sound!

> [!success] You just learned radio!
> You used three radio blocks: **set group** (pick your channel), **send string** (broadcast a message), and **on radio received** (listen for messages). Every program today uses these same three blocks!

---

## Part 1 — The Receiver

*Everyone builds this first. It's simpler and works on its own.*

### How it works

- When someone sends a Morse letter over radio, your micro:bit shows it on the LED screen as dots and dashes
- **Button A** → you understood it! Sends ✓ back to the sender
- **Button B** → you want them to repeat! Sends ✗ back to the sender

### What you see on the screen

Symbols appear **left to right**, one column per symbol. A **dot** is a single LED in the middle of its column. A **dash** is three LEDs tall in its column — so it looks taller and heavier.

```
        col 0   col 1   col 2
        (dot)   (dash)  (dot)

row 0:    .       .       .
row 1:    .       X       .
row 2:    X       X       X
row 3:    .       X       .
row 4:    .       .       .
```

That pattern means the letter **R** (`· — ·`) — you can see col 1 is taller than cols 0 and 2!

---

### Step-by-step: Build the Receiver in MakeCode

**1. Open MakeCode**

Go to **makecode.microbit.org** and click **New Project**. Name it `morse-receiver`.

---

**2. Set the radio group**

> [!note] What is a radio group?
> All micro:bits in the same group can hear each other — like being on the same walkie-talkie channel. We use **group 1** today.

Find the **Radio** category (pink). Drag in:

```
on start
  radio set group [ 1 ]
  clear screen
```

---

**3. Create the `plotMorse` function**

This function reads a Morse pattern (like `".-"`) and draws it on the LED screen.

Go to **Advanced → Functions** and click **Make a Function**. Name it `plotMorse`. Add a **text** parameter called `pattern`.

Inside the function, build this:

```
define plotMorse (pattern)
  clear screen
  for [i] from 0 to length of [pattern] - 1
    if character [i] of [pattern] = "."
      plot x [i] y [2]
    else
      plot x [i] y [1]
      plot x [i] y [2]
      plot x [i] y [3]
```

> [!tip] In JavaScript, this looks like:
> ```javascript
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
> ```

---

**4. Listen for radio messages**

From **Radio**, drag in `on radio received (receivedString)`.

Inside it, add:

```
on radio received (receivedString)
  if [receivedString] ≠ "ACK" and [receivedString] ≠ "NACK"
    set [lastReceived] to [receivedString]
    call plotMorse (lastReceived)
```

> [!note] Why ignore ACK and NACK?
> The sender also listens for radio messages (to know if you got it). We filter those out so they don't mess up your screen.

---

**5. Button A — send ACK (✓ I got it!)**

```
on button [A] pressed
  radio send string "ACK"
  show icon [✓]
  pause 800 ms
  call plotMorse (lastReceived)
```

---

**6. Button B — send NACK (✗ Repeat please!)**

```
on button [B] pressed
  radio send string "NACK"
  show icon [✗]
  pause 800 ms
  call plotMorse (lastReceived)
```

---

**7. Flash it to your micro:bit!**

Click **Download** (bottom left). Connect your micro:bit with the USB cable. Copy the downloaded `.hex` file onto the **MICROBIT** drive that appears on your computer.

The yellow LED on the back will flash while it's copying. When it stops, your program is running!

---

**8. Test it!**

Ask the instructor to send a Morse letter. You should see dots and dashes appear on your LED screen!

- Press **A** when you've decoded the letter correctly
- Press **B** if you need them to send it again

---

## Part 2 — The Sender

*For older or more advanced kids (ages 9–10) — and anyone who finishes the receiver early!*

### How it works

- **Button A** → tap a **dot** (short beep, one LED lights up)
- **Button B** → tap a **dash** (longer beep, three LEDs light up)
- **Logo** (the gold logo at the top) → **send** the letter! Shows the decoded letter for 1 second, then transmits it
- **Shake** → **cancel** and start over
- When receivers send **✓** (ACK) → the sender flashes ✓
- When receivers send **✗** (NACK) → the sender flashes ✗ and **automatically resends** the last letter

### Step-by-step: Build the Sender in MakeCode

**1. Open MakeCode**

Go to **makecode.microbit.org** and click **New Project**. Name it `morse-sender`.

---

**2. Set up variables**

At the top of `on start`, create three variables:
- `buffer` = `""` *(the dots and dashes you're building)*
- `length` = `0` *(how many symbols you've tapped so far)*
- `lastSent` = `""` *(the last letter you sent, in case of NACK)*

Then add:
```
radio set group [ 1 ]
clear screen
```

---

**3. Set up the Morse lookup table**

> [!warning] This is the trickiest part — ask for help if you need it!

You need **two lists** that match up:
- `morsePatterns` = the dot-dash codes for each letter
- `morseLetters` = the actual letters A to Z

```
set [morsePatterns] to [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]

set [morseLetters] to ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

> [!tip] In JavaScript:
> ```javascript
> let morsePatterns = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
>     "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
>     "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
>     "-.--", "--.."]
> let morseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
>     "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
> ```

---

**4. Create the `decodeMorse` function**

This takes a pattern like `".-"` and returns the letter `"A"`.

```
define decodeMorse (pattern) → returns text
  set [idx] to index of [pattern] in [morsePatterns]
  if [idx] ≥ 0
    return item [idx] of [morseLetters]
  return "?"
```

---

**5. Add the `plotMorse` function** *(same as in the receiver!)*

Copy the exact same function you built for the receiver.

> [!success] Teaching moment
> Both programs share the same `plotMorse` function — this is what programmers call **code reuse**. Build it once, use it everywhere! Remember: `x` = column (left→right), `y` = row (top→bottom).

---

**6. Button A — tap a dot**

```
on button [A] pressed
  if [length] < 4
    play tone [Middle A] for [1/8 beat]
    set [buffer] to [buffer] + "."
    change [length] by 1
    call plotMorse (buffer)
```

> [!note] Why `length < 4`?
> The longest Morse code letter has 4 symbols (like B = `—···`). We stop at 4 to keep it clean.

---

**7. Button B — tap a dash**

```
on button [B] pressed
  if [length] < 4
    play tone [Middle A] for [1/4 beat]
    set [buffer] to [buffer] + "-"
    change [length] by 1
    call plotMorse (buffer)
```

*Same as button A but the tone lasts longer — like a real telegraph!*

---

**8. Logo — send the letter**

```
on logo [pressed]
  if length of [buffer] > 0
    set [letter] to call decodeMorse (buffer)
    show string [letter]
    set [lastSent] to [buffer]
    radio send string [buffer]
    set [buffer] to ""
    set [length] to 0
    clear screen
```

---

**9. Shake — cancel**

```
on [shake]
  play tone [Low C] for [1/4 beat]
  set [buffer] to ""
  set [length] to 0
  clear screen
```

---

**10. Listen for ACK / NACK**

```
on radio received (receivedString)
  if [receivedString] = "ACK"
    show icon [✓]
    set [lastSent] to ""
    pause 800 ms
    clear screen
  else if [receivedString] = "NACK"
    show icon [✗]
    pause 800 ms
    if length of [lastSent] > 0
      radio send string [lastSent]
      call plotMorse (lastSent)
```

> [!info] What does NACK do?
> If someone presses B (✗) on their receiver, your sender shows a cross, then **automatically resends** the letter. The receivers will see the morse pattern again and get another chance to decode it.

---

**11. Flash it to your micro:bit!**

Same as before — click **Download**, then copy the `.hex` file to the **MICROBIT** drive.

---

## Let's Play! 🎮

### Round 1 — Warm-up: One Letter

The sender taps a single letter. Everyone decodes it and presses A (✓) when they have it. First to press A wins!

### Round 2 — Morse Hangman

The sender transmits letters one at a time. Receivers decode and write them down. First team to shout the correct full word wins the round!

### Round 3 — Treasure Hunt *(if there's space)*

Morse messages from the sender reveal clues hidden around the room. Teams decode each message, find the clue location, and race to finish the chain!

### Round 4 — Fastest Decoder *(energy round)*

The instructor sends the same 3-letter word to all groups at once. First group to correctly ACK and shout the decoded word wins!

---

## Message Length Guide

| Round | Length | Examples |
|-------|--------|---------|
| Warm-up | 1 letter | `H`, `I`, `E` |
| Main | 3 letters | `SOS`, `YES`, `HI` |
| Stretch | Short word | `HELLO`, `MORSE` |

---

## Tips & Tricks

> [!tip] For younger kids (6–7)
> - Focus on the **receiver** — it's satisfying to see dots and dashes appear instantly
> - Use the printed Morse alphabet card on your table to decode letters
> - You don't need to know the code by heart — that's what the card is for!

> [!tip] For older kids (8–10)
> - Challenge yourself to **send** a full word
> - Try to memorise a few short letters: **E** = `·`, **T** = `—`, **SOS** = `···———···`
> - Can you decode a letter before looking at the card?

> [!warning] Sounds need micro:bit v2
> The beep sounds (dots and dashes) only work on the **micro:bit v2** — it has a built-in speaker. v1 devices will still work but will be silent.

---

## Going Further 🚀

Finished early? Here are some ideas:

- **Customize your sender**: change the dot/dash tones to different pitches
- **Add a startup animation**: make the LEDs do a cool pattern when the micro:bit turns on
- **Add a counter**: track how many letters you've sent successfully
- **Explore microbit.org**: try a beating heart, an animated animal, or a simple game
- **Extend the Morse table**: can you add numbers (0–9) to the lookup table?

---

## Quick Reference

### Receiver controls

| Action | What happens |
|--------|-------------|
| Receive a Morse letter | Dots/dashes appear on screen |
| Press **A** | Send ✓ (I got it!) |
| Press **B** | Send ✗ (Please repeat!) |

### Sender controls

| Action | What happens |
|--------|-------------|
| Press **A** | Tap a dot `·` (short beep) |
| Press **B** | Tap a dash `—` (long beep) |
| Touch **logo** | Send the letter |
| **Shake** | Cancel and start over |
| Receive ✓ | Flash tick, clear ready |
| Receive ✗ | Flash cross, auto-resend |

---

*Built at STEM Day — March 2026* 🎉
