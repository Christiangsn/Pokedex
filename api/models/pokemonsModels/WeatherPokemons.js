const mongoose = require('../../database/index');
const Schema = mongoose.Schema

const WheaterPokemonsSchema = new mongoose.Schema({

    wheater: {
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

const WheaterPokemon = mongoose.model('WheaterPokemon', WheaterPokemonsSchema);

module.exports = WheaterPokemon;