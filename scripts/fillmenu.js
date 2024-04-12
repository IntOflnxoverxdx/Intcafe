
function buttonsclick(){
let menuButtons = document.querySelectorAll(".menu-ch__item")


menuButtons.forEach(b => {
    b.onclick = ()=>{
        menuButtons.forEach(bu => {
            if (bu != b){
                bu.classList.remove("active")
            }else{
                bu.classList.add("active")
            }
        });
        setLoading(true)
        fetch(`${server}/alldishes/${document.querySelector(".menu-ch__item.active").innerHTML.trim()}${slash}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        }).then(r=>{
            console.log(r);
            return r.json()
        })
        .then(data=>{
            setLoading(false)
                document.querySelector(".menu").innerHTML = ""
                data = JSON.parse(data)
                let need_to_check_cart = false
                let cart = getCookie("cart")
                if (cart != null){
                    need_to_check_cart = true
                    cart = unhash(cart)
                }
                data.forEach(dish => {
                    let name = dish.fields.name
                    let ingridients = dish.fields.ingridients
                    let cost = dish.fields.cost
                    let count = 0
                    if (need_to_check_cart){
                        cart.forEach(el => {
                            if (el.id == dish.pk){
                                count = el.count
                            }
                        });
                    }else{
                        count = 0
                    }
                    
                    document.querySelector(".menu").innerHTML += `
                            <div class="menu__item shadow">
                                <span class="item__id" style="display:none;">${dish.pk}</span>
                                <img src="img/dishes/${name}.webp" alt="" class="menu__item__img">
                                <div class="menu__item__content">
                                    <h2 class="menu__item__name">${name}</h2>
                                    <p class="menu__item__ingridients">${ingridients}</p>
                                    <div class="menu__item__splitline"></div>
                                    <div class="menu__item__bottom">
                                        <div class="menu__item__cost" data-default="${cost}">${count == 0?cost:cost*count}₽</div>
                                        <div class="menu__item__count">
                                            <div class="minus__button spa-btn">-</div>
                                            <div class="menu__item__amount">${count}</div>
                                            <div class="plus__button spa-btn">+</div>
                                        </div>
                                        <div class="spa-btn to-cart">в корзину</div>
                                    </div>
                                </div>
                            </div>
                    
                    `
                });
                setCartButtons()
        })
    }
});
document.querySelector(".active").click()
}
buttonsclick()