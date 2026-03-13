---
title: micro:bit STEM Day
date: 2026-03-12
status: Active
category: Community
tags:
  - microbit
  - stem
  - wipo
  - kids
  - event
---

# 🤖 micro:bit STEM Day

A fun, hands-on robotics and STEM day organized by WIPO parents for their children — to spark curiosity and encourage learning through building, coding, creativity, and exploration. This first edition is a small pilot.

## Next Actions

- [ ] Decide on the room (see [[#Venue Options]])
- [ ] Finalize the program and assign roles and language(s)
- [ ] Decide: individual micro:bit purchases vs. one consolidated order
- [ ] Dan to send security email about the event
- [ ] Book Luigia after confirming the final participant list
- [ ] Buy croissants, tea, and refreshments
- [ ] Confirm laptop availability for all children

---

## Participants

14 children aged 6–10 from WIPO families. A mix of French and English speakers — session materials prepared in both languages.

---

## Materials & Equipment

| Item | Quantity |
|------|----------|
| micro:bit v2 + extension kit with sensors | 1 |
| micro:bit v2 | 5 |
| Bambu Lab A1 Mini (3D printer demo) | 1 |
| Laptops | 1 per child (confirm count — may need extras) |

**micro:bits available:** 6 confirmed — need to confirm if enough for all children.

---

## Program

### 9:30 — Welcome, croissants, and introductions
- Arrival and settling in
- Croissants and drinks
- Short introductions and icebreaker

### 10:00 — Intro to programming and robotics
- What is coding?
- What is a robot?
- What is a micro:bit and what can it do? *(devices handed out)*
- Buttons, LED display, movement sensing, and radio communication

### 10:30 — Intro to 3D printing and micro:bit case
- What a 3D printer is and how it works
- Examples of printed objects
- Presentation of the micro:bit case
- Live demo if possible (Bambu A1 Mini)

### 11:00 — micro:bit beginner projects
Guided examples with room for advanced participants to extend or personalize.

Examples:
- Beating heart
- Animated animals
- Name badge
- Simple LED animations or mini-games

Resource: [microbit.org/projects/make-it-code-it](https://microbit.org/projects/make-it-code-it/)

### 11:20 — Marco Polo radio warm-up
First radio activity — teaches `radio set group`, `radio send string`, and `on radio received` in the simplest possible way. See [[programs#Program 0 — Marco Polo|Program 0]].

- Everyone builds the same 4-block program
- Button A sends "Marco", Button B sends "Polo"
- Received messages scroll across the LED display
- **Mod:** add sound — different tones for Marco vs Polo
- Great icebreaker: kids discover they can communicate between micro:bits for the first time

> [!tip] Why start with Marco Polo?
> It teaches the three core radio concepts (set group, send, receive) in under 10 minutes — with zero complexity. By the time kids move to Morse code, they already understand how radio blocks work.

Inspired by the [MakeCode CS Intro radio activity](https://makecode.microbit.org/courses/csintro/radio/activity).

### 11:40 — Intro to Morse code & radio communication
- What is Morse code? How dots and dashes form letters
- Simple decoding exercises on paper
- How micro:bits can send Morse-like signals over radio
- Brief history: Samuel Morse, the telegraph, early radio

### 12:15 — Lunch at Luigia 🍕

### 14:00 — Build a micro:bit v2 radio Morse messaging system

Two programs built during the session. See [[programs]] for full code and [[kids-guide]] for the step-by-step guide for children.

> [!info] Built with Claude Code
> Both programs, the block-by-block kids guide, and this documentation were designed and written with [Claude Code](https://claude.ai/code) — used as an AI pair-programmer throughout the session prep.

**Receiver** (everyone builds first):
- Receives morse string → displays dots/dashes on LED grid
- Button A = ✓ ACK (got it)
- Button B = ✗ NACK (resend please)

**Sender** (older/advanced kids aged 9–10):
- Button A = dot (short beep) · Button B = dash (long tone)
- Logo tap = send (briefly shows decoded letter, then transmits)
- Shake = clear/cancel
- Flashes ✓ on ACK, ✗ on NACK and auto-resends last letter

**Groups:** split into small groups, each on their own radio channel — no crosstalk.

**Printed reference card** on every table — morse alphabet for encoding and decoding.

**Message length guide:**
| Round | Length | Example |
|-------|--------|---------|
| Warm-up | 1 letter | `H`, `I`, `E` (short morse) |
| Main | 3 letters | `SOS`, `YES`, `NO` |
| Stretch | Short word | `HELLO`, `WIPO` |

---

### 14:45 — Morse challenge game

#### Option A — Morse Hangman *(warm-up, quick to explain)*
Sender transmits letters one at a time. Receivers decode and write them down. First team to shout the correct full word wins the round.

#### Option B — Treasure Hunt *(main game, most memorable)*
Morse messages from the sender (in another room) reveal clues hidden around the venue. Teams decode each message, find the object or location, and race to complete the chain.
- Requires: clues prepared in advance, enough space to hide them
- **Decision pending:** depends on venue — confirm once room is booked

#### Option C — Fastest Decoder *(energy round)*
Instructor sends the same 3-letter word to all groups simultaneously. First group to correctly ACK and shout the decoded word wins.

#### Option D — Morse Quiz
Instructor sends answers to simple questions (colours, animals, numbers). Teams decode and write answers. Relaxed pace — good right after lunch if energy is low.

> [!note] Recommended flow
> Hangman as warm-up → Treasure Hunt as main event (if space allows) → Fastest Decoder as a final energy round.

---

## Venue Options

| Room | Pros | Cons |
|------|------|------|
| **13th floor** | Nice separated tables, cozy atmosphere, carpet & couches | Very few power plugs — bring extension cords |
| **Red or Blue room** | Good space | Tables hard to move, room shape not ideal for movement |
| **NB 0.107** | Good space | Tables hard to move, shape not ideal, may be too large |
| **PCT Cafeteria** | Large table (adjustable) | Ground floor under renovation; not cozy or inviting |

> [!note] Decision pending
> 13th floor is the preferred atmosphere — confirm power situation and extension cord logistics.

---

## Media

*Chronological order — the evening the programs were built and tested.*

| Time | File | Description |
|------|------|-------------|
| 21:49 | ![[bambu-printing-case.mov]] | Bambu A1 Mini starting the case print |
| 21:52 | ![[microbit-boxes-unboxed.jpg\|200]] | Two micro:bit v2 GO boxes |
| 22:00 | ![[microbit-box-opened.jpg\|200]] | Unboxed — board and USB cable |
| 22:10 | ![[makecode-editor.mov]] | MakeCode — building the receiver |
| 22:13 | ![[bambu-printing-case.jpg\|200]] | Case still printing mid-session |
| 22:26 | ![[microbit-morse-demo.mov]] | Live Morse demo between two micro:bits |
| 22:40 | ![[bambu-finished-case.jpg\|200]] | Finished 3D printed micro:bit case |

### 3D Files

- [[microbit-v2-aaa-case.3mf]] — Micro:bit v2 AAA battery case (printed in blue PLA for demo)

---

## Resources

- [microbit.org](https://microbit.org/) — Official projects and MakeCode editor
- [microbit.org/projects/make-it-code-it](https://microbit.org/projects/make-it-code-it/) — Beginner project gallery
- [MakeCode CS Intro — Radio Activity](https://makecode.microbit.org/courses/csintro/radio/activity) — Microsoft's radio lesson (Marco Polo + simpler Morse code). Inspired the warm-up activity.
- [Bambu Lab A1 Mini](https://bambulab.com/en-us/a1-mini) — 3D printer used for live demo
