const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
mapToken = process.env.PUBLIC_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res, next) => {
    const allLists = await Listing.find({});
    res.render('listings/index.ejs', { allLists });
}

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render('listings/new.ejs')
}

module.exports.createNewListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send()

    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Ceated!");
    res.redirect('/listings');
}

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate("owner");
    console.log(listing);
    if (!listing) {
        req.flash('error', 'Requested listing does not exist!');
        res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
}

module.exports.editListing = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Requested listing does not exist!');
        res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300,h_200");
    res.render('listings/edit.ejs', { listing, originalImageUrl })
}

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;
    let updateListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updateListing.image = { url, filename }
        await updateListing.save();
    }
    req.flash("success", "Listing Updated!");
    // console.log(updateListing);
    res.redirect(`/listings/${id}`);
}

module.exports.distroyListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings');
}