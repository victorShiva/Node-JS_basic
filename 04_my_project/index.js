const giveMeAJoke = require('give-me-a-joke');
const figlet = require('figlet');


giveMeAJoke.getRandomDadJoke(function (joke) {
    console.log(joke);
});

figlet("Shiva", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});