// ─────────────────────────────────────────────────────────────────────────────
// morse-sender — starter template
// Paste this into MakeCode (JavaScript tab), then switch back to Blocks.
//
// The Morse code tables are already built — you just need to add the functions
// and button handlers described in the guide.
//
// Radio group: change the number below for each team so groups don't overlap.
//   Group 1 = Team 1, Group 2 = Team 2, etc.
// ─────────────────────────────────────────────────────────────────────────────

let buffer = ""
let length = 0
let lastSent = ""
let morsePatterns: string[] = []
let morseLetters: string[] = []

buffer = ""
length = 0
lastSent = ""
radio.setGroup(1)
basic.clearScreen()

morsePatterns = [
    ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
    "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
    "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
    "-.--", "--.."
]

morseLetters = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z"
]

// ── What you'll build in MakeCode blocks ─────────────────────────────────────
//
//  Step 3 — function plotMorse(pattern)
//    Draws dots and dashes on the LED screen.
//    Dot = 1 LED at row 2. Dash = 3 LEDs at rows 1, 2, 3.
//
//  Step 4 — function decodeMorse(pattern) → string
//    Looks up pattern in morsePatterns, returns matching letter from morseLetters.
//    Returns "?" if not found.
//
//  Step 5 — on button A pressed
//    If length < 4: short beep, append "." to buffer, length+1, plotMorse.
//
//  Step 6 — on button B pressed
//    If length < 4: long beep, append "-" to buffer, length+1, plotMorse.
//
//  Step 7 — on logo pressed
//    If buffer not empty: decode, show letter, save to lastSent, send over radio, clear.
//
//  Step 8 — on shake
//    Low beep, clear buffer, reset length, clear screen.
//
//  Step 9 — on radio received (receivedString)
//    "ACK"  → show tick, clear lastSent, pause, clear screen.
//    "NACK" → show cross, pause, resend lastSent if not empty, redraw plotMorse.
//
// ─────────────────────────────────────────────────────────────────────────────
