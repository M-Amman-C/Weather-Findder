var weatherBox = document.getElementById("weatherBox");
var backToHome = document.getElementById("backToHome");

setTimeout(()=>{
    weatherBox.style.opacity="100%";
    weatherBox.style.width="852px";
},1000);

backToHome.addEventListener("click",()=>{
    weatherBox.style.transition="all 1s";
    weatherBox.style.opacity="0%";
    weatherBox.style.width="0px";
    setTimeout(()=>{
        document.getElementById("form").submit();
    },2000)
})