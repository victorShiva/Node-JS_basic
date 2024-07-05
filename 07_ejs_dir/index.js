const express = require('express');
const path = require('path');
const app = express();

const port = 5050;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));             //if you run theserver from parent directories (Node-Js)

app.get('/', (req, res) => {
    res.render("home.ejs");
})

app.get('/search', (req, res) => {
    res.send("<h1>Search anythings this page!</h1>")
})

app.get('/home', (req, res) => {
    res.render("home.ejs");
})

app.get('/contact', (req, res) => {
    let num = Math.floor(Math.random() * 10) + 1;
    res.render("contact.ejs", { number: num });
})

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
})