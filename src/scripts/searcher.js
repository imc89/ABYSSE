function search() {
    searcher();
}

async function searcher() {
    const input = document.querySelector("#data");
    if (input) {
        const data = input.value;
        const jsonData = await fetchSpeciesFor();
        console.log(jsonData);

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i]['common-name'] == data) {
                window.location.href=jsonData[i]['url'];
            } else if (jsonData[i]['latin'] == data) {
                window.location.href=jsonData[i]['url'];
            } else if (jsonData[i]['id'] == data) {
                window.location.href=jsonData[i]['url'];
            }
        
        }
    }
}

async function fetchSpeciesFor() {
    const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSE/main/src/data/data.json`);
    return await response.json();
}