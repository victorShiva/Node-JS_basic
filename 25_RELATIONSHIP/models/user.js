const mongoose = require('mongoose');
const { Schema } = mongoose;


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
        console.log("DB is Connected");
    } catch (error) {
        console.log(error);
    }
}
main();


const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String
        }
    ]
})

const User = mongoose.model("User", userSchema);

const addUser = async function () {
    let user1 = new User({
        username: "Raghav",
        addresses: [
            {
                location: "Shree shidhi complex wing-A Goregaon East",
                city: "Mumbai"
            }
        ]
    })
    user1.addresses.push({
        location: "Queen Marry, Pimpari Pada Goegaon East",
        city: "Mumbai"
    })

    // user1.save().then(data => console.log(data))

    let data = await user1.save();
    console.log(data);
}

addUser();


















// * using create()

// async function addUser() {
//     let user1 = await User.create({
//         username: "Harshit",
//         addresses: [
//             {
//                 location: "Shree shidhi complex wing-A Goregaon East",
//                 city: "Mumbai",
//             }
//         ]
//     })
//     console.log(user1);
// }
// addUser();



//sabji mandi , shambhuganj bajar chakpataila
//'Dharam Shala gali, shambhuganj bajar
//Shree shidhi complex wing-A Goregaon East