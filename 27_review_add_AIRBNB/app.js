const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/expressError.js');
// const listingSchema = require('./schema.js');
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');


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

app.get('/listings', wrapAsync(async (req, res, next) => {
    const allLists = await Listing.find({});
    res.render('listings/index.ejs', { allLists });
}))


// New Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})

//-------------------------------- Server side(Schema) Validation  Error Handling using Joi package ------------------------------

// // Create Route
// app.post('/listings', wrapAsync(async (req, res, next) => {
//     // console.log(req.body);
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     if (result.error) return next(new ExpressError(400, result.error))
//     const newListing = new Listing(req.body.listing);                                                // console.log(newListing);
//     await newListing.save();
//     res.redirect('/listings');
// }))


// validation for Schema as middleware

const validateListing = function (req, res, next) {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(',');
        console.log(errMsg);
        return next(new ExpressError(404, errMsg));     //error
    }
    return next();
}

const validateReview = function (req, res, next) {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message);
        console.log(...errMsg);
        return next(new ExpressError(400, ...errMsg))
    }
    return next();
}

// Create Route
app.post('/listings', validateListing, async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
})

//Show Route
app.get('/listings/:id', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs', { listing });
}))


// Edit Route
app.get('/listings/:id/edit', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing })
}))


// -------------------------------------  Server side(Schema) Validation  Error Handling using Joi package --------------------------------

// // Update Route
// app.put('/listings/:id', wrapAsync(async (req, res, next) => {
//     let { id } = req.params;
//     if (!req.body.listing) return next(new ExpressError(400, "Send valid data for listing"));
//     let listing = req.body.listing;
//     // console.log(listing);
//     if (!listing.description) return next(new ExpressError(400, "Description is missing"));
//     if (!listing.country) return next(new ExpressError(400, "country is missing"));
//     if (!listing.location) return next(new ExpressError(400, "location is missing"));
//     let updateListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true, new: true });
//     // console.log(updateListing);
//     res.redirect(`/listings/${id}`);
// }))

// Update Route
app.put('/listings/:id', validateListing, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = req.body.listing;
    console.log(listing);
    let updateListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true, new: true });
    // console.log(updateListing);
    res.redirect(`/listings/${id}`);
}))

app.delete('/listings/:id', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}))



//Reviews
// Post Reviews Routes
app.post('/listings/:id/reviews', validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing.id}`);
}))

// Delete Reviews Routes
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });          // pull operator remove from existing araay that match a specified conditions
    res.redirect(`/listings/${id}`);
}))

app.listen(8080, () => {
    console.log(`Server running at http://localhost:8080`, wrapAsync);
})

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.use((err, req, res, next) => {
    // console.log(err);
    let { statusCode = 400, message = "Something WentWrong" } = err;
    res.status(statusCode).render('error.ejs', { message });                                       //err  //err.stack
    // res.status(status).send(message);
})







