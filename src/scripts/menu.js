function subMenu() {
    document.getElementById('slider').classList.toggle('closed');
    if (document.querySelector("#slider").classList.contains('closed')) {
        document.querySelector(".sliderp").style.paddingBottom = '0px'
        document.querySelector(".left-column").style.marginBottom = "480px"
    }  else {
        document.querySelector(".left-column").style.marginBottom = "330px"
    }
}