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
        `  
                    <div class="headerImage  ${pokemon.typeone.type}">
                            <img  alt="${pokemon.typeone.type}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokedexNumber}.png" /> 
                    </div>
                    <div class="info-header" >    
                            <div class="info-name">
                                ${pokemon.name} 
                                <span class="pokemon-number"> Nº# ${pokemon.pokedexNumber} </span>
                            </div>   
                            <div class="info-data">
                                <div class="data-sub"> </div>

                                <div class="data-types"> 
                                    <div class="types-header"> Type </div>
                                    <div class="types-main"> 
                                        <li  class="background-color-${pokemon.typeone.type}"> ${pokemon.typeone.type} </li>
                                        <li class="background-color-${pokemon.typetwo.type}"> ${pokemon.typetwo.type} </li>
                                    </div>
                                
                                </div>
                                
                                <div class="data-weather">

                                    <div class="weather-header"> Power</div>
                                    <div class="weather-main"> 
                                        <li  class="background-color"> ${pokemon.weatherOne.wheater}</li>
                                        <li class="background-color"> ${pokemon.weatherTwo.wheater} </li>
                                    </div>             
                                
                                </div>
                            
                            
                            </div>                       
                    </div>
                    <div class="main" >                            
                    </div>
                    <div class="main" >                            
</div>

            `
    return pokemonModal
}

const insertPokemonModal = pokemon => {
    const ul = document.querySelector('[data-js="pokemonData"]')
    ul.innerHTML = pokemon
}