if (window.alreadyDone === undefined) {
  // To prevent multiple injections of the script
  window.alreadyDone = true;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    const links = document.querySelector(
      ".watch-extras-section li.watch-meta-item.yt-uix-expander-body a"
    );
    let titleTag = document.querySelector("#eow-title");
    if (titleTag === null) {
      sendResponse({ error: "Song not playing" });
    } else {
      let title = titleTag.textContent;
      // / *([^)]*) */g
      title = title.replace(/ *\([^)]*\) */g, " ");
      title = title.replace(/ *\[[^)]*\] */g, " ");
      title = title.replace("HQ", " ");
      title = title.replace("HD", " ");
      title = title.trim();
      title = title.toLowerCase();
      let arr, arr2;
      let touse = 1;
      if (title.indexOf("-") !== -1) {
        arr = title.split(" - ");
        arr.forEach((val, ind) => {
          if (val.indexOf("ft.") !== -1) {
            arr[ind] = val.substring(0, val.indexOf("ft.")).trim();
          } else if (val.indexOf("feat.") !== -1) {
            arr[ind] = val.substring(0, val.indexOf("feat.")).trim();
          }
        });
        let artist, song, mode;
        if (arr.length === 1) {
          artist = document
            .querySelector(".yt-user-info a")
            .textContent.toLowerCase()
            .replace("music", "")
            .replace(" - topic", "");
          song = arr[0];
          mode = "channel";
        } else {
          artist = arr[0];
          song = arr[1];
          mode = "title";
        }
        console.log(artist, song);
        sendResponse({
          first: { artist: artist, song: song, mode: mode },
          touse: touse
        });
      } else if (title.indexOf(":") !== -1) {
        arr2 = title.split(":");
        touse = 2;
        arr2.forEach((value, index) => {
          if (value.indexOf("ft.") !== -1) {
            arr2[index] = value.substring(0, value.indexOf("ft.")).trim();
          } else if (value.indexOf("feat.") !== -1) {
            arr2[index] = value.substring(0, value.indexOf("feat.")).trim();
          }
        });
        let artist2, song2, mode2;
        if (arr2.length === 1) {
          artist2 = document
            .querySelector(".yt-user-info a")
            .textContent.toLowerCase()
            .replace("music", "")
            .replace(" - topic", "");
          song2 = arr2[0];
          mode2 = "channel";
        } else {
          artist2 = arr2[0];
          song2 = arr2[1];
          mode2 = "title";
        }
        console.log(artist2, song2);
        sendResponse({
          second: { artist2: artist2, song2: song2, mode2: mode2 },
          touse: touse
        });
      }
    }
  });
}
