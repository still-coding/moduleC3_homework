// Задание 5
// Переписать консольное приложение из предыдущего юнита на классы.

class Device {
    constructor(name, power) {
        this.name = name
        this.power = power
        this.switchedOn = false
    }

    toggleOnOff(){
        this.switchedOn = !this.switchedOn
    }

    show() {
        console.group(`Device name: ${this.name}`)
        for (let prop in this)
        {
            if (prop === "name" || typeof(this[prop]) === "function")
                continue;
            console.log(`${prop}: ${this[prop]}`)
        }        
        console.groupEnd()
    }

    calcPowerConsumption(hours) {
        return this.power * hours / 1000.0
    }

}

class Lamp extends Device {
    constructor(name, power, lightbulbs) {
        super(name, power)
        this.lightbulbs = lightbulbs
        this.brightness = 100
    }

    brightnessUp() {
        this.brightness += this.brightness <= 95 ? 5 : 0;
    }

    brightnessDown() {
        this.brightness -= this.brightness >= 5 ? 5 : 0;
    }

    calcPowerConsumption(hours) {
        return this.lightbulbs * this.power * (this.brightness / 100.0) * hours / 1000.0
    }
}

class PC extends Device {
    constructor(name, power, cpu, gpu, ram) {
        super(name, power)
        this.cpu = cpu
        this.gpu = gpu
        this.ram = ram
    }

    addRam() {
        this.ram <<= 1
    }
}


const lamp = new Lamp('My Lamp', 60, 2)
lamp.toggleOnOff()
lamp.brightnessDown()
lamp.show()


const pc = new PC('my PC', 250, 'Ryzen 5', 'RTX 2060', 16)
pc.addRam()
pc.addRam()
pc.toggleOnOff()
pc.show()

let passed_hours = 0

const timerId = setInterval(() => {
    console.log(`Passed hours: ${++passed_hours}`)
}, 1000)

setTimeout(() => {
    clearInterval(timerId);
    lamp.toggleOnOff()
    pc.toggleOnOff()
    const lamp_consumed = lamp.calcPowerConsumption(passed_hours)
    const pc_consumed = pc.calcPowerConsumption(passed_hours)
    console.log(`Lamp consumed ${lamp_consumed.toFixed(2)} kWh`)
    console.log(`PC consumed ${pc_consumed.toFixed(2)} kWh`)
    console.log(`${(lamp_consumed + pc_consumed).toFixed(2)} kWh total`)
 }, 5100)
