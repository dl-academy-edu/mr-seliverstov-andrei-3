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