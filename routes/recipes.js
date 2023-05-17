var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const recipesCtrl = require('../controllers/recipes')
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// All paths start with '/recipes'

// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new
router.get('/new', ensureLoggedIn, recipesCtrl.new);
// GET /recipes/:id
router.get('/:id', recipesCtrl.show);
// GET /recipes/:id/edit
router.get('/:id/edit', ensureLoggedIn, recipesCtrl.edit);
// PUT /recipes/:id
router.put('/:id', ensureLoggedIn, recipesCtrl.update);
// POST /recipes
router.post('/', ensureLoggedIn, upload.single('picture'), recipesCtrl.create);
// DELETE /recipes/:id
router.delete('/:id', ensureLoggedIn, recipesCtrl.delete);


module.exports = router;
