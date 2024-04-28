function Sensor_lesen () {
    F_akt = pins.analogReadPin(AnalogPin.C16)
    if (F_akt < F_min) {
        F_min = F_akt
    }
    if (F_akt > F_max) {
        F_max = F_akt
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Grenzwert += 5
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Grenzwert += -5
})
function Pumpen () {
    motors.dualMotorPower(Motor.M0, 100)
    basic.pause(10000)
    motors.dualMotorPower(Motor.M0, 0)
    Zaehler += 1
}
let Ausgabe = ""
let F_akt = 0
let F_max = 0
let F_min = 0
F_min = 10000
F_max = 0
let Zaehler = 0
let Grenzwert = 480
basic.forever(function () {
    basic.pause(10000)
    Sensor_lesen()
    Ausgabe = "" + F_akt + " / " + Grenzwert + " / " + Zaehler
    display.writeString(Ausgabe, 0, 0)
    Ausgabe = "" + F_min + " .. " + F_max
    display.writeString(Ausgabe, 1, 0)
    if (F_akt > Grenzwert) {
        Pumpen()
    }
})
