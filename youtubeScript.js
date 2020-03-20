if (window.alreadyDone === undefined) {
  // To prevent multiple injections of the script
  window.alreadyDone = true;
  const links = document.querySelector(
    ".watch-extras-section li.watch-meta-item.yt-uix-expander-body a"
  );
  if (links.innerHTML == "Music" || links.innerHTML == "Entertainment") {
    let title = document.querySelector("#eow-title").innerHTML;
    const b1 = title.indexOf("(");
    const b2 = title.indexOf(")");
    if (b1 !== -1 && b2 !== -1) {
      const substr = title.substring(b1, b2);
      title = title.replace(substr, " ");
    }
    const a1 = title.indexOf("[");
    const a2 = title.indexOf("]");
    if (a1 !== -1 && a2 !== -1) {
      const substr2 = title.substring(a1, a2);
      title = title.replace(substr2, " ");
    }
    title = title.trim();
    fetch("https://api.genius.com/search?q=" + title, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer UROwru04fs-E8ILKgbRvMYt-UPsrunKpp_jHsKDbK5czuX13tSsHuYoP_3m5TOJU"
      }
    }).then(result => {
      console.log(result);
    });
  } else {
  }
}
