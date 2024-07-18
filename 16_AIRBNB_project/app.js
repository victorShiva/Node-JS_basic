const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const { send } = require('process');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const app = express();


app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

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

// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: 'My New Villa',
//         description: 'By The Ocean',
//         price: 1500,
//         // image: "",
//         location: 'Goa',
//         country: 'India',
//     })
//     // sampleListing.save().then(data => console.log(data))
//     //     .catch(err => console.log(err))
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful Testing!");
// })


//Index Route

app.get('/listings', async (req, res) => {
    const allLists = await Listing.find({});
    res.render('listings/index.ejs', { allLists });
})


// New Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})


//Show Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
})

// Create Route
// app.post('/listings', async (req, res) => {
//     let { title, description, image, price, location, country } = req.body;
//     let newListing = new Listing({
//         title: title,
//         description: description,
//         image: image,
//         price: price,
//         location: location,
//         country: country
//     });
//     let result = await newListing.save();
//     console.log(result);
//     res.redirect('/listings');
// })
app.post('/listings', async (req, res) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect('/listings');
})


// Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing })
})

// Update Route
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listing = req.body.listing;
    let updateListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true, new: true });
    res.redirect(`/listings/${id}`);
})

app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})

app.listen(8080, () => {
    console.log(`Server running at http://localhost:8080`);
})