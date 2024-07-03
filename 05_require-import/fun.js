const user = "shiva";

function greeting() {
    console.log(`Hello Mr. ${user}`);
}

function randomNumber() {
    console.log(Math.floor(Math.random() * 1000));
}

const userInfo = {
    userName: "Sanjeev",
    age: 25,
    language: "Java"
}

export const fruits = ["mango", "apple", "orange"];

export default greeting;
export { randomNumber, userInfo };