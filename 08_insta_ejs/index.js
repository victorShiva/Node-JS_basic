const express = require('express');
const Path = require('path');

const app = express();
app.set('view engine', 'views');
app.set("views", Path.join(__dirname, 'views'));

const port = 3030;

app.get('/', (req, res) => {
    let user = "shiva";
    res.render('home.ejs', { user });
})

app.get('/data', (req, res) => {
    let number = Math.floor(Math.random() * 10) + 1;
    res.render('data.ejs', { number });
})

app.get('/ig/:userName', (req, res) => {
    const followers = ["mango", "apple", "google", "twitter", "facebook", "linkedin"];
    let { userName } = req.params;
    console.log(userName);
    res.render('instagram.ejs', { userName, followers });
})


app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})

