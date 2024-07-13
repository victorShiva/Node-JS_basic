const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'root',
});

// let q = "SHOW TABLES";
let q = `INSERT INTO user (id , username , email, password) VALUES ?`;    // (?,?,?,?)

// let users = [
//     ["111", "macy", "macy@google.com", "984512"],
//     ["109", "zonny", "zonny@google.com", "956965"]
// ];




function getRandomUser() {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

let users = [];
for (let i = 1; i <= 100; i++) {
    users.push(getRandomUser());
}

try {
    connection.query(q, [users], (error, result) => {         // users
        if (error) throw error;
        console.log(result);
    });
} catch (err) {
    console.log(err);
}

connection.end();

