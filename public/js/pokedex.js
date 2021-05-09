const url = `http://localhost:3001/pokemons`
const urlPokemon = name => `http://localhost:3001/pokemon?name=${name}`
let hidden = true;


const generationHTML = pokemons =>  pokemons.reduce((accumulator, { _id, pokedexNumber, name, typeone, typetwo }) => {
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


async function modal (pokemon) {
    name = pokemon.id;

    const modalpokemon = await foo(name);
    
    const modal = modalpokemon => {
        `
        <li>${modalpokemon.name}</li> 
 
        `
    }
 

    hidden = !hidden;
    if(hidden){
        document.getElementById('div-modal').style.visibility = 'hidden'
    } else {
        document.getElementById('div-modal').style.visibility = 'visible'
    }
}
    
const foo = async (name) => {

    try {
        const res  = await fetch(urlPokemon(name))
        const pokemonModal = await res.json();
        return pokemonModal

    } catch (error) {
        console.log(error)
    }


}