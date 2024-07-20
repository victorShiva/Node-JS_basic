const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
main();

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxLength: 55,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
})

const Chat = mongoose.model('Chat', chatSchema);

// let chats = [
//     { from: "Rohit", to: "Mohit", msg: "Hello" },
//     { from: "Kamal", to: "Suresh", msg: "Hi" },
//     { from: "Sani", to: "Paravesh", msg: "How are you?" },
//     { from: "Rani", to: "Janny", msg: "I'm doing well, thanks for asking." },
//     { from: "Suresh", to: "Danny", msg: "What's your name?" },
//     { from: "Raju", to: "Sumit", msg: "I'm a chatbot." },
//     { from: "Jigar", to: "bot", msg: "What is the capital of France?" },
//     { from: "Sumit", to: "Sunita", msg: "Paris" },
//     { from: "user", to: "Sagar", msg: "What is the capital of Japan?" },
//     { from: "Danny", to: "Jigar", msg: "Tokyo" },
//     { from: "Raju", to: "bot", msg: "What is the capital of China?" },
//     { from: "Anshu", to: "Suresh", msg: "Beijing" },
//     { from: "Arvind", to: "Danny", msg: "What is the capital of Germany?" },
//     { from: "Sunita", to: "user", msg: "Berlin" },
//     { from: "Jigar", to: "Sagar", msg: "What is the capital of Italy?" },
//     { from: "Danny", to: "Arvind", msg: "Rome" },
//     { from: "Suresh", to: "bot", msg: "What is the capital of Spain?" },
//     { from: "Sunita", to: "Danny", msg: "Madrid" },
//     { from: "Arvind", to: "Sumit", msg: "What is the capital of the United States?" },
//     { from: "Anshu", to: "Jigar", msg: "Washington, D.C." },
//     { from: "Sunita", to: "Anshu", msg: "What is the capital of Canada?" },
//     { from: "Sumit", to: "user", msg: "Ottawa" },
//     { from: "Raju", to: "Arvind", msg: "What is the capital of Australia?" },
//     { from: "Anshu", to: "Suresh", msg: "Canberra" },
//     { from: "Arvind", to: "Sagar", msg: "What is the capital of Brazil?" },
//     { from: "Sunita", to: "Raju", msg: "Brasília" },
//     { from: "Sumit", to: "Arvind", msg: "What is the capital of Russia?" },
//     { from: "Jigar", to: "Sunita", msg: "Moscow" },
//     { from: "Suresh", to: "bot", msg: "What is the capital of India?" },
//     { from: "Danny", to: "user", msg: "New Delhi" },
//     { from: "Raju", to: "Anshu", msg: "What is the capital of Mexico?" },
//     { from: "Jigar", to: "Danny", msg: "Mexico City" }
// ];



let chats = [
    { from: "user", to: "bot", msg: "Hello" },
    { from: "bot", to: "user", msg: "Hi" },
    { from: "user", to: "bot", msg: "How are you?" },
    { from: "bot", to: "user", msg: "I'm doing well, thanks for asking." },
    { from: "user", to: "bot", msg: "What's your name?" },
    { from: "bot", to: "user", msg: "I'm a chatbot." },
    { from: "user", to: "bot", msg: "What is the capital of France?" },
    { from: "bot", to: "user", msg: "Paris" },
    { from: "user", to: "bot", msg: "What is the capital of Japan?" },
    { from: "bot", to: "user", msg: "Tokyo" },
    { from: "user", to: "bot", msg: "What is the capital of China?" },
    { from: "bot", to: "user", msg: "Beijing" },
    { from: "user", to: "bot", msg: "What is the capital of Germany?" },
    { from: "bot", to: "user", msg: "Berlin" },
    { from: "user", to: "bot", msg: "What is the capital of Italy?" },
    { from: "bot", to: "user", msg: "Rome" },
    { from: "user", to: "bot", msg: "What is the capital of Spain?" },
    { from: "bot", to: "user", msg: "Madrid" },
    { from: "user", to: "bot", msg: "What is the capital of the United States?" },
    { from: "bot", to: "user", msg: "Washington, D.C." },
    { from: "user", to: "bot", msg: "What is the capital of Canada?" },
    { from: "bot", to: "user", msg: "Ottawa" },
    { from: "user", to: "bot", msg: "What is the capital of Australia?" },
    { from: "bot", to: "user", msg: "Canberra" },
    { from: "user", to: "bot", msg: "What is the capital of Brazil?" },
    { from: "bot", to: "user", msg: "Brasília" },
    { from: "user", to: "bot", msg: "What is the capital of Russia?" },
    { from: "bot", to: "user", msg: "Moscow" },
    { from: "user", to: "bot", msg: "What is the capital of India?" },
    { from: "bot", to: "user", msg: "New Delhi" },
    { from: "user", to: "bot", msg: "What is the capital of Mexico?" },
    { from: "bot", to: "user", msg: "Mexico City" }
];

Chat.insertMany(chats)
    .then(data => console.log(data))
    .catch(error => console.error(error));










// let chat1 = new Chat({
//     from: "joker",
//     to: "harry",
//     msg: "Hey joker",
//     subject: "javascript",                  // Ignore property messages
//     created_at: new Date(),
// })
// chat1.save()
//     .then(data => console.log(data))
//     .catch(error => console.error(error)); 