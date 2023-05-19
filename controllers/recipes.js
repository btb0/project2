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
        console.log(req.body)
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
        res.redirect('recipes');ß
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { errorMsg: 'failed to add recipe ):'});
    }
}

async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays the property values of the specific recipe
    res.render('recipes/show', { title: 'Recipe Details', recipe, minToHour });
}

async function edit(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    // displays edit page with inputs prefilled to current property values
    res.render('recipes/edit', { title: 'Edit Recipe', recipe });
}

async function update(req, res) {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/recipes/${recipe._id}`);
    } catch (err) {
        console.log(err);
        res.render('recipes/show', { errorMsg: 'failed to edit recipe ):'});
    }
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

// EJS Helper Function - don't export
function minToHour(time) {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    const hoursMins = hours === 0 ? `${mins} mins` : `${hours} hours ${mins} mins`;
    return hoursMins
}
