const mongoose = require('../../database/index');
const generationPokemons = require('./GenerationsPokemons');
const evolutionStagePokemon = require('./EvolutionStagePokemons')
const typesPokemons = require('./TypesPokemons');
const wheaterPokemons = require('./WeatherPokemons');
const legendaryPokemons = require('./LegendarysPokemons');

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: {}
    },
    pokedexNumber: {
        name: Number,
    },
    image: {
        name: String,
        size: Number,
        key: String,
        url: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        require: false
    },
    generation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: generationPokemons
    },
    evolutionStage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: evolutionStagePokemon
    },
    typeone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: typesPokemons,
        require: true
    },
    typetwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: typesPokemons,
        require: false
    },
    weatherOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: wheaterPokemons,
        require: true
    },
    weatherTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: wheaterPokemons,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: legendaryPokemons,
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
}, { typeKey: '$type' }
)
 
const Pokemons = mongoose.model('Pokemons', PokemonSchema);

module.exports = Pokemons;