import express from "express";
const app = express();

const port = 3030;

app.listen(port, () => {
    console.log("app is listening at port ", port);
})

app.get('/', (req, res) => {
    res.send("This is root path!");
})

// app.get('/:userName/:id', (req, res) => {
//     console.log(req.params);
//     res.send(`This is user path`);
// })

app.get('/:userName/:id', (req, res) => {
    let { userName, id } = req.params;
    res.send(`Wellcome to the page of @${userName} - id : ${id}`)
})



// app.get('/search', (req, res) => {
//     console.log(req.query);
//     res.send("No result")
// })

app.get('/search', (req, res) => {
    let { q } = req.query;
    console.log(req.query);
    if (!q) {
        res.send("Nothing founds!");
    }
    res.send(`search esult for query : ${q}`);
})