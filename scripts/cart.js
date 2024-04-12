function setTotalCost(){
    let total = 0
    document.querySelectorAll(".cart__item__cost").forEach(item => {
        total += parseInt(item.innerHTML.replace("₽",""))
    });
    document.querySelector(".total-cost").innerHTML = total + "₽"
}
function setCartButtons(cart=false){
    let minbuttons = document.querySelectorAll(".minus__button")
    let plbuttons = document.querySelectorAll(".plus__button")
    let tag = cart?"cart":"menu";
    if (cart == false){
        let cartbuttons = document.querySelectorAll(".to-cart")

        cartbuttons.forEach(c => {
            if (parseInt(c.parentElement.querySelector(`.${tag}__item__amount`).innerHTML) > 0){
                el = c.parentElement.querySelector(`.${tag}__item__count`)
                el.style.display = "flex"
                c.style.display = "none"
            }
            c.onclick = ()=>{
                el = c.parentElement.querySelector(`.${tag}__item__count`)
                el.querySelector(`.${tag}__item__amount`).innerHTML = "1";
                el.style.display = "flex"
                c.style.display = "none"
                cartItems.push({id:parseInt(el.parentElement.parentElement.parentElement.querySelector(".item__id").innerHTML),count:1})
                setCookie("cart",hash(cartItems))
            }
        });
    }
    minbuttons.forEach(c => {
        c.onclick = ()=>{

            el = c.parentElement.querySelector(`.${tag}__item__amount`)
            count = parseInt(el.innerHTML)
            cost =  c.parentElement.parentElement.querySelector(`.${tag}__item__cost`)
            if (count > 1){
                el.innerHTML = count - 1;
                cost.innerHTML = cost.getAttribute("data-default") * (count - 1)+"₽";
            }
             else{
                if (cart){
                    e = el.parentElement.parentElement.parentElement.parentElement
                    e.parentElement.removeChild(e)
                    if (document.querySelectorAll(".cart__item").length == 0){
                        document.querySelector("#order-btn").classList.add("disabled")
                        document.querySelector(".cart__items").innerHTML = "<h2>В корзине пусто!</h2>"
                    }
                }
                else {
                    c.parentElement.style.display = "none";
                    c.parentElement.parentElement.querySelector(".to-cart").style.display = "flex";
                 }
             }
            cartItems.forEach(item => {
                if (item.id == el.parentElement.parentElement.parentElement.parentElement.querySelector(".item__id").innerHTML){
                    item.count = parseInt(count-1)
                    if(item.count == 0){
                        cartItems.splice(cartItems.indexOf(item),1)
                    }
                }
                setCookie("cart",hash(cartItems))
            });
            setTotalCost()
        }
    });
    
    plbuttons.forEach(c => {
        c.onclick = ()=>{
            el = c.parentElement.querySelector(`.${tag}__item__amount`)
            count = parseInt(el.innerHTML)
            if (count < 30){
                el.innerHTML = count += 1;
                cost =  c.parentElement.parentElement.querySelector(`.${tag}__item__cost`)
                cost.innerHTML = cost.getAttribute("data-default") * (count)+"₽";
            }
            cartItems.forEach(item => {
                if (item.id == el.parentElement.parentElement.parentElement.parentElement.querySelector(".item__id").innerHTML){
                    item.count = parseInt(count)
                    if(item.count == 0){
                        cartItems.pop(item)
                    }
                }
                setCookie("cart",hash(cartItems))
            });
            setTotalCost()
        }
    });
}
