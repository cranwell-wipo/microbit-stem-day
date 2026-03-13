# Code

MakeCode TypeScript source files for all three micro:bit STEM Day programs. Parents and facilitators can use these to pre-flash micro:bits or as a reference while guiding children through the block-by-block build.

## Programs

| File | Program | Who |
|------|---------|-----|
| [`marco-polo.ts`](marco-polo.ts) | Marco Polo — radio warm-up | Everyone |
| [`morse-receiver.ts`](morse-receiver.ts) | Morse Receiver — displays dots/dashes, sends ACK/NACK | Everyone |
| [`morse-sender.ts`](morse-sender.ts) | Morse Sender — tap dots/dashes, decode and transmit | Older kids (9–10) |

## How to use

### Option 1 — Paste into MakeCode
1. Go to [makecode.microbit.org](https://makecode.microbit.org/)
2. Create a **New Project**
3. Switch to **JavaScript** view (toggle at the top)
4. Delete the default code and paste in the contents of any `.ts` file
5. Click **Download** and flash to your micro:bit

### Option 2 — Import from GitHub
1. Go to [makecode.microbit.org](https://makecode.microbit.org/)
2. Click **Import** → **Import URL**
3. Paste this repo URL: `https://github.com/cranwell-wipo/microbit-stem-day`
4. The project will open with all files available

## Radio groups

All programs default to **group 1**. Change the number in `radio.setGroup(1)` to give each table its own channel (1, 2, 3, etc.) so groups don't hear each other.
