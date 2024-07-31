const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/expressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session);
        req.flash('error', 'you must be logged in to create listings');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


// validation for Schema as middleware
module.exports.validateListing = function (req, res, next) {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(',');
        console.log(errMsg);
        return next(new ExpressError(404, errMsg));     //error
    }
    return next();
}


// validation for Schema as middleware

module.exports.validateReview = function (req, res, next) {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message);
        console.log(...errMsg);
        return next(new ExpressError(400, ...errMsg))
    }
    return next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
