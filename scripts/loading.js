loadingLastTime = new Date()
let isLoading = false
function setLoading(value){
    if (value == true){
        isLoading = true
        loadingLastTime = Date.now()
        document.querySelector(".loading").style.display = "block"
        scrollPos = {x:scrollX,y:scrollY}
        document.onscroll = ()=>{
            document.scrollX = scrollPos.x
            document.scrolly = scrollPos.y
        }
    }else{
        if (Date.now() - loadingLastTime >= loading_min_time){
            document.querySelector(".loading").style.display = "none"
            document.onscroll = ()=>{}
            isLoading = false
        }else{
            setTimeout(() => {
                setLoading(false)
            }, loading_min_time);
        }
    }
}