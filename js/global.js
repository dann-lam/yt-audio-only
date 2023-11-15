"use strict";

//targetTabID is used to hold sets of tab IDs and associate audio URLs for them.
const targetTabId = new Set();
//initializes variable for use in multiple functions
var enable;

//Check in local storage whether our extension is enabled or not
chrome.storage.local.get("youtube_audio_state", (values) => {
  enable = values.youtube_audio_state;
  enable ? enableExtension() : disableExtension();
});

//Listen for a push on the extension enabler, sync up its enable or disable with whether it's toggled or not, reload the tab if you disable the extension.
chrome.browserAction.onClicked.addListener(() => {
  enable = !enable;
  enable ? enableExtension() : (disableExtension(), reloadTab());
  chrome.storage.local.set({ youtube_audio_state: enable });
});

//This receives a message that will be sent once Audio streams are detected, records which tabs have grabbable audio streams.
chrome.runtime.onMessage.addListener((message, sender) => {
  targetTabId.add(sender.tab.id);
  console.log(`targetTabIds: ${[...targetTabId]}`);
});

//If you remove a tab, remove that tab from our set.
chrome.tabs.onRemoved.addListener((tabId) => targetTabId.delete(tabId));

//Receives a loooong URL with parameters, essentially removing parameters listed later and splits the URL into one that requests the audio stream.
function removeURLParameters(url, parametersToBeRemoved) {
  const urlparts = url.split("?");
  if (urlparts.length >= 2) {
    let pars = urlparts[1].split("&");

    // assume each parameter exists once only
    for (const parameter of parametersToBeRemoved) {
      for (var i = pars.length - 1; ~i; --i) {
        if (pars[i].startsWith(parameter)) {
          pars.splice(i, 1);
          break;
        }
      }
    }
    url = `${urlparts[0]}?${pars.join("&")}`;
  }
  return url;
}

//Reloads all tabs listed in our tab set, if they're active.
function reloadTab() {
  for (const TabId of targetTabId) {
    chrome.tabs.get(TabId, (tab) => {
      if (tab.active) {
        chrome.tabs.reload(TabId);
        return;
      }
    });
  }
}

// The meat and potatoes of the script. Processes the targettab from youtube to find the audio stream.
function processRequest(details) {
  //   console.log("originUrl = " + details.originUrl + "\n");
  //   console.log("documentUrl = " + details.documentUrl + "\n");
  //   console.log("url = " + details.url + "\n");
  //   console.log("Details are: ", details);
  if (
    !targetTabId.has(details.tabId) ||
    details.originUrl == "https://www.youtube.com/"
  ) {
    return;
  }
  //   console.log("details.url= " + details.url);
  //   console.log("details.type= " + details.type);
  if (details.url.includes("mime=audio") && !details.url.includes("live=1")) {
    //Searches for a URL that has the audio stream instead of a video stream, exclude live streamed YT content.

    // reverse parameter order (same as url parameter traversal order)

    // console.log("unremovedURL = " + details.url + "\n");

    //Parameters to remove from the URL to request an audio stream.
    const parametersToBeRemoved = ["ump", "rbuf=", "rn=", "range="];

    const audioURL = removeURLParameters(details.url, parametersToBeRemoved);
    //Sends a message with our tab ID and associates it with the audio stream.
    //Subsequent message Listeners receive this and point at their associated tabs.
    chrome.tabs.sendMessage(details.tabId, { url: audioURL });
    // console.log("AudioURL is: " + audioURL + "\n");
  }
}

//Once we enable the extension, listen for xmlhttprequests.
function enableExtension() {
  //Sets the icon
  chrome.browserAction.setIcon({
    path: {
      128: "img/icon128.png",
      38: "img/icon38.png",
    },
  });

  //Once the extension is enabled, it listens for all URLs that are utilizing an xmlhttprequest, and gives it an option to block, right now we're not utilizing the block, but potentially down the line it could be useful for future updates.
  chrome.webRequest.onBeforeRequest.addListener(
    processRequest,
    { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
    ["blocking"]
  );
}

//Removes listener and sets ICON to a greyed out one once disabled.
function disableExtension() {
  chrome.browserAction.setIcon({
    path: {
      38: "img/disabled_icon38.png",
    },
  });
  chrome.webRequest.onBeforeRequest.removeListener(processRequest);
}
