document.body.style.border = "5px solid red";

let player = document.querySelector(".ytp-right-controls");

player.style.border = "5px solid red";

let tempButton = document.createElement("button");
tempButton.class = "ytp-button";
tempButton.style.border = "5px solid blue";

player.appendChild(tempButton);
console.log(`Object Keys: ${Object.keys(player)}`);
console.log(`Object values: ${Object.values(player)}`);
