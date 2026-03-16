// ─────────────────────────────────────────────────────────────────────────────
// morse-receiver — starter template
// Paste this into MakeCode (JavaScript tab), then switch back to Blocks.
//
// Radio group: change the number below for each team so groups don't overlap.
//   Group 1 = Team 1, Group 2 = Team 2, etc.
// ─────────────────────────────────────────────────────────────────────────────

let lastReceived = ""
radio.setGroup(1)
basic.clearScreen()

// ── What you'll build in MakeCode blocks ─────────────────────────────────────
//
//  Step 3 — function plotMorse(pattern)
//    Draws dots and dashes on the LED screen.
//    Dot = 1 LED at row 2. Dash = 3 LEDs at rows 1, 2, 3.
//
//  Step 4 — on radio received (receivedString)
//    If not "ACK" and not "NACK": save to lastReceived, call plotMorse.
//
//  Step 5 — on button A pressed
//    Send "ACK", show tick icon, pause 800 ms, redraw plotMorse.
//
//  Step 6 — on button B pressed
//    Send "NACK", show cross icon, pause 800 ms, redraw plotMorse.
//
// ─────────────────────────────────────────────────────────────────────────────
