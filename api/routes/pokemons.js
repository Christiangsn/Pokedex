const { Router } = require ('express');
const pokemonController = require('../controllers/pokemonController');
const multerMiddleware = require('../middlewares/upload-middleares');
const multer = require('multer');

const router = Router();

router.post('/profile/stages', pokemonController.store);
router.get('/pokemons', pokemonController.index);
router.get('/pokemon/:name', pokemonController.show);
router.put('/pokemon', multer(multerMiddleware).single('file'), pokemonController.editByPokemon);



module.exports = router