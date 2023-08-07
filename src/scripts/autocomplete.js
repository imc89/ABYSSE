var species = [];
var inputElem = null;
var resultsElem = null;
var activeIndex = 0;
var filteredResults = [];
// Se inicializa el filtro de búsqueda con 'name'
// Initialise the search filter with 'name'.
var filterSearch = 'name';

function init() {

  fetch(`https://raw.githubusercontent.com/imc89/ABYSSE/main/src/data/data.json`)
    .then((response) => response.json())
    .then((data) => (species = data));

  resultsElem = document.querySelector("#autocomplete-data");
  inputElem = document.querySelector('#data');

  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });
  inputElem.addEventListener("input", (event) => {
    autocomplete(event,)
    if (document.getElementById('toggle').checked) {
      filterSearch = 'latin';
      autocomplete(event, 'latin');
    } else {
      filterSearch = 'name';
      autocomplete(event, 'name');
    }

  });
  inputElem.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });
}

function autocomplete(event, filterSearch) {
  // Cambio el font size del placeholder en caso de introducir 
  // Change placeholder font size when write to see bigger letters
  if (document.querySelector('#data').value === '') {
    document.querySelector('#data').style.fontSize = "11px";
  } else {
    document.querySelector('#data').style.fontSize = "13px";
  } const value = inputElem.value;

  if (!value) {
    hideResults();
    inputElem.value = "";
    return;
  }

  // En caso de que el filtro sea 'name' se hará una busqueda por nombres tanto en inglés como en español 
  // dependiendo de las coincidencias en la entrada del input.
  // In case the filter is 'name' it will search for names in both English and Spanish. 
  // depending on the matches with the input.
  if (filterSearch === 'name') {
    // Primero devuelvo el array [nombre,name,latin] de los resultados que coinciden con los campos nombre y name
    // First it returns the array [name,name,latin] of the results that match the name and name fields.
    filteredResults = species.filter((fish) => {
      if (fish['nombre'].toLowerCase().startsWith(value.toLowerCase())) {
        return fish['nombre'].toLowerCase().startsWith(value.toLowerCase())
      } else if (fish['name'].toLowerCase().startsWith(value.toLowerCase())) {
        return fish['name'].toLowerCase().startsWith(value.toLowerCase());
      }
      // Mapeo el array para devolver de dentro del array el resultado que coincide.
      // Map the array to return the matching result from inside the array.
    }).map(fish => {
      if (fish.nombre.startsWith(value.toLowerCase())) {
        return fish.nombre;
      } else if (fish.name.startsWith(value.toLowerCase())) {
        return fish.name;
      }
    });
  } else {
    // En caso de que el filtro no sea nombre se filtrará solamente para datos en latin
    // Primero devuelvo el array [nombre,name,latin] de los resultados que coinciden.
    // In case the filter is not name it will filter only for latin data.
    // First I return the array [name,name,latin] of matching results.
    filteredResults = species.filter((fish) => {
      if (fish['latin'].toLowerCase().startsWith(value.toLowerCase())) {
        return fish['latin'].toLowerCase().startsWith(value.toLowerCase())
      }
      // Mapeo el array para devolver de dentro del array el resultado que coincide con los campos latin.
      // Map the array to return the result that matches the latin fields.
    }).map(fish => {
      if (fish.latin.startsWith(value.toLowerCase())) {
        return fish.latin;
      }
    });
  }

  // Mapeo a través de los resultados para pintar el listado.
  // Map through the results to paint the list.
  resultsElem.innerHTML = filteredResults
    .map((result, index) => {
      const isSelected = index === 0;

      return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
          ${result}
        </li>
      `;
    })
    .join("");
  if (filteredResults.length) {
    resultsElem.classList.remove("hidden");
  }
}

function handleResultClick() {
  if (event.target && event.target.nodeName === "LI") {
    selectItem(event.target);
  }
}
function handleResultKeyDown(event) {
  const { key } = event;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
    activeItem.classList.remove('selected');
    activeItem.setAttribute('aria-selected', 'false');
  }
  switch (key) {
    case "Backspace":
      return;
    case "Escape":
      hideResults();
      inputElem.value = "";
      return;
    case "ArrowUp": {
      if (activeIndex === 0) {
        activeIndex = filteredResults.length - 1;
      }
      activeIndex--;
      break;
    }
    case "ArrowDown": {
      if (activeIndex === filteredResults.length - 1) {
        activeIndex = 0;
      }
      activeIndex++;
      break;
    }
    case "Enter": {
      // Se oculta el listado y se pierde foco del input;
      // The list is hidden and input focus is lost;
      hideResults();
      inputElem.blur();
      this.searcher();
      break;
    }
    default:
      selectFirstResult();
  }
  selectResult();
}
function selectFirstResult() {
  activeIndex = 0;
}

function selectResult() {
  const value = inputElem.value;
  const autocompleteValue = filteredResults[activeIndex];
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
    activeItem.classList.add('selected');
    activeItem.setAttribute('aria-selected', 'true');
  }
  if (!value || !autocompleteValue) {
    return;
  }
  if (value !== autocompleteValue) {
    inputElem.value = autocompleteValue;
    inputElem.setSelectionRange(value.length, autocompleteValue.length);
  }
}
function selectItem(node) {
  if (node) {
    inputElem.value = node.innerText;
    hideResults();
  }
}

function hideResults() {
  this.resultsElem.innerHTML = "";
  this.resultsElem.classList.add("hidden");
}

function getItemAt(index) {
  return this.resultsElem.querySelector(`#autocomplete-result-${index}`)
}

window.addEventListener('load', function () {
  init();
  // Toma el input y oculta la lista cuando se pierde foco.
  // Takes input and hides the list when focus is lost.
  inputElem = document.querySelector('#data');
  inputElem.addEventListener("focusout", (event) => {
    inputElem.blur();
    hideResults();
  });
});