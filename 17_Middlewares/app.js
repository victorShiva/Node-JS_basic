const express = require('express');

const app = express();
const port = 3030;


//**************** Middleware


// app.use(() => {
//     console.log("I am a middlewae!");
// })


// app.use((req, res) => {
//     let query = req.query;
//     console.log(query);
//     console.log("Hi i am Middleware-2");
//     res.send("Middleware finished!");
// })


app.use((req, res, next) => {
    console.log("Hi i am 1st Middleware");
    next();
    console.log("This is after next()");
})
app.use((req, res, next) => {
    console.log("Hi i am 2nd Middleware");
    next()
})




// Routes
app.get('/', (req, res) => {
    res.send("I a Root Page");
})

app.get('/random', (req, res) => {
    res.send("This is Random Page!");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})