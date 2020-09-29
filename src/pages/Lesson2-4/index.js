while (true) {
    let rand = Math.floor(1 + Math.random() * 10);
    console.log(rand);
    let num = +prompt("Введите любое число");
    if (Number.isNaN(num)) {
        alert("Вы ввели некорректные данные")
    }
    else {
        if (num != rand) {
            alert("Вы не угадали число")
        }
        else{
            alert("Вы угадали число")
            break
        }
    }
}