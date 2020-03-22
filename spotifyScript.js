if (window.alreadyDone === undefined) {
  // To prevent multiple injections of the script
  window.alreadyDone = true;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const songName = document
      .querySelector("a[data-testid='nowplaying-track-link']")
      .innerHTML.toLowerCase();
    const artists = document.querySelectorAll(
      "._44843c8513baccb36b3fa171573a128f-scss a"
    );
    let artistNames = [];
    artists.forEach(artist => {
      console.log(artist.text);
      let name = artist.text.toLowerCase();
      if (artistNames.indexOf(name) == -1) {
        artistNames.push(name);
      }
    });
    console.log(artistNames);
    sendResponse({ artistNames: artistNames, songName: songName });
  });
}
