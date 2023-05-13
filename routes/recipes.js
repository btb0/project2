var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesCtrl = require('../controllers/recipes')

// All paths start with '/recipes'

// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new
router.get('/new', recipesCtrl.new);
// POST /recipes
router.post('/', recipesCtrl.create)



module.exports = router;
