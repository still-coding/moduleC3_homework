// Задание 2
// Написать функцию, которая принимает в качестве аргументов строку и объект,
// а затем проверяет, есть ли у переданного объекта свойство с данным именем.
// Функция должна возвращать true или false.


function hasProperty(obj, property_name) {
    return property_name in obj
}



a = {
    a_prop: 1
}
console.log(hasProperty(a, 'a_prop'))
console.log(hasProperty(a, 'qwerty'))


b = Object.create(a)
b.b_prop = 2
console.log(hasProperty(b, 'a_prop'))
console.log(hasProperty(b, 'a_prop'))
console.log(hasProperty(b, 'qwerty'))
