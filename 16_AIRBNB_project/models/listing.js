const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/silhouette-photo-of-person-on-boat-T4Qy1U7utQA",
        set: (v) =>
            v === ""
                ? "https://unsplash.com/photos/silhouette-photo-of-person-on-boat-T4Qy1U7utQA"
                : v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
