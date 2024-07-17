const mongoose = require('mongoose');

main()
    .then(function () {
        console.log("Connection Successful!");
    })
    .catch(err => console.log(err))


async function main() {
    await mongoose.connect("mongodb://localhost:27017/college");
}

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// const User = mongoose.model("User", studentSchema);
// const user1 = new User({
//     name: "Manish",
//     email: "manish@yahoo.com",
//     age: 21
// })

// user1.save()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))





// const Employee = mongoose.model("Employee", studentSchema);
// Employee.insertMany([{
//     name: "Massy",
//     email: "massy@yahoo.com",
//     age: 48
// },
// {
//     name: "Casey",
//     email: "casey@yahoo.com",
//     age: 52
// }])
//     .then(res => console.log(res))
//     .catch(err => console.log(err))




// const User = mongoose.model("User", studentSchema);
// User.insertMany([{
//     name: "golu",
//     email: "golu@gmail.com",
//     age: 24
// },
// {
//     name: "Anshu",
//     email: "anshu@meta.com",
//     age: 21
// },
// {
//     name: "Raunak",
//     email: "raunak@yahoo.com",
//     age: 26
// }])
//     .then(res => console.log(res))
//     .catch(err => console.log(err))



//************ find the user
const User = mongoose.model("User", studentSchema);
// User.find({})                                 //.find()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))


// User.find({ age: { $gt: 30 } })
//     .then(res => console.log(res[0].name))
//     .catch(err => console.log(err))


// User.findOne({ age: 32 })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))



// User.findById({ _id: "6694ee9beee82913bc0aea63" })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))



// User.findById("669517a1a0d2076908e7ea45")
//     .then(res => console.log(res))
//     .catch(err => console.log(err))



// ------------------- update-----------------
// User.updateOne({ age: 49 }, { age: 45 })
//     .then(data => console.log(data))

// User.updateMany({ age: { $gt: 40 } }, { age: 45 })
//     .then(data => console.log(data))


// User.findOneAndUpdate({ name: "Dolly" }, { age: 34 }, { new: true })
//     .then(data => console.log(data))

// User.findByIdAndUpdate({ _id: "6694ee9beee82913bc0aea63" }, { age: 21 }, { new: true })
//     .then(data => console.log(data))




//---------------------- delete ----------------

User.deleteOne({ name: "Dolly" }).then(data => console.log(data))

User.deleteMany({ age: { $gt: 40 } }).then(data => console.log(data))


User.findOneAndDelete({ name: "Anshu" }, { new: true }).then(data => console.log(data))

User.findByIdAndDelete({ _id: "6694ee9beee82913bc0aea63" }, { new: true }).then(data => console.log(data))