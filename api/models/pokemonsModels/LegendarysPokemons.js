const mongoose = require('../../database/index');
const Schema = mongoose.Schema

const LegendarysPokemonsSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    legendary: {
        type: Boolean,
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

const LegendarysPokemons = mongoose.model('LegendarysPokemons', LegendarysPokemonsSchema);

module.exports = LegendarysPokemons;