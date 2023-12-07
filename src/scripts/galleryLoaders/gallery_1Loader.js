function table() {
  const imageContainer = document.createElement('div');
  document.body.appendChild(imageContainer);


  (async () => {

    const counter = await fishCardsCounter();

    for (var i = 1; i <= counter; i++) {
      const imageDiv = document.createElement('div');
      imageContainer.style.display = 'flex';
      imageContainer.style.flexWrap = 'wrap'; // Wrap images to form rows
      imageContainer.style.justifyContent = 'center';
      imageDiv.className = 'glow-img-container'; // Assign the 'glow' class to the div

      const imageElement = document.createElement('img');

      imageElement.src = `../../../img/galleries/gallery_1/fishes_${i}.jpg`;

      imageElement.onerror = () => {
        imageElement.onerror = null;
        imageElement.src = '../../../img/icons_and_labels/default_img.png';
      };

      imageElement.className = 'glow-img'
      imageElement.style.margin = "20px"
      imageElement.style.width = '140px'
      imageElement.classList.add = "glow"
      const imageURL = `./fishes/fishes_${i}.html`;

      imageElement.addEventListener('click', () => {
        window.open(imageURL, '_self');
      });
      // imageContainer.appendChild(imageElement);
      imageDiv.appendChild(imageElement); // Append the image to its respective div
      imageContainer.appendChild(imageDiv);
    }

  })();
}
