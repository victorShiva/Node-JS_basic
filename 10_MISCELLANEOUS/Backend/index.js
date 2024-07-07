const express = require('express');

const app = express();

const port = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/register', (req, res) => {
    console.log(req.query);
    let { user, password } = req.query;
    res.send(`Standard GET Response. Wellcome: ${user} password: ${password}`);
});
app.post('/register', (req, res) => {
    console.log(req.body);
    let { user, password } = req.body;
    res.send(`Standard POST Response. Wellcome: ${user} password: ${password}`);
})
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
}) 