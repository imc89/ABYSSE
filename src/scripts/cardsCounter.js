async function fishCardsCounter() {
    const response = await fetch(`https://raw.githubusercontent.com/imc89/ABYSSE/main/src/data/data.json`);
  
    const jsonData = await response.json();
    let groups = {};
    for (const object of jsonData) {
      let group = groups[object.url];
      if (!group) {
        group = [];
        groups[object.url] = group;
      }
  
      group.push(object);
    }
    const counter = Object.keys(groups).length;
    return counter;
    //EN GROUPS TENGO LOS GRUPOS ES UN OBJ DE ARRAYS 
  }
  