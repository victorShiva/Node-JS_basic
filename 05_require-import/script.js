import figlet from "figlet";
import { generate } from 'random-words';

import { sum, multi, g } from './math.js';
console.log(sum(5, 7));
console.log(multi(5, 7));
console.log(g);




figlet("Shiva Gupta", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});

console.log(generate(5));