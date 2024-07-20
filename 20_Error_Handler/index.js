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
        return next();
    }
    console.log("Path-Miss");
    // res.send("ACCESS DENIED!")
    throw new Error("ACCESS DENIED!");
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
    fav = abcd;                             // When this is occur then it is search Error middlerware handle
    // /// next();                           // this line not execute
});
app.use((err, req, res, next) => {
    console.log("------------- Error ------------------");
    // next();         // this is call Non Error handler middleware
    next(err);         // this is call Error handler middleware
})




app.get('/', (req, res) => {
    res.send("I a Root Page");
})

app.get('/random', (req, res) => {
    res.status(404).send("This is Random Page!");
})


app.use((req, res, next) => {                               //This is non error handler middlewar
    console.log("This is non error handler middleware");
    // res.send("Page Not Found1");
    next();
    // next(err);
})
app.use((err, req, res, next) => {                          //This is error handler middlewar
    console.log("-----------Error 2 -----------------");
    console.log("This is Error handler middleware");
    // res.send("Page Not Found2");
    // next();
    next(err);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})



// --------------------  some info about Non-Error handler & Error Handler ------------

/*
app.use((req, res, next) => {               // It is a Non-Error Middleware (Handler)
    next();                             // this is call Non -Error Middleware function further
    next(err);                             // this is call Error Middleware function further

})


app.use((err,req, res, next) => {               // It is a Error Middleware (Handler)
    next(err);                             // this is call Error Middleware function further
    next();                             // this is call Non -Error Middleware function further
})
*/



//  ***** when ever any error (server-side error, client-side error, request-error) always express default Error Handler middleware trigre  