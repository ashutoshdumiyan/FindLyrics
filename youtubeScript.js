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
      let arr = title.split(" - ");
      arr.forEach((val, ind) => {
        if (val.indexOf("ft.") !== -1) {
          arr[ind] = val.substring(0, val.indexOf("ft.")).trim();
        } else if (val.indexOf("feat.") !== -1) {
          arr[ind] = val.substring(0, val.indexOf("feat.")).trim();
        }
      });
      let artist, song, mode;
      if (arr.length === 1) {
        artist = document.querySelector(".yt-user-info a").textContent;
        song = arr[0];
        mode = "channel";
      } else {
        artist = arr[0];
        song = arr[1];
        mode = "title";
      }
      console.log(artist, song);
      sendResponse({ artist: artist, song: song, mode: mode });
    }
  });
}
