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
        // console.log(response);
        if (response.error) {
          console.log("Song not playing");
        } else if (response.touse == 1) {
          axios
            .get(
              `https://orion.apiseeds.com/api/music/lyric/${response.first.artist}/${response.first.song}?apikey=${key}`
            )
            .then(result => {
              if (result.status == 404) {
                console.log("Lyrics not found");
              } else if (result.status == 200) {
                console.log("Lyrics found");
                console.log(result.data.result);
              } else {
                console.log("Some error occurred. Try again.");
              }
            })
            .catch(err => {
              console.log("Lyrics not found");
              axios
                .get(
                  `https://orion.apiseeds.com/api/music/lyric/${response.first.song}/${response.first.artist}?apikey=${key}`
                )
                .then(result => {
                  console.log(result);
                })
                .catch(err => {
                  console.log("Not found in retry");
                });
            });
        } else if (response.touse == 2) {
          axios
            .get(
              `https://orion.apiseeds.com/api/music/lyric/${response.second.artist2}/${response.second.song2}?apikey=${key}`
            )
            .then(result => {
              if (result.status == 404) {
                console.log("Lyrics not found");
              } else if (result.status == 200) {
                console.log("Lyrics found");
                console.log(result.data.result);
              } else {
                console.log("Some error occurred. Try again.");
              }
            })
            .catch(err => {
              console.log("Lyrics not found");
              axios
                .get(
                  `https://orion.apiseeds.com/api/music/lyric/${response.second.song2}/${response.second.artist2}?apikey=${key}`
                )
                .then(result => {
                  console.log(result);
                })
                .catch(err => {
                  console.log("Not found in retry");
                });
            });
        }
      });
    });
  }
});
