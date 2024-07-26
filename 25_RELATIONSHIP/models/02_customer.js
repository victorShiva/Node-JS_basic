const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
main()
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("DB not connected"))


const orderSchema = new Schema({
    item: String,
    price: Number,
})

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',                           // model name
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);


//--------------------------------------Inserting data-------------------------

// const addOrder = async () => {
//     let res = await Order.insertMany([
//         { item: "Somosa", price: 12 },
//         { item: "Chips", price: 10 },
//         { item: "Katales", price: 15 },
//         { item: "Chocolate", price: 40 },
//     ])
//     console.log(res);
// }
// addOrder();

// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Raghava",
//     })

//     let order1 = await Order.findOne({ item: "Somosa" });
//     let order2 = await Order.findOne({ item: "Chocolate" });

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     cust1.save()
//         .then(data => console.log(data));
// }
// addCustomer();


//  ------------------------------------------ show customers collection ----------------------------

// const findCustomer = async () => {
//     let result = await Customer.find({});
//     console.log(result);
// }
// findCustomer();


// ------------------------- show the customer collection with details of order items -----------------------

const findCustomerWithItemDetails = async () => {
    let result = await Customer.find({}).populate('orders');        // orders are customerSchema fields name
    // console.log(result);
    console.log(result[0]);
}
findCustomerWithItemDetails();
