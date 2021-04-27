const PokemonsServices = require('../services/PokemonServices');
const multer = require('multer');
const mongoose = require('mongoose');


class PokemonController {     

    static async store (req, res, next) {
        const pokemon  = req.body
        console.log(pokemon)
    }

    static async show (req, res, next) {
        const name = req.query.name;
        const pokemonsServices = new PokemonsServices();
        const pokemon = await pokemonsServices.show(name, next);
        return res.json(pokemon)
    }

    static async editByPokemon (req, res, next) {
        const id = req.query.id;
        const body = req.body
        const pokemon = { ...body, image: {
            name: req.file.originalname,
            size: req.file.size,
            key: req.file.filename,
            url: ''
         }} 
        if (!mongoose.isValidObjectId(id))
             return next (Errors.BadException('User validation error'))
       
        const pokemonsServices = new PokemonsServices();
        const pokemonAt = await pokemonsServices.editByPokemon(id, pokemon);
        return res.json(pokemonAt)
    }

    



}

module.exports = PokemonController