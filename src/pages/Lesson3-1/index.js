(function func() {
    const num = +prompt("Введите свой возраст");
    if ((Number.isNaN(num)) || (num < 1)){
        alert("Вы ввели некорректные данные");
        func();
    }
    else {
        if (+num < 18) {
            alert("Вы младше допустимого возраста");
            func();
        } 
        else {
            alert("Ваш возраст допустим");
        }
    }
})();