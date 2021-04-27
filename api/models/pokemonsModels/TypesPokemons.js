const mongoose = require('../../database/index');
const Schema = mongoose.Schema


const TypesPokemonSchema = new mongoose.Schema({

    type: {
        type: String,
        require: true
    },
    pokemonID: {
        type: Schema.Types.ObjectId,
        ref: "Pokemons",
        select: false     
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    }

})

const TypesPokemon = mongoose.model('TypesPokemon', TypesPokemonSchema);

module.exports = TypesPokemon;