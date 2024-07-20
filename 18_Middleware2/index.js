const express = require('express')

const app = express();
const port = 3030;

// //Logger - morgan
// app.use((req, res, next) => {
//     req.time = new Date().toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// })



app.use('/random', (req, res, next) => {
    console.log("Only for random path");        // it is print only for http://localhost:3030/random/...........
    next();
    console.log("After next call it is execute");
})


// Routes
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