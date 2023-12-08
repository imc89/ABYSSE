async function jsonInfo(info_json) {
    const response = await fetch(info_json);
    const jsonData = await response.json();
    openModal(jsonData);
}

function openModal(info_json) {
// Create the modal
const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');

// Add class to make modal fullscreen
modalContainer.classList.add('modal-fullscreen');
modalContent.classList.add('modal-fullscreen');

// Set modal content to display lorem ipsum for the selected name
modalContent.innerHTML = `
<div style="text-align: center">
<h2 style="color: white; font-style: bold; text-align: center;">${info_json.name.toUpperCase()}</h2>
<img src="${info_json.img_1}" class="glow-img card-img" style="display: block; margin: 0 auto; margin-top: 30px; width="325"/>
    <p style="color: white; text-align: center;">${info_json.info_1}</p>
    <hr>
    <p style="color: white; text-align: center;">${info_json.info_2}</p>
    <hr>
    <p style="color: white; text-align: center;">${info_json.info_3}</p>
</div>
`;
// Set modal content to display image
// modalContent.innerHTML = `<img src="${info_json.img_1}" class="glow-img card-img" style="display: block; margin: 0 auto; margin-top: 30px; width="325" />`;

// Show the modal
modalContainer.style.display = 'block';
window.scrollTo(0, 0);
// Close the modal on click outside
modalContainer.addEventListener('click', (event) => {
    
  if (!event.target.closest('.modal-content')) {
    modalContainer.style.display = 'none';
  }
});
}