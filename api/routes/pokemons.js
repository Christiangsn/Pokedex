const { Router } = require ('express');
const pokemonController = require('../controllers/pokemonController')

const router = Router();

router.post('/profile/stages', pokemonController.store);



module.exports = router