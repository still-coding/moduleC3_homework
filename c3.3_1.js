// Задание 1
// Написать, функцию, которая принимает в качестве аргумента объект
// и выводит в консоль все ключи и значения только собственных свойств.
// Данная функция не должна возвращать значение.


function printOwnProperties(obj) {
    console.group(`${obj} own properties`)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`)
        }
    }
    console.groupEnd()
}


printOwnProperties(2)

a = {
    a_prop: 1
}
printOwnProperties(a)

b = Object.create(a)
b.b_prop = 2
printOwnProperties(b)