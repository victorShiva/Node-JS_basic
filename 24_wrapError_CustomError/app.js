const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const { send } = require('process');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/expressError.js');

const app = express();


app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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



//Index Route

app.get('/listings', async (req, res, next) => {
    try {
        const allLists = await Listing.find({});
        res.render('listings/index.ejs', { allLists });
    } catch (error) {
        next(error);
    }

})


// New Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})

//-------------------------------- Custom  Error Handling ------------------------------

// Create Route
app.post('/listings', async (req, res, next) => {
    // console.log(req.body.listing);
    try {
        let listing = req.body.listing;
        // console.log(listing);
        if (!req.body.listing) return next(new ExpressError(400, "Send valid data for listing"));
        const newListing = new Listing(listing);                                                // console.log(newListing);
        if (!newListing.description) return next(new ExpressError(400, "Description is missing"));
        if (!newListing.location) return next(new ExpressError(400, "location is missing"));
        if (!newListing.country) return next(new ExpressError(400, "country is missing"));
        await newListing.save();
        res.redirect('/listings');
    } catch (error) {
        next(error);
    }
})


//Show Route
app.get('/listings/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        res.render('listings/show.ejs', { listing });
    } catch (error) {
        next(error)
    }

})


// Edit Route
app.get('/listings/:id/edit', async (req, res, next) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs', { listing })
    } catch (error) {
        next(error);
    }

})


// -------------------------------------  Custom Error Handling --------------------------------

// Update Route
app.put('/listings/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        if (!req.body.listing) return next(new ExpressError(400, "Send valid data for listing"));
        let listing = req.body.listing;
        // console.log(listing);
        if (!listing.description) return next(new ExpressError(400, "Description is missing"));
        if (!listing.country) return next(new ExpressError(400, "country is missing"));
        if (!listing.location) return next(new ExpressError(400, "location is missing"));
        let updateListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true, new: true });
        // console.log(updateListing);
        res.redirect(`/listings/${id}`);
    } catch (error) {
        next(error);
    }
})

app.delete('/listings/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (error) {
        next(error)
    }
})

app.listen(8080, () => {
    console.log(`Server running at http://localhost:8080`);
})

app.all('*', (req, res, next) => {                      // * is all route  which is not match any route then it is executed
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    console.log(err);
    let { statusCode = 400, message = "Something WentWrong" } = err;
    res.status(statusCode).render('error.ejs', { message });                                       //err  //err.stack
    // res.status(status).send(message);
})



