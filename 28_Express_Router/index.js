const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');


app.get('/', (req, res) => {
    res.send('THis is root path');
})

app.use('/users', users);
app.use('/posts', posts)



app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
})












// //Index
// app.get('/users', (req, res) => {
//     res.send('Get for Users');
// })
// //Show
// app.get('/users/:id', (req, res) => {
//     res.send('Get for Users id');
// })
// //create
// app.post('/users', (req, res) => {
//     res.send('Post for user');
// })

// //Post
// app.put('/users/:id', (req, res) => {
//     res.send('Update for user');
// })

// // delete
// app.delete('/users/:id', (req, res) => {
//     res.send('Delete for user');
// })







// //Index
// app.get('/posts', (req, res) => {
//     res.send('Get for Posts');
// })
// //Show
// app.get('/posts/:id', (req, res) => {
//     res.send('Get for Posts id');
// })
// //create
// app.post('/posts', (req, res) => {
//     res.send('Post for Posts');
// })

// //Post
// app.put('/posts/:id', (req, res) => {
//     res.send('Update for Posts');
// })

// // delete
// app.delete('/posts/:id', (req, res) => {
//     res.send('Delete for Posts');
// })




