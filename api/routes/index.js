const bodyParser = require('body-parser');
const pokemon = require('./pokemons');
const path = require('path');



module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(pokemon)    
}