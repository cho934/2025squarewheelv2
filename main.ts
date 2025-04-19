/**
 * control.inBackground(function () {
 * 
 * while (true) {
 * 
 * if (enabledetection >= 1) {
 * 
 * readpin = pins.analogReadPin(AnalogReadWritePin.P0)
 * 
 * // readpin = readpin * 5 / 3.3
 * 
 * // 150
 * 
 * // dist = 13530 * readpin ** -1.112 //150
 * 
 * // dist = 9462 / (readpin - 16.92); //150
 * 
 * // dist = 2076 / (readpin - 11)
 * 
 * // 30  !!a garder
 * 
 * dist = 2 * 2076 / (readpin - 22)
 * 
 * serial.writeValue("read", readpin)
 * 
 * serial.writeValue("dist", dist)
 * 
 * serial.writeValue("count", countdetection)
 * 
 * if (countdetection >= 3) {
 * 
 * StopMotors()
 * 
 * countdetection = 0
 * 
 * }
 * 
 * if (dist < 17) {
 * 
 * countdetection += 1
 * 
 * }
 * 
 * }
 * 
 * basic.pause(200)
 * 
 * }
 * 
 * })
 */
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
})
function StopMotors () {
    servos.P0.run(0)
    servos.P0.stop()
}
input.onButtonPressed(Button.A, function () {
    enabledetection = 0
    servos.P1.setAngle(90)
    GOGOGO()
    StopMotors()
    butiner()
    enabledetection = 0
})
function butiner () {
    if (color <= 1) {
        while (true) {
            servos.P1.setAngle(35)
            basic.pause(500)
            servos.P1.setAngle(110)
            basic.pause(500)
        }
    }
    if (color == 2) {
        while (true) {
            servos.P1.setAngle(35)
            basic.pause(500)
            servos.P1.setAngle(110)
            basic.pause(500)
        }
    }
}
function GOGOGO () {
    servos.P0.run(100)
    basic.pause(13000)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "BLUE") {
        color = 2
    }
    if (receivedString == "YELLOW") {
        color = 1
    }
})
input.onButtonPressed(Button.B, function () {
    color = 1
    butiner()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    StopMotors()
    servos.P1.setAngle(90)
})
let color = 0
let tirette = 0
let enabledetection = 0
let readpin = 0
let dist = 0
let countdetection = 0
serial.redirectToUSB()
enabledetection = 0
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
tirette = 0
color = 0
servos.P1.setAngle(90)
basic.forever(function () {
    while (tirette == 0) {
        if (color == 1) {
            basic.clearScreen()
            basic.showIcon(IconNames.Skull)
        }
        if (color == 2) {
            basic.clearScreen()
            basic.showIcon(IconNames.Diamond)
        }
        if (color == 0) {
            basic.clearScreen()
            basic.showLeds(`
                # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
                `)
        }
        basic.pause(100)
    }
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(85000)
    enabledetection = 0
    GOGOGO()
    StopMotors()
    enabledetection = 0
    butiner()
    tirette = 0
    color = 0
})
control.inBackground(function () {
    while (tirette == 0) {
    	
    }
    basic.pause(100000)
    butiner()
})
