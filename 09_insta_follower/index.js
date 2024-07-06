const express = require('express');
const path = require('path');

const app = express();

// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public/css")));
// app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
console.log(path.join(__dirname, "public"));

const port = 5050;

app.get('/ig/:userName', (req, res) => {
    let { userName } = req.params;
    const instaData = require('./data.json');
    const data = instaData[userName];
    if (data) {
        res.render("instagram.ejs", { data, userName });
    } else {
        res.render("notFound.ejs", { userName });
    }
})

app.get('/:userName', (req, res) => {
    let { userName } = req.params;
    res.render("home.ejs", { user: userName });
})
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})

