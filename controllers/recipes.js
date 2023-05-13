const Recipe = require('../models/recipe')

module.exports = {
    index
}

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { title: 'Recipes', recipes })
}