const mongoose = require('mongoose');
const Pokemons = require('../models/pokemonsModels/Pokemons');

class PokemonController { 

    static async store (req, res) {
        const pokemon  = req.body
        console.log(pokemon)

        const pok = await Pokemons.create(pokemon); 
        return res.json({ pok })    
    }

    



}

module.exports = PokemonController