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
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "InstaUser",
    }
})

const InstaUser = mongoose.model('InstaUser', userSchema);
const Post = mongoose.model('Post', postSchema);



/// ------------------------------ post 1 ---------------------
// const addData = async function () {
//     let user1 = new InstaUser({
//         username: "Ritika",
//         email: "ritika@google.com",
//     })

//     let post1 = new Post({
//         content: "Hello World!",
//         likes: 21,
//     })

//     post1.user = user1;
//     let user = await user1.save();
//     let post = await post1.save();

//     console.log(user);
//     console.log(post);
// }
// addData();



//// ------------------------------ post 2 --------------------
// const addData = async function () {
//     let person = await InstaUser.findOne({ username: "Ritika" })
//     console.log(person);

//     let post2 = new Post({
//         content: "Hey Good Morning!",
//         likes: 45,
//     })

//     post2.user = person;
//     let post = await post2.save();
//     console.log(post);
// }
// addData();


/////// ------------------ check posts and instaUsers ---------------

const getData = async () => {
    // const allUsers = await InstaUser.find({});
    // console.log(allUsers);
    // const allPosts = await Post.find({});
    // console.log(allPosts);


    let allData = await Post.find({}).populate('user', 'username');
    console.log(allData);
}
getData();