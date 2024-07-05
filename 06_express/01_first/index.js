import express from 'express';
const app = express();

// console.dir(app);

let port = 8080;

app.listen(port, () => {
    console.log(`app is listening on pot ${port}`);
})



app.get("/", (req, res) => {
    res.send("You connected root path");
    console.log(`path is /`);
})
app.get("/apple", (req, res) => {
    res.send({ name: "Apple", price: 200 });
    console.log(`path is /apple`);
})
app.get("/fruits", (req, res) => {
    res.send(`<h1>Fruits</h1>
        <ol>
        <li>Mango</li>
        <li>Apple</li>
        <li>Orange</li>
        <li>Banana</li>
        </ol>`);
    console.log(`path is /fruits`);
})

// app.get("*", (req, res) => {
//     res.send("this path is does not exist");
// })


app.post("/", (req, res) => {
    res.send("you send a post request!")
})





// **************** all request listen

// app.use((req, ress) => {
//     // console.log(req);
//     console.log("New incomming request");

//     // ress.send("this is basic response!");

//     // ress.send({
//     //     name: "Apple",
//     //     color: "Red"
//     // });

//     ress.send(`<h1>Fruits</h1>
//         <ol>
//         <li>Mango</li>
//         <li>Apple</li>
//         <li>Orange</li>
//         <li>Banana</li>
//         <li>Pine-Apple</li>
//         </ol>`)
// })