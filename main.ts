radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
})
function StopMotors () {
    servos.P0.run(0)
}
function initservo () {
    if (color <= 1) {
        servos.P1.setAngle(158)
        basic.pause(2000)
    }
    if (color == 2) {
        servos.P1.setAngle(22)
        basic.pause(2000)
    }
}
input.onButtonPressed(Button.A, function () {
    entrain_de_butiner = 0
    enabledetection = 1
    GOGOGO()
    StopMotors()
    enabledetection = 0
    butiner()
})
function butiner () {
    if (color <= 1) {
        servos.P1.setAngle(0)
        basic.pause(1500)
    }
    if (color == 2) {
        servos.P1.setAngle(180)
        basic.pause(1500)
    }
    entrain_de_butiner = 1
    while (entrain_de_butiner) {
        basic.showIcon(IconNames.Chessboard)
        if (color <= 1) {
            servos.P1.setAngle(45)
            basic.pause(200)
            servos.P1.setAngle(60)
            basic.pause(200)
        }
        if (color == 2) {
            servos.P1.setAngle(135)
            basic.pause(200)
            servos.P1.setAngle(115)
            basic.pause(200)
        }
    }
    basic.clearScreen()
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
    entrain_de_butiner = 0
    StopMotors()
    butiner()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    entrain_de_butiner = 0
    if (color == 2 || color == 0) {
        color = 1
        initservo()
    } else {
        if (color == 1) {
            color = 2
            initservo()
        }
    }
})
let countdetection = 0
let dist = 0
let readpin = 0
let entrain_de_butiner = 0
let color = 0
let tirette = 0
let enabledetection = 0
serial.redirectToUSB()
enabledetection = 0
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
tirette = 0
color = 0
entrain_de_butiner = 0
basic.pause(2000)
basic.clearScreen()
basic.showLeds(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `)
basic.forever(function () {
    initservo()
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
        	
        }
        basic.pause(100)
    }
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(85000)
    enabledetection = 0
    GOGOGO()
    enabledetection = 0
    StopMotors()
    tirette = 0
    butiner()
})
control.inBackground(function () {
    while (true) {
        if (enabledetection >= 1) {
            readpin = pins.analogReadPin(AnalogReadWritePin.P2)
            readpin = readpin * 5 / 3.3
            // // 150
            // 
            // // dist = 13530 * readpin ** -1.112 //150
            // 
            // // dist = 9462 / (readpin - 16.92); //150
            // 
            // // dist = 2076 / (readpin - 11)
            // 
            // // 30  !!a garder
            dist = 2 * 2076 / (readpin - 22)
            serial.writeValue("read", readpin)
            serial.writeValue("dist", dist)
            serial.writeValue("count", countdetection)
            if (countdetection >= 3) {
                StopMotors()
                countdetection = 0
            }
            if (dist < 5) {
                countdetection += 1
            }
        }
        basic.pause(200)
    }
})
control.inBackground(function () {
    basic.pause(500)
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(98000)
    if (entrain_de_butiner == 0) {
        butiner()
    }
})
