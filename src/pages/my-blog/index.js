const SERVER_URL = "https://academy.directlinedev.com";
const VERSION_API = "1.0.0";

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

//Mobile menu

var buttonOpenMenu = document.querySelector(".js_button-open-menu"),
    buttonCloseMenu = document.querySelector(".js_button-close-menu"),
    mobile = document.querySelector(".mobile-menu__js");

buttonOpenMenu.addEventListener("click", function() {
    mobile.classList.add("mobile__open")
});

buttonCloseMenu.addEventListener("click", function() {
    mobile.classList.remove("mobile__open")
});

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
        // console.log(realData);
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
    // console.log(url);
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



function getPosts(params, onload) {

    let url = new URL("http://hh.ru");
    if(params.tags) {
        url.searchParams.set("tags", JSON.stringify(params.tags));
    }

    if(params.shows) {
        url.searchParams.set("limit", JSON.stringify(+params.shows));
    }

    let sort = ["id", "ASC"];
		if (params.sort) {
			sort[0] = params.sort;
		}

	url.searchParams.set("sort", JSON.stringify(sort));
    
    url.searchParams.set("offset", JSON.stringify(+params.shows * params.page));  

    url.searchParams.set("v", VERSION_API);  
    
    let filter = {};

    
    if (params.views) {
        let min = (params.views).split("-")[0];
        let max = (params.views).split("-")[1];
        filter.views = {$between: [min, max]};
        console.log(filter.views);
    }
    
    if(params.title) {
        filter.title = params.title;
    }
    
    url.searchParams.set("filter", JSON.stringify(filter));
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${SERVER_URL}/api/posts?${url.searchParams}`);
    xhr.send();
    xhr.onload = function() {
        onload(xhr);
    }
    xhr.onerror = function() {
        console.error("Ошибка сервера");
    }
}


(function() {
    const form = document.querySelector(".form_js");
    const box = document.querySelector(".tags-box_js");
    const resultBox = document.querySelector(".result_js");
    const paginationBox = document.querySelector(".pagination_js")
    let data = {
        page: 0
    };
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${SERVER_URL}/api/tags`);
    xhr.send();
    xhr.onload = function() {
        const response = JSON.parse(xhr.response);
        if(response.success) {   
            box.innerHTML = "";  
            for(let tag of response.data) {
                box.innerHTML += tagCreator(tag);
            }  
            const params = getParamsFromURL();
            setValueToForm(form, params);
            console.log(response);
        }
        else {
            alert(response._message);
        }
    }
    xhr.onerror = function() {
        console.error("Ошибка сервера");
    }

        
    form.addEventListener("submit", function submit(e, isA) {
        e.preventDefault();
        let page = data.page || 0;
        data = getFormData(form);
        if(isA) {
            data.page = page;
        }
        else {
            data.page = 0;
        }
        data.shows = +data.shows || 0;
        console.log(data);
        setParamsToURL(data);

        resultBox.innerHTML = spinnerCreator();
        getPosts(data, function callback(xhr) {
            const response = JSON.parse(xhr.response);
            if(response.success) {
                resultBox.innerHTML = "";
                for(let card of response.data) {
                    resultBox.innerHTML += cardCreator(card); 
                }   
                let count = response.count, index = 0;
                paginationBox.innerHTML = "";
                while (count - params.shows > 0) {
                    count -= params.shows;
                    const a = pageCreator(index, data, function(e) {
                        submit(e, true);
                    })
                    index++;
                    paginationBox.insertAdjacentElement("beforeend", a);
                } 
                const a = pageCreator(index, data, function(e) {
                    submit(e, true);
                })
                paginationBox.insertAdjacentElement("beforeend", a);
                console.log(response.count)           
            }
            else {
                console.error("Ошибка сервера");
            }
        })
    })
})();

function spinnerCreator() {
    return`
    <div class="loading">
        <h1>Загрузка постов</h1>
    </div>`;
}

function tagCreator(tag) {
    return`
    <label class="filter__block-tags-label">               
        <input class="filter__block-tags-input hidden" name="tags" type="checkbox" value="${tag.id}">
        <span style="color: ${tag.color}" class="filter__block-tags-text"></span>
    </label>`;
}

function cardCreator(card) {
    return`
    <li class="blog__item">
        <picture>
            <source srcset="${SERVER_URL}${card.photo.desktopPhotoUrl}, ${SERVER_URL}${card.photo.desktop2xPhotoUrl} 2x" media="(min-width: 1024px)">
            <source srcset="${SERVER_URL}${card.photo.tabletPhotoUrl}, ${SERVER_URL}${card.photo.tablet2xPhotoUrl} 2x" media="(min-width: 768px) and (max-width: 1023px)">
            <source srcset="${SERVER_URL}${card.photo.mobilePhotoUrl}, ${SERVER_URL}${card.photo.mobile2xPhotoUrl} 2x" media="(max-width: 767px)">
            <img class="blog__picture" srcset="${SERVER_URL}${card.photo.desktopPhotoUrl}" alt="${card.title}">
        </picture>
        <div class="blog__block">
            <div class="blog__tags"></div>
            <div class="blog__information">
                <span class="blog__infotmation-date">${new Date(card.date).toLocaleDateString()}</span>
                <span class="blog__infotmation-views">${card.views} views</span>
                <span class="blog__infotmation-comments">${card.commentsCount} comments</span>
            </div>
            <div class="blog__text">
                <h3 class="h3-header">${card.title}</h3>
                <p class="blog__text-info">${card.text}</p>
                <a href="#" class="blog__text-link">Go to this post</a>
            </div>
        </div>
    </li>`
}

function pageCreator(index, data, onclick) {	

    let a = document.createElement("a");
    a.setAttribute("href", "?page="+index);
    a.classList.add("blog__pagination-button");
    a.addEventListener("click", function(e) {
        e.preventDefault();
        data.page = index;
        onclick(e);
    });
    a.innerText = +index + 1;
	return a;
}
