const url = `http://localhost:3001/pokemons`

const generationHTML = pokemons =>  pokemons.reduce((accumulator, { pokedexNumber, name, typeone, typetwo }) => {
    let elementTypes = [];

    elementTypes.push(typeone.type)
    if(typetwo !==  null ){
        elementTypes.push(typetwo.type)
    }

    accumulator += `
        <li class="card ${typeone.type}"> 
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokedexNumber}.png" />
            <h2 class="card-title">${pokedexNumber}. ${name}</h2>           
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>     
        </li>`
    return accumulator
}, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

fetch(url) 
    .then(res => res.json())
    .then(generationHTML)
    .then(insertPokemonsIntoPage)
