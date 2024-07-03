////********************  1

// import { sum, multi, g } from './math.js';
// console.log(sum(5, 7));
// console.log(multi(5, 7));
// console.log(g);



// ***************   2

// import { sum, multi, g } from './math.js';

import * as math from './math.js';
console.log(math);
console.log(math.PI);
console.log(math.multi(8, 8));




//************ fun.js

import Greeting, { fruits, randomNumber, userInfo } from './fun.js';
Greeting();
randomNumber();
console.log(userInfo);
console.log(fruits);














// import figlet from "figlet";
// import { generate } from 'random-words';

// figlet("Shiva Gupta", function (err, data) {
//     if (err) {
//         console.log("Something went wrong...");
//         console.dir(err);
//         return;
//     }
//     console.log(data);
// });

// console.log(generate(5));