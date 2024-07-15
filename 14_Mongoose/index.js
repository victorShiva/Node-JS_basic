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