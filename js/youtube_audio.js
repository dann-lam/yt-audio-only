"use strict";
//Build a button
//Append it to our player
//Have that button control whether videoElement.src = URL.
//If the button is "On", then change videoElement.src to our URL.
//Otherwise, leave videoElement.src
//Might need to "get" the currentTime of it, and then send that to our video, to then play it at the correct time.
//May need to consider whether this is an asynchronous action.
//Maybe I send the message once the button is hit, instead of sending the message straight up from the backend?

let rightController = document.querySelector(".ytp-right-controls");

let audioOnlyButton = document.createElement("button");
audioOnlyButton.class = "ytp-button";
// Set inline styles for the button
// tempButton.style.backgroundColor = "#ff0000"; // YouTube red color
// tempButton.style.color = "#ffffff"; // White text color
// tempButton.style.padding = "5px 5px"; // Adjust padding as needed
audioOnlyButton.style.borderRadius = "3px";
audioOnlyButton.style.cursor = "pointer";
// tempButton.style.transition = "background-color 0.3s";
audioOnlyButton.style.width = "30px";
audioOnlyButton.style.height = "30px";
audioOnlyButton.style.verticalAlign = "top";
rightController.insertBefore(audioOnlyButton, rightController.firstChild);

let svgDiv = document.createElement("svg");

svgDiv.innerHTML = `<svg
width="100%"
height="100%"
viewBox="0 0 36 36"
xmlns="http://www.w3.org/2000/svg"
fill="none"
stroke="#000000"
stroke-width="1"
stroke-linecap="round"
stroke-linejoin="miter"
>
<rect x="2" y="5" width="14" height="14" rx="0"></rect>
<polyline points="16 10 22 7 22 17 16 14" stroke-linecap="round"></polyline>
</svg>`;

audioOnlyButton.appendChild(svgDiv);
let videoURL;
audioOnlyButton.addEventListener("click", function () {
  const videoElement = document.getElementsByTagName("video")[0];
  if (videoElement.src != videoURL) {
    videoElement.src = videoURL;
    videoElement.play();
  }
});

chrome.runtime.sendMessage("1");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  videoURL = request.url;
  console.log(`URL from YT_AUD is: ${videoURL}`);
  // console.dir(Object.getPrototypeOf(videoElement));
  // console.log(`videoElement src is: ${videoElement.src}`);
  // console.log(`videoElement.currentTime: ${videoElement.currentTime}`);
});
