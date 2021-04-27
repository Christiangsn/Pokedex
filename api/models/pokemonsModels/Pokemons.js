const mongoose = require('../../database/index');
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;


const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    pokedexNumber: {
        name: Number,
    },
    image: {
        type: String,
        require: false
    },
    generation: {
        type: Schema.Types.ObjectId,
        ref: "GenerationsPokemons",
    },
    evolutionStage: {
        type: Schema.Types.ObjectId,
        ref: "EvolutionStagePokemon"
    },
    typeone: {
        type: Schema.Types.ObjectId,
        ref: "TypesPokemon",
        require: true
    },
    typetwo: {
        type: Schema.Types.ObjectId,
        ref: "TypesPokemon",
        require: false
    },
    weatherOne: {
        type: Schema.Types.ObjectId,
        ref: "WheaterPokemon",
        require: true
    },
    weatherTwo: {
        type: Schema.Types.ObjectId,
        ref: "WheaterPokemon",
        require: false
    },
    attack: {
        type: Number,
        require: true,
    },
    defense: {
        type: Number,
        require: true,
    },
    stamina: {
        type: Number,
        require: true,
    },
    legendary: {
        type: Schema.Types.ObjectId,
        ref: "LegendarysPokemons",
    },
    max_cp: {
        type: Number,
        require: true,
    },
    cp:{
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    }
})

const Pokemons = mongoose.model('Pokemons', PokemonSchema);

module.exports = Pokemons;