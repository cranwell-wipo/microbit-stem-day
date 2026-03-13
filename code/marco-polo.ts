// Marco Polo — Radio Warm-up
// micro:bit STEM Day — WIPO
//
// Everyone builds this first. The simplest radio program:
// Button A sends "Marco", Button B sends "Polo",
// received messages scroll across the LED screen.
//
// Change the group number so each table has its own channel.

radio.setGroup(1)
basic.showLeds(`
    # . # # #
    # # # # #
    # . # # #
    # . # # .
    # . # # .
`)

input.onButtonPressed(Button.A, function () {
    radio.sendString("Marco")
    music.playTone(131, music.beat(BeatFraction.Whole))
})

input.onButtonPressed(Button.B, function () {
    radio.sendString("Polo")
    music.playTone(262, music.beat(BeatFraction.Whole))
})

radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
