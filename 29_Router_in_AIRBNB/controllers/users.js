const User = require('../models/user');


module.exports.user = (req, res) => {
    res.render('users/signup');
}

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email })
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User Registered!");
            res.redirect('/listings');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}


module.exports.renderLogInForm = (req, res) => {
    console.log(res.locals);
    res.render('users/login.ejs');
}

module.exports.logIn = async (req, res) => {
    console.log(req.session);
    console.log(res.locals);
    req.flash("success", "Wellcome to Wandelust! You are login!");
    let redirectUrl = res.locals.redirectUrl || '/listings';
    // res.redirect('/listings');
    // res.redirect(req.session.redirectUrl);
    // res.redirect(res.locals.redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next();
        }
        req.flash('success', "you are logout !");
        res.redirect("/listings");
    })
}