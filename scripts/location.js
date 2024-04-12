const locButton = document.querySelector("#location")
let userlocation = getCookie("location")
function setValue(value){
    locButton.querySelectorAll("option").forEach(item => {
        if (item.value == value){
            item.setAttribute("selected","selected")
        }
    });
    setCookie("location",locButton.value)
}

if (userlocation != null){
    setValue(userlocation)
}else{
    setValue("Уссурийск")
}
locButton.onchange = ()=>{
    setValue(locButton.value)
}
