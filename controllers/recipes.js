const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    edit,
    update
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

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays the property values of the specific recipe
    res.render('recipes/show', { title: 'Recipe Details', recipe })
}

async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays edit page with inputs prefilled to current property values
    res.render('recipes/edit', { recipe })
}

async function update(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    try {
        // recipe is the target, req.body is the source (what was edited)
        Object.assign(recipe, req.body);
        await recipe.save();
    } catch (err) {
        console.log(err)
        res.render('recipes/show', { errorMsg: 'failed to edit recipe ):'});
    }
    res.redirect(`/recipes/${recipe._id}`)
}