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

//Form data

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
    const form = document.querySelector(".form_js");
    const res = document.querySelector(".result_js");
    const links = document.querySelectorAll(".link_js")
    let realData = {page: 0};
    realData = getParamsFromURL();
    // res.innerHTML = JSON.stringify(realData, 0, 2);
    setValueToForm(form, realData);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const page = realData.page;
        realData = getFormData(form);
        realData.page = page;
        console.log(realData);
        setParamsToURL(realData);
        // res.innerHTML = JSON.stringify(realData, 0, 2);
    });

    for(let i = 0; i < links.length; i++) {
        let link = links[i];
        link.addEventListener('click', function(event) {
            event.preventDefault();
            realData.page = i;
            setParamsToURL(realData);
            // res.innerHTML = JSON.stringify(realData, 0, 2);
        });
    }
})();


function setParamsToURL(params = {}) {
    const keysArray = Object.keys(params);
    let url = new URL("http://hh.ru");
    for(let key of keysArray) {
        if(typeof params[key] === "object") {
            const arr = params[key];
            for(let item of arr) {
                url.searchParams.append(key, item);
            }
        }
        else {
            url.searchParams.append(key, params[key]);
        }
    }
    history.replaceState({}, document.title, url.search);
    console.log(url);
}

function setValueToForm(form, data) {
    let inputs = form.querySelectorAll("input");
    for (let input of inputs) {
        switch(input.type) {
            case "radio":
                if(data[input.name] === input.value) {
                    input.checked = true;
                }
                break;
            case "checkbox":
                if(data[input.name] && data[input.name].includes(input.value)) {
                    input.checked = true;
                }                
                break;
            default:
                if(data[input.name]) {
                    input.value = data[input.name];
                }
                break;
        }
    }
    let textareas = form.querySelectorAll("textarea");
    for (let textarea of textareas) {
        if(data[textarea.name]) {
            data[textarea.name] = textarea.value;
        }
    }
    return data;
}

function getParamsFromURL() {
    const searchParams = new URL(window.location).searchParams;
    let params = {};
    if(searchParams.has("tags")) {
        params.tags = searchParams.getAll("tags");
    }
    if(searchParams.has("views")) {
        params.views = searchParams.get("views");
    }
    if(searchParams.has("comments")) {
        params.comments = searchParams.getAll("comments");
    }
    if(searchParams.has("shows")) {
        params.shows = searchParams.get("shows");
    }
    if(searchParams.has("sort")) {
        params.sort = searchParams.get("sort");
    }
    if(searchParams.has("search")) {
		params.search = searchParams.get("search");
    }
    if(searchParams.has("page")) {
		params.page = searchParams.get("page");
	}
    return params;
}

