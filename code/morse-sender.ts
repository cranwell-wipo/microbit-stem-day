// Morse Sender
// micro:bit STEM Day — WIPO
//
// For older/advanced kids (ages 9-10) and anyone who finishes the receiver early.
// Button A = dot (short beep), Button B = dash (long beep),
// Logo touch = send (decodes and transmits), Shake = cancel.
// Auto-resends on NACK from receivers.
//
// Display convention:
//   Dot  = 1 pixel in centre of column (row 2)
//   Dash = 3 pixels tall in column (rows 1, 2, 3)
//   Symbols appear left to right, max 4 per letter.
//
// Change the group number so each table has its own channel.

let buffer = ""
let length = 0
let lastSent = ""

let morsePatterns = [
    ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
    "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
    "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
    "-.--", "--.."
]
let morseLetters = [
    "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z"
]

radio.setGroup(1)
basic.clearScreen()

function decodeMorse(pattern: string): string {
    let idx = morsePatterns.indexOf(pattern)
    if (idx >= 0) return morseLetters[idx]
    return "?"
}

function plotMorse(pattern: string) {
    basic.clearScreen()
    for (let i = 0; i < pattern.length; i++) {
        if (pattern.charAt(i) == ".") {
            led.plot(i, 2)
        } else {
            led.plot(i, 1)
            led.plot(i, 2)
            led.plot(i, 3)
        }
    }
}

input.onButtonPressed(Button.A, function () {
    if (length < 4) {
        music.playTone(440, 100)
        buffer += "."
        length += 1
        plotMorse(buffer)
    }
})

input.onButtonPressed(Button.B, function () {
    if (length < 4) {
        music.playTone(440, 300)
        buffer += "-"
        length += 1
        plotMorse(buffer)
    }
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (buffer.length > 0) {
        let letter = decodeMorse(buffer)
        basic.showString(letter)
        lastSent = buffer
        radio.sendString(buffer)
        buffer = ""
        length = 0
        basic.clearScreen()
    }
})

input.onGesture(Gesture.Shake, function () {
    music.playTone(220, 200)
    buffer = ""
    length = 0
    basic.clearScreen()
})

radio.onReceivedString(function (receivedString) {
    if (receivedString == "ACK") {
        basic.showIcon(IconNames.Yes)
        lastSent = ""
        basic.pause(800)
        basic.clearScreen()
    } else if (receivedString == "NACK") {
        basic.showIcon(IconNames.No)
        basic.pause(800)
        if (lastSent.length > 0) {
            radio.sendString(lastSent)
            plotMorse(lastSent)
        }
    } else {
        basic.showIcon(IconNames.QuestionMark)
        basic.pause(500)
        basic.clearScreen()
    }
})
