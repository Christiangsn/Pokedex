const PokemonsServices = require('../services/PokemonServices');
const Errors = require('../errors/Exception/requestException/index');
const mongoose = require('mongoose');


class PokemonController {     

    static async store (req, res, next) {
        const pokemon  = req.body
        console.log(pokemon)
    }

    static async index (req, res, next) {

        try {
            const pokemonsServices = new PokemonsServices();
            const pokemons = await pokemonsServices.index();
            res.json(pokemons)      

        } catch (error) {
            return res.status(error.status || 400).json({error: {message: error.message || "Ocorreu um erro inesperado", status: error.status || 400}})
        }


    }

    static async show (req, res, next) {
        const  { name } = req.query;
        console.log(req.query)

        try {
            const pokemonsServices = new PokemonsServices();
            const pokemon = await pokemonsServices.show(name, next);
            return res.json(pokemon)           
        } catch (error) {
            return res.status(error.status || 400).json({error: {message: error.message || "Ocorreu um erro inesperado", status: error.status || 400}})

        }

    }

    static async editByPokemon (req, res, next) {
        const id = req.query.id;
        const body = req.body
        const pokemon = { ...body, image: {
            name: req.file.originalname,
            size: req.file.size,
            key: req.file.filename,
            url: 'http://localhost:3001/files/' + req.file.filename
        }} 

        try {
            const pokemonsServices = new PokemonsServices();
            const pokemonAt = await pokemonsServices.editByPokemon(id, pokemon);
            return res.json(pokemonAt)   

        } catch (error) {
            return res.status(error.status || 400).json({error: {message: error.message || "Ocorreu um erro inesperado", status: error.status || 400}})
        }
        
        

    }

    



}

module.exports = PokemonController