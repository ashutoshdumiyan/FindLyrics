const key = "9Ozd2rgtgDcGwaUGh9zrk7J6dPc2eRnQ0sk0Qs8uRg8YQldEWXbDuZ9rtzFzHTIF"; //apiseeds
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //   console.log(tabs[0].url);
  if (tabs[0].url.indexOf("youtube.com") !== -1) {
    chrome.tabs.executeScript({
      file: "youtubeScript.js"
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: "added script" }, function(
        response
      ) {
        if (response.error) {
          console.log("Song not playing");
        } else {
          axios
            .get(
              `https://orion.apiseeds.com/api/music/lyric/${response.artist}/${response.song}?apikey=${key}`
            )
            .then(result => {
              // console.log(result);
              if (result.status == 404) {
                console.log("Lyrics not found");
              } else if (result.status == 200) {
                console.log("Lyrics found");
                console.log(result.data.result);
              } else {
                console.log("Some error occurred. Try again.");
              }
            });
        }
      });
    });
  }
});
