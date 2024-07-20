const express = require('express');
const ExpressError = require('./expressError.js');

const app = express();
const port = 3030;

const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === 'giveaccess') {
        return next();
    }
    console.log("Path-Miss");
    throw new ExpressError(401, "ACCESS DENIED!");
}

// Routes
app.get('/api', checkToken, (req, res) => {
    res.send({
        name: "Shiva",
        age: 23
    })
})


//Error Handling
app.get('/err', (req, res) => {
    fav = abcd;
});

// -------------------- create an admin route and send an error with 403 status code
app.get('/admin', (req, res) => {
    throw new ExpressError('403', 'Access Admin is Forbidden');
})

// Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error" } = err;
    // next(err);
    res.status(status).send(message);
})




app.get('/', (req, res) => {
    res.send("I a Root Page");
})

app.get('/random', (req, res) => {
    res.status(404).send("This is Random Page!");
})

// app.use((err, req, res, next) => {
//     console.log("------------- Error2 ------------------");
//     next(err);
// })

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
