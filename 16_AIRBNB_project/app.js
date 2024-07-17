const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const app = express();

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));



app.get('/', (req, res) => {
    res.send('Hi i am root')
})

app.get('/testListing', (req, res) => {
    let sampleListing = new Listing({
        title: 'My New Villa',
        description: 'By The Ocean',
        price: 1500,
        // image: "",
        location: 'Goa',
        country: 'India',
    })
    sampleListing.save().then(data => console.log(data))
        .catch(err => console.log(err))

    res.send("Successful Testing!");
})



app.listen(8080, () => {
    console.log(`Server running at http://localhost:8080`);
})