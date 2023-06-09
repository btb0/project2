const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const reviewsCtrl = require('../controllers/reviews');

// All paths start with '/'

// POST /recipes/:id/reviews
router.post('/recipes/:id/reviews', ensureLoggedIn, reviewsCtrl.create);
// DELETE /reviews/:id
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;