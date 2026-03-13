// Morse Receiver
// micro:bit STEM Day
//
// Everyone builds this after Marco Polo.
// Receives Morse patterns over radio and displays dots/dashes on the LED grid.
// Button A = ACK (I got it!), Button B = NACK (please repeat).
//
// Display convention:
//   Dot  = 1 pixel in centre of column (row 2)
//   Dash = 3 pixels tall in column (rows 1, 2, 3)
//   Symbols appear left to right, max 4 per letter.
//
// Change the group number so each table has its own channel.

let lastReceived = ""
radio.setGroup(1)
basic.clearScreen()

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

radio.onReceivedString(function (receivedString) {
    if (receivedString != "ACK" && receivedString != "NACK") {
        lastReceived = receivedString
        plotMorse(lastReceived)
    }
})

input.onButtonPressed(Button.A, function () {
    radio.sendString("ACK")
    basic.showIcon(IconNames.Yes)
    basic.pause(800)
    plotMorse(lastReceived)
})

input.onButtonPressed(Button.B, function () {
    radio.sendString("NACK")
    basic.showIcon(IconNames.No)
    basic.pause(800)
    plotMorse(lastReceived)
})
