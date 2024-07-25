const mongoose = require('mongoose');
const { Schema, model } = mongoose;
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Blinkit');
}

main()
    .then(() => {
        console.log('DB is connect');
    })
    .catch((err) => console.log(err));

const customerSchema = new Schema({
    name: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
});
const orderSchema = new Schema({
    item: String,
    price: Number,
});


/// ------------- -------------- middleware  ----------------------------------------
// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("Pre Middleware");
// })
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let deleteData = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(deleteData);
    }
})



const Customer = model("Customer", customerSchema);
const Order = model('Order', orderSchema);


// async function addCustomer() {
//     const item1 = await Order.create({
//         item: "Pizza",
//         price: 120,
//     })
//     const item2 = await Order.create({
//         item: "Samosa",
//         price: 12,
//     })
//     const user1 = await Customer.create({
//         name: "Gopal",
//     })

//     user1.orders.push(item1);
//     user1.orders.push(item2);                       // After the push item in Customer collection need to save() them
//     await item1.save();
//     await item2.save();
//     await user1.save();
//     console.log(user1);
// }
// addCustomer();



// async function addCustomer() {
//     const user1 = new Customer({
//         name: "Suresh",
//     })
//     const item1 = new Order({
//         item: "ColdDrink",
//         price: 20,
//     })
//     const item2 = new Order({
//         item: "Makkhan",
//         price: 50,
//     })

//     user1.save().then()
//     item1.save().then()
//     item2.save().then()

//     user1.orders.push(item1);
//     user1.orders.push(item2);
//     console.log(user1);
// }
// addCustomer();




// # -------------------------- Delete customer ----------------------------

const delCustomer = async () => {
    const cust = await Customer.findByIdAndDelete('66a1f8dd04f191f4d7656906');
    console.log(cust);
}
delCustomer();