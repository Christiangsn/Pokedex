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
        type: mongoose.Types.ObjectId.isValid,
        ref: "GenerationsPokemons",
    },
    evolutionStage: {
        type: mongoose.Types.ObjectId.isValid,
        ref: "EvolutionStagePokemon"
    },
    typeone: {
        type: mongoose.Types.ObjectId.isValid,
        ref: "TypesPokemon",
        require: true
    },
    typetwo: {
        type: mongoose.Types.ObjectId.isValid,
        ref: "TypesPokemon",
        require: false
    },
    weatherOne: {
        type: mongoose.Types.ObjectId.isValid,
        ref: "WheaterPokemon",
        require: true
    },
    weatherTwo: {
        type: mongoose.Types.ObjectId.isValid,
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
        type: mongoose.Types.ObjectId.isValid,
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