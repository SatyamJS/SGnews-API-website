// window.location.reload()
network();
let element = document.querySelector(".text")
element.addEventListener("focus", (e) => {

    element.className = "textarea-style"
})
element.addEventListener("blur", (e) => {
    element.className = "text"
})

const h2head = document.querySelector("#h2head")
let btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    if (langCheckbox.checked) {
        
        network("hi")
    }
    else {
        network("en")
    }
});



let card = document.querySelector(".box-item")
let darkM = document.querySelector("#checkbox")
darkM.addEventListener("click", (e) => {
    if (darkM.checked) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
    else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

    }
})



const langCheckbox = document.querySelector("#lang")
langCheckbox.addEventListener("click", (e) => {
    network("hi")

})



function network(language = "en") {
    try{

    
    let ele = document.querySelector(".text").value;
    let lang = language
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://free-news.p.rapidapi.com/v1/search?q=${ele}&lang=${lang}`);
    xhr.setRequestHeader("x-rapidapi-host", "free-news.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "a37fe7381dmsh9d66eb4be479249p1d06b0jsnb06245019ec4");
    
    xhr.onload = function () {
        
        if (this.readyState===4 && this.status == 200) {
            document.querySelector(".loading").style.display="none"
            h2head.innerText = `Top Headlines related to '${ele}'`
            let content = JSON.parse(this.response);
            if (content.status==="ok") {
                let arr = Array.from(content.articles)
                let str = "";
                arr.forEach(function (element) {
                    if (element.summary != null && element.media != null) {
                        let box = document.querySelector(".mainbox")
                        str += `<div  class="box-item" style="width: 21rem;">
                <img style="filter:hue-rotate(0deg)" src="${element.media}" class="images" width="100%" height="200px" alt="Image not Found">
                <div class="card-body">
                <h4 class="news-title" style="color:tomato">Title:<br></h4><span>${element.title}</span>
                  <p class="card-text" ><strong style="color:tomato">Description:</strong>${element.summary.slice(0, 400) + "..."}</p>
                  <a href=${element.link} class="link" target="_blank">Read More</a>
                </div>
              </div>`;
                        box.innerHTML = str;
                    }
                });
                document.querySelector(".mainbox").style.filter="blur(0px)"
            }
            else if(content.status!=="ok") {
                let box = document.querySelector(".mainbox")
                box.innerHTML = `<h1 style="text-align:center;">No matching results found</h1>`
                document.querySelector(".mainbox").style.filter="blur(0px)"

            }


        }
        else {
            h2head.value = "Something went wrong! Try again"
        }
    }
    xhr.send()
    document.querySelector(".mainbox").style.filter="blur(10px)"
    document.querySelector(".loading").style.display="block"
}
catch(error){
    console.log("")
}
}


let arrowUp = document.querySelector(".arrow-up")
let arrowDown = document.querySelector(".arrow-down")

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        arrowUp.style.display = "block";
    }
    else if (document.body.scrollTop > 1000000 || document.documentElement.scrollTop > 1000000) {
        arrowDown.style.display = "none"
    }
    else {
        arrowUp.style.display = "none";


    }
}

arrowUp.addEventListener("click", (e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

arrowDown.addEventListener("click", (e) => {
    document.body.scrollTop = 100000000;
    document.documentElement.scrollTop = 1000000000;
})

