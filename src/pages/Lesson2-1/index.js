let num = +prompt("Введите любое число");

if(Number.isNaN(num)) {
    alert("Это не число")
} else {
    for (let i = 1; i <= num; i++) {
        if (i % 4 == 0) {
            continue;
        }
        else {
            console.log(i);
        }
    }
}
