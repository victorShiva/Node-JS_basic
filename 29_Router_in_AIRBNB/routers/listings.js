const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const { index, renderNewForm, createNewListing, showListing, editListing, updateListing, distroyListing, } = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(createNewListing));


// New Route
router.get('/new', isLoggedIn, renderNewForm);


//Show Route
router.get('/:id', wrapAsync(showListing));


// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(editListing));


// Update Route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))


// Delete Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(distroyListing))

module.exports = router;