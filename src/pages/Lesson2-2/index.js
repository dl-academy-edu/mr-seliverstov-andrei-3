let num = +prompt("Введите любое число");
let i = 1
let fact = 1

if((Number.isNaN(num)) || (num < 1)) {
    alert("Вы ввели некорректные данные")
} else {
    while (i <= num) {
        fact *= i;
        i++;
    }
}

console.log(fact)