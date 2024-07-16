const mongoose = require('mongoose');

main();
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
        console.log("Connected successfully");
    } catch (error) {
        console.log(error);
    }
}

/*
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    }
})

const Book = mongoose.model('Book', bookSchema);

// const book1 = new Book({
//     title: "Book 1",
//     author: 'Author 1',
//     price: 10
// });
// book1.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))


const book2 = new Book({
    title: "Book 2",
    price: 15
})
book2.save()
    .then(data => console.log(data))
    .catch(err => console.log(err))


const book3 = new Book({
    title: "How To Kill Smocking",
    author: 'Robert Smith',
    price: "989",     // it's convert Number              //"abcd"   is throw error
})

book3.save()
    .then(data => console.log(data))
    .catch(err => console.log(err))

*/

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
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
        enum: ['Story', 'Technology', 'Business'],
        default: 'Story'
    },
    genre: [String],
})

const Book = mongoose.model('Book', bookSchema);

// const book1 = new Book({
//     title: "a sine of book",
//     author: 'density',
//     price: 25
// });

// book1.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))




// const book2 = new Book({
//     title: "my skill top",
//     author: 'powerry',
//     price: 200
// });

// book2.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))



// const book2 = new Book({
//     title: "a lamp of dark",
//     author: 'lenny',
//     price: 909,
//     categary: 'Business',
//     genre: ['Technology', 'Business']
// });

// book2.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))



// Note : These all Validation Apply only for Inserting Data , not follow these validation update times.

// Book.updateOne({ title: "a sine of book" }, { price: -300 })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))




// if all Validation Apply in update times then use the 

// Book.findByIdAndUpdate({ _id: "6695e9338027839c10d96fb2" }, { price: -599 }, { runValidators: true })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// Error   validation failed


// # Error Handling

Book.findByIdAndUpdate({ _id: "6695e9338027839c10d96fb2" }, { price: -599 }, { runValidators: true })
    .then(data => console.log(data))
    .catch(err => console.log(err.errors.price.properties.message))