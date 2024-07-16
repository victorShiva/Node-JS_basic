const mongoose = require('mongoose');

main();
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/flipkart');
        console.log("Connected successfully");
    } catch (error) {
        console.log(error);
    }
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        uppercase: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [10, "Price is too low for selling"],
    },
    discount: {
        type: Number,
        default: 20
    },
    categary: {
        type: String,
        enum: ['Story', 'Technology', 'Business', 'Fiction', 'adventure'],
        default: 'Story'
    },
    genre: [String],
})

const Book = mongoose.model('Book', bookSchema);





// Book.insertMany([
//     {
//         title: "a sine of book",
//         author: 'density',
//         price: 25,
//         genre: ['Fiction', 'Science'],
//         categary: 'Story',
//     },
//     {
//         title: "Book 2",
//         author: 'Author 2',
//         price: 15
//     },
//     {
//         title: "Book 3",
//         author: 'Author 3',
//         price: 10
//     },
//     {
//         title: "Book 4",
//         author: 'Author 4',
//         price: 50
//     },
//     {
//         title: "Book 5",
//         author: 'Author 5',
//         price: 20
//     },
//     {
//         title: "Book 6",
//         author: 'Author 6',
//         price: 30
//     }
// ]).then(data => console.log(data))
//     .catch(err => console.error(err))



// Book.findOne({ price: 25 }).then(data => console.log(data._id))
//     .catch(err => console.log(err))



// Book.findById({ _id: "66961a4c287999b8c68c581b" })
//     .then(data => console.log(data))
// .catch(err => console.error(err))




// Book.updateOne({ price: 20 }, { title: "The Merchant", author: "john kelarry" })
//     .then(data => console.log(data))
//     .catch(err => console.error(err))



// Book.updateMany({ price: { $lt: 20 } }, { price: 210 })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))




// Book.findOneAndUpdate({ price: { $gt: 500 } }, { price: 810 }, { new: true })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))




// Book.deleteOne({ title: "BOOK 6" }).then(data => console.log(data));



// Book.findByIdAndDelete({ _id: "66961a4c287999b8c68c581a" }, { new: true })
//     .then(data => console.log(data))



// Book.insertMany([
//     {
//         title: "The Dark Night",
//         author: 'Alice',
//         price: 209,
//         genre: ['story', 'comics'],
//         categary: 'Story',
//     },

//     {
//         title: "The Lord of the Rings",
//         author: 'J.R.R. Tolkien',
//         price: 200,
//         genre: ['fantasy', 'adventure'],
//         categary: 'adventure',
//     },
//     {
//         title: "The Hobbit",
//         author: 'J.R.R. Tolkien',
//         price: 150,
//         genre: ['fantasy', 'adventure'],
//         categary: 'Fiction',
//     },
//     {
//         title: "To Kill a Mockingbird",
//         author: 'Harper Lee',
//         price: 130,
//         genre: ['fiction', 'crime'],
//         categary: 'Fiction',
//     },
//     {
//         title: "1984",
//         author: 'George Orwell',
//         price: 120,
//         genre: ['Scary', 'Horrible']
//     }
// ])



// const book10 = new Book({
//     title: "The Guardian",
//     author: 'Kelvin More',
//     price: 301,
//     genre: "Historical",
//     categary: "adventure",
// });


// book10.save()
//     .then(data => console.log(data))
//     .catch(err => console.error(err))




// ***** Not Apply price validation *****

// Book.findByIdAndUpdate({ _id: "66961a4c287999b8c68c581b" }, { price: -230, discount: 50 })
//     .then(data => console.log(data))
//     .catch(err => console.error(err))


// ***** resolve the validation issues *********

Book.findByIdAndUpdate({ _id: "669626d89b09958c6343dff0" }, { price: -789, discount: 100 }, { runValidators: true })
    .then(data => console.log(data))
    .catch(err => console.error(err.errors.price.properties.message))
