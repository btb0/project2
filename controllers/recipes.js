const Recipe = require('../models/recipe');
const fs = require('fs');
const path = require('path');

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    edit,
    update,
    delete: deleteRecipe
}

async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { title: 'Recipes', recipes });
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
        // Image Upload
        req.body.picture = req.file.path.replace('public/', '');
        // Removes controllers/ from absolute path
        const removeCtrl = __dirname.replace('controllers', '');
        const removeSpaces = req.body.name.replace(/\s+/g, '');
        const oldPath = path.join(removeCtrl, 'public', req.body.picture);
        const newPath = path.join(removeCtrl, 'public', 'uploads', removeSpaces)
        console.log(oldPath)
        console.log(newPath)
        // Renames image file in /uploads
        fs.renameSync(oldPath, newPath, (err) => {
            if (err) {
                console.log('Error renaming image:', err);
            } else {
                console.log('Image renamed successfully!');
            }
        });
        req.body.picture = 'uploads/' + newPath.split('/')[newPath.split('/').length - 1];
        await Recipe.create(req.body);
        res.redirect('recipes'); // CHANGE TO REDIRECT TO RECIPE DETAILS PAGE ONCE THAT IS ADDED
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { errorMsg: 'failed to add recipe ):'});
    }
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays the property values of the specific recipe
    res.render('recipes/show', { title: 'Recipe Details', recipe });
}

async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays edit page with inputs prefilled to current property values
    res.render('recipes/edit', { title: 'Edit Recipe', recipe });
}
//findbyidandupdate
async function update(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    try {
        // recipe is the target, req.body is the source (what was edited)
        Object.assign(recipe, req.body);
        await recipe.save();
    } catch (err) {
        console.log(err);
        res.render('recipes/show', { errorMsg: 'failed to edit recipe ):'});
    }
    res.redirect(`/recipes/${recipe._id}`);
}

async function deleteRecipe(req, res) {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    // Removes controllers/ from absolute path
    const newPath = __dirname.replace('controllers', '');
    // Deletes the image assigned to recipe.picture
    fs.unlink(path.join(newPath, 'public', recipe.picture), (err) => {
        if (err) {
            console.log('Error deleting image:', err);
        } else {
            console.log('Image deleted successfully!');
        }
    });
    res.redirect('/recipes');
}