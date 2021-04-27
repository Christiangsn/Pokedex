const mongoose = require('mongoose');
const Pokemons = require('../models/pokemonsModels/Pokemons');
const PokemonsServices = require('../services/PokemonServices');

class PokemonController {     

    static async store (req, res) {
        const pokemon  = req.body
        console.log(pokemon)

        const pok = await Pokemons.create(pokemon); 
        return res.json({ pok })    
    }

    async show (req, res) {
        const name = req.params;
        const pokemonsServices = new PokemonsServices();
        const pokemon = await pokemonsServices.show(name);
        return res.json(pokemon)
    }

    async editByPokemon (req, res) {
        const id = req.params;
        const body = req.body
        const pokemon = { ...body, image: {
            name: req.file.originalname,
            size: req.file.size,
            key: req.file.filename,
            url: ''
         }} 
        
        const pokemonsServices = new PokemonsServices();
        const pokemonAt = await pokemonsServices.editByPokemon(id, pokemon);
        return res.json(pokemonAt)
    }

    



}

module.exports = PokemonController