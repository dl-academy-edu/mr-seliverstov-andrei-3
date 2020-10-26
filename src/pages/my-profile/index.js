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


// Form validation

function checkEmail(email) {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function checkPhone(telephone) {
    return telephone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function inputSetInvalid(input) {
    if(input.hasAttribute("is-invalid")) {
        return
    }
    input.setAttribute("is-invalid", "");
    function handel() {
        input.classList.remove("is-invalid");
        input.removeAttribute("is-invalid");
    }
    input.classList.add("is-invalid");
    input.addEventListener("input", handel);
}

function inputSetInvalidFeedback(input, error) {
    if(input.hasAttribute("invalid-feedback")) {
        return
    }
    input.setAttribute("invalid-feedback", "");
    function handel() {
        message.remove();
        input.removeEventListener("input", handel);
        input.removeAttribute("invalid-feedback");
    }
    const message = document.createElement("span");
    message.classList.add("invalid-feedback");
    message.innerText = error;
    input.insertAdjacentElement("afterend", message)
    input.addEventListener("input", handel);
}

function inputSetNormal(input) {
    if(input.hasAttribute("is-normal")) {
        return
    }
    input.setAttribute("is-normal", "");
    function handel() {
        input.classList.remove("is-normal");
        input.removeAttribute("is-normal");
    }
    input.classList.add("is-normal");
    input.addEventListener("input", handel);
}

function inputSetNormalFeedback(input) {
    if(input.hasAttribute("normal-feedback")) {
        return
    }
    input.setAttribute("normal-feedback", "");
    function handel() {
        message.remove();
        input.removeEventListener("input", handel);
        input.removeAttribute("normal-feedback");
    }
    const message = document.createElement("span");
    message.classList.add("normal-feedback");
    message.innerText = "All right";
    input.insertAdjacentElement("afterend", message)
    input.addEventListener("input", handel);
}

function setFormError(form, errors) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        if(errors[input.name]) {
            inputSetInvalid(input);
            inputSetInvalidFeedback(input, errors[input.name]);
        }
        else {
            inputSetNormal(input);
            inputSetNormalFeedback(input);
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        if(errors[textarea.name]) {
            inputSetInvalid(textarea);
            inputSetInvalidFeedback(input, errors[textarea.name]);
        }
        else {
            inputSetNormal(input);
            inputSetNormalFeedback(input);
        }
    }
}

function getFormData(form, data={}) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        switch(input.type) {
            case "radio":
                if(input.checked) {
                    data[input.name] = input.value;
                }
                break;
            case "checkbox":
                if(!data[input.name]) {
                    data[input.name] = [];
                }
                if(input.checked) {
                    if(data[input.name]) {                    
                        data[input.name].push(input.value);
                    }
                }
                break;
            case "file":
                data[input.name] = input.files;
                break;
            default:
                data[input.name] = input.value;
                break;
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        data[textarea.name] = textarea.value;
    }
    return data;
}





(function() {
    const form = document.forms["editing-password"];
    console.log("modal-form =", form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if(Object.keys(errors).length) {
            setFormError(form, errors);
        }
        console.log(errors);
    });

    function validateData(data, errors = {}) {
        if(data["old-password"] === "") {
            errors["old-password"] = "Нужно ввести старый пароль";
        }
        if(data["new-password"] === data["old-password"] || data["new-password"] === "") {
            errors["new-password"] = "Нужно ввести новый пароль";
        }
        if(data["repeat-password"] !== data["new-password"] || data["repeat-password"] === "") {
            errors["repeat-password"] = "Пароль не совпал";
        }
        return errors;
    }
})();

(function() {
    const form = document.forms["editing-data"];
    console.log("modal-form =", form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if(Object.keys(errors).length) {
            setFormError(form, errors);
        }
        console.log(errors);
    });

    function validateData(data, errors = {}) {
        if(!checkEmail(data.email)) {
            errors.email = "Введен неверный адрес почты";
        }        
        if(!data.name) {
            errors.name = "Введите имя";
        }
        if(!data.surname) {
            errors.surname = "Введите фамилию";
        }
        if(data.location === "") {
            errors.location = "Укажите адрес местоположения";
        }  
        if(data.age === "") {
            errors.age = "Укажите возраст";
        }  
        return errors;
    }
})();