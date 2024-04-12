function setOrderButton(){
    let orderbtn = document.querySelector("#order-btn")
    orderbtn.addEventListener("click", async function(event){
        event.preventDefault();
        if (!orderbtn.classList.contains("disabled")){
            if (Array.from(document.querySelectorAll('input[required]')).every(field => field.value.trim() !== '')){
                if (parseInt(document.querySelector(".total-cost").innerHTML.replace("₽",'')) < 200){
                    alert("Минимальная сумма самовывоза - 200₽")
                }
                else{
                    setLoading(true)
                    fetch(`${server}/addorder${slash}`,{
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                            location:getCookie("location"),
                            cost:parseInt(document.querySelector(".total-cost").innerHTML.replace("₽",'')),
                            name:document.querySelector("#name").value,
                            phone:document.querySelector("#phone").value,
                            order:unhash(getCookie("cart"))
                        })
                    }).then(r=>r.json())
                    .then(data=>{
                        setLoading(false)
                        document.querySelector(".modal").innerHTML += `
                        <div class="modal__overlay"></div>
                        <div class="modal__window rounded">
                            <h2>Заказ был принят</h2>
                            <div class="spa-btn modal-btn">Вернуться на главную</div>
                        </div>`
                        document.querySelector(".modal").style.display = "block"
                        document.querySelector(".modal-btn").onclick = ()=>{
                            document.querySelector(".modal").innerHTML = ""
                            document.querySelector(".modal").style.display = "none"
                            eraseCookie("cart")
                            cartItems = []
                            goMain()
                        }
                        document.querySelector(".modal__overlay").onclick = ()=>{
                            document.querySelector(".modal").innerHTML = ""
                            document.querySelector(".modal").style.display = "none"
                            eraseCookie("cart")
                            cartItems = []
                            goCart()
                        }
                    })
                }
            }else{
                alert("Заполните все поля!")
            }
        }
    })
}




//eraseCookie("cart");goMain()