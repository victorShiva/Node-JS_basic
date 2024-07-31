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
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    owner: String,
});

const Listing = mongoose.model("Listing", listingSchema);

async function initDataBase() {
    await Listing.deleteMany({});
    initData.data = initData.data.map(obj => ({ ...obj, owner: "66a5faf0b205e716dba39d15" }))
    await Listing.insertMany(initData.data);
}
initDataBase();