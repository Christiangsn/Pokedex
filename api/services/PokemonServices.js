const Pokemons = require('../models/pokemonsModels/Pokemons');
const Errors = require('../errors/Exception/requestException/index');
const mongoose = require('../database/index');
const ObjectId = mongoose.Types.ObjectId;


class PokemonsServices {

    async index() {
        const query = Pokemons.find().populate('generation evolutionStage typeone typetwo weatherOne weatherTwo legendary');
        const pokemons = await query.exec();
        return pokemons;
    }

    async show(name, next) {

        const pokemon = await Pokemons.find({name: name}).populate('generation evolutionStage typeone typetwo weatherOne weatherTwo legendary')

        if (!pokemon) 
            return next (Errors.NotFoundException('Pokemon not found'))
        return pokemon
    }

    async editByPokemon( id, pokemon) {
        var id = {"_id": new ObjectId(id)}

        const pokemonExists = await Pokemons.findById(id)

        if (!pokemonExists) 
            return next (Errors.NotFoundException('Pokemon not exists'))

        pokemonExists.set(pokemon)
        await pokemonExists.save();

        const pokemonAt = await Pokemons.findById(id)
        return pokemonAt
    }


}


module.exports = PokemonsServices