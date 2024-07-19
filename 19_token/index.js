const express = require('express')

const app = express();
const port = 3030;

/*
app.use('/api', (req, res, next) => {
    let { token } = req.query;
    if (token === 'giveaccess') {
        next();
    }
    res.send("ACCESS DENIED!")
})
*/
///--------------or----------

const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === 'giveaccess') {
        next();
    }
    res.send("ACCESS DENIED!")
}

// Routes
app.get('/api', checkToken, (req, res) => {
    res.send({
        name: "Shiva",
        age: 23
    })
})

app.get('/', (req, res) => {
    res.send("I a Root Page");
})

app.get('/random', (req, res) => {
    res.status(404).send("This is Random Page!");
})


app.use((req, res) => {
    res.send("Page Not Found");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})