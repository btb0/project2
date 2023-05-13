const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create
}

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { title: 'Recipes', recipes })
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add a Recipe', errorMsg: 'failed to create recipe ):' });
}

async function create(req, res) {
    try {
        // Gather User Information
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        Recipe.create(req.body);
        res.redirect('recipes') // CHANGE TO REDIRECT TO RECIPE DETAILS PAGE ONCE THAT IS ADDED
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { errorMsg: 'failed to add recipe ):'});
    }
}