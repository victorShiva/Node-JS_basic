const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set('view engine', 'views');
app.set("views", path.join(__dirname, "views"));
/////  ---------------------------------------------- (1) -----------------------------------
// app.use(session({
//     secret: "mysupersecret",
//     resave: false,
//     saveUninitialized: true,
// }))

// app.get('/test', (req, res) => {
//     res.send("Successfull!");
// })

// app.get('/reqcount', (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1;
//     }
//     else {
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })



///// -------------------------------------------------  (2)store and using ---------------------------------
const sessionOption = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionOption));
app.use(flash());

app.get('/register', (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if (name == "anonymous") {
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "user registered successfully");
    }
    // console.log(req.session);
    // res.send(name);
    // res.redirect('/hello');
    res.redirect('/greet');
})

app.get('/hello', (req, res) => {
    // console.log(req.flash("success"));                                   // req.flash("success") is only one time set value
    // res.send(`Helloo , ${req.session.name}`);
    res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
})

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get('/greet', (req, res, next) => {
    // res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");
    res.render("show.ejs", { name: req.session.name });
})
app.listen(3030, () => {
    console.log(`Server running at http://localhost:3030`);
})






