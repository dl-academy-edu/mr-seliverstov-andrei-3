let num = +prompt("Введите любое число");
let expo = +prompt("Введите степень числа");
let deg = 1;
let i = 1;

if ((Number.isNaN(num)) || (Number.isNaN(expo))) {
    alert("Вы ввели некорректные данные")
} 
else {
    if (expo === 0) {
        console.log(1);
    } 
    else if (expo > 0) {
        for(i = 1; i <= expo; i++) {
            deg = num * deg;
        }        
        console.log(deg)
    }
    else if (expo < 0) {
        for(i = 1; i <= Math.abs(expo); i++) {
            deg = (1/num) * deg;
        }        
        console.log(deg)
    }
}
