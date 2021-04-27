const mongoose = require('../../database/index');
const Schema = mongoose.Schema

const EvolutionStagePokemonSchema = new mongoose.Schema({

    stage: {
        type: Number,
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


const EvolutionStagePokemon = mongoose.model('EvolutionStagePokemon', EvolutionStagePokemonSchema);

module.exports = EvolutionStagePokemon;