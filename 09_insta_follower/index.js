const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'views');
app.set("views", path.join(__dirname, 'views'));

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

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})

