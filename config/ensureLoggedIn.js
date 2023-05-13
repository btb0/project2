// middleware for routes that required a logged in user
module.exports = function(req, res, next) {
    // Pass the req/res to next middleware/route handler
    if ( req.isAuthenticated() ) return next();
    // redirect to login if the user is not already logged in
    res.redirect('/auth/google');
}