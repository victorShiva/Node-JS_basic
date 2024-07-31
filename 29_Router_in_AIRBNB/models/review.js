const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = model("Review", reviewSchema);