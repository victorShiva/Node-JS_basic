const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const { user, signUp, renderLogInForm, logIn, logOut } = require('../controllers/users.js');

router
    .route("/signup")
    .get(user)
    .post(wrapAsync(signUp));


router
    .route('/login')
    .get(renderLogInForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),
        logIn
    )

router.get('/logout', logOut);

module.exports = router;
