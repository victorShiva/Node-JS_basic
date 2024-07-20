const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError.js');


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();

// let chat1 = new Chat({
//     from: "joker",
//     to: "harry",
//     msg: "Hey joker",
//     subject: "javascript",                  // Ignore property messages
//     created_at: new Date(),
// })
// chat1.save()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


app.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.send('Welcome root path!');
})

// Index Route
app.get('/chats', async (req, res) => {
    try {
        let chats = await Chat.find();
        res.render('index.ejs', { chats });
    } catch (error) {
        next(error);
    }

})


// render a form to send message
app.get('/chats/new', (req, res) => {
    // throw new ExpressError('404', 'Page Not Found!');
    res.render('new.ejs');
})


// create a new message
app.post('/chats', wrapAsync(async (req, res, next) => {
    let { from, to, msg } = req.body;
    // let newChat = new Chat({
    //     from: from,
    //     to: to,
    //     msg: msg
    // })
    // newChat.save()
    //     .then(data => console.log(data))
    let chat = await Chat.create({
        from: from,
        to: to,
        msg: msg
    })
    console.log(chat);
    res.redirect('/chats');

}))

//Show Chat
app.get('/chats/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) {
            return next(new ExpressError('404 ', 'Chat not found!'));
        }
        res.render('edit.ejs', { chat })
    } catch (error) {
        next(error);
    }

})

//render a form to edit chat
app.get('/chats/:id/edit', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
}))

//Update route
app.put('/chats/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
        console.log(updateChat);
        res.redirect('/chats');
    } catch (error) {
        next(error)
    }
});

//Destroy route
app.delete('/chats/:id', wrapAsync(async (req, res, next) => {

    let { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');

}))

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next)
            .catch(err => next(err));
    }
}

// Error Handling Middleware 
app.use((err, req, res, next) => {
    let { status = 500, message = 'Some Error Occured' } = err;
    res.status(status).send(message);
})







/*
--------------- Handling async Errors

app.get('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError('404 ', 'Chat not found!'));
    }
    res.render('edit.ejs', { chat })
})

*/


/*
--------------- using wrapAsync instead of try{}catch(){} ------------------

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next)
        .catch(err => next(err));
    }
}
*/