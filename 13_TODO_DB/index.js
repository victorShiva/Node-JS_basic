const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');


const app = express();
const port = 8080;
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "root",
});



app.get('/', (req, res) => {
    let q = `SELECT count(*) as total FROM user`;
    try {
        connection.query(q, function (err, result) {
            if (err) throw err;
            let count = result[0]["total"];
            res.render("home.ejs", { count })
        })
    } catch (error) {
        console.log(error);
        res.send("Some Error in DB");
    }

})

//Show Routes
app.get('/user', (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, function (err, users) {
            if (err) throw err;
            res.render('showuser.ejs', { users });
        })
    } catch (error) {
        console.log(error);
        res.send("Some Error in DB");
    }
})

//Edit Routes
app.get('/user/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    try {
        connection.query(q, function (err, result) {
            if (err) throw err;
            let user = result[0];
            res.render('edit.ejs', { user });
        })
    } catch (error) {
        console.log(error);
        res.send("Some Error in DB");
    }
})

//Update Routes
app.patch('/user/:id', (req, res) => {
    let { id } = req.params;
    let { password: formPassword, username: newUser } = req.body;
    console.log(formPassword, newUser);
    let q = `SELECT * FROM user WHERE id = "${id}"`;
    try {
        connection.query(q, function (err, result) {
            if (err) throw err;
            let user = result[0];
            if (formPassword != user.password) {
                res.send("Incorrect Password");
            } else {
                let q2 = `UPDATE user SET username = '${newUser}' WHERE id = '${id}'`;
                try {
                    connection.query(q2, (err, result) => {
                        if (err) throw err;
                        res.redirect('/user');
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Some Error in DB");
    }
})

//Create Routes
app.get('/user/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/user', (req, res) => {
    let { password, email, username } = req.body;
    let id = uuidv4();
    let q = `INSERT INTO user (id,username,email,password) values ('${id}','${username}','${email}','${password}')`;
    try {
        connection.query(q, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.redirect('/user');
        })
    } catch (error) {
        console.log(error);
        res.send("Some Error in DB");
    }
})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
