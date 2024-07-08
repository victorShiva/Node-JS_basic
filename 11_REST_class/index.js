const express = require('express');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));


let posts = [
    {
        id: uuidv4(),
        username: 'apana-college',
        content: 'I Love Codings',
    },
    {
        id: uuidv4(),
        username: 'Shiva',
        content: 'I Love JavaScript',
    },
    {
        id: uuidv4(),
        username: 'Sanjeev',
        content: 'I love Python',
    },
    {
        id: uuidv4(),
        username: 'Ravi',
        content: 'I Love Java',
    },
    {
        id: uuidv4(),
        username: 'Rajesh',
        content: 'I love Node.js',
    }
]

app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts });
})

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    if (username.trim().length != 0) {
        let newID = uuidv4();
        posts.push({ username, content, id: newID });
        res.redirect('/posts');
    } else {
        res.render('new.ejs');
    }
})


app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(val => val.id === id);
    if (!post) {
        res.send('Post not found');
    } else {
        res.render('show.ejs', { post });
    }
})


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(val => val.id === id);
    post.content = newContent;
    res.redirect('/posts');
})


app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(val => val.id === id);
    res.render('edit.ejs', { post });
})
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(val => val.id !== id);
    res.redirect('/posts');
})

const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})