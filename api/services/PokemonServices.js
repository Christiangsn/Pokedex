const Pokemons = require('../models/pokemonsModels/Pokemons');
const Errors = require('../errors/Exception/requestException/index');

class PokemonsServices {

    async show(name) {

        const pokemon = await Pokemons.findOne(name)
        if (!pokemon) 
            return next (Errors.NotFoundException('Pokemon not found'))
        return pokemon
    }

    async editByPokemon( id, pokemon) {
        
        if (!mongoose.isValidObjectId(id))
            return next (Errors.BadException('User validation error'))

        const pokemonExists = await Pokemons.findById({ id })

        if (!pokemonExists) 
            return next (Errors.BadException('Pokemon not exists'))

        pokemonExists.set(pokemon)
        await pokemonExists.save();

        const pokemonAt = await Pokemons.findById({ id })
        return pokemonAt
    }


}


module.exports = PokemonsServices