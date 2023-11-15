"use strict";

//Selects the right controllers on the youtube player.
let rightController = document.querySelector(".ytp-right-controls");

//Creates a button for YT player,
let audioOnlyButton = document.createElement("button");
//Set class and additional styling.
//This is a temporary stopgap, ideally I have a style sheet connecting to this.
audioOnlyButton.className = "ytp-fullscreen-button ytp-button";

audioOnlyButton.style.cursor = "pointer";
audioOnlyButton.style.width = "40px";
audioOnlyButton.style.height = "40px";

//Insert our button to the far left of our controller.
rightController.insertBefore(audioOnlyButton, rightController.firstChild);

//Creates the SVG Icon for our player.
let svgDiv = document.createElement("svg");

//Describes the icon for our player.

svgDiv.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0098 9C21.6589 9.86548 22.0098 10.9181 22.0098 12C22.0098 13.0819 21.6589 14.1345 21.0098 15" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 2L2 22" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.21094 19H14.0709C15.1318 19 16.1492 18.5788 16.8994 17.8286C17.6495 17.0785 18.0709 16.0609 18.0709 15V10.1902" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.3203 6.68018C16.9577 6.16238 16.4759 5.73942 15.9155 5.44702C15.355 5.15462 14.7325 5.00119 14.1004 5H6.02034C4.96817 5.01315 3.96357 5.44048 3.2242 6.18921C2.48483 6.93793 2.07025 7.94774 2.07033 9V15C2.06763 15.8994 2.36814 16.7736 2.92336 17.4812C3.47857 18.1888 4.25607 18.6888 5.13033 18.9001" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
{
  /* <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0098 9C21.6589 9.86548 22.0098 10.9181 22.0098 12C22.0098 13.0819 21.6589 14.1345 21.0098 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 2L2 22" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.21094 19H14.0709C15.1318 19 16.1492 18.5788 16.8994 17.8286C17.6495 17.0785 18.0709 16.0609 18.0709 15V10.1902" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.3203 6.68018C16.9577 6.16238 16.4759 5.73942 15.9155 5.44702C15.355 5.15462 14.7325 5.00119 14.1004 5H6.02034C4.96817 5.01315 3.96357 5.44048 3.2242 6.18921C2.48483 6.93793 2.07025 7.94774 2.07033 9V15C2.06763 15.8994 2.36814 16.7736 2.92336 17.4812C3.47857 18.1888 4.25607 18.6888 5.13033 18.9001" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */
}

//Append the icon to our button.
audioOnlyButton.appendChild(svgDiv);

//Listens for a click on our new button, swaps the src for the youtube player to our audio stream that was found in global.js
let videoURL;
audioOnlyButton.addEventListener("click", function () {
  const videoElement = document.getElementsByTagName("video")[0];
  if (videoElement.src != videoURL) {
    videoElement.src = videoURL;
    videoElement.play();
  }
});

// Once the message is sent, it receives the URL which we assign to videoURL to be sent to the player.

// chrome.runtime.sendMessage("1");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  videoURL = request.url;
  // console.log(`URL from YT_AUD is: ${videoURL}`);
  // console.dir(Object.getPrototypeOf(videoElement));
  // console.log(`videoElement src is: ${videoElement.src}`);
  // console.log(`videoElement.currentTime: ${videoElement.currentTime}`);
});
