const fetchPokemon = () => {
    const url = `http://localhost:3001/pokemon/Pikachu`

    fetch(url) 
        .then(res => res.json())
        .then(pokemons => {
            const listPokemon  = pokemons.reduce((accumulator, pokemon) => {
                accumulator += `
                <li class="card"> 
                <img />
                    <h2 class="card-title">${pokemon.pokedexNumber}</h2>
                    <p class="card-subtitle">${pokemon.typeone.map(typeInfo => typeInfo.type.name)}
                ${pokemon.name}
                
                </li>`
                return accumulator
            }, '')
            console.log(listPokemon);
        })
}

fetchPokemon();