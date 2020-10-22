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

(function(){
    const slider = document.querySelector(".slider");
    const wrapper = slider.querySelector(".slider__wrapper");
    const innerWrapper = wrapper.querySelector(".slider__inner-wrapper");
    const pagination = slider.querySelector(".slider__pagination");
    const buttonBack = slider.querySelector(".slider__backward-button");
    const buttonNext = slider.querySelector(".slider__forward-button");
    const slides = [...wrapper.querySelectorAll(".slider__slide")];
    const aniTime = 500;

    let activeSlide = 0;
    let slideWidth = 0;
    let dots = [];
    let timerId = null;

    initSlidesWidth();
    createPagination();
    setActiveSlide(0, false);

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