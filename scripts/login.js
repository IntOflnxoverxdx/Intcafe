const loginBtn = document.querySelector("#login-btn");

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
        if (data.success == true){
            setCookie("location",data.location)
            window.location.href = "orders.html"
        }
    })
}

loginBtn.onclick = ()=>{
    if (Array.from(document.querySelectorAll('input[required]')).every(field => field.value.trim() !== '')){
        fetch(`${server}/login${slash}`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                login:document.querySelector("#code").value,
                password:document.querySelector("#passkey").value,
            })
        }).then(r=>r.json())
        .then(data=>{
            if (data.success == true){
                setCookie("token",data.token)
                window.location.reload()
            }else{
                alert(data.message)
            }
        })
    }else{
        alert("Все поля должны быть заполнены")
    }
}