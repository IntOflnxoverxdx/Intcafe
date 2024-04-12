if (getCookie("token") != null){
    fetch(`${server}/check${slash}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            token:getCookie("token")
        })
    }).then(r=>r.json())
    .then(data =>{
        if (data.success == false){
            window.location.href = "login.html"
        }
    })
}else{
    window.location.href = "login.html"
}


document.querySelector("#location").innerHTML = getCookie("location")
document.querySelector(".logout").onclick = ()=>{
    eraseCookie("token")
    window.location.reload()
}


function getOrders(){
    fetch(`${server}/getorders${slash}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            token:getCookie("token")
        })
    }).then(r=>r.json())
    .then(data=>{
        data = JSON.parse(data)
        text = ""
        data.forEach(item => {
            text +=`
            <div class="orders__item shadow rounded">
                    <img src="img/icons/close.svg" class="item__delete" data-id="${item.pk}"></img>
                    <div class="item__order__content">
                        <h2>${item.fields.name}</h2>
                        <div class="order__item__content">
                            ${item.fields.dishes}
                        </div>
                        </div>
                        <div class="item__order__bottom">
                        <div class="order__item__phone">
                            ${item.fields.phone}
                        </div>
                    <div class="order__item__splitline"></div>
                    <div class="order__item__cost">${item.fields.cost}₽</div>
                    </div>
                </div>
            `
        });
        document.querySelector(".orders").innerHTML = text
        document.querySelectorAll(".item__delete").forEach(el => {
            el.onclick = ()=>{
                fetch(`${server}/deleteorder${slash}`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({
                        id:el.getAttribute("data-id")
                    })
                })
                document.querySelector(".orders").removeChild(el.parentElement)
            }
            
        });
    })
}
getOrders()
setInterval(() => {
    getOrders()
}, 5000);