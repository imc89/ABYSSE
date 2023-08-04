
function imgSwitch(imgName, imgSrc) {
  if (document.images) {
    var img = document.images[imgName];
    if (img) img.src = imgSrc;
  }
}

