const url = `http://localhost:3001/pokemons`
const urlPokemon = name => `http://localhost:3001/pokemon?name=${name}`
let hidden = true;


const generationHTML = pokemons =>  pokemons.reduce((accumulator, { pokedexNumber, name, typeone, typetwo }) => {
    let elementTypes = [];

    elementTypes.push(typeone.type)
    if(typetwo !==  null ){
        elementTypes.push(typetwo.type)
    }

    accumulator += `
        <li id="${name}" class="card ${typeone.type}" onClick="modal(this)"> 
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


 modal = async (pokemon) => {
    name = pokemon.id

    fetch(urlPokemon(name))
        .then(res => res.json())
        .then(generationHtmlModal)
        .then(insertPokemonModal)
        
    hidden = !hidden;
    if(hidden){
        document.getElementById('div-modal').style.visibility = 'hidden'
    } else {
        document.getElementById('div-modal').style.visibility = 'visible'
    }
}
    

const generationHtmlModal = pokemon => {
    let pokemonModal = 
        `   <div class="modal-card-image">
                <img  alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokedexNumber}.png" /> 
            </div>
            `
    return pokemonModal
}

const insertPokemonModal = pokemon => {
    const ul = document.querySelector('[data-js="pokemonData"]')
    ul.innerHTML = pokemon
}