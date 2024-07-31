const Listing = require('../models/listing');


module.exports.index = async (req, res, next) => {
    const allLists = await Listing.find({});
    res.render('listings/index.ejs', { allLists });
}

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render('listings/new.ejs')
}

module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
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
    res.render('listings/edit.ejs', { listing })
}

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;
    let updateListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
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