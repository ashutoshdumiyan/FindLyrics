const key = "ENTER_YOUR_API_KEY"; //apiseeds
const playing = document.querySelector(".playing");
const loading = document.querySelector("#loading");
const not_playing = document.querySelector(".not_playing");
const artist = document.querySelector(".artist");
const song = document.querySelector(".song");
const match = document.querySelector(".match");
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
        console.log(response);
        if (response.error) {
          console.log("Song not playing");
          loading.style.display = "none";
          not_playing.style.display = "block";
          not_playing.innerHTML = "Please play a song to continue.";
          not_playing.style.fontSize = "1.15rem";
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
                console.log(result.data.result.track.text);
                loading.style.display = "none";
                const textnode = document.createTextNode(
                  result.data.result.track.text
                ); // Create a text node
                playing.appendChild(textnode);
                // playing.innerHTML = result.data.result.track.text;
                artist.innerHTML =
                  "Artist -> " + result.data.result.artist.name;
                song.innerHTML = "Song -> " + result.data.result.track.name;
                match.innerHTML =
                  "Match(%) -> " +
                  (result.data.result.similarity * 100).toFixed(2);
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
                  loading.style.display = "none";
                  const textnode = document.createTextNode(
                    result.data.result.track.text
                  ); // Create a text node
                  playing.appendChild(textnode);
                  // playing.innerHTML = result.data.result.track.text;
                  artist.innerHTML =
                    "Artist -> " + result.data.result.artist.name;
                  song.innerHTML = "Song -> " + result.data.result.track.name;
                  match.innerHTML =
                    "Match(%) -> " +
                    (result.data.result.similarity * 100).toFixed(2);
                })
                .catch(err => {
                  console.log("Not found in retry");
                  loading.style.display = "none";
                  not_playing.style.display = "block";
                  not_playing.innerHTML = "Lyrics not found.";
                  not_playing.style.fontSize = "1.15rem";
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
                loading.style.display = "none";
                const textnode = document.createTextNode(
                  result.data.result.track.text
                ); // Create a text node
                playing.appendChild(textnode);
                // playing.innerHTML = result.data.result.track.text;
                artist.innerHTML =
                  "Artist -> " + result.data.result.artist.name;
                song.innerHTML = "Song -> " + result.data.result.track.name;
                match.innerHTML =
                  "Match(%) -> " +
                  (result.data.result.similarity * 100).toFixed(2);
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
                  loading.style.display = "none";
                  const textnode = document.createTextNode(
                    result.data.result.track.text
                  ); // Create a text node
                  playing.appendChild(textnode);
                  // playing.innerHTML = result.data.result.track.text;
                  artist.innerHTML =
                    "Artist -> " + result.data.result.artist.name;
                  song.innerHTML = "Song -> " + result.data.result.track.name;
                  match.innerHTML =
                    "Match(%) -> " +
                    (result.data.result.similarity * 100).toFixed(2);
                })
                .catch(err => {
                  console.log("Not found in retry");
                  loading.style.display = "none";
                  not_playing.style.display = "block";
                  not_playing.innerHTML = "Lyrics not found.";
                  not_playing.style.fontSize = "1.15rem";
                });
            });
        }
      });
    });
  } else if (tabs[0].url.indexOf("open.spotify.com") !== -1) {
    chrome.tabs.executeScript({
      file: "spotifyScript.js"
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: "added script" }, function(
        response
      ) {
        console.log(response);
        if (response.artistNames.length > 1) {
          const firstArtist = response.artistNames[0];
          const secondArtist = response.artistNames[1];
          axios
            .get(
              `https://orion.apiseeds.com/api/music/lyric/${firstArtist}/${response.songName}?apikey=${key}`
            )
            .then(result => {
              if (result.status == 404) {
                console.log("Lyrics not found");
              } else if (result.status == 200) {
                // console.log("Lyrics found");
                console.log(result.data.result.track.text);
                loading.style.display = "none";
                const textnode = document.createTextNode(
                  result.data.result.track.text
                ); // Create a text node
                playing.appendChild(textnode);
                // playing.innerHTML = result.data.result.track.text;
                artist.innerHTML =
                  "Artist -> " + result.data.result.artist.name;
                song.innerHTML = "Song -> " + result.data.result.track.name;
                match.innerHTML =
                  "Match(%) -> " +
                  (result.data.result.similarity * 100).toFixed(2);
              } else {
                console.log("Some error occurred. Try again.");
              }
            })
            .catch(err => {
              axios
                .get(
                  `https://orion.apiseeds.com/api/music/lyric/${secondArtist}/${response.songName}?apikey=${key}`
                )
                .then(result => {
                  // console.log(result);
                  loading.style.display = "none";
                  const textnode = document.createTextNode(
                    result.data.result.track.text
                  ); // Create a text node
                  playing.appendChild(textnode);
                  // playing.innerHTML = result.data.result.track.text;
                  artist.innerHTML =
                    "Artist -> " + result.data.result.artist.name;
                  song.innerHTML = "Song -> " + result.data.result.track.name;
                  match.innerHTML =
                    "Match(%) -> " +
                    (result.data.result.similarity * 100).toFixed(2);
                })
                .catch(err => {
                  console.log("Not found in retry");
                  loading.style.display = "none";
                  not_playing.style.display = "block";
                  not_playing.innerHTML = "Lyrics not found.";
                  not_playing.style.fontSize = "1.15rem";
                });
            });
        } else {
          axios
            .get(
              `https://orion.apiseeds.com/api/music/lyric/${response.artistNames[0]}/${response.songName}?apikey=${key}`
            )
            .then(result => {
              // console.log(result);
              loading.style.display = "none";
              const textnode = document.createTextNode(
                result.data.result.track.text
              ); // Create a text node
              playing.appendChild(textnode);
              // playing.innerHTML = result.data.result.track.text;
              artist.innerHTML = "Artist -> " + result.data.result.artist.name;
              song.innerHTML = "Song -> " + result.data.result.track.name;
              match.innerHTML =
                "Match(%) -> " +
                (result.data.result.similarity * 100).toFixed(2);
            })
            .catch(err => {
              console.log("Lyrics not found");
              loading.style.display = "none";
              not_playing.style.display = "block";
              not_playing.innerHTML = "Lyrics not found.";
              not_playing.style.fontSize = "1.15rem";
            });
        }
      });
    });
  } else {
    // This else statement means that current site is not supported.
    // Supported sites are included in if else statements above this.
    loading.style.display = "none";
    not_playing.style.display = "block";
    not_playing.innerHTML = "Please open a supported site.";
    not_playing.style.fontSize = "1.15rem";
  }
});
