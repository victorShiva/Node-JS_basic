const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const cookieParser = require('cookie-parser');


// ------------------------ cookies ---------------------

// app.use(cookieParser());
app.use(cookieParser("secretCode"));                                // to signed cookies

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('THis is root path');
})

app.get('/getcookies', (req, res) => {
    res.cookie("greet", "Hello Ritika");
    res.cookie("city", "Chennai");
    res.send("Some cookies are send");
})

app.get('/greet', (req, res) => {
    let { user, name = "anonymous" } = req.cookies;
    res.send(`Hello Mr / Mss ${user} and ${name}`);
})


app.get('/getsignedcookie', (req, res) => {
    res.cookie("loginId", "shiva5775", { signed: true });                   // signed is used after  app.use(cookieParser("secretCode"));  
    res.send('Some data is secret in cookies');
})

app.get('/verifysignedcookie', (req, res) => {
    console.log(req.cookies);                                               // print unsigned cookies
    console.log(req.signedCookies);                                         // print signed cookies     
    res.send('Verify the cookie that not any modify in application-tab');
})


app.use('/users', users);
app.use('/posts', posts)



app.listen(3030, () => {
    console.log(`Server running at http://localhost:3030`);
})






