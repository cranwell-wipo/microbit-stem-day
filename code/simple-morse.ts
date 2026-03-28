/**
 * Simple Morse Transceiver — micro:bit v2
 *
 * Every micro:bit runs this same program.
 * Button A = send dot ".", Button B = send dash "-",
 * A+B = end of letter "X".
 *
 * Received symbols scroll on the LED display;
 * kids decode manually using a printed Morse card.
 */

radio.setGroup(1)
basic.clearScreen()

// --- SENDING ---

input.onButtonPressed(Button.A, function () {
    radio.sendString(".")
})

input.onButtonPressed(Button.B, function () {
    radio.sendString("-")
})

input.onButtonPressed(Button.AB, function () {
    radio.sendString("X")
})

// --- RECEIVING ---

radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    basic.pause(2000)
    basic.clearScreen()
})
