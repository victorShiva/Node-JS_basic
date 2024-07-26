const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { listingSchema, reviewSchema } = require('../schema.js');



// validation for Schema as middleware

const validateReview = function (req, res, next) {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message);
        console.log(...errMsg);
        return next(new ExpressError(400, ...errMsg))
    }
    return next();
}

//Reviews
// Post Reviews Routes
router.post('/', validateReview, wrapAsync(async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing.id}`);
}))

// Delete Reviews Routes
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });          // pull operator remove from existing araay that match a specified conditions
    res.redirect(`/listings/${id}`);
}))

module.exports = router;