const Pokemons = require('../models/pokemonsModels/Pokemons');
const Errors = require('../errors/Exception/requestException/index');
const mongoose = require('../database/index');
const ObjectId = mongoose.Types.ObjectId;


class PokemonsServices {

    async index(dados) {
        const query = Pokemons.find({
            name: dados.name,
            typeone: dados.typeone
        
        }).populate('generation evolutionStage typeone typetwo weatherOne weatherTwo legendary');
        const pokemons = await query.exec();
        return pokemons;
    }

    async show(name) {
        const pokemon = await Pokemons.findOne({name: name}).populate('generation evolutionStage typeone typetwo weatherOne weatherTwo legendary')

        if (!pokemon) 
            throw Errors.NotFoundException('Pokemon not found')
 
        return pokemon
    }

    async editByPokemon( id, pokemon) {
        var id = {"_id": new ObjectId(id)}

        if (!mongoose.isValidObjectId(id))
            throw Errors.BadException('id validation error')

        const pokemonExists = await Pokemons.findById(id)

        if (!pokemonExists) 
            throw Errors.NotFoundException('Pokemon not found')

        pokemonExists.set(pokemon)
        await pokemonExists.save();

        const pokemonAt = await Pokemons.findById(id)
        return pokemonAt
    }


}


module.exports = PokemonsServices