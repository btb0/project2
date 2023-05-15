var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesCtrl = require('../controllers/recipes')

// All paths start with '/recipes'

// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new
router.get('/new', recipesCtrl.new);
// GET /recipes/:id
router.get('/:id', recipesCtrl.show);
// GET /recipes/:id/edit
router.get('/:id/edit', recipesCtrl.edit);
// PUT /recipes/:id
router.put('/:id', recipesCtrl.update);
// POST /recipes
router.post('/', recipesCtrl.create);



module.exports = router;
