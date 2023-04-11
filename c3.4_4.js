// Задание 4
// Реализовать следующее консольное приложение подобно примеру,
// который разбирался в видео. Реализуйте его на прототипах.
// Определить иерархию электроприборов. Включить некоторые в розетку.
// Посчитать потребляемую мощность. 
// Таких приборов должно быть, как минимум, два 
// (например, настольная лампа и компьютер).
// Выбрав прибор, подумайте, какими свойствами он обладает.


function Device(name, power){
    this.name = name
    this.power = power
    this.switchedOn = false
}

Device.prototype.toggleOnOff = function(){
    this.switchedOn = !this.switchedOn
}

Device.prototype.calcPowerConsumption = function(hours){
    return this.power * hours / 1000.0
}

Device.prototype.show = function(){
    console.group(`Device name: ${this.name}`)
    for (let prop in this)
    {
        if (prop === "name" || typeof(this[prop]) === "function")
            continue;
        console.log(`${prop}: ${this[prop]}`)
    }        
    console.groupEnd()
}


function Lamp(name, power, lightbulbs){
    this.name = name
    this.power = power
    this.lightbulbs = lightbulbs
    this.brightness = 100
}

Lamp.prototype = new Device()

Lamp.prototype.brightnessUp = function(){
    this.brightness += this.brightness <= 95 ? 5 : 0;
}

Lamp.prototype.brightnessDown = function(){
    this.brightness -= this.brightness >= 5 ? 5 : 0;
}

Lamp.prototype.calcPowerConsumption = function(hours){
    return this.lightbulbs * this.power * (this.brightness / 100.0) * hours / 1000.0
}


function PC(name, power, cpu, gpu, ram){
    this.name = name
    this.power = power
    this.cpu = cpu
    this.gpu = gpu
    this.ram = ram
}

PC.prototype = new Device()

PC.prototype.addRam = function(){
    this.ram <<= 1
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
