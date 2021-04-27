const mongoose = require('../../database/index');
const Schema = mongoose.Schema

const GenerationsPokemonsSchema = new mongoose.Schema({

    generation: {
        type: String,
        require: true
    },
    pokemonID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemons", 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    }

})

const GenerationsPokemons = mongoose.model('GenerationsPokemons', GenerationsPokemonsSchema);

module.exports = GenerationsPokemons;