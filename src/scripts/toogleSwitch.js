// let toogle = "off"

// function toogleSwitch() {
//     if(toogle === 'off'){
//         toogle = 'on';
//         document.querySelector('#toogle-label').innerHTML="COMMON-NAME"
//     } else {
//         toogle = 'off';
//         document.querySelector('#toogle-label').innerHTML="LATIN"
//     }
// }
function toogleSwitch() {
    if (document.getElementById('toogle').checked) {
        document.querySelector('.toogle-label-latin').classList.add("glow");
        document.querySelector('.toogle-label-common').classList.remove("glow");
    } else {
        document.querySelector('.toogle-label-common').classList.add("glow");   
        document.querySelector('.toogle-label-latin').classList.remove("glow");
    }
}