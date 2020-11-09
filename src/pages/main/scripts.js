//Scroll

(function(){
    const button = document.querySelector(".button-scroll_js")
    if(!button){        
        return;
    }

    function hiddenScroll(event) {
        if(window.pageYOffset > 1500) {
            if(button.classList.contains("hidden")) {
                button.classList.remove("hidden");
            }
        }
        else {
            if(!button.classList.contains("hidden")) {
                button.classList.add("hidden");
            }
        }
    }    
    
    function smoothScroll(event) {
        if((window.pageYOffset > 1500) && (button.contains(event.target))) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }

    window.addEventListener("scroll", hiddenScroll);
    window.addEventListener("click", smoothScroll);
})();

//Sign in

(function() {
    let sign = document.querySelector(".sign_js"),
        buttonOpen = document.querySelector(".button__sign-open_js"),
        exitButton = document.querySelector(".exit__sign-button_js"),
        inputText = document.querySelector(".modal__input-sign_js");

    buttonOpen.addEventListener("click", function() {
        sign.classList.add("sign_open");
        inputText.focus();
    });

    exitButton.addEventListener("click", function() {
        sign.classList.remove("sign_open");
        buttonOpen.focus();
    });

    window.addEventListener("keydown", function(e) {
        if(e.code === "Escape" && sign.classList.contains("sign_open")){
            sign.classList.remove("sign_open")
            buttonOpen.focus();
        }
    })
})();

//Register modal

(function() {
    let register = document.querySelector(".register_js"),
        buttonOpen = document.querySelector(".button__register-open_js"),
        exitButton = document.querySelector(".exit__register-button_js"),
        inputText = document.querySelector(".modal__input-register_js");

    buttonOpen.addEventListener("click", function() {
        register.classList.add("register_open");
        inputText.focus();
    });

    exitButton.addEventListener("click", function() {
        register.classList.remove("register_open");
        buttonOpen.focus();
    });

    window.addEventListener("keydown", function(e) {
        if(e.code === "Escape" && register.classList.contains("register_open")){
            register.classList.remove("register_open")
            buttonOpen.focus();
        }
    })
})();

//Send message modal

(function() {
    let message = document.querySelector(".message_js"),
        buttonOpen = document.querySelector(".button__message-open_js"),
        exitButton = document.querySelector(".exit__message-button_js"),
        inputText = document.querySelector(".modal__input-message_js");

    buttonOpen.addEventListener("click", function() {
        message.classList.add("message_open");
        inputText.focus();
    });

    exitButton.addEventListener("click", function() {
        message.classList.remove("message_open");
        buttonOpen.focus();
    });

    window.addEventListener("keydown", function(e) {
        if(e.code === "Escape" && message.classList.contains("message_open")){
            message.classList.remove("message_open")            
            buttonOpen.focus();
        }
    })
})();

// Avatar slider

(function() {

    const option = {
        sliderEl: ".slider",
        defaultActiveSlide: +localStorage.getItem("activeSlide") || 0,
    };   

    const sliderBox = slider(option);
    
    function slider({sliderEl, defaultActiveSlide = 0}) {
        const slider = document.querySelector(sliderEl);
        const wrapper = slider.querySelector(".slider__wrapper");
        const innerWrapper = wrapper.querySelector(".slider__inner-wrapper");
        const pagination = slider.querySelector(".slider__pagination");
        const buttonBack = slider.querySelector(".slider__backward-button");
        const buttonNext = slider.querySelector(".slider__forward-button");
        const slides = [...wrapper.querySelectorAll(".slider__slide")];
        const aniTime = 500;

        let activeSlide = defaultActiveSlide;
        let slideWidth = 0;
        let dots = [];
        let timerId = null;

        initSlidesWidth();
        createPagination();
        setActiveSlide(activeSlide, false);

        window.addEventListener("resize", function() {
            initSlidesWidth();
            setActiveSlide(activeSlide, false);
        })

        function addAnimation(duration) {
            clearTimeout(timerId);
            innerWrapper.style.transition = `transform ${duration}ms`;
            timerId = setTimeout(function() {
                innerWrapper.style.transition = "";
            }, duration);
        }

        function initSlidesWidth() {
            slideWidth = wrapper.clientWidth;
            for (let slide of slides) {
                slide.style.width = `${slideWidth}px`
            }
        }

        function setActiveSlide(index, playAnimation = true) {
            if(index < 0 || index >= slides.length) {
                return
            }
            if(playAnimation) {
                addAnimation(aniTime);
            }

            dots[activeSlide].classList.remove("slider__pagination-dots-active");
            dots[index].classList.add("slider__pagination-dots-active");        

            if(index === 0) {
                buttonBack.setAttribute("disabled", "");
            }
            else {
                buttonBack.removeAttribute("disabled");
            }

            if(index === slides.length - 1) {
                buttonNext.setAttribute("disabled", "");
            }
            else {
                buttonNext.removeAttribute("disabled");
            }
            innerWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
            activeSlide = index;
            localStorage.setItem("activeSlide", activeSlide);
        }

        buttonBack.addEventListener("click", function() {
            setActiveSlide(activeSlide - 1);
        })

        buttonNext.addEventListener("click", function() {
            setActiveSlide(activeSlide + 1);
        })

        function createPagination() {
            for(let i = 0; i < slides.length; i++) {
                let dot = createDot(i);
                pagination.insertAdjacentElement("beforeend", dot);
                dots.push(dot);
            }
        }

        function createDot(index) {
            let dot = document.createElement("button");
            dot.classList.add("slider__pagination-dots");
            if(index === activeSlide) {
                dot.classList.add("slider__pagination-dots-active")
            }
            dot.addEventListener("click", function() {
                setActiveSlide(index);
            })
            return dot;
        }   
    } 
    
})();

// Portfolio slider

(function() {
    
    var mySwiper = new Swiper('.swiper-container', {

        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
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
    const form = document.forms["modal-register"];
    console.log("modal-form =", form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if(Object.keys(errors).length + 1) {
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
        if(data.password.length < 8) {
            errors.password = "Пароль слишком короткий";
        }
        if((data.password !== data["repeat-password"]) || (data["repeat-password"] === "")) {
            errors["repeat-password"] = "Введен неправильный пароль";
        }
        if(data.location === "") {
            errors.location = "Укажите адрес местоположения";
        }  
        if(data.age === "") {
            errors.age = "Укажите возраст";
        }  
        if(data.consent[0] !== "consent") {
            errors.consent = "Необходимо дать согласие";
        }
        return errors;
    }
})();

(function() {
    const form = document.forms["modal-sign"];
    console.log("modal-form =", form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if(Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
        console.log(errors);
    });

    function validateData(data, errors = {}) {
        if(!checkEmail(data.email)) {
            errors.email = "Введен неверный адрес почты";
        } 
        if(data.password.length < 8) {
            errors.password = "Пароль слишком короткий";
        }
        return errors;
    }
})();

(function() {
    const form = document.forms["modal-message"];
    console.log("modal-form =", form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = getFormData(event.target);
        const errors = validateData(data);
        if(Object.keys(errors).length + 1) {
            setFormError(form, errors);
        }
        console.log(errors);
    });

    function validateData(data, errors = {}) {       
        if(!data.name) {
            errors.name = "Введите имя";
        }
        if(!data["message-subject"]) {
            errors["message-subject"] = "Введите тему сообщения";
        }
        if(!data.email) {
            errors.email = "Введите адрес почты";
        } 
        if(!data["mobile-phone"]) {
            errors["mobile-phone"] = "Введите номер телефона";
        }
        if(data.consent[0] !== "consent") {
            errors.consent = "Необходимо дать согласие";
        }
        return errors;
    }
})();

