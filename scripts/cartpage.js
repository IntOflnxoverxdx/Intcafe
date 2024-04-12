function goMain(){
    document.querySelector(".modal").innerHTML += ``
    document.querySelector("main").innerHTML = `
    <div class="container">
            <div class="info indent shadow rounded">
                <div class="info__item">
                    <img src="img/icons/clock.svg" alt="">
                    <div class="info__item__text">
                        <div class="info__text__main">
                            До 1 ч.
                        </div>
                        <div class="info__text__additional">
                            время приготовления
                        </div>
                    </div>
                </div>
                <div class="info__item">
                    <img src="img/icons/wallet.svg" alt="">
                    <div class="info__item__text">
                        <div class="info__text__main">
                            200 ₽
                        </div>
                        <div class="info__text__additional">
                            мин. сум. самовывоза
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-ch indent">
                <div class="menu-ch__item spa-btn active">
                    Рекомендуем
                </div>
                <div class="menu-ch__item spa-btn">
                    Супы
                </div>
                <div class="menu-ch__item spa-btn">
                    Салаты
                </div><div class="menu-ch__item spa-btn">
                    Десерты
                </div>
                <div class="menu-ch__item spa-btn">
                    Мясо
                </div>
                <div class="menu-ch__item spa-btn">
                    Гарнир
                </div>
            </div>
            <div class="menu indent">
                
            </div>
        </div>
    `
    buttonsclick()
}
goMain()


document.querySelector(".logo").onclick = goMain


function goCart(){
    setLoading(true)
    document.querySelector("main").innerHTML = `
    <div class="container">
        <div class="info indent shadow rounded">
            <div class="info__item">
                <img src="img/icons/clock.svg" alt="">
                <div class="info__item__text">
                    <div class="info__text__main">
                        До 1 ч.
                    </div>
                    <div class="info__text__additional">
                        время приготовления
                    </div>
                </div>
            </div>
            <div class="info__item">
                <img src="img/icons/wallet.svg" alt="">
                <div class="info__item__text">
                    <div class="info__text__main">
                        200 ₽
                    </div>
                    <div class="info__text__additional">
                        мин. сум. самовывоза
                    </div>
                </div>
            </div>
        </div>
        <div class="cart__wrapper indent">
            <div class="cart__items">

            </div>
            <div action="" class="cart__order rounded shadow">
                <label for="name">Имя</label>
                <input type="text" id="name" class="order__input" placeholder="Иван" required>
                <label for="phone">Номер телефона</label>
                <input type="tel" id="phone" class="order__input" placeholder="+7 (999) 999 99-99" required>
                <div class="order__bottom">
                    <div class="total-cost">0₽</div>
                    <!--input type="button" id="order-btn" class="spa-btn disabled" value="Заказать"-->
                    <button type="button" id="order-btn" class="spa-btn disabled">заказать</button>
                </div>
            </div>
        </div>
    </div>  
    `
    let cart = getCookie("cart")
    if (cart != null){
        cart = unhash(cart)
        setOrderButton()
        if (cart.length == 0){
            document.querySelector(".cart__items").innerHTML = "<h2>В корзине пусто!</h2>"
            document.querySelector("#order-btn").classList.add("disabled")
        }else{
            document.querySelector("#order-btn").classList.remove("disabled")
            document.querySelector(".cart__items").innerHTML = ""
            cart.forEach(dish => {
                fetch(`${server}/getdish/${dish.id}${slash}`,{
                    method:"GET",
                    Headers:{
                        "Content-type":"application/json"
                    }
                }).then(r=>r.json())
                .then(data=>{
                    data = JSON.parse(data)
                    document.querySelector(".cart__items").innerHTML +=
                    `
                    <div class="cart__item shadow">
                    <span class="item__id" style="display:none;">${dish.id}</span>
                    <img src="img/dishes/${data[0].fields.name}.webp" alt="" class="cart__item__img">
                    <div class="cart__item__content">
                        <h2 class="cart__item__name">${data[0].fields.name}</h2>
                        <p class="cart__item__ingridients">${data[0].fields.ingridients}</p>
                        <div class="cart__item__bottom">
                            <div class="cart__item__cost" data-default="${data[0].fields.cost}">${data[0].fields.cost*dish.count}₽</div>
                            <div class="cart__item__count">
                                <div class="minus__button spa-btn">-</div>
                                <div class="cart__item__amount">${dish.count}</div>
                                <div class="plus__button spa-btn">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                    `
                    setTotalCost()
                    setCartButtons(cart=true)
                    setLoading(false)
                })
            });
        }
    }else{
        document.querySelector(".cart__items").innerHTML = "<h2>В корзине пусто!</h2>"
    }
    setLoading(false)
}


document.querySelector(".cart").onclick = goCart