chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //   console.log(tabs[0].url);
  if (tabs[0].url.indexOf("youtube.com") !== -1) {
    chrome.tabs.executeScript({
      file: "youtubeScript.js"
    });
  }
});
