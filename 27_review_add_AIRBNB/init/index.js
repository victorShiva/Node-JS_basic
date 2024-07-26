const mongoose = require('mongoose');
const initData = require('./data.js');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    console.log("DB Connected");
}
main();

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

async function initDataBase() {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}
initDataBase();