const { Router } = require ('express');
const pokemonController = require('../controllers/pokemonController');
const multerMiddleware = require('../middlewares/upload-middleares');
const multer = require('multer');

const router = Router();

router.post('/profile/stages', pokemonController.store);

router.get('/pokemon')
router.put('/pokemon/:id', multer(multerMiddleware).single('file'), pokemonController.editByPokemon);



module.exports = router