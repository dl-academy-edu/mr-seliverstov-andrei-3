// Editing password

(function() {
    let password = document.querySelector(".password_js"),
        buttonOpen = document.querySelector(".button__password-open_js"),
        exitButton = document.querySelector(".exit__password-button_js"),
        inputText = document.querySelector(".editing__input-password_js");

    buttonOpen.addEventListener("click", function() {
        password.classList.add("password_open");
        inputText.focus();
    });

    exitButton.addEventListener("click", function() {
        password.classList.remove("password_open");
        buttonOpen.focus();
    });

    window.addEventListener("keydown", function(e) {
        if(e.code === "Escape" && password.classList.contains("password_open")){
            password.classList.remove("password_open")
            buttonOpen.focus();
        }
    })
})();

// Editing data

(function() {
    let data = document.querySelector(".data_js"),
        buttonOpen = document.querySelector(".button__data-open_js"),
        exitButton = document.querySelector(".exit__data-button_js"),
        inputText = document.querySelector(".editing__input-data_js");

    buttonOpen.addEventListener("click", function() {
        data.classList.add("data_open");
        inputText.focus();
    });

    exitButton.addEventListener("click", function() {
        data.classList.remove("data_open");
        buttonOpen.focus();
    });

    window.addEventListener("keydown", function(e) {
        if(e.code === "Escape" && data.classList.contains("data_open")){
            data.classList.remove("data_open")
            buttonOpen.focus();
        }
    })
})();