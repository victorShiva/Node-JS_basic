const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const Listing = require('../models/listing.js');
const { listingSchema, reviewSchema } = require('../schema.js');



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

//Index Route
router.get('/', wrapAsync(async (req, res, next) => {
    const allLists = await Listing.find({});
    res.render('listings/index.ejs', { allLists });
}))


// New Route
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})

//-------------------------------- Server side(Schema) Validation  Error Handling using Joi package ------------------------------

// // Create Route
// router.post('/', wrapAsync(async (req, res, next) => {
//     // console.log(req.body);
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     if (result.error) return next(new ExpressError(400, result.error))
//     const newListing = new Listing(req.body.listing);                                                // console.log(newListing);
//     await newListing.save();
//     res.redirect('/listings');
// }))


// Create Route
router.post('/', validateListing, async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
})

//Show Route
router.get('/:id', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs', { listing });
}))


// Edit Route
router.get('/:id/edit', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing })
}))


// -------------------------------------  Server side(Schema) Validation  Error Handling using Joi package --------------------------------

// // Update Route
// router.put('/:id', wrapAsync(async (req, res, next) => {
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
router.put('/:id', validateListing, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = req.body.listing;
    console.log(listing);
    let updateListing = await Listing.findByIdAndUpdate(id, listing, { runValidators: true, new: true });
    // console.log(updateListing);
    res.redirect(`/listings/${id}`);
}))

router.delete('/:id', wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}))

module.exports = router;