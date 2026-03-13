# micro:bit STEM Day

A hands-on robotics and STEM day organized by parents for their children. Kids build Morse code radio communication systems using BBC micro:bit v2 boards and MakeCode.

## What's in this repo

This is a [Quartz](https://quartz.jzhao.xyz/) documentation site containing:

- **Event overview** — program, materials, venue, and game ideas
- **MakeCode Programs** — block-by-block build instructions for a Morse sender and receiver
- **Kids Guide** — step-by-step instructions for children on the day

## Programs

| Program | Who | What it does |
|---------|-----|--------------|
| **Receiver** | Everyone | Receives Morse over radio, shows dots/dashes on LEDs. Button A = ACK, Button B = NACK |
| **Sender** | Older kids | Button A = dot, Button B = dash, logo = send, shake = cancel. Auto-resends on NACK |

## Development

```bash
npm ci
npx quartz build --serve   # local preview at http://localhost:8080
```

## Credits

Built with [Quartz v4](https://quartz.jzhao.xyz/) and [Claude Code](https://claude.ai/code).
