// let n = 5;
// for (let i = 0; i <= 5; i++) {
//     console.log("Hello", i);
// }
// console.log("Bye");


////// *****************  process
// console.log(process);
// console.log(process.version);
// console.log(process.release);
// console.log(process.cwd());
// console.log(process.argv);





//************  run terminal with :- node fileName.js shiva 25 NodeJs ReactJS
console.log(process.argv);
/*[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\Shiva Gupta\\OneDrive\\Desktop\\April\\Node-Js\\01_pocess\\process.js',
    'shiva',
    '25',
    'NodeJs',
    'ReactJS'
]*/

let args = process.argv;
for (let i = 2; i < args.length; i++) {
    console.log(args[i]);
}



