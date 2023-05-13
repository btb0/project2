var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesCtrl = require('../controllers/recipes')

// All paths start with '/recipes'

// GET /recipes
router.get('/', recipesCtrl.index);


module.exports = router;
