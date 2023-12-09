async function jsonInfo(info_json) {
  const response = await fetch(info_json);
  const jsonData = await response.json();
  openModal(jsonData);
}

function openModal(info_json) {
  // Disable scrolling for the main page
  document.body.style.overflow = 'hidden';

  // Create the modal
  const modalContainer = document.getElementById('modal-container');
  const modalContent = document.getElementById('modal-content');

  // Add class to make modal fullscreen
  modalContainer.classList.add('modal-fullscreen');
  modalContent.classList.add('modal-fullscreen');

  // Set modal content to display lorem ipsum for the selected name
  modalContent.innerHTML = `
    <div style="text-align: center; position: absolute; top: 0; left: 0; max-width: 100%; width: 100%; height: 100%; overflow: auto;">
      <div class="modal-content-inner" style="height: 100%; overflow-y: auto;">
        <h2 style="color: white; font-style: bold; text-align: center;">${info_json.name.toUpperCase()}</h2>
        <img src="${info_json.img_1}" class="glow-img card-img" style="display: block; margin: 0 auto; margin-top: 30px; width="325"/>
        <p style="color: white; text-align: justify; padding:10px">${info_json.info_1}</p>
        <hr>
        <p style="color: white; text-align: justify; padding:10px">${info_json.info_2}</p>
        <hr>
        <p style="color: white; text-align: justify; padding:10px">${info_json.info_3}</p>
      </div>
    </div>
  `;

  // Show the modal
  modalContainer.style.display = 'block';

  // Enable scrolling only for the modal container
  modalContainer.style.overflow = 'auto';
  
  window.scrollTo(0,0);
  // Close the modal on click outside
  modalContainer.addEventListener('click', (event) => {
    document.body.style.overflow = ''; // Re-enable scrolling for the main page
    modalContainer.style.display = 'none';
  });
}