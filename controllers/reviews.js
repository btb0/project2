const Recipe = require('../models/recipe');

module.exports = {
    create,
    delete: deleteReview
}

async function create(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // Gather user info
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // push review to reviews array in the recipe model
    recipe.reviews.push(req.body);
    try {
        await recipe.save();
    } catch (err) {
        console.log(err);
        res.render('recipes/show', { errorMsg: 'Failed to leave review ):' });
    }
    res.redirect(`/recipes/${recipe._id}`);
}

async function deleteReview(req, res) {
    // finds the recipe with the review id selected to delete
    const recipe = await Recipe.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});
    if (!recipe) return res.redirect('/recipes');
    try {
        recipe.reviews.remove(req.params.id);
        await recipe.save();
        res.redirect(`/recipes/${recipe.id}`) 
    } catch (err) {
        console.log(err);
        res.render('recipes/show', { errorMsg: 'Failed to delete review ):' });
    }
}