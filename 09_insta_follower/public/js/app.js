console.log("Hello world!");
const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("button clicked!");
    });
});

